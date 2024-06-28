import * as F from "./specification";
import type * as T from "./specification";

export class Manifesty {
    specification: any;

    constructor(data: any) {
        try {
            this.specification = F.readSpecificationT(data);
        } catch (error) {
            console.error("Failed to read specification:", error);
        }
    }

    getSpecification(): T.SpecificationT {
        return F.writeSpecificationT(this.specification);
    }

    getAnnotations(): T.W3cAnnotationT {
        return F.writeW3cAnnotationT(this.specification.annotations);
    }

    getBody(): T.W3cBodyT {
        return F.writeW3cBodyT(this.specification.body);
    }

    getTarget(): T.W3cTargetT1 | T.W3cTargetT2 {
        const target = this.specification.target;
        if (target.kind === "T1") {
            return F.writeW3cTargetT1(target.value);
        } else if (target.kind === "T2") {
            return F.writeW3cTargetT2(target.value);
        }
        throw new Error("Unknown target kind.");
    }
}