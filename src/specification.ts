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

export type Specification = {
  id?: string;
  t: string;
  motivation: string;
  body: BodyT;
  target: TargetT;
  created?: string;
  modified?: string;
}

export type BodyT = {
  t: string;
  language: string;
  format: string;
  value: string;
}

export type TargetT =
  | { kind: 'T1'; value: TargetTSimple }
  | { kind: 'T2'; value: TargetTComplex }

export type TargetTSimple = string

export type TargetTComplex = {
  t: string;
  source: string;
}

export function writeSpecification(x: Specification, context: any = x): any {
  return {
    'id': _atd_write_optional_field(_atd_write_string, x.id, x),
    'type': _atd_write_required_field('Specification', 't', _atd_write_string, x.t, x),
    'motivation': _atd_write_required_field('Specification', 'motivation', _atd_write_string, x.motivation, x),
    'body': _atd_write_required_field('Specification', 'body', writeBodyT, x.body, x),
    'target': _atd_write_required_field('Specification', 'target', writeTargetT, x.target, x),
    'created': _atd_write_optional_field(_atd_write_string, x.created, x),
    'modified': _atd_write_optional_field(_atd_write_string, x.modified, x),
  };
}

export function readSpecification(x: any, context: any = x): Specification {
  return {
    id: _atd_read_optional_field(_atd_read_string, x['id'], x),
    t: _atd_read_required_field('Specification', 'type', _atd_read_string, x['type'], x),
    motivation: _atd_read_required_field('Specification', 'motivation', _atd_read_string, x['motivation'], x),
    body: _atd_read_required_field('Specification', 'body', readBodyT, x['body'], x),
    target: _atd_read_required_field('Specification', 'target', readTargetT, x['target'], x),
    created: _atd_read_optional_field(_atd_read_string, x['created'], x),
    modified: _atd_read_optional_field(_atd_read_string, x['modified'], x),
  };
}

export function writeBodyT(x: BodyT, context: any = x): any {
  return {
    'type': _atd_write_required_field('BodyT', 't', _atd_write_string, x.t, x),
    'language': _atd_write_required_field('BodyT', 'language', _atd_write_string, x.language, x),
    'format': _atd_write_required_field('BodyT', 'format', _atd_write_string, x.format, x),
    'value': _atd_write_required_field('BodyT', 'value', _atd_write_string, x.value, x),
  };
}

export function readBodyT(x: any, context: any = x): BodyT {
  return {
    t: _atd_read_required_field('BodyT', 'type', _atd_read_string, x['type'], x),
    language: _atd_read_required_field('BodyT', 'language', _atd_read_string, x['language'], x),
    format: _atd_read_required_field('BodyT', 'format', _atd_read_string, x['format'], x),
    value: _atd_read_required_field('BodyT', 'value', _atd_read_string, x['value'], x),
  };
}

export function restore<T, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
  const result = fn(x, context);
  return result[1];
}

function _writeTargetT(x: TargetT, context: any = x): any {
  switch (x.kind) {
    case 'T1':
      return ['T1', writeTargetTSimple(x.value, x)]
    case 'T2':
      return ['T2', writeTargetTComplex(x.value, x)]
  }
}

export function writeTargetT(x: any, context: any = x): TargetT {
  return restore(x, context, _writeTargetT);
}


export function normalize<T, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
  if (typeof (x) === 'string') {
    return fn(['T1', x], context);
  } else if (typeof (x) === 'object') {
    return fn(['T2', x], context);
  } else {
    throw new Error('Input type did not match expected types.');
  }
}

function _readTargetT(x: any, context: any = x): TargetT {
  _atd_check_json_tuple(2, x, context)
  switch (x[0]) {
    case 'T1':
      return { kind: 'T1', value: readTargetTSimple(x[1], x) }
    case 'T2':
      return { kind: 'T2', value: readTargetTComplex(x[1], x) }
    default:
      _atd_bad_json('TargetT', x, context)
      throw new Error('impossible')
  }
}


export function readTargetT(x: any, context: any = x): TargetT {
  return normalize(x, context, _readTargetT);
}

export function writeTargetTSimple(x: TargetTSimple, context: any = x): any {
  return _atd_write_string(x, context);
}

export function readTargetTSimple(x: any, context: any = x): TargetTSimple {
  return _atd_read_string(x, context);
}

export function writeTargetTComplex(x: TargetTComplex, context: any = x): any {
  return {
    'type': _atd_write_required_field('TargetTComplex', 't', _atd_write_string, x.t, x),
    'source': _atd_write_required_field('TargetTComplex', 'source', _atd_write_string, x.source, x),
  };
}

export function readTargetTComplex(x: any, context: any = x): TargetTComplex {
  return {
    t: _atd_read_required_field('TargetTComplex', 'type', _atd_read_string, x['type'], x),
    source: _atd_read_required_field('TargetTComplex', 'source', _atd_read_string, x['source'], x),
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

function _atd_bad_json(expected_type: string, json_value: any, context: any) {
  let value_str = JSON.stringify(json_value)
  if (value_str.length > 200)
    value_str = value_str.substring(0, 200) + '…';

  throw new Error(`incompatible JSON value where` +
    ` type '${expected_type}' was expected: '${value_str}'.` +
    ` Occurs in '${JSON.stringify(context)}'.`)
}

function _atd_bad_ts(expected_type: string, ts_value: any, context: any) {
  let value_str = JSON.stringify(ts_value)
  if (value_str.length > 200)
    value_str = value_str.substring(0, 200) + '…';

  throw new Error(`incompatible TypeScript value where` +
    ` type '${expected_type}' was expected: '${value_str}'.` +
    ` Occurs in '${JSON.stringify(context)}'.`)
}

function _atd_check_json_tuple(len: number /*int*/, x: any, context: any) {
  if (!Array.isArray(x) || x.length !== len)
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

