///// appended to specification.ts

import { normalize_geometry, restore_geometry, normalize_range_items, restore_range_items, normalize_resource_selector, restore_resource_selector, normalize_label, restore_label, normalize_first, restore_first, normalize_body, restore_body, normalize_target, restore_target, normalize_source, restore_source, normalize_selector, restore_selector, normalize_annotation_body, restore_annotation_body, normalize_annotation_target, restore_annotation_target, normalize_specification, restore_specification, normalize_service, restore_service, normalize_motivation, restore_motivation } from "./adapter";

export function writeSpecificationT(x: any, context: any = x): SpecificationT {
    return restore_specification(x, context, _writeSpecificationT);
}

export function readSpecificationT(x: any, context: any = x): SpecificationT {
    return normalize_specification(x, context, _readSpecificationT);
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

export function writeAnnotationTargetT(x: any, context: any = x): AnnotationTargetT {
    return restore_annotation_target(x, context, _writeAnnotationTargetT);
}

export function readAnnotationTargetT(x: any, context: any = x): AnnotationTargetT {
    return normalize_annotation_target(x, context, _readAnnotationTargetT);
}

export function writeSelectorT(x: any, context: any = x): SelectorT {
    return restore_selector(x, context, _writeSelectorT);
}

export function readSelectorT(x: any, context: any = x): SelectorT {
    return normalize_selector(x, context, _readSelectorT);
}

export function writeSourceT(x: any, context: any = x): SourceT {
    return restore_source(x, context, _writeSourceT);
}

export function readSourceT(x: any, context: any = x): SourceT {
    return normalize_source(x, context, _readSourceT);
}

export function writeBodyT(x: any, context: any = x): BodyT {
    return restore_body(x, context, _writeBodyT);
}

export function readBodyT(x: any, context: any = x): BodyT {
    return normalize_body(x, context, _readBodyT);
}

export function writeTargetT(x: any, context: any = x): TargetT {
    return restore_target(x, context, _writeTargetT);
}

export function readTargetT(x: any, context: any = x): TargetT {
    return normalize_target(x, context, _readTargetT);
}

export function writeFirstT(x: any, context: any = x): FirstT {
    return restore_first(x, context, _writeFirstT);
}

export function readFirstT(x: any, context: any = x): FirstT {
    return normalize_first(x, context, _readFirstT);
}

export function writeLabelT(x: any, context: any = x): LabelT {
    return restore_label(x, context, _writeLabelT);
}

export function readLabelT(x: any, context: any = x): LabelT {
    return normalize_label(x, context, _readLabelT);
}

export function writeResourceSelectorT(x: any, context: any = x): ResourceSelectorT {
    return restore_resource_selector(x, context, _writeResourceSelectorT);
}

export function readResourceSelectorT(x: any, context: any = x): ResourceSelectorT {
    return normalize_resource_selector(x, context, _readResourceSelectorT);
}

export function writeRangeItemsT(x: any, context: any = x): RangeItemsT {
    return restore_range_items(x, context, _writeRangeItemsT);
}

export function readRangeItemsT(x: any, context: any = x): RangeItemsT {
    return normalize_range_items(x, context, _readRangeItemsT);
}

export function writeGeometryT(x: any, context: any = x): GeometryT {
    return restore_geometry(x, context, _writeGeometryT);
}

export function readGeometryT(x: any, context: any = x): GeometryT {
    return normalize_geometry(x, context, _readGeometryT);
}