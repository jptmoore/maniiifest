import { readSpecificationT, writeSpecificationT, writeBodyT, writeTargetT, SpecificationT, TargetT, BodyT } from "./specification";

export class Manifesty {
    specification: any;

    constructor(data: any) {
        try {
            this.specification = readSpecificationT(data);
        } catch (error) {
            console.error("Failed to read specification:", error);
        }
    }

    getSpecification(): SpecificationT {
        return writeSpecificationT(this.specification);
    }

    getBody(): BodyT {
        return writeBodyT(this.specification.body);
    }

    getTarget(): TargetT {
        //this.specification.target.kind
        return writeTargetT(this.specification.target);
    }
}