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
        for (const annotation of parser.getCanvasW3cAnnotations()) {
            console.log(annotation.body?.value);
        }


    } catch (error) {
        console.error("An error occurred:", error);
    }
})();


