import { readSpecificationT, writeSpecificationT, writeBodyT, writeTargetT1, writeTargetT2, SpecificationT, TargetT1, TargetT2, BodyT } from "./specification";

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

    getTarget(): TargetT1 | TargetT2 {
        const target = this.specification.target;
        if (target.kind === "T1") {
            return writeTargetT1(target.value);
        } else if (target.kind === "T2") {
            return writeTargetT2(target.value);
        }
        throw new Error("Unknown target kind.");
    }
}