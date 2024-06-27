import { JsonParser } from './JsonParser'; // replace with the actual path to your class file

import { writeBodyT, writeSpecification, writeTargetT } from "./specification"

const filename = 'test/data.json'; // replace with your actual file name

// Read JSON data from file
const jsonData = JsonParser.readJsonFromFile(filename);

if (jsonData) {
    // Parse JSON data
    const spec = JsonParser.parseJson(jsonData);
    if (spec) {
        const body = (writeBodyT(spec.body));
        console.log(body);
    } else {
        console.error('Failed to parse JSON data');
    }
} else {
    console.error('Failed to read JSON data from file');
}


