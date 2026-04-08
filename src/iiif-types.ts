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

/** @atd specification_t */
export type Specification = Manifest | Collection;

/** @atd collection_t */
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

/** @atd manifest_t */
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

/** @atd context_t */
export type Context = string | string[];

/** @atd class_t */
export interface Class {
  id: Id;
  type: Type;
  label?: Label;
}

/** @atd canvas_core_t */
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

/** @atd canvas_t */
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

/** @atd placeholder_canvas_t */
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

/** @atd accompanying_canvas_t */
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

/** @atd nav_place_t */
export interface NavPlace {
  id?: Id;
  type: Type;
  features?: Feature[];
}

/** @atd feature_collection_t */
export interface FeatureCollection {
  id?: Id;
  type: Type;
  features?: Feature[];
  transformation?: Transformation;
}

/** @atd transformation_t */
export interface Transformation {
  type?: Type;
  options?: Options;
}

/** @atd options_t */
export interface Options {
  order?: Order;
}

/** @atd order_t */
export type Order = number;

/** @atd feature_t */
export interface Feature {
  id?: Id;
  type?: Type;
  properties?: Properties;
  geometry?: Geometry;
}

/** @atd properties_t */
export interface Properties {
  label?: Label;
}

/** @atd geometries_t */
export type Geometries = GeometryT1 | GeometryT2 | GeometryT3 | GeometryT4 | GeometryT5 | GeometryT6;

/** @atd geometry_t */
export type Geometry = GeometryT1 | GeometryT2 | GeometryT3 | GeometryT4 | GeometryT5 | GeometryT6 | GeometryT7;

/** @atd geometry_t1 */
export interface GeometryT1 {
  type?: Type;
  coordinates?: PointCoordinates[];
}

/** @atd geometry_t2 */
export interface GeometryT2 {
  type?: Type;
  coordinates?: MultiPointCoordinates[];
}

/** @atd geometry_t3 */
export interface GeometryT3 {
  type?: Type;
  coordinates?: LinestringCoordinates[];
}

/** @atd geometry_t4 */
export interface GeometryT4 {
  type?: Type;
  coordinates?: MultiLinestringCoordinates[];
}

/** @atd geometry_t5 */
export interface GeometryT5 {
  type?: Type;
  coordinates?: Polygon[];
}

/** @atd geometry_t6 */
export interface GeometryT6 {
  type?: Type;
  coordinates?: MultiPolygon[];
}

/** @atd geometry_t7 */
export interface GeometryT7 {
  type?: Type;
  geometries: Geometries[];
}

/** @atd point_coordinates_t */
export type PointCoordinates = number;

/** @atd multi_point_coordinates_t */
export type MultiPointCoordinates = [number, number];

/** @atd linestring_coordinates_t */
export type LinestringCoordinates = number[];

/** @atd multi_linestring_coordinates_t */
export type MultiLinestringCoordinates = number[][];

/** @atd polygon_t */
export type Polygon = [number, number][];

/** @atd multi_polygon_t */
export type MultiPolygon = [number, number][][];

/** @atd annotation_page_t */
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

/** @atd annotation_t */
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
  modified?: Modified;
  body?: Body;
  target?: Target;
}

/** @atd creator_t */
export type Creator = CreatorItem | CreatorItem[];

/** @atd creator_item_t */
export type CreatorItem = string | CreatorObject;

/** @atd creator_item_t2 */
export interface CreatorObject {
  id?: Id;
  type?: Type;
  name?: Name;
  nickname?: Nickname;
  email?: EmailStrings;
  email_sha1?: EmailSha1Strings;
  homepage?: HomepageStrings;
}

/** @atd email_strings_t */
export type EmailStrings = Strings;

/** @atd email_sha1_strings_t */
export type EmailSha1Strings = Strings;

/** @atd homepage_strings_t */
export type HomepageStrings = Strings;

/** @atd body_t */
export type Body = AnnotationBody | AnnotationBody[];

/** @atd annotation_body_items_t */
export type AnnotationBodyItems = AnnotationBodyT0 | string | AnnotationBodyT2 | AnnotationBodyT3 | AnnotationBodyT4 | AnnotationBodyT5 | AnnotationBodyT6;

/** @atd annotation_body_t */
export type AnnotationBody = AnnotationBodyT0 | string | AnnotationBodyT2 | AnnotationBodyT3 | AnnotationBodyT4 | AnnotationBodyT5 | AnnotationBodyT6 | AnnotationBodyT7;

/** @atd annotation_body_t0 */
export interface AnnotationBodyT0 {
  id?: Id;
  label?: Label;
  format?: Format;
  profile?: Profile;
  language?: Language;
  value?: Value;
}

/** @atd annotation_body_t2 */
export interface AnnotationBodyT2 {
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

/** @atd annotation_body_t3 */
export interface AnnotationBodyT3 {
  id?: Id;
  type?: Type;
  format?: Format;
  accessibility?: Accessibility;
  source: Source;
  selector?: Selector;
  language?: Language;
}

/** @atd annotation_body_t4 */
export interface AnnotationBodyT4 {
  type: Type;
  language?: Language;
  format?: Format;
  value?: Value;
  creator?: Creator;
}

/** @atd annotation_body_t5 */
export interface AnnotationBodyT5 {
  id?: Id;
  type?: Type;
  properties?: Properties;
  geometry?: Geometry;
}

/** @atd annotation_body_t6 */
export interface AnnotationBodyT6 {
  id?: Id;
  type: Type;
  features?: Feature[];
  transformation?: Transformation;
}

/** @atd annotation_body_t7 */
export interface AnnotationBodyT7 {
  type?: Type;
  items: AnnotationBodyItems[];
}

/** @atd target_t */
export type Target = AnnotationTarget | AnnotationTarget[];

/** @atd annotation_target_t */
export type AnnotationTarget = string | AnnotationTargetT2 | SpecificResource | AnnotationTargetT4;

/** @atd annotation_target_t2 */
export interface AnnotationTargetT2 {
  source: Id;
  scope: Id;
  language?: Language;
}

/** @atd annotation_target_t4 */
export interface AnnotationTargetT4 {
  id: Id;
  partOf?: PartOf;
  language?: Language;
}

/** @atd specific_resource_t */
export interface SpecificResource {
  id?: Id;
  type?: Type;
  format?: Format;
  accessibility?: Accessibility;
  source: Source;
  selector?: Selector;
  language?: Language;
}

/** @atd source_t */
export type Source = Id | Class;

/** @atd selector_t */
export type Selector = ResourceSelector | ResourceSelector[];

/** @atd resource_selector_t */
export type ResourceSelector = string | ResourceSelectorT2 | ResourceSelectorT3 | ResourceSelectorT4 | ResourceSelectorT5 | ResourceSelectorT6 | ResourceSelectorT7;

/** @atd resource_selector_t2 */
export interface ResourceSelectorT2 {
  type: Type;
  t?: Duration;
  x?: Dimenson;
  y?: Dimenson;
}

/** @atd resource_selector_t3 */
export interface ResourceSelectorT3 {
  type: Type;
  conformsTo?: ConformsTo;
  value: Value;
}

/** @atd conforms_to_t */
export type ConformsTo = string;

/** @atd resource_selector_t4 */
export interface ResourceSelectorT4 {
  type: Type;
  value: Value;
}

/** @atd resource_selector_t5 */
export interface ResourceSelectorT5 {
  type: Type;
  region?: Region;
  size?: Size;
  rotation?: Rotatation;
  quality?: Quality;
  format?: Format;
}

/** @atd resource_selector_t6 */
export interface ResourceSelectorT6 {
  type: Type;
  prefix?: Prefix;
  exact: Exact;
  suffix?: Suffix;
}

/** @atd resource_selector_t7 */
export interface ResourceSelectorT7 {
  type: Type;
  value: Value;
}

/** @atd metadata_t */
export interface Metadata {
  label: Record<string, string[]>;
  value: Record<string, string[]>;
}

/** @atd required_statement_t */
export interface RequiredStatement {
  label: Record<string, string[]>;
  value: Record<string, string[]>;
}

/** @atd thumbnail_t */
export type Thumbnail = Resource;

/** @atd logo_t */
export type Logo = Resource;

/** @atd resource_t */
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

/** @atd service_t */
export type Service = ServiceItem | ServiceItem[];

/** @atd service_item_t */
export type ServiceItem = ServiceItemT1 | ServiceItemT2;

/** @atd service_item_t1 */
export interface ServiceItemT1 {
  id: Id;
  type: Type;
  label?: Label;
  profile?: Profile;
  service?: Service;
}

/** @atd service_item_t2 */
export interface ServiceItemT2 {
  "@id": Id;
  "@type": Type;
  label?: Label;
  profile?: Profile;
  service?: Service;
}

/** @atd label_t */
export type Label = string | Record<string, string[]>;

/** @atd summary_t */
export type Summary = Record<string, string[]>;

/** @atd lng_string_t */
export type LngString = Record<string, string[]>;

/** @atd language_t */
export type Language = string | string[];

/** @atd external_t */
export interface External {
  id: Id;
  type: Type;
  label?: Label;
  format?: Format;
  profile?: Profile;
}

/** @atd see_also_t */
export type SeeAlso = External;

/** @atd rendering_t */
export type Rendering = External;

/** @atd homepage_t */
export interface Homepage {
  id: Id;
  type: Type;
  label?: Label;
  format?: Format;
  language?: Language[];
}

/** @atd provider_t */
export interface Provider {
  id: Id;
  type: Type;
  label?: Label;
  homepage?: Homepage[];
  logo?: Logo[];
  seeAlso?: SeeAlso[];
}

/** @atd part_of_t */
export type PartOf = string | PartOfObject;

/** @atd part_of_t2 */
export interface PartOfObject {
  id: Id;
  type?: Type;
  label?: Label;
  total?: Total;
}

/** @atd start_t */
export type Start = Class;

/** @atd motivation_t */
export type Motivation = string | string[];

/** @atd annotation_collection_t */
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

/** @atd first_t */
export type First = string | AnnotationPageRef;

/** @atd first_t2 */
export interface AnnotationPageRef {
  id: Id;
  type: Type;
  label?: Label;
  startIndex?: StartIndex;
  thumbnail?: Thumbnail[];
  next?: Next;
  items?: Annotation[];
}

/** @atd range_t */
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
  items: RangeItems[];
}

/** @atd range_items_t */
export type RangeItems = SpecificResource | Canvas | Range;

/** @atd strings_t */
export type Strings = string | string[];

/** @atd id_t */
export type Id = string;

/** @atd type_t */
export type Type = string;

/** @atd height_t */
export type Height = number;

/** @atd width_t */
export type Width = number;

/** @atd duration_t */
export type Duration = number;

/** @atd created_t */
export type Created = string;

/** @atd modified_t */
export type Modified = string;

/** @atd format_t */
export type Format = string;

/** @atd profile_t */
export type Profile = string;

/** @atd viewing_direction_t */
export type ViewingDirection = string;

/** @atd behavior_t */
export type Behavior = string;

/** @atd nav_date_t */
export type NavDate = string;

/** @atd rights_t */
export type Rights = string;

/** @atd value_t */
export type Value = string;

/** @atd accessibility_t */
export type Accessibility = string;

/** @atd dimenson_t */
export type Dimenson = number;

/** @atd pattern_t */
export type Pattern = string;

/** @atd default_t */
export type Default = string;

/** @atd region_t */
export type Region = string;

/** @atd size_t */
export type Size = string;

/** @atd quality_t */
export type Quality = string;

/** @atd rotatation_t */
export type Rotatation = string;

/** @atd total_t */
export type Total = number;

/** @atd last_t */
export type Last = string;

/** @atd next_t */
export type Next = string;

/** @atd start_index_t */
export type StartIndex = number;

/** @atd name_t */
export type Name = string;

/** @atd nickname_t */
export type Nickname = string;

/** @atd prefix_t */
export type Prefix = string;

/** @atd exact_t */
export type Exact = string;

/** @atd suffix_t */
export type Suffix = string;
