import { readJsonFromFile } from '../src/utils'
import { Maniiifest } from '../src/Maniiifest';

const filename = 'test/samples/annopage1.json';

(function () {
    try {
        const jsonData = readJsonFromFile(filename);
        if (!jsonData) {
            console.error("No data returned from the file.");
            return;
        }

        const parser = new Maniiifest(jsonData, "AnnotationPage");

        for (const item of parser.iterateAnnotationPageAnnotationTextualBody()) {
            console.log(item)
        }


    } catch (error) {
        console.error("An error occurred:", error);
    }
})();


