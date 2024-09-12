# Maniiifest

## Description

Maniiifest provides methods to parse and manipulate [IIIF Presentation API 3.0](https://iiif.io/api/presentation/3.0/) specification and [W3C web annotations](https://www.w3.org/TR/annotation-model/). It ensures type safety and offers utility functions for working with IIIF data. Maniiifest takes a parser generator approach to generating TypeScript type definitions using a domain-specific language (DSL). The current specification is available [here](https://raw.githubusercontent.com/jptmoore/maniiifest/main/src/specification.atd).

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
const label = parser.getManifestLabel()
console.log(label);
  ```

To parse web annotations you need to provide the type of annotation to the constructor. For example:

```typescript
const annotationParser = new Maniiifest(annotation, "Annotation");
const annotationPageParser = new Maniiifest(annotation_page, "AnnotationPage");
const annotationCollectionParser = new Maniiifest(annotation_collection, "AnnotationCollection");
```
The aim is to support the most relevant subset of the W3C standard as used within IIIF manifests. 

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
More examples of parsing complex manifests and collections can be found [here](https://github.com/jptmoore/maniiitest).

## Scripts

- `npm run build`: Compile the TypeScript code.
- `npm run test`: Run the tests using Jest.
- `npm start`: Run the example script.
- `npm run generate-docs`: Generate documentation using TypeDoc.

## License

This project is licensed under the MIT License.