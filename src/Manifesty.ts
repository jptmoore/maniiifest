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

    getW3cAnnotation(): T.W3cAnnotationT {
        return F.writeW3cAnnotationT(this.specification.annotations);
    }

    getW3cAnnotationBody(): T.W3cAnnotationBodyT {
        return F.writeW3cAnnotationBodyT(this.specification.annotations.body);
    }

    getTarget(): T.W3cAnnotationTargetT1 | T.W3cAnnotationTargetT2 {
        const target = this.specification.annotations.target;
        if (target.kind === "T1") {
            return F.writeW3cAnnotationTargetT1(target.value);
        } else if (target.kind === "T2") {
            return F.writeW3cAnnotationTargetT2(target.value);
        }
        throw new Error("Unknown target kind.");
    }
}