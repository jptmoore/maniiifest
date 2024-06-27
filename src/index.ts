import { readJsonFromFile } from './utils'
import { Manifesty } from './Manifesty';

const filename = 'test/data.json';

(function () {
    try {
        const jsonData = readJsonFromFile(filename);
        if (!jsonData) {
            console.error("No data returned from the file.");
            return;
        }
        const parser = new Manifesty(jsonData);
        console.log(parser.getTarget());
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();


