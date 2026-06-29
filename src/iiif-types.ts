/**
 * User-facing TypeScript types for the IIIF Presentation 3.0 API.
 *
 * AUTO-GENERATED — do not edit by hand.
 * Regenerate with:  npx ts-node scripts/generate-iiif-types.ts
 *
 * These types reflect real IIIF JSON structure and are intended for
 * consumers of the maniiifest library who want type annotations in
 * their own code without needing to understand the internal ATD
 * discriminated-union representation.
 */

export type Specification = Manifest | Collection;

export interface Collection {
  "@context"?: Context;
  id: Id;
  type: Type;
  label: Label;
  metadata?: Metadata[];
  summary?: Summary;
  requiredStatement?: RequiredStatement;
  thumbnail?: Thumbnail[];
  rendering?: Rendering[];
  rights?: Rights;
  seeAlso?: SeeAlso[];
  homepage?: Homepage[];
  provider?: Provider[];
  navDate?: NavDate;
  behavior?: Behavior[];
  partOf?: PartOf[];
  service?: Service;
  services?: Service;
  placeholderCanvas?: PlaceholderCanvas;
  accompanyingCanvas?: AccompanyingCanvas;
  navPlace?: NavPlace;
  items?: Specification[];
}

export interface Manifest {
  "@context"?: Context;
  id: Id;
  type: Type;
  label: Label;
  metadata?: Metadata[];
  service?: Service;
  services?: Service;
  requiredStatement?: RequiredStatement;
  summary?: Summary;
  thumbnail?: Thumbnail[];
  rendering?: Rendering[];
  viewingDirection?: ViewingDirection;
  behavior?: Behavior[];
  navDate?: NavDate;
  navPlace?: NavPlace;
  rights?: Rights;
  seeAlso?: SeeAlso[];
  homepage?: Homepage[];
  provider?: Provider[];
  partOf?: PartOf[];
  start?: Start;
  items?: Canvas[];
  structures?: Range[];
  annotations?: AnnotationPage[];
}

export type Context = string | string[];

export interface Class {
  id: Id;
  type: Type;
  label?: Label;
}

export interface CanvasCore {
  id: Id;
  type: Type;
  label?: Label;
  height?: Height;
  width?: Width;
  duration?: Duration;
  metadata?: Metadata[];
  summary?: Summary;
  requiredStatement?: RequiredStatement;
  rendering?: Rendering[];
  rights?: Rights;
  navDate?: NavDate;
  navPlace?: NavPlace;
  provider?: Provider[];
  seeAlso?: SeeAlso[];
  service?: Service;
  thumbnail?: Thumbnail[];
  homepage?: Homepage[];
  behavior?: Behavior[];
  partOf?: PartOf[];
  items?: AnnotationPage[];
  annotations?: AnnotationPage[];
}

export interface Canvas {
  id: Id;
  type: Type;
  label?: Label;
  height?: Height;
  width?: Width;
  duration?: Duration;
  metadata?: Metadata[];
  summary?: Summary;
  requiredStatement?: RequiredStatement;
  rendering?: Rendering[];
  rights?: Rights;
  navDate?: NavDate;
  navPlace?: NavPlace;
  provider?: Provider[];
  seeAlso?: SeeAlso[];
  service?: Service;
  thumbnail?: Thumbnail[];
  homepage?: Homepage[];
  behavior?: Behavior[];
  partOf?: PartOf[];
  items?: AnnotationPage[];
  annotations?: AnnotationPage[];
  placeholderCanvas?: PlaceholderCanvas;
  accompanyingCanvas?: AccompanyingCanvas;
}

export interface PlaceholderCanvas {
  id: Id;
  type: Type;
  label?: Label;
  height?: Height;
  width?: Width;
  duration?: Duration;
  metadata?: Metadata[];
  summary?: Summary;
  requiredStatement?: RequiredStatement;
  rendering?: Rendering[];
  rights?: Rights;
  navDate?: NavDate;
  navPlace?: NavPlace;
  provider?: Provider[];
  seeAlso?: SeeAlso[];
  service?: Service;
  thumbnail?: Thumbnail[];
  homepage?: Homepage[];
  behavior?: Behavior[];
  partOf?: PartOf[];
  items?: AnnotationPage[];
  annotations?: AnnotationPage[];
}

export interface AccompanyingCanvas {
  id: Id;
  type: Type;
  label?: Label;
  height?: Height;
  width?: Width;
  duration?: Duration;
  metadata?: Metadata[];
  summary?: Summary;
  requiredStatement?: RequiredStatement;
  rendering?: Rendering[];
  rights?: Rights;
  navDate?: NavDate;
  navPlace?: NavPlace;
  provider?: Provider[];
  seeAlso?: SeeAlso[];
  service?: Service;
  thumbnail?: Thumbnail[];
  homepage?: Homepage[];
  behavior?: Behavior[];
  partOf?: PartOf[];
  items?: AnnotationPage[];
  annotations?: AnnotationPage[];
}

export interface NavPlace {
  id?: Id;
  type: Type;
  features?: Feature[];
}

export interface FeatureCollection {
  id?: Id;
  type: Type;
  features?: Feature[];
  transformation?: Record<string, any>;
}

export type Transformation = Record<string, any>;

export interface Feature {
  id?: Id;
  type?: Type;
  properties?: Record<string, any>;
  geometry?: Geometry;
}

export type Properties = Record<string, any>;

export type Json = any;

export type Geometries = GeometryPoint | GeometryMultiPoint | GeometryLineString | GeometryMultiLineString | GeometryPolygon | GeometryMultiPolygon;

export type Geometry = GeometryPoint | GeometryMultiPoint | GeometryLineString | GeometryMultiLineString | GeometryPolygon | GeometryMultiPolygon | GeometryCollection;

export interface GeometryPoint {
  type?: Type;
  coordinates?: PointCoordinates[];
}

export interface GeometryMultiPoint {
  type?: Type;
  coordinates?: MultiPointCoordinates[];
}

export interface GeometryLineString {
  type?: Type;
  coordinates?: LinestringCoordinates[];
}

export interface GeometryMultiLineString {
  type?: Type;
  coordinates?: MultiLinestringCoordinates[];
}

export interface GeometryPolygon {
  type?: Type;
  coordinates?: Polygon[];
}

export interface GeometryMultiPolygon {
  type?: Type;
  coordinates?: MultiPolygon[];
}

export interface GeometryCollection {
  type?: Type;
  geometries: Geometries[];
}

export type PointCoordinates = number;

export type MultiPointCoordinates = [number, number];

export type LinestringCoordinates = number[];

export type MultiLinestringCoordinates = number[][];

export type Polygon = [number, number][];

export type MultiPolygon = [number, number][][];

export interface AnnotationPage {
  "@context"?: Context;
  id?: Id;
  type: Type;
  label?: Label;
  partOf?: PartOf;
  next?: Next;
  startIndex?: StartIndex;
  rendering?: Rendering[];
  service?: Service;
  thumbnail?: Thumbnail[];
  items?: Annotation[];
}

export interface Annotation {
  "@context"?: Context;
  id: Id;
  type: Type;
  service?: Service;
  thumbnail?: Thumbnail[];
  rendering?: Rendering[];
  motivation?: Motivation;
  created?: Created;
  creator?: Creator;
  generator?: Generator;
  modified?: Modified;
  body?: Body;
  target?: Target;
}

export type Creator = CreatorItem | CreatorItem[];

export type CreatorItem = string | CreatorItemObject;

export interface CreatorItemObject {
  id?: Id;
  type?: Type;
  name?: Name;
  nickname?: Nickname;
  email?: EmailStrings;
  email_sha1?: EmailSha1Strings;
  homepage?: HomepageStrings;
}

export type Generator = GeneratorItem | GeneratorItem[];

export type GeneratorItem = string | GeneratorItemObject;

export interface GeneratorItemObject {
  id?: Id;
  type?: Type;
  name?: Name;
  nickname?: Nickname;
  email?: EmailStrings;
  email_sha1?: EmailSha1Strings;
  homepage?: HomepageStrings;
}

export interface Agent {
  id?: Id;
  type?: Type;
  name?: Name;
  nickname?: Nickname;
  email?: EmailStrings;
  email_sha1?: EmailSha1Strings;
  homepage?: HomepageStrings;
}

export type EmailStrings = Strings;

export type EmailSha1Strings = Strings;

export type HomepageStrings = Strings;

export type Body = AnnotationBody | AnnotationBody[];

export type AnnotationBodyItems = string | AnnotationBodyResource | AnnotationBodySpecificResource | AnnotationBodyTextualBody | AnnotationBodyFeature | AnnotationBodyFeatureCollection | AnnotationBodyUntyped;

export type AnnotationBody = string | AnnotationBodyResource | AnnotationBodySpecificResource | AnnotationBodyTextualBody | AnnotationBodyFeature | AnnotationBodyFeatureCollection | AnnotationBodyUntyped | AnnotationBodyChoice;

export interface AnnotationBodyUntyped {
  id?: Id;
  label?: Label;
  format?: Format;
  profile?: Profile;
  language?: Language;
  value?: Value;
}

export interface AnnotationBodyResource {
  id: Id;
  type: Type;
  label?: Label;
  format?: Format;
  profile?: Profile;
  width?: Width;
  height?: Height;
  duration?: Duration;
  language?: Language;
  rendering?: Rendering[];
  thumbnail?: Thumbnail[];
  service?: Service;
  annotations?: AnnotationPage[];
}

export interface AnnotationBodySpecificResource {
  id?: Id;
  type?: Type;
  format?: Format;
  accessibility?: Accessibility;
  source: Source;
  selector?: Selector;
  language?: Language;
}

export interface AnnotationBodyTextualBody {
  type: Type;
  language?: Language;
  format?: Format;
  value?: Value;
  creator?: Creator;
  generator?: Generator;
}

export interface AnnotationBodyFeature {
  id?: Id;
  type?: Type;
  properties?: Record<string, any>;
  geometry?: Geometry;
}

export interface AnnotationBodyFeatureCollection {
  id?: Id;
  type: Type;
  features?: Feature[];
  transformation?: Record<string, any>;
}

export interface AnnotationBodyChoice {
  type?: Type;
  items: AnnotationBodyItems[];
}

export type Target = AnnotationTarget | AnnotationTarget[];

export type AnnotationTarget = string | AnnotationTargetSelectorTarget | SpecificResource | AnnotationTargetCanvasRef | AnnotationTargetFeature | AnnotationTargetFeatureCollection;

export interface AnnotationTargetFeature {
  id?: Id;
  type?: Type;
  properties?: Record<string, any>;
  geometry?: Geometry;
}

export interface AnnotationTargetFeatureCollection {
  id?: Id;
  type: Type;
  features?: Feature[];
  transformation?: Record<string, any>;
}

export interface AnnotationTargetSelectorTarget {
  source: Id;
  scope: Id;
  language?: Language;
}

export interface AnnotationTargetCanvasRef {
  id: Id;
  partOf?: PartOf;
  language?: Language;
}

export interface SpecificResource {
  id?: Id;
  type?: Type;
  format?: Format;
  accessibility?: Accessibility;
  source: Source;
  selector?: Selector;
  language?: Language;
}

export type Source = Id | Class;

export type Selector = ResourceSelector | ResourceSelector[];

export type ResourceSelector = string | ResourceSelectorPoint | ResourceSelectorFragment | ResourceSelectorSvg | ResourceSelectorImageApi | ResourceSelectorTextQuote | ResourceSelectorXpath;

export interface ResourceSelectorPoint {
  type: Type;
  t?: Duration;
  x?: Dimension;
  y?: Dimension;
}

export interface ResourceSelectorFragment {
  type: Type;
  conformsTo?: ConformsTo;
  value: Value;
}

export type ConformsTo = string;

export interface ResourceSelectorSvg {
  type: Type;
  value: Value;
}

export interface ResourceSelectorImageApi {
  type: Type;
  region?: Region;
  size?: Size;
  rotation?: Rotation;
  quality?: Quality;
  format?: Format;
}

export interface ResourceSelectorTextQuote {
  type: Type;
  prefix?: Prefix;
  exact: Exact;
  suffix?: Suffix;
}

export interface ResourceSelectorXpath {
  type: Type;
  value: Value;
}

export interface Metadata {
  label: Record<string, string[]>;
  value: Record<string, string[]>;
}

export interface RequiredStatement {
  label: Record<string, string[]>;
  value: Record<string, string[]>;
}

export type Thumbnail = Resource;

export type Logo = Resource;

export interface Resource {
  id: Id;
  type: Type;
  label?: Label;
  format?: Format;
  profile?: Profile;
  width?: Width;
  height?: Height;
  duration?: Duration;
  language?: Language;
  rendering?: Rendering[];
  thumbnail?: Thumbnail[];
  service?: Service;
  annotations?: AnnotationPage[];
}

export type Service = ServiceItem | ServiceItem[];

export type ServiceItem = ServiceItemModern | ServiceItemLegacy;

export interface ServiceItemModern {
  id: Id;
  type: Type;
  label?: Label;
  profile?: Profile;
  service?: Service;
}

export interface ServiceItemLegacy {
  "@id": Id;
  "@type": Type;
  label?: Label;
  profile?: Profile;
  service?: Service;
}

export type Label = string | Record<string, string[]>;

export type Summary = Record<string, string[]>;

export type LngString = Record<string, string[]>;

export type Language = string | string[];

export interface External {
  id: Id;
  type: Type;
  label?: Label;
  format?: Format;
  profile?: Profile;
}

export type SeeAlso = External;

export type Rendering = External;

export interface Homepage {
  id: Id;
  type: Type;
  label?: Label;
  format?: Format;
  language?: Language[];
}

export interface Provider {
  id: Id;
  type: Type;
  label?: Label;
  homepage?: Homepage[];
  logo?: Logo[];
  seeAlso?: SeeAlso[];
}

export type PartOf = string | PartOfObject;

export interface PartOfObject {
  id: Id;
  type?: Type;
  label?: Label;
  total?: Total;
}

export type Start = Class;

export type Motivation = string | string[];

export interface AnnotationCollection {
  "@context"?: Context;
  id: Id;
  type: Type;
  label?: Label;
  rendering?: Rendering[];
  partOf?: PartOf;
  total?: Total;
  first?: First;
  last?: Last;
  service?: Service;
  thumbnail?: Thumbnail[];
  items?: Annotation[];
}

export type First = string | FirstObject;

export interface FirstObject {
  id: Id;
  type: Type;
  label?: Label;
  startIndex?: StartIndex;
  thumbnail?: Thumbnail[];
  next?: Next;
  items?: Annotation[];
}

export interface Range {
  id: Id;
  type: Type;
  label?: Label;
  rendering?: Rendering[];
  supplementary?: AnnotationCollection;
  service?: Service;
  placeholderCanvas?: PlaceholderCanvas;
  accompanyingCanvas?: AccompanyingCanvas;
  annotations?: AnnotationPage[];
  thumbnail?: Thumbnail[];
  navPlace?: NavPlace;
  behavior?: Behavior[];
  items: RangeItems[];
}

export type RangeItems = SpecificResource | Canvas | Range;

export type Strings = string | string[];

export type Id = string;

export type Type = string;

export type Height = number;

export type Width = number;

export type Duration = number;

export type Created = string;

export type Modified = string;

export type Format = string;

export type Profile = string;

export type ViewingDirection = string;

export type Behavior = string;

export type NavDate = string;

export type Rights = string;

export type Value = string;

export type Accessibility = string;

export type Dimension = number;

export type Pattern = string;

export type Default = string;

export type Region = string;

export type Size = string;

export type Quality = string;

export type Rotation = string;

export type Total = number;

export type Last = string;

export type Next = string;

export type StartIndex = number;

export type Name = string;

export type Nickname = string;

export type Prefix = string;

export type Exact = string;

export type Suffix = string;
