# Internal: How `compilespec.ts` handles adapted types

This document explains the build pipeline that turns `specification.atd` into `specification.ts`, focusing on how **adapted types** (sum types that need custom read/write logic) are handled.

## The problem

[atdts](https://github.com/ahrefs/atd) generates TypeScript read/write functions from an ATD schema. It represents sum types (variants) as tagged tuples — for example a JSON `specification_t` value arrives as `["Manifest", { ... }]`.

IIIF data does **not** use tagged tuples. A manifest is just a plain object with `"type": "Manifest"`. The generated `_readSpecificationT` expects a two-element array, but the real JSON is an untagged object. We need to sit between the raw JSON and the generated code and supply the correct tag at read time (`normalize`) and strip it at write time (`restore`).

## The files

| File | Role |
|---|---|
| `src/specification.atd` | ATD schema — the single source of truth for every IIIF type. Sum types are declared with the `[| Variant of payload ]` syntax. |
| `src/adapter.ts` | Hand-written `normalize_<name>` / `restore_<name>` function pairs. Each pair knows how to inspect raw JSON and pick the right variant tag (normalize) or unwrap the tagged representation back to plain JSON (restore). |
| `scripts/compilespec.ts` | Build script that wires everything together. Runs `atdts`, post-processes the output, and appends wrapper code that connects the adapter to the generated functions. |
| `src/specification.ts` | **Generated** — do not edit by hand. The output of `compilespec.ts`. |
| `src/iiif-types.ts` | **Generated** — user-facing TypeScript types extracted from the ATD schema. |

## Pipeline

Running `npm run compilespec` (or `npx ts-node scripts/compilespec.ts`) executes five steps:

### Step 1 — Discover adapted types

```
discoverAdapterTypes()
```

Reads `src/adapter.ts` and collects every exported `normalize_<name>` function name. The `<name>` portion (e.g. `specification`, `service_item`, `annotation_body`) identifies a sum type whose generated read/write functions need wrapping. The list is sorted alphabetically.

### Step 2 — Run atdts

```
runAtdts()
```

Executes the `atdts` binary against `src/specification.atd`. This produces a raw `specification.ts` with type definitions plus `readFooT` / `writeFooT` functions for every type. Sum types get tagged-tuple read/write functions — these are the ones that won't work directly with real IIIF JSON.

### Step 3 — Rename generated functions for adapted types

```
postProcess(src, adapterTypes)
```

For each adapted type name (e.g. `annotation_body`), the script renames the generated functions by prefixing them with an underscore:

```
readAnnotationBodyT(   →  _readAnnotationBodyT(
writeAnnotationBodyT(  →  _writeAnnotationBodyT(
```

The underscore-prefixed versions become **internal** — they still do the heavy lifting of recursively reading/writing nested fields, but they now expect the tagged-tuple representation that ATD uses internally.

This step also replaces `_type` with `type` everywhere. ATD uses `_type` as an escape for the reserved word; the real JSON key is `type`.

### Step 4 — Append adapter wrappers

```
generateAdapterCode(adapterTypes)
```

Appends new functions to the end of `specification.ts`. For each adapted type, two wrappers are generated:

```ts
// Write (internal tagged representation → plain JSON)
export function writeAnnotationBodyT(x: any, context: any = x): AnnotationBodyT {
    return restore_annotation_body(x, context, _writeAnnotationBodyT);
}

// Read (plain JSON → internal tagged representation)
export function readAnnotationBodyT(x: any, context: any = x): AnnotationBodyT {
    return normalize_annotation_body(x, context, _readAnnotationBodyT);
}
```

These are the **public** `readFooT` / `writeFooT` that the rest of the codebase calls. They delegate to `adapter.ts`:

- **`normalize_annotation_body`** inspects the raw JSON (checks `type`, `typeof`, etc.), determines the correct variant tag (e.g. `'Resource'`, `'TextualBody'`, `'Choice'`), and calls `_readAnnotationBodyT` with a `[tag, value]` tuple — exactly what the generated ATD code expects.
- **`restore_annotation_body`** calls `_writeAnnotationBodyT` which returns a `[tag, value]` array, then extracts element `[1]` — the plain JSON without the tag.

### Step 5 — Generate user-facing types

```
generateIiifTypes()
```

Parses the ATD schema a second time and produces `src/iiif-types.ts` — clean TypeScript interfaces that downstream consumers can import without depending on the ATD runtime.

## How normalize and restore work

### normalize (read path)

Called when **reading** JSON into the internal representation.

```
raw JSON  →  normalize_<name>  →  [tag, raw JSON]  →  _readFooT  →  typed object
```

The normalize function in `adapter.ts` inspects the input and determines which variant it is. For example, `normalize_annotation_body` checks:

1. Is it a string? → `['String', x]`
2. Is `x.type` one of `Image`, `Video`, `Audio`, `Sound`, `Text`? → `['Resource', x]`
3. Is `x.type === 'SpecificResource'`? → `['SpecificResource', x]`
4. Is `x.type === 'TextualBody'`? → `['TextualBody', x]`
5. Is `x.type === 'Choice'`? → `['Choice', x]`
6. Is it any other object? → `['Untyped', x]` (catch-all, must come last)
7. Otherwise → throw

It passes the tagged tuple to `_readAnnotationBodyT`, which uses the tag in a `switch` to call the correct nested reader.

### restore (write path)

Called when **writing** the internal representation back to JSON.

```
typed object  →  _writeFooT  →  [tag, plain JSON]  →  restore_<name>  →  plain JSON
```

The generated `_writeFooT` produces a two-element array `[tag, value]`. The restore function simply returns element `[1]`, stripping the tag. All `restore_*` functions in `adapter.ts` share this identical logic:

```ts
export function restore_annotation_body<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`...: Result array must contain at least two items.`);
    }
    return resultList[1];
}
```

The restore functions are intentionally kept as separate named functions (rather than a single generic helper) so that stack traces and error messages immediately identify which type failed.

## Adding a new adapted type

1. **Define the sum type in `specification.atd`** using ATD variant syntax:

   ```
   type my_thing_t = [
     | Foo of foo_payload
     | Bar of bar_payload
   ]
   ```

2. **Add `normalize_my_thing` and `restore_my_thing` to `src/adapter.ts`**. The normalize function must inspect the raw JSON and return `[tag, value]`. The restore function follows the standard pattern (call `fn`, return element `[1]`).

3. **Run `npm run compilespec`**. The script will automatically discover the new `normalize_my_thing`, rename the generated `read`/`write` functions, and append the wrapper code.

## Why the restore functions are repetitive

Every `restore_*` function has the same body. This is deliberate — each named function produces a distinct stack frame and error message, making it immediately clear which type's restore failed when debugging malformed data. See the earlier review of `adapter.ts` for discussion of this trade-off.
