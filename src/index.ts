import { readJsonFromFile } from './utils'
import { Manifesty } from './Manifesty';

const filename = 'test/detailed.json';

(function () {
    try {
        const jsonData = readJsonFromFile(filename);
        if (!jsonData) {
            console.error("No data returned from the file.");
            return;
        }

        const parser = new Manifesty(jsonData);

        // for (const item of parser.iterateCanvas()) {
        //     console.log(item)
        // }

        const label = parser.getManifestRequiredStatement()?.label;
        console.log(label);


    } catch (error) {
        console.error("An error occurred:", error);
    }
})();


