import { readSpecification, writeSpecification, writeBodyT, writeTargetT, Specification, TargetT, BodyT } from "./specification";

export class Manifesty {
    spec: any;

    constructor(data: any) {
        try {
            this.spec = readSpecification(data);
        } catch (error) {
            console.error("Failed to read specification:", error);
        }
    }

    getSpecification(): Specification {
        return writeSpecification(this.spec);
    }

    getBody(): BodyT {
        return writeBodyT(this.spec.body);
    }

    getTarget(): TargetT {
        return writeTargetT(this.spec.target);
    }
}