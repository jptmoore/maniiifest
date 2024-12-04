///// appended to specification.ts

import {
    normalize_creator, restore_creator, normalize_email_strings, restore_email_strings,
    normalize_email_sha1_strings, restore_email_sha1_strings, normalize_homepage_strings, restore_homepage_strings, normalize_creator_item, restore_creator_item,
    normalize_service, restore_service, normalize_part_of, restore_part_of, normalize_context, restore_context, normalize_annotation_body_items, restore_annotation_body_items, normalize_language, restore_language, normalize_geometry, restore_geometry, normalize_range_items, restore_range_items, normalize_resource_selector, restore_resource_selector, normalize_label, restore_label, normalize_first, restore_first, normalize_body, restore_body, normalize_target, restore_target, normalize_source, restore_source, normalize_selector, restore_selector, normalize_annotation_body, restore_annotation_body, normalize_annotation_target, restore_annotation_target, normalize_specification, restore_specification, normalize_service_item, restore_service_item, normalize_motivation, restore_motivation
} from "./adapter";

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

export function readServiceItemT(x: any, context: any = x): ServiceItemT {
    return normalize_service_item(x, context, _readServiceItemT);
}

export function writeServiceItemT(x: any, context: any = x): ServiceItemT {
    return restore_service_item(x, context, _writeServiceItemT);
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

export function writeAnnotationBodyItemsT(x: any, context: any = x): AnnotationBodyItemsT {
    return restore_annotation_body_items(x, context, _writeAnnotationBodyItemsT);
}

export function readAnnotationBodyItemsT(x: any, context: any = x): AnnotationBodyItemsT {
    return normalize_annotation_body_items(x, context, _readAnnotationBodyItemsT);
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

export function writeLanguageT(x: any, context: any = x): LanguageT {
    return restore_language(x, context, _writeLanguageT);
}

export function readLanguageT(x: any, context: any = x): LanguageT {
    return normalize_language(x, context, _readLanguageT);
}

export function writeContextT(x: any, context: any = x): ContextT {
    return restore_context(x, context, _writeContextT);
}

export function readContextT(x: any, context: any = x): ContextT {
    return normalize_context(x, context, _readContextT);
}

export function writePartOfT(x: any, context: any = x): PartOfT {
    return restore_part_of(x, context, _writePartOfT);
}

export function readPartOfT(x: any, context: any = x): PartOfT {
    return normalize_part_of(x, context, _readPartOfT);
}

export function writeCreatorT(x: any, context: any = x): CreatorT {
    return restore_creator(x, context, _writeCreatorT);
}

export function readCreatorT(x: any, context: any = x): CreatorT {
    return normalize_creator(x, context, _readCreatorT);
}

export function writeCreatorItemT(x: any, context: any = x): CreatorItemT {
    return restore_creator_item(x, context, _writeCreatorItemT);
}

export function readCreatorItemT(x: any, context: any = x): CreatorItemT {
    return normalize_creator_item(x, context, _readCreatorItemT);
}

export function writeEmailStringsT(x: any, context: any = x): EmailStringsT {
    return restore_email_strings(x, context, _writeEmailStringsT);
}

export function readEmailStringsT(x: any, context: any = x): EmailStringsT {
    return normalize_email_strings(x, context, _readEmailStringsT);
}

export function writeEmailSha1StringsT(x: any, context: any = x): EmailSha1StringsT {
    return restore_email_sha1_strings(x, context, _writeEmailSha1StringsT);
}

export function readEmailSha1StringsT(x: any, context: any = x): EmailSha1StringsT {
    return normalize_email_sha1_strings(x, context, _readEmailSha1StringsT);
}

export function writeHomepageStringsT(x: any, context: any = x): HomepageStringsT {
    return restore_homepage_strings(x, context, _writeHomepageStringsT);
}

export function readHomepageStringsT(x: any, context: any = x): HomepageStringsT {
    return normalize_homepage_strings(x, context, _readHomepageStringsT);
}