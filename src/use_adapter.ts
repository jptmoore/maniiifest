///// appended to specification.ts

import { normalize_metadata, normalize_label, normalize_target,normalize_specification,restore_target, restore_specification, restore_label } from "./adapter";

export function writeSpecificationT(x: any, context: any = x): SpecificationT {
    return restore_specification(x, context, _writeSpecificationT);
}

export function readSpecificationT(x: any, context: any = x): SpecificationT {
    return normalize_specification(x, context, _readSpecificationT);
}


export function writeW3cAnnotationTargetT(x: any, context: any = x): W3cAnnotationTargetT {
    return restore_target(x, context, _writeW3cAnnotationTargetT);
}

export function readW3cAnnotationTargetT(x: any, context: any = x): W3cAnnotationTargetT {
    return normalize_target(x, context, _readW3cAnnotationTargetT);
}


