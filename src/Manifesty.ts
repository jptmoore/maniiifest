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

    getW3cAnnotations(): T.W3cAnnotationT[] {
        return this.specification.annotations.map(F.writeW3cAnnotationT);
    }

    getW3cAnnotationsBody(): T.W3cAnnotationBodyT[] {
        return this.getW3cAnnotations().map((annotation) => F.writeW3cAnnotationBodyT(annotation.body));
    }


    getW3cAnnotationTargetAtIndex({ index }: { index: number }): T.W3cAnnotationTargetT1 | T.W3cAnnotationTargetT2 {
        const target = this.specification.annotations[index].target;
        if (target.kind === "T1") {
            return F.writeW3cAnnotationTargetT1(target.value);
        } else if (target.kind === "T2") {
            return F.writeW3cAnnotationTargetT2(target.value);
        }
        throw new Error("Unknown target kind.");
    }

    getAllW3cAnnotationTargets(): Array<T.W3cAnnotationTargetT1 | T.W3cAnnotationTargetT2> {
        const targets = [];
        for (let index = 0; index < this.specification.annotations.length; index++) {
            const target = this.getW3cAnnotationTargetAtIndex({ index });
            targets.push(target);
        }
        return targets;
    }

}