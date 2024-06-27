import { readSpecification, writeSpecification, writeBodyT, writeTargetT, Specification, TargetT, BodyT } from "./specification";

export class Manifesty {
    specification: any;

    constructor(data: any) {
        try {
            this.specification = readSpecification(data);
        } catch (error) {
            console.error("Failed to read specification:", error);
        }
    }

    getSpecification(): Specification {
        return writeSpecification(this.specification);
    }

    getBody(): BodyT {
        return writeBodyT(this.specification.body);
    }

    getTarget(): TargetT {
        return writeTargetT(this.specification.target);
    }
}