# Maniiifest

A TypeScript library for working with [IIIF Presentation API 3.0](https://iiif.io/api/presentation/3.0/) manifests, collections, and [W3C web annotations](https://www.w3.org/TR/annotation-model/).

A typechecker/validator built using maniiifest is available online [here](https://maniiifest.onrender.com/).

## Install

```sh
npm install maniiifest
```

## Quick start

```typescript
import { Maniiifest } from 'maniiifest';

const response = await fetch('https://iiif.wellcomecollection.org/presentation/b19974760');
const data = await response.json();
const parser = new Maniiifest(data);

// Get top-level properties
console.log(parser.getCollectionId());
console.log(parser.getCollectionLabel());

// Iterate over nested items
for (const manifest of parser.iterateCollectionManifest()) {
    console.log(manifest);
}
```

## Constructor

The `Maniiifest` constructor parses IIIF Manifests and Collections:

```typescript
const parser = new Maniiifest(data);
```

For W3C annotation types, use the dedicated static methods or classes:

```typescript
import { Maniiifest, ManiiifestAnnotation, ManiiifestAnnotationPage, ManiiifestAnnotationCollection } from 'maniiifest';

// Via static factory methods
const annotation = Maniiifest.parseAnnotation(data);
const page = Maniiifest.parseAnnotationPage(data);
const annoCollection = Maniiifest.parseAnnotationCollection(data);

// Or via direct constructors
const annotation2 = new ManiiifestAnnotation(data);
const page2 = new ManiiifestAnnotationPage(data);
const annoCollection2 = new ManiiifestAnnotationCollection(data);
```

## Getters and iterators

Every method is either a **getter** that returns a single value (or `null`) or an **iterator** (generator) that you loop over with `for...of`.

The naming convention tells you what it does:

| Pattern | Returns | Example |
|---------|---------|---------|
| `get<Resource><Property>()` | value or `null` | `getManifestLabel()` |
| `iterate<Resource><Item>()` | generator | `iterateManifestCanvas()` |

### Manifest

```typescript
const parser = new Maniiifest(manifest);

parser.getManifestId();
parser.getManifestLabel();
parser.getManifestSummary();
parser.getManifestRights();
parser.getManifestRequiredStatement();

for (const canvas of parser.iterateManifestCanvas()) { /* ... */ }
for (const meta of parser.iterateManifestMetadata()) { /* ... */ }
for (const anno of parser.iterateManifestCanvasAnnotation()) { /* ... */ }
for (const range of parser.iterateManifestRange()) { /* ... */ }
```

Canvas and range properties are accessible through the manifest:

```typescript
// Canvas-level iteration
for (const label of parser.iterateManifestCanvasLabel()) { /* ... */ }
for (const thumb of parser.iterateManifestCanvasThumbnail()) { /* ... */ }
for (const meta of parser.iterateManifestCanvasMetadata()) { /* ... */ }
for (const rendering of parser.iterateManifestCanvasRendering()) { /* ... */ }
for (const seeAlso of parser.iterateManifestCanvasSeeAlso()) { /* ... */ }
for (const service of parser.iterateManifestCanvasService()) { /* ... */ }

// Range-level iteration (structures / table of contents)
for (const label of parser.iterateManifestRangeLabel()) { /* ... */ }
for (const item of parser.iterateManifestRangeItem()) { /* ... */ }
for (const rendering of parser.iterateManifestRangeRendering()) { /* ... */ }
for (const anno of parser.iterateManifestRangeAnnotation()) { /* ... */ }
```

### Collection

```typescript
const parser = new Maniiifest(collection);

parser.getCollectionId();
parser.getCollectionLabel();
parser.getCollectionSummary();
parser.getCollectionRights();
parser.getCollectionNavDate();
parser.getCollectionNavPlace();

for (const manifest of parser.iterateCollectionManifest()) { /* ... */ }
for (const nested of parser.iterateCollectionCollection()) { /* ... */ }
for (const meta of parser.iterateCollectionMetadata()) { /* ... */ }
for (const rendering of parser.iterateCollectionRendering()) { /* ... */ }
for (const seeAlso of parser.iterateCollectionSeeAlso()) { /* ... */ }
for (const behavior of parser.iterateCollectionBehavior()) { /* ... */ }
for (const partOf of parser.iterateCollectionPartOf()) { /* ... */ }
```

### Annotation

```typescript
const parser = Maniiifest.parseAnnotation(annotation);

parser.getAnnotationId();
parser.getAnnotationBody();
parser.getAnnotationTarget();
parser.getAnnotationMotivation();
parser.getAnnotationCreator();
parser.getAnnotationCreated();
parser.getAnnotationModified();

for (const body of parser.iterateAnnotationTextualBody()) { /* ... */ }
for (const body of parser.iterateAnnotationResourceBody()) { /* ... */ }
for (const target of parser.iterateAnnotationTarget()) { /* ... */ }
for (const feature of parser.iterateAnnotationFeature()) { /* ... */ }
for (const coords of parser.iterateAnnotationGeometryPointCoordinates()) { /* ... */ }
```

### Annotation Page

```typescript
const parser = Maniiifest.parseAnnotationPage(page);

parser.getAnnotationPageId();
parser.getAnnotationPagePartOf();
parser.getAnnotationPageLabel();
parser.getAnnotationPageNext();
parser.getAnnotationPageStartIndex();
for (const anno of parser.iterateAnnotationPageAnnotation()) { /* ... */ }
for (const body of parser.iterateAnnotationPageAnnotationTextualBody()) { /* ... */ }
for (const ref of parser.iterateAnnotationPageAnnotationCanvasRef()) { /* ... */ }
```

### Annotation Collection

```typescript
const parser = Maniiifest.parseAnnotationCollection(collection);

parser.getAnnotationCollectionId();
parser.getAnnotationCollectionLabel();
parser.getAnnotationCollectionTotal();
parser.getAnnotationCollectionFirst();
parser.getAnnotationCollectionLast();

for (const anno of parser.iterateAnnotationCollectionAnnotation()) { /* ... */ }
```

Full API docs: [jptmoore.github.io/maniiifest](https://jptmoore.github.io/maniiifest/classes/Maniiifest.html)

## Types

The library exports TypeScript types that match real IIIF JSON structure:

```typescript
import { Maniiifest } from 'maniiifest';
import type { Manifest, Canvas, Annotation, Label, Metadata, Service } from 'maniiifest';

const response = await fetch('https://example.org/iiif/manifest.json');
const manifest: Manifest = await response.json();

console.log(manifest.id);
console.log(manifest.label);

for (const item of manifest.metadata ?? []) {
    const meta: Metadata = item;
    console.log(meta.label, '->', meta.value);
}
```

A full list of exported types is in the generated [src/iiif-types.ts](src/iiif-types.ts) file.

## More examples

More examples can be found [here](https://github.com/jptmoore/maniiitest).

## Scripts

- `npm run build`: Compile TypeScript to `dist/`.
- `npm run test`: Run the tests using Jest.
- `npm start`: Run the example script.
- `npm run compilespec`: Recompile `specification.ts` from the ATD spec and regenerate `iiif-types.ts`. Requires [atdts](https://github.com/ahrefs/atd). Only needed when `specification.atd` changes.
- `npm run generate-docs`: Generate documentation using TypeDoc.

## License

This project is licensed under the MIT License.