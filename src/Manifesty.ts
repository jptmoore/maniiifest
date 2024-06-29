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

    getW3cAnnotationAtIndex({ index }: { index: number }): T.W3cAnnotationT {
        return F.writeW3cAnnotationT(this.specification.annotations[index]);
    }
    
    getAllW3cAnnotations(): Array<T.W3cAnnotationT> {
        const annotations = [];
        for (let index = 0; index < this.specification.annotations.length; index++) {
            const annotation = this.getW3cAnnotationAtIndex({ index });
            annotations.push(annotation);
        }
        return annotations;
    }

    getW3cAnnnotationBodyAtIndex({ index }: { index: number }): T.W3cAnnotationBodyT {
        return F.writeW3cAnnotationBodyT(this.specification.annotations[index].body);
    }

    getAllW3cAnnotationsBody(): Array<T.W3cAnnotationBodyT> {
        const bodies = [];
        for (let index = 0; index < this.specification.annotations.length; index++) {
            const body = this.getW3cAnnnotationBodyAtIndex({ index });
            bodies.push(body);
        }
        return bodies;
        
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