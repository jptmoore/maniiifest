/*
  Generated by atdts from type definitions in 'specification.atd'.

  Type-safe translations from/to JSON

  For each type 'Foo', there is a pair of functions:
  - 'writeFoo': convert a 'Foo' value into a JSON-compatible value.
  - 'readFoo': convert a JSON-compatible value into a TypeScript value
    of type 'Foo'.
*/

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* tslint:disable */
/* eslint-disable */

export type SpecificationT =
| { kind: 'Manifest'; value: ManifestT }
| { kind: 'Collection'; value: CollectionT }

export type CollectionT = {
  id: string;
  type: string;
  label: LabelT;
  items?: SpecificationT[];
}

export type ManifestT = {
  id: string;
  type: string;
  label: LabelT;
  metadata?: MetadataT[];
  requiredStatement?: RequiredStatementT;
  summary?: SummaryT;
  thumbnail?: ThumbnailT[];
  items?: CanvasT[];
  annotations?: W3cAnnotationPageT[];
}

export type CanvasT = {
  id: string;
  type: string;
  label?: LabelT;
  items?: AnnotationPageT[];
  annotations?: W3cAnnotationPageT[];
}

export type AnnotationPageT = {
  id: string;
  type: string;
  items?: AnnotationT[];
}

export type AnnotationT = {
  id: string;
  type: string;
  motivation?: string;
  body?: AnnotationBodyT;
  target?: AnnotationTargetT;
  created?: string;
  modified?: string;
}

export type AnnotationBodyT = {
  id: string;
  type: string;
  format?: string;
  service?: ServiceT[];
  height?: number /*int*/;
  width?: number /*int*/;
}

export type AnnotationTargetT = W3cAnnotationTargetT

export type W3cAnnotationT = {
  id: string;
  type: string;
  motivation?: string;
  body?: W3cAnnotationBodyT;
  target?: W3cAnnotationTargetT;
  created?: string;
  modified?: string;
}

export type W3cAnnotationPageT = {
  id: string;
  type: string;
  items?: W3cAnnotationT[];
}

export type MetadataT = {
  label: LngStringT;
  value: LngStringT;
}

export type RequiredStatementT = {
  label: LngStringT;
  value: LngStringT;
}

export type ThumbnailT = {
  id: string;
  type: string;
  label?: LabelT;
  format?: string;
  width?: number /*int*/;
  height?: number /*int*/;
  service?: ServiceT[];
}

export type ServiceT = {
  id?: string;
  type?: string;
  at_id?: string;
  attype?: string;
  profile?: string;
  label?: LabelT;
  service?: ServiceT[];
}

export type LabelT = LngStringT

export type SummaryT = LngStringT

export type LngStringT = [string, string[]][]

export type W3cAnnotationBodyT = {
  type: string;
  language: string;
  value: string;
}

export type W3cAnnotationTargetT =
| { kind: 'T1'; value: W3cAnnotationTargetT1 }
| { kind: 'T2'; value: W3cAnnotationTargetT2 }

export type W3cAnnotationTargetT1 = string

export type W3cAnnotationTargetT2 = {
  type: string;
  source: string;
}

export function _writeSpecificationT(x: SpecificationT, context: any = x): any {
  switch (x.kind) {
    case 'Manifest':
      return ['Manifest', writeManifestT(x.value, x)]
    case 'Collection':
      return ['Collection', writeCollectionT(x.value, x)]
  }
}

export function _readSpecificationT(x: any, context: any = x): SpecificationT {
  _atd_check_json_tuple(2, x, context)
  switch (x[0]) {
    case 'Manifest':
      return { kind: 'Manifest', value: readManifestT(x[1], x) }
    case 'Collection':
      return { kind: 'Collection', value: readCollectionT(x[1], x) }
    default:
      _atd_bad_json('SpecificationT', x, context)
      throw new Error('impossible')
  }
}

export function writeCollectionT(x: CollectionT, context: any = x): any {
  return {
    'id': _atd_write_required_field('CollectionT', 'id', _atd_write_string, x.id, x),
    'type': _atd_write_required_field('CollectionT', 'type', _atd_write_string, x.type, x),
    'label': _atd_write_required_field('CollectionT', 'label', writeLabelT, x.label, x),
    'items': _atd_write_optional_field(_atd_write_array(writeSpecificationT), x.items, x),
  };
}

export function readCollectionT(x: any, context: any = x): CollectionT {
  return {
    id: _atd_read_required_field('CollectionT', 'id', _atd_read_string, x['id'], x),
    type: _atd_read_required_field('CollectionT', 'type', _atd_read_string, x['type'], x),
    label: _atd_read_required_field('CollectionT', 'label', readLabelT, x['label'], x),
    items: _atd_read_optional_field(_atd_read_array(readSpecificationT), x['items'], x),
  };
}

export function writeManifestT(x: ManifestT, context: any = x): any {
  return {
    'id': _atd_write_required_field('ManifestT', 'id', _atd_write_string, x.id, x),
    'type': _atd_write_required_field('ManifestT', 'type', _atd_write_string, x.type, x),
    'label': _atd_write_required_field('ManifestT', 'label', writeLabelT, x.label, x),
    'metadata': _atd_write_optional_field(_atd_write_array(writeMetadataT), x.metadata, x),
    'requiredStatement': _atd_write_optional_field(writeRequiredStatementT, x.requiredStatement, x),
    'summary': _atd_write_optional_field(writeSummaryT, x.summary, x),
    'thumbnail': _atd_write_optional_field(_atd_write_array(writeThumbnailT), x.thumbnail, x),
    'items': _atd_write_optional_field(_atd_write_array(writeCanvasT), x.items, x),
    'annotations': _atd_write_optional_field(_atd_write_array(writeW3cAnnotationPageT), x.annotations, x),
  };
}

export function readManifestT(x: any, context: any = x): ManifestT {
  return {
    id: _atd_read_required_field('ManifestT', 'id', _atd_read_string, x['id'], x),
    type: _atd_read_required_field('ManifestT', 'type', _atd_read_string, x['type'], x),
    label: _atd_read_required_field('ManifestT', 'label', readLabelT, x['label'], x),
    metadata: _atd_read_optional_field(_atd_read_array(readMetadataT), x['metadata'], x),
    requiredStatement: _atd_read_optional_field(readRequiredStatementT, x['requiredStatement'], x),
    summary: _atd_read_optional_field(readSummaryT, x['summary'], x),
    thumbnail: _atd_read_optional_field(_atd_read_array(readThumbnailT), x['thumbnail'], x),
    items: _atd_read_optional_field(_atd_read_array(readCanvasT), x['items'], x),
    annotations: _atd_read_optional_field(_atd_read_array(readW3cAnnotationPageT), x['annotations'], x),
  };
}

export function writeCanvasT(x: CanvasT, context: any = x): any {
  return {
    'id': _atd_write_required_field('CanvasT', 'id', _atd_write_string, x.id, x),
    'type': _atd_write_required_field('CanvasT', 'type', _atd_write_string, x.type, x),
    'label': _atd_write_optional_field(writeLabelT, x.label, x),
    'items': _atd_write_optional_field(_atd_write_array(writeAnnotationPageT), x.items, x),
    'annotations': _atd_write_optional_field(_atd_write_array(writeW3cAnnotationPageT), x.annotations, x),
  };
}

export function readCanvasT(x: any, context: any = x): CanvasT {
  return {
    id: _atd_read_required_field('CanvasT', 'id', _atd_read_string, x['id'], x),
    type: _atd_read_required_field('CanvasT', 'type', _atd_read_string, x['type'], x),
    label: _atd_read_optional_field(readLabelT, x['label'], x),
    items: _atd_read_optional_field(_atd_read_array(readAnnotationPageT), x['items'], x),
    annotations: _atd_read_optional_field(_atd_read_array(readW3cAnnotationPageT), x['annotations'], x),
  };
}

export function writeAnnotationPageT(x: AnnotationPageT, context: any = x): any {
  return {
    'id': _atd_write_required_field('AnnotationPageT', 'id', _atd_write_string, x.id, x),
    'type': _atd_write_required_field('AnnotationPageT', 'type', _atd_write_string, x.type, x),
    'items': _atd_write_optional_field(_atd_write_array(writeAnnotationT), x.items, x),
  };
}

export function readAnnotationPageT(x: any, context: any = x): AnnotationPageT {
  return {
    id: _atd_read_required_field('AnnotationPageT', 'id', _atd_read_string, x['id'], x),
    type: _atd_read_required_field('AnnotationPageT', 'type', _atd_read_string, x['type'], x),
    items: _atd_read_optional_field(_atd_read_array(readAnnotationT), x['items'], x),
  };
}

export function writeAnnotationT(x: AnnotationT, context: any = x): any {
  return {
    'id': _atd_write_required_field('AnnotationT', 'id', _atd_write_string, x.id, x),
    'type': _atd_write_required_field('AnnotationT', 'type', _atd_write_string, x.type, x),
    'motivation': _atd_write_optional_field(_atd_write_string, x.motivation, x),
    'body': _atd_write_optional_field(writeAnnotationBodyT, x.body, x),
    'target': _atd_write_optional_field(writeAnnotationTargetT, x.target, x),
    'created': _atd_write_optional_field(_atd_write_string, x.created, x),
    'modified': _atd_write_optional_field(_atd_write_string, x.modified, x),
  };
}

export function readAnnotationT(x: any, context: any = x): AnnotationT {
  return {
    id: _atd_read_required_field('AnnotationT', 'id', _atd_read_string, x['id'], x),
    type: _atd_read_required_field('AnnotationT', 'type', _atd_read_string, x['type'], x),
    motivation: _atd_read_optional_field(_atd_read_string, x['motivation'], x),
    body: _atd_read_optional_field(readAnnotationBodyT, x['body'], x),
    target: _atd_read_optional_field(readAnnotationTargetT, x['target'], x),
    created: _atd_read_optional_field(_atd_read_string, x['created'], x),
    modified: _atd_read_optional_field(_atd_read_string, x['modified'], x),
  };
}

export function writeAnnotationBodyT(x: AnnotationBodyT, context: any = x): any {
  return {
    'id': _atd_write_required_field('AnnotationBodyT', 'id', _atd_write_string, x.id, x),
    'type': _atd_write_required_field('AnnotationBodyT', 'type', _atd_write_string, x.type, x),
    'format': _atd_write_optional_field(_atd_write_string, x.format, x),
    'service': _atd_write_optional_field(_atd_write_array(writeServiceT), x.service, x),
    'height': _atd_write_optional_field(_atd_write_int, x.height, x),
    'width': _atd_write_optional_field(_atd_write_int, x.width, x),
  };
}

export function readAnnotationBodyT(x: any, context: any = x): AnnotationBodyT {
  return {
    id: _atd_read_required_field('AnnotationBodyT', 'id', _atd_read_string, x['id'], x),
    type: _atd_read_required_field('AnnotationBodyT', 'type', _atd_read_string, x['type'], x),
    format: _atd_read_optional_field(_atd_read_string, x['format'], x),
    service: _atd_read_optional_field(_atd_read_array(readServiceT), x['service'], x),
    height: _atd_read_optional_field(_atd_read_int, x['height'], x),
    width: _atd_read_optional_field(_atd_read_int, x['width'], x),
  };
}

export function writeAnnotationTargetT(x: AnnotationTargetT, context: any = x): any {
  return writeW3cAnnotationTargetT(x, context);
}

export function readAnnotationTargetT(x: any, context: any = x): AnnotationTargetT {
  return readW3cAnnotationTargetT(x, context);
}

export function writeW3cAnnotationT(x: W3cAnnotationT, context: any = x): any {
  return {
    'id': _atd_write_required_field('W3cAnnotationT', 'id', _atd_write_string, x.id, x),
    'type': _atd_write_required_field('W3cAnnotationT', 'type', _atd_write_string, x.type, x),
    'motivation': _atd_write_optional_field(_atd_write_string, x.motivation, x),
    'body': _atd_write_optional_field(writeW3cAnnotationBodyT, x.body, x),
    'target': _atd_write_optional_field(writeW3cAnnotationTargetT, x.target, x),
    'created': _atd_write_optional_field(_atd_write_string, x.created, x),
    'modified': _atd_write_optional_field(_atd_write_string, x.modified, x),
  };
}

export function readW3cAnnotationT(x: any, context: any = x): W3cAnnotationT {
  return {
    id: _atd_read_required_field('W3cAnnotationT', 'id', _atd_read_string, x['id'], x),
    type: _atd_read_required_field('W3cAnnotationT', 'type', _atd_read_string, x['type'], x),
    motivation: _atd_read_optional_field(_atd_read_string, x['motivation'], x),
    body: _atd_read_optional_field(readW3cAnnotationBodyT, x['body'], x),
    target: _atd_read_optional_field(readW3cAnnotationTargetT, x['target'], x),
    created: _atd_read_optional_field(_atd_read_string, x['created'], x),
    modified: _atd_read_optional_field(_atd_read_string, x['modified'], x),
  };
}

export function writeW3cAnnotationPageT(x: W3cAnnotationPageT, context: any = x): any {
  return {
    'id': _atd_write_required_field('W3cAnnotationPageT', 'id', _atd_write_string, x.id, x),
    'type': _atd_write_required_field('W3cAnnotationPageT', 'type', _atd_write_string, x.type, x),
    'items': _atd_write_optional_field(_atd_write_array(writeW3cAnnotationT), x.items, x),
  };
}

export function readW3cAnnotationPageT(x: any, context: any = x): W3cAnnotationPageT {
  return {
    id: _atd_read_required_field('W3cAnnotationPageT', 'id', _atd_read_string, x['id'], x),
    type: _atd_read_required_field('W3cAnnotationPageT', 'type', _atd_read_string, x['type'], x),
    items: _atd_read_optional_field(_atd_read_array(readW3cAnnotationT), x['items'], x),
  };
}

export function writeMetadataT(x: MetadataT, context: any = x): any {
  return {
    'label': _atd_write_required_field('MetadataT', 'label', writeLngStringT, x.label, x),
    'value': _atd_write_required_field('MetadataT', 'value', writeLngStringT, x.value, x),
  };
}

export function readMetadataT(x: any, context: any = x): MetadataT {
  return {
    label: _atd_read_required_field('MetadataT', 'label', readLngStringT, x['label'], x),
    value: _atd_read_required_field('MetadataT', 'value', readLngStringT, x['value'], x),
  };
}

export function writeRequiredStatementT(x: RequiredStatementT, context: any = x): any {
  return {
    'label': _atd_write_required_field('RequiredStatementT', 'label', writeLngStringT, x.label, x),
    'value': _atd_write_required_field('RequiredStatementT', 'value', writeLngStringT, x.value, x),
  };
}

export function readRequiredStatementT(x: any, context: any = x): RequiredStatementT {
  return {
    label: _atd_read_required_field('RequiredStatementT', 'label', readLngStringT, x['label'], x),
    value: _atd_read_required_field('RequiredStatementT', 'value', readLngStringT, x['value'], x),
  };
}

export function writeThumbnailT(x: ThumbnailT, context: any = x): any {
  return {
    'id': _atd_write_required_field('ThumbnailT', 'id', _atd_write_string, x.id, x),
    'type': _atd_write_required_field('ThumbnailT', 'type', _atd_write_string, x.type, x),
    'label': _atd_write_optional_field(writeLabelT, x.label, x),
    'format': _atd_write_optional_field(_atd_write_string, x.format, x),
    'width': _atd_write_optional_field(_atd_write_int, x.width, x),
    'height': _atd_write_optional_field(_atd_write_int, x.height, x),
    'service': _atd_write_optional_field(_atd_write_array(writeServiceT), x.service, x),
  };
}

export function readThumbnailT(x: any, context: any = x): ThumbnailT {
  return {
    id: _atd_read_required_field('ThumbnailT', 'id', _atd_read_string, x['id'], x),
    type: _atd_read_required_field('ThumbnailT', 'type', _atd_read_string, x['type'], x),
    label: _atd_read_optional_field(readLabelT, x['label'], x),
    format: _atd_read_optional_field(_atd_read_string, x['format'], x),
    width: _atd_read_optional_field(_atd_read_int, x['width'], x),
    height: _atd_read_optional_field(_atd_read_int, x['height'], x),
    service: _atd_read_optional_field(_atd_read_array(readServiceT), x['service'], x),
  };
}

export function writeServiceT(x: ServiceT, context: any = x): any {
  return {
    'id': _atd_write_optional_field(_atd_write_string, x.id, x),
    'type': _atd_write_optional_field(_atd_write_string, x.type, x),
    '@id': _atd_write_optional_field(_atd_write_string, x.at_id, x),
    '@type': _atd_write_optional_field(_atd_write_string, x.attype, x),
    'profile': _atd_write_optional_field(_atd_write_string, x.profile, x),
    'label': _atd_write_optional_field(writeLabelT, x.label, x),
    'service': _atd_write_optional_field(_atd_write_array(writeServiceT), x.service, x),
  };
}

export function readServiceT(x: any, context: any = x): ServiceT {
  return {
    id: _atd_read_optional_field(_atd_read_string, x['id'], x),
    type: _atd_read_optional_field(_atd_read_string, x['type'], x),
    at_id: _atd_read_optional_field(_atd_read_string, x['@id'], x),
    attype: _atd_read_optional_field(_atd_read_string, x['@type'], x),
    profile: _atd_read_optional_field(_atd_read_string, x['profile'], x),
    label: _atd_read_optional_field(readLabelT, x['label'], x),
    service: _atd_read_optional_field(_atd_read_array(readServiceT), x['service'], x),
  };
}

export function writeLabelT(x: LabelT, context: any = x): any {
  return writeLngStringT(x, context);
}

export function readLabelT(x: any, context: any = x): LabelT {
  return readLngStringT(x, context);
}

export function writeSummaryT(x: SummaryT, context: any = x): any {
  return writeLngStringT(x, context);
}

export function readSummaryT(x: any, context: any = x): SummaryT {
  return readLngStringT(x, context);
}

export function writeLngStringT(x: LngStringT, context: any = x): any {
  return _atd_write_assoc_array_to_object(_atd_write_array(_atd_write_string))(x, context);
}

export function readLngStringT(x: any, context: any = x): LngStringT {
  return _atd_read_assoc_object_into_array(_atd_read_array(_atd_read_string))(x, context);
}

export function writeW3cAnnotationBodyT(x: W3cAnnotationBodyT, context: any = x): any {
  return {
    'type': _atd_write_required_field('W3cAnnotationBodyT', 'type', _atd_write_string, x.type, x),
    'language': _atd_write_required_field('W3cAnnotationBodyT', 'language', _atd_write_string, x.language, x),
    'value': _atd_write_required_field('W3cAnnotationBodyT', 'value', _atd_write_string, x.value, x),
  };
}

export function readW3cAnnotationBodyT(x: any, context: any = x): W3cAnnotationBodyT {
  return {
    type: _atd_read_required_field('W3cAnnotationBodyT', 'type', _atd_read_string, x['type'], x),
    language: _atd_read_required_field('W3cAnnotationBodyT', 'language', _atd_read_string, x['language'], x),
    value: _atd_read_required_field('W3cAnnotationBodyT', 'value', _atd_read_string, x['value'], x),
  };
}

export function _writeW3cAnnotationTargetT(x: W3cAnnotationTargetT, context: any = x): any {
  switch (x.kind) {
    case 'T1':
      return ['T1', writeW3cAnnotationTargetT1(x.value, x)]
    case 'T2':
      return ['T2', writeW3cAnnotationTargetT2(x.value, x)]
  }
}

export function _readW3cAnnotationTargetT(x: any, context: any = x): W3cAnnotationTargetT {
  _atd_check_json_tuple(2, x, context)
  switch (x[0]) {
    case 'T1':
      return { kind: 'T1', value: readW3cAnnotationTargetT1(x[1], x) }
    case 'T2':
      return { kind: 'T2', value: readW3cAnnotationTargetT2(x[1], x) }
    default:
      _atd_bad_json('W3cAnnotationTargetT', x, context)
      throw new Error('impossible')
  }
}

export function writeW3cAnnotationTargetT1(x: W3cAnnotationTargetT1, context: any = x): any {
  return _atd_write_string(x, context);
}

export function readW3cAnnotationTargetT1(x: any, context: any = x): W3cAnnotationTargetT1 {
  return _atd_read_string(x, context);
}

export function writeW3cAnnotationTargetT2(x: W3cAnnotationTargetT2, context: any = x): any {
  return {
    'type': _atd_write_required_field('W3cAnnotationTargetT2', 'type', _atd_write_string, x.type, x),
    'source': _atd_write_required_field('W3cAnnotationTargetT2', 'source', _atd_write_string, x.source, x),
  };
}

export function readW3cAnnotationTargetT2(x: any, context: any = x): W3cAnnotationTargetT2 {
  return {
    type: _atd_read_required_field('W3cAnnotationTargetT2', 'type', _atd_read_string, x['type'], x),
    source: _atd_read_required_field('W3cAnnotationTargetT2', 'source', _atd_read_string, x['source'], x),
  };
}


/////////////////////////////////////////////////////////////////////
// Runtime library
/////////////////////////////////////////////////////////////////////

export type Option<T> = null | { value: T }

function _atd_missing_json_field(type_name: string, json_field_name: string) {
    throw new Error(`missing field '${json_field_name}'` +
                    ` in JSON object of type '${type_name}'`)
}

function _atd_missing_ts_field(type_name: string, ts_field_name: string) {
    throw new Error(`missing field '${ts_field_name}'` +
                    ` in TypeScript object of type '${type_name}'`)
}

function _atd_bad_json(expectedtype: string, json_value: any, context: any) {
  let value_str = JSON.stringify(json_value)
  if (value_str.length > 200)
    value_str = value_str.substring(0, 200) + '…';

  throw new Error(`incompatible JSON value where` +
                  ` type '${expectedtype}' was expected: '${value_str}'.` +
                  ` Occurs in '${JSON.stringify(context)}'.`)
}

function _atd_bad_ts(expectedtype: string, ts_value: any, context: any) {
  let value_str = JSON.stringify(ts_value)
  if (value_str.length > 200)
    value_str = value_str.substring(0, 200) + '…';

  throw new Error(`incompatible TypeScript value where` +
                  ` type '${expectedtype}' was expected: '${value_str}'.` +
                  ` Occurs in '${JSON.stringify(context)}'.`)
}

function _atd_check_json_tuple(len: number /*int*/, x: any, context: any) {
  if (! Array.isArray(x) || x.length !== len)
    _atd_bad_json('tuple of length ' + len, x, context);
}

function _atd_read_unit(x: any, context: any): null {
  if (x === null)
    return null
  else {
    _atd_bad_json('null', x, context)
    throw new Error('impossible')
  }
}

function _atd_read_bool(x: any, context: any): boolean {
  if (typeof x === 'boolean')
    return x
  else {
    _atd_bad_json('boolean', x, context)
    throw new Error('impossible')
  }
}

function _atd_read_int(x: any, context: any): number /*int*/ {
  if (Number.isInteger(x))
    return x
  else {
    _atd_bad_json('integer', x, context)
    throw new Error('impossible')
  }
}

function _atd_read_float(x: any, context: any): number {
  if (isFinite(x))
    return x
  else {
    _atd_bad_json('number', x, context)
    throw new Error('impossible')
  }
}

function _atd_read_string(x: any, context: any): string {
  if (typeof x === 'string')
    return x
  else {
    _atd_bad_json('string', x, context)
    throw new Error('impossible')
  }
}

function _atd_read_required_field<T>(type_name: string,
                                     field_name: string,
                                     read_elt: (x: any, context: any) => T,
                                     x: any,
                                     context: any): T {
  if (x === undefined) {
    _atd_missing_json_field(type_name, field_name)
    throw new Error('impossible')
  }
  else
    return read_elt(x, context)
}

function _atd_read_optional_field<T>(read_elt: (x: any, context: any) => T,
                                     x: any,
                                     context: any): T {
  if (x === undefined || x === null)
    return x
  else
    return read_elt(x, context)
}

function _atd_read_field_with_default<T>(read_elt: (x: any, context: any) => T,
                                         default_: T,
                                         x: any,
                                         context: any): T {
  if (x === undefined || x === null)
    return default_
  else
    return read_elt(x, context)
}

function _atd_read_option<T>(read_elt: (x: any, context: any) => T):
  (x: any, context: any) => Option<T> {
  function read_option(x: any, context: any): Option<T> {
    if (x === 'None')
      return null
    else {
      _atd_check_json_tuple(2, x, context);
      switch (x[0]) {
        case 'Some':
          return { value: read_elt(x[1], context) }
        default:
          _atd_bad_json('option', x, context)
          throw new Error('impossible')
      }
    }
  }
  return read_option
}

function _atd_read_nullable<T>(read_elt: (x: any, context: any) => T):
  (x: any, context: any) => T | null {
  function read_nullable(x: any, context: any): T | null {
    if (x === null)
      return null
    else
      return read_elt(x, context)
  }
  return read_nullable
}

function _atd_read_array<T>(read_elt: (x: any, context: any) => T):
  (elts: any, context: any) => T[] {
  function read_array(elts: any, context: any): T[] {
    if (Array.isArray(elts))
      return elts.map((x) => read_elt(x, elts))
    else {
      _atd_bad_json('array', elts, context)
      throw new Error('impossible')
    }
  }
  return read_array
}

function _atd_read_assoc_array_into_map<K, V>(
    read_key: (key: any, context: any) => K,
    read_value: (value: any, context: any) => V
  ): (x: any, context: any) => Map<K, V> {
  function read_assoc(elts: any, context: any): Map<K, V> {
    if (Array.isArray(elts)) {
      const res = new Map<K, V>([])
      for (const x of elts) {
        if (Array.isArray(x) && x.length === 2)
          res.set(read_key(x[0], x), read_value(x[1], x))
        else {
          _atd_bad_json('pair', x, elts)
          throw new Error('impossible')
        }
      }
      return res
    }
    else {
      _atd_bad_json('array', elts, context)
      throw new Error('impossible')
    }
  }
  return read_assoc
}

function _atd_read_assoc_object_into_map<T>(
    read_value: (value: any, context: any) => T
  ): (x: any, context: any) => Map<string, T> {
  function read_assoc(elts: any, context: any): Map<string, T> {
    if (typeof elts === 'object') {
      const res = new Map<string, T>([])
      for (const [key, value] of Object.entries(elts))
        res.set(key, read_value(value, elts))
      return res
    }
    else {
      _atd_bad_json('object', elts, context)
      throw new Error('impossible')
    }
  }
  return read_assoc
}

function _atd_read_assoc_object_into_array<T>(
    read_value: (value: any, context: any) => T
  ): (x: any, context: any) => [string, T][] {
  function read_assoc(elts: any, context: any): [string, T][] {
    if (typeof elts === 'object') {
      const res: [string, T][] = []
      for (const [key, value] of Object.entries(elts))
        res.push([key, read_value(value, elts)])
      return res
    }
    else {
      _atd_bad_json('object', elts, context)
      throw new Error('impossible')
    }
  }
  return read_assoc
}

function _atd_write_unit(x: any, context: any) {
  if (x === null)
    return x
  else {
    _atd_bad_ts('null', x, context)
    throw new Error('impossible')
  }
}

function _atd_write_bool(x: any, context: any): boolean {
  if (typeof x === 'boolean')
    return x
  else {
    _atd_bad_ts('boolean', x, context)
    throw new Error('impossible')
  }
}

function _atd_write_int(x: any, context: any): number /*int*/ {
  if (Number.isInteger(x))
    return x
  else {
    _atd_bad_ts('integer', x, context)
    throw new Error('impossible')
  }
}

function _atd_write_float(x: any, context: any): number {
  if (isFinite(x))
    return x
  else {
    _atd_bad_ts('number', x, context)
    throw new Error('impossible')
  }
}

function _atd_write_string(x: any, context: any): string {
  if (typeof x === 'string')
    return x
  else {
    _atd_bad_ts('string', x, context)
    throw new Error('impossible')
  }
}

function _atd_write_option<T>(write_elt: (x: T, context: any) => any):
   (elts: Option<T>, context: any) => any {
  function write_option(x: Option<T>, context: any): any {
    if (x === null)
      return 'None'
    else
      return ['Some', write_elt(x.value, context)]
  }
  return write_option
}

function _atd_write_nullable<T>(write_elt: (x: T, context: any) => any):
  (x: T | null, context: any) => any {
  function write_option(x: T | null, context: any): any {
    if (x === null)
      return null
    else
      return write_elt(x, context)
  }
  return write_option
}

function _atd_write_array<T>(write_elt: (elt: T, context: any) => any):
  (elts: T[], context: any) => any {
  return ((elts: T[], context: any): any =>
    elts.map((x) => write_elt(x, elts))
  )
}

function _atd_write_assoc_map_to_array<K, V>(
    write_key: (key: K, context: any) => any,
    write_value: (value: V, context: any) => any
  ): (elts: Map<K, V>, context: any) => any {
  function write_assoc(elts: Map<K, V>, context: any): any {
    const res: any = []
    elts.forEach((value: V, key: K) =>
      res.push([write_key(key, elts), write_value(value, elts)])
    )
    return res
  }
  return write_assoc
}

function _atd_write_assoc_map_to_object<T>(
    write_value: (value: T, context: any) => any
  ): (elts: Map<string, T>, context: any) => any {
  function write_assoc(elts: Map<string, T>, context: any): any {
    const res: any = {}
    elts.forEach((value: T, key: string) =>
      res[key] = write_value(value, elts)
    )
    return res
  }
  return write_assoc
}

function _atd_write_assoc_array_to_object<T>(
    write_value: (value: T, context: any) => any
  ): (elts: [string, T][], context: any) => any {
  function write_assoc(elts: [string, T][], context: any): any {
    const res: any = {}
    for (const [key, value] of elts)
      res[key] = write_value(value, elts)
    return res
  }
  return write_assoc
}

function _atd_write_required_field<T>(type_name: string,
                                      field_name: string,
                                      write_elt: (x: T, context: any) => any,
                                      x: T,
                                      context: any): any {
  if (x === undefined) {
    _atd_missing_ts_field(type_name, field_name)
    throw new Error('impossible')
  }
  else
    return write_elt(x, context)
}

function _atd_write_optional_field<T>(write_elt: (x: T, context: any) => any,
                                      x: T | undefined,
                                      context: any): any {
  if (x === undefined || x === null)
    return x
  else
    return write_elt(x, context)
}

function _atd_write_field_with_default<T>(
  write_elt: (x: T, context: any) => any,
  default_: T,
  x: T,
  context: any
): T {
  const value = (x === undefined || x === null) ? default_ : x
  return write_elt(value, context)
}

///// appended to specification.ts

import { normalize_target,normalize_specification,restore_target, restore_specification } from "./adapter";

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
