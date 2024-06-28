import * as Spec from "./specification";
import type * as SpecTypes from "./specification";

export class Manifesty {
    specification: any;

    constructor(data: any) {
        try {
            this.specification = Spec.readSpecificationT(data);
        } catch (error) {
            console.error("Failed to read specification:", error);
        }
    }

    getSpecification(): SpecTypes.SpecificationT {
        return Spec.writeSpecificationT(this.specification);
    }

    getAnnotations(): SpecTypes.W3cAnnotationT {
        return Spec.writeW3cAnnotationT(this.specification.annotations);
    }

    getBody(): SpecTypes.W3cBodyT {
        return Spec.writeW3cBodyT(this.specification.body);
    }

    getTarget(): SpecTypes.W3cTargetT1 | SpecTypes.W3cTargetT2 {
        const target = this.specification.target;
        if (target.kind === "T1") {
            return Spec.writeW3cTargetT1(target.value);
        } else if (target.kind === "T2") {
            return Spec.writeW3cTargetT2(target.value);
        }
        throw new Error("Unknown target kind.");
    }
}