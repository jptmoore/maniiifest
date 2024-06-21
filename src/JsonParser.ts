import fs from 'fs';
import * as spec from "./specification"
import { TargetT } from './specification';

export class JsonParser {
    static readJsonFromFile(filename: string): any {
        try {
            const rawData = fs.readFileSync(filename, 'utf-8');
            return JSON.parse(rawData);
        } catch (error) {
            console.error(`Error reading or parsing file: ${filename}`, error);
            return null;
        }
    }

    static parseJson(data: any): TargetT | null {
        try {
            return spec.readTargetT(data);
        } catch (error) {
            console.error('Error parsing JSON data', error);
            return null;
        }
    }
}
