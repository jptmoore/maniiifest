import { readJsonFromFile } from '../src/utils'
import { Maniiifest } from '../src/Maniiifest';
import type { Manifest, Annotation, Metadata } from '../src/iiif-types';

const filename = 'test/example.json';

(function () {
    try {
        const jsonData = readJsonFromFile(filename);
        if (!jsonData) {
            console.error("No data returned from the file.");
            return;
        }

        // Use exported types to annotate raw IIIF JSON
        const manifest = jsonData as Manifest;
        console.log('Manifest id:', manifest.id);
        console.log('Label:', manifest.label);

        if (manifest.metadata) {
            for (const item of manifest.metadata) {
                const meta: Metadata = item;
                console.log('Metadata:', meta.label, '->', meta.value);
            }
        }

        // Use Maniiifest for parsed access
        const parser = new Maniiifest(jsonData);
        for (const item of parser.iterateManifestCanvasAnnotation()) {
            const annotation: Annotation = item;
            console.log('Annotation:', annotation)
        }

    } catch (error) {
        console.error("An error occurred:", error);
    }
})();


