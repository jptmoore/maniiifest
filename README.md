# Maniiifest

## Description

Maniiifest provides methods to parse and manipulate [IIIF Presentation API 3.0](https://iiif.io/api/presentation/3.0/) specification and [W3C web annotations](https://www.w3.org/TR/annotation-model/). It ensures type safety and offers utility functions for working with IIIF data. Maniiifest takes a parser generator approach to generating TypeScript type definitions using a domain-specific language (DSL). The current specification is available [here](https://raw.githubusercontent.com/jptmoore/maniiifest/main/src/specification.atd).

A typechecker/validator built using maniiifest is available online [here](https://maniiifest.onrender.com/).

## Installation

Install the package using npm:

```sh
npm install maniiifest --save-dev
```

## Usage

Import and use the functions in your TypeScript project:

  ```typescript
import { Maniiifest } from 'maniiifest';

const manifest = {
    "id": "https://iiif.io/api/cookbook/recipe/0032-collection/manifest-02.json",
    "type": "Manifest",
    "label": { "en": ["Northeaster"] }
}

const parser = new Maniiifest(manifest);
const label = parser.getManifestLabelByLanguage('en');
console.log(label?.['en']);
  ```

To parse web annotations you need to provide the type of annotation to the constructor. For example:

```typescript
const annotationParser = new Maniiifest(annotation, "Annotation");
const annotationPageParser = new Maniiifest(annotation_page, "AnnotationPage");
const annotationCollectionParser = new Maniiifest(annotation_collection, "AnnotationCollection");
```
The aim is to support the most relevant subset of the W3C standard as used within IIIF manifests.

## Types

Maniiifest exports TypeScript types that match the real IIIF JSON structure. These are auto-generated from the internal ATD specification and can be used to annotate your own IIIF data:

```typescript
import { Maniiifest } from 'maniiifest';
import type { Manifest, Canvas, Annotation, Label, Metadata, Service } from 'maniiifest';
```

The IIIF spec uses polymorphic JSON fields where a property can take several different shapes — a string, an object, an array, or a union of multiple object types. The exported types capture these variations. You typically use the top-level union types like `Label`, `Service`, or `AnnotationBody` and let TypeScript handle the structural matching:

```typescript
import { Maniiifest } from 'maniiifest';
import type { Manifest, Metadata } from 'maniiifest';

const response = await fetch('https://example.org/iiif/manifest.json');
const manifest: Manifest = await response.json();

// Properties are fully typed
console.log(manifest.id);
console.log(manifest.label);

if (manifest.metadata) {
    for (const item of manifest.metadata) {
        const meta: Metadata = item;
        console.log(meta.label, '->', meta.value);
    }
}

// Pass typed JSON into Maniiifest for parsed access
const parser = new Maniiifest(manifest);
for (const annotation of parser.iterateManifestCanvasAnnotation()) {
    console.log(annotation);
}
```

A full list of exported types can be found in the generated [src/iiif-types.ts](src/iiif-types.ts) file.

## Documentation

Documentation for the current supported get methods and generators available [here](https://jptmoore.github.io/maniiifest/classes/Maniiifest.html). If you would like to see other methods added please raise an issue.


## Tutorial

In this example we will use generators to work with a complex collection that nests manifests within it.

```typescript
import { Maniiifest } from 'maniiifest';

async function main() {
    const response = await fetch('https://iiif.wellcomecollection.org/presentation/b19974760');
    const jsonData = await response.json();
    const parser = new Maniiifest(jsonData);
    const manifests = parser.iterateCollectionManifest();
    let count = 0;
    for (const item of manifests) {
        if (count >= 25) break;
        const manifestRef = new Maniiifest(item);
        const metadata = manifestRef.iterateManifestMetadata();
        for (const item of metadata) {
            console.log(item);
        }
        count++;
    }
}

main()
```
The output will be the metadata from the first 25 manifests:

```sh
❯ ts-node tutorial.ts
{ label: { en: [ 'Volume' ] }, value: { none: [ '1' ] } }
{ label: { en: [ 'Year' ] }, value: { none: [ '1859' ] } }
{ label: { en: [ 'Month' ] }, value: { en: [ 'September' ] } }
{
  label: { en: [ 'DisplayDate' ] },
  value: { en: [ '15. September 1859' ] }
}
{ label: { en: [ 'Volume' ] }, value: { none: [ '1' ] } }
{ label: { en: [ 'Year' ] }, value: { none: [ '1859' ] } }
{ label: { en: [ 'Month' ] }, value: { en: [ 'October' ] } }
.....
```

In this example we will work with externally referenced W3C annotations. 
```typescript
import { Maniiifest } from 'maniiifest';

async function main() {
    const response = await fetch('https://iiif.io/api/cookbook/recipe/0269-embedded-or-referenced-annotations/manifest.json');
    const jsonData = await response.json();
    const parser = new Maniiifest(jsonData);
    const annotationPages = parser.iterateManifestCanvasW3cAnnotationPage();
    for (const annotationPage of annotationPages) {
        const response = await fetch(annotationPage.id);
        const jsonData = await response.json();
        const parser = new Maniiifest(jsonData, "AnnotationPage");
        const annotations = parser.iterateAnnotationPageAnnotation();
        for (const annotation of annotations) {
            console.log(annotation.body?.value);
        }
    }
}

main()
```
The output will the commenting value from the single annotation:
```
Göttinger Marktplatz mit Gänseliesel Brunnen
```

In this example we will work with an annotation that uses the [georeference](https://iiif.io/api/extension/georef/) extension.

```typescript
import { Maniiifest } from 'maniiifest';

async function main() {
    const response = await fetch('https://annotations.allmaps.org/maps/cde9210870a2652a');
    const jsonData = await response.json();
    const annotation = new Maniiifest(jsonData, "Annotation");
    const points = Array.from(annotation.iterateAnnotationGeometryPointCoordinates());
    for (let i = 0; i < points.length; i += 2) {
        console.log(`x: ${points[i]}, y: ${points[i + 1]}`);
    } 
}

main()
```
The output will be all the point coordinates:
```
x: -70.9375518, y: 42.4811769
x: -70.9398138, y: 42.4825027
x: -70.9403993, y: 42.4821228
x: -70.9434097, y: 42.480079
x: -70.9373183, y: 42.4793787
x: -70.9454651, y: 42.4765122
x: -70.9364491, y: 42.4804618
x: -70.9377961, y: 42.4788144
x: -70.935966, y: 42.4809988
x: -70.9390062, y: 42.4772977
x: -70.9398389, y: 42.4815905
x: -70.9369067, y: 42.4798999
```

More examples of parsing complex manifests and collections can be found [here](https://github.com/jptmoore/maniiitest).

## Scripts

- `npm run build`: Compile TypeScript to `dist/`.
- `npm run test`: Run the tests using Jest.
- `npm start`: Run the example script.
- `npm run compilespec`: Recompile `specification.ts` from the ATD spec and regenerate `iiif-types.ts`. Requires [atdts](https://github.com/ahrefs/atd). Only needed when `specification.atd` changes.
- `npm run generate-docs`: Generate documentation using TypeDoc.

## License

This project is licensed under the MIT License.