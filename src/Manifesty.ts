import { readSpecification, writeSpecification, writeBodyT, writeTargetT } from "./specification";

export class Manifesty {
    spec: any | null;

    constructor(data: any) {
        try {
            this.spec = readSpecification(data);
        } catch (error) {
            console.error("Failed to read specification:", error);
            this.spec = null;
        }
    }

    getSpecification(): any | null {
        return writeSpecification(this.spec);
    }

    getBody(): any | null {
        return writeBodyT(this.spec.body);
    }

    getTarget(): any | null {
        return writeTargetT(this.spec.target);
    }
}