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
        for (const item of parser.getCanvasAnnotation()) {
            console.log(item);
        }



    } catch (error) {
        console.error("An error occurred:", error);
    }
})();


