///// appended to specification.ts

import { normalize_annotation_body, restore_annotation_body } from "../src/adapter";
import { AnnotationBodyT } from "../src/specification";
import { normalize_target,normalize_specification,restore_target, restore_specification, normalize_service, restore_service, normalize_motivation, restore_motivation } from "./adapter";

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

export function writeServiceT(x: any, context: any = x): ServiceT {
    return restore_service(x, context, _writeServiceT);
}

export function readServiceT(x: any, context: any = x): ServiceT {
    return normalize_service(x, context, _readServiceT);
}

export function writeMotivationT(x: any, context: any = x): MotivationT {
    return restore_motivation(x, context, _writeMotivationT);
}

export function readMotivationT(x: any, context: any = x): MotivationT {
    return normalize_motivation(x, context, _readMotivationT);
}

export function writeAnnotationBodyT(x: any, context: any = x): AnnotationBodyT {
    return restore_annotation_body(x, context, _writeAnnotationBodyT);
}

export function readAnnotationBodyT(x: any, context: any = x): AnnotationBodyT {
    return normalize_annotation_body(x, context, _readAnnotationBodyT);
}