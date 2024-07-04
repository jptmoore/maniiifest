import { readJsonFromFile } from './utils'
import { Manifesty } from './Manifesty';

const filename = 'test/manifest.json';

(function () {
    try {
        const jsonData = readJsonFromFile(filename);
        if (!jsonData) {
            console.error("No data returned from the file.");
            return;
        }

        const parser = new Manifesty(jsonData);
        const result = parser.getMetadataAtIndex({ index: 0 });
        console.log(result.label);
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();


