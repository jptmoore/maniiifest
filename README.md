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

```ts
import { readSpecificationT, writeSpecificationT } from 'maniiifest';

// Example usage
const spec = readSpecificationT(jsonData);
const json = writeSpecificationT(spec);
```

## Scripts

- `npm run build`: Compile the TypeScript code.
- `npm run test`: Run the tests using Jest.
- `npm start`: Run the example script.
- `npm run generate-docs`: Generate documentation using TypeDoc.

## License

This project is licensed under the MIT License.