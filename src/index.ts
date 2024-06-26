import { JsonParser } from './JsonParser'; // replace with the actual path to your class file

import { writeSpecification } from "./specification"

const filename = 'test/data.json'; // replace with your actual file name

// Read JSON data from file
const jsonData = JsonParser.readJsonFromFile(filename);

if (jsonData) {
    // Parse JSON data
    const parsedData = JsonParser.parseJson(jsonData);
    if (parsedData) {
        const result = writeSpecification(parsedData);
        console.log(result)
    } else {
        console.error('Failed to parse JSON data');
    }
} else {
    console.error('Failed to read JSON data from file');
}


