import { readJsonFromFile } from '../src/utils'
import { Maniiifest } from '../src/Maniiifest';

const filename = 'test/example.json';

(function () {
    try {
        const jsonData = readJsonFromFile(filename);
        if (!jsonData) {
            console.error("No data returned from the file.");
            return;
        }

        const parser = new Maniiifest(jsonData);

        for (const item of parser.iterateCollectionManifest()) {
            console.log(item)
        }

        // const result = parser.getManifestNavPlace();
        // console.log(result)


    } catch (error) {
        console.error("An error occurred:", error);
    }
})();


