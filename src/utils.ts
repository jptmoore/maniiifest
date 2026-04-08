import * as fs from 'fs';

export function readJsonFromFile(filename: string): any {
    try {
        const rawData = fs.readFileSync(filename, 'utf-8');
        return JSON.parse(rawData);
    } catch {
        return null;
    }
}