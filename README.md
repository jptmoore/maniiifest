# Maniiifest

## Description

Maniiifest provides methods to parse and manipulate IIIF JSON manifests and collections. It ensures type safety and offers utility functions for working with IIIF data.

## Installation

Install the package using npm:

```sh
npm install maniiifest
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

## Documentation

Documentation for the current supported get methods and generators available [here](https://jptmoore.github.io/maniiifest/). If you would like to see other methods added please raise an issue.


## Scripts

- `npm run build`: Compile the TypeScript code.
- `npm run test`: Run the tests using Jest.
- `npm start`: Run the example script.
- `npm run generate-docs`: Generate documentation using TypeDoc.

## License

This project is licensed under the MIT License.