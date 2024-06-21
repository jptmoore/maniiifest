import fs from 'fs';
import * as spec from "./specification"
import { TargetT } from './specification';

function DataWrapper(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
        const result = originalMethod.apply(this, args);

        if (typeof result === 'string' && result.length > 0) {
            return ["T1", result];
        } 

        if (result && typeof result === 'object') {
            return ["T2", result];
        } 

        return result;
    }

    return descriptor;
}

export class JsonParser {
    @DataWrapper
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
