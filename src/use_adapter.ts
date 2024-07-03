///// appended to specification.ts

import { normalize_label, normalize_target,normalize_specification,restore_target, restore_specification, restore_label } from "./adapter";

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

export function writeLabelT(x: any, context: any = x): LabelT {
    return restore_label(x, context, _writeLabelT);
}

export function readLabelT(x: any, context: any = x): LabelT {
    return normalize_label(x, context, _readLabelT);
}
