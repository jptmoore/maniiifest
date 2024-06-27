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
        const target = parser.getTarget();
        if (typeof target === "string") {
            console.log(target);
        } else
        if (typeof target === "object") {
            console.log(target);
        } 
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();


