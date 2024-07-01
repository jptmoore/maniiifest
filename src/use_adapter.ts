///// appended to specification.ts

import { normalize,normalize_specification,restore, restore_specification } from "./adapter";

export function writeSpecificationT(x: any, context: any = x): SpecificationT {
    return restore_specification(x, context, _writeSpecificationT);
}

export function readSpecificationT(x: any, context: any = x): SpecificationT {
    return normalize_specification(x, context, _readSpecificationT);
}


export function writeW3cAnnotationTargetT(x: any, context: any = x): W3cAnnotationTargetT {
    return restore(x, context, _writeW3cAnnotationTargetT);
}

export function readW3cAnnotationTargetT(x: any, context: any = x): W3cAnnotationTargetT {
    return normalize(x, context, _readW3cAnnotationTargetT);
}
