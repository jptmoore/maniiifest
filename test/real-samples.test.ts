import { Maniiifest } from '../src/Maniiifest';
import * as fs from 'fs';
import * as path from 'path';

// ──────────────────────────────────────────
// wellcome.json — Large Collection with rich metadata,
// 259 sub-collections, 6451 nested manifests,
// rights, behavior, rendering, seeAlso, homepage, provider, services
// ──────────────────────────────────────────

describe('Collection with real sample (wellcome.json)', () => {

  const json = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'samples', 'wellcome.json'), 'utf-8')
  );
  const m = new Maniiifest(json);

  test('getCollectionId', () => {
    expect(m.getCollectionId()).toBe('https://iiif.wellcomecollection.org/presentation/b19974760');
  });

  test('getCollectionLabel', () => {
    const label = m.getCollectionLabel() as Record<string, string[]>;
    expect(label).not.toBeNull();
    expect(label.en).toEqual(['The chemist and druggist.']);
  });

  test('getCollectionLabelByLanguage returns en label', () => {
    const lbl = m.getCollectionLabelByLanguage('en') as Record<string, string[]>;
    expect(lbl).not.toBeNull();
    expect(lbl.en).toEqual(['The chemist and druggist.']);
  });

  test('getCollectionLabelByLanguage returns null for missing language', () => {
    expect(m.getCollectionLabelByLanguage('fr')).toBeNull();
  });

  test('getCollectionRights', () => {
    expect(m.getCollectionRights()).toBe('http://creativecommons.org/licenses/by-nc/4.0/');
  });

  test('iterateCollectionBehavior yields multi-part', () => {
    const behaviors = [...m.iterateCollectionBehavior()];
    expect(behaviors).toContain('multi-part');
  });

  test('iterateCollectionRendering yields zip rendering', () => {
    const renderings = [...m.iterateCollectionRendering()];
    expect(renderings.length).toBe(1);
    expect(renderings[0].id).toBe('https://api.wellcomecollection.org/text/v1/b19974760.zip');
    expect(renderings[0].format).toBe('application/zip');
  });

  test('iterateCollectionSeeAlso yields catalogue API', () => {
    const seeAlso = [...m.iterateCollectionSeeAlso()];
    expect(seeAlso.length).toBe(1);
    expect(seeAlso[0].type).toBe('Dataset');
  });

  test('getCollectionNavDate returns null (no navDate at top level)', () => {
    expect(m.getCollectionNavDate()).toBeNull();
  });

  test('iterateCollectionLabel yields 260 labels (root + 259 sub-collections)', () => {
    const labels = [...m.iterateCollectionLabel()];
    // iterateCollectionLabel only yields Collection labels, not Manifest labels
    expect(labels.length).toBe(260);
  });

  test('iterateCollectionThumbnail does not crash on large collection', () => {
    const thumbnails = [...m.iterateCollectionThumbnail()];
    expect(thumbnails.length).toBe(0);
  });

  test('iterateCollectionMetadata yields 5 metadata entries', () => {
    const metadata = [...m.iterateCollectionMetadata()];
    // Only the top-level collection has metadata; sub-collections have none
    expect(metadata.length).toBe(5);
  });

  test('iterateCollectionHomepage yields homepage with language', () => {
    const homepages = [...m.iterateCollectionHomepage()];
    expect(homepages.length).toBeGreaterThanOrEqual(1);
    expect(homepages[0].type).toBe('Text');
  });

  test('iterateCollectionProvider yields Wellcome provider', () => {
    const providers = [...m.iterateCollectionProvider()];
    expect(providers.length).toBeGreaterThanOrEqual(1);
    expect(providers[0].type).toBe('Agent');
  });

  test('iterateCollectionService yields array', () => {
    const services = [...m.iterateCollectionService()];
    // wellcome.json uses "services" (plural) at top level, not "service" (singular)
    expect(services).toBeDefined();
  });

  test('iterateCollectionCollection yields 260 collections (root + 259 sub)', () => {
    const collections = [...m.iterateCollectionCollection()];
    expect(collections.length).toBe(260);
  });

  test('iterateCollectionManifest yields 6451 nested manifests', () => {
    const manifests = [...m.iterateCollectionManifest()];
    expect(manifests.length).toBe(6451);
  });
});

// ──────────────────────────────────────────
// search.json — AnnotationPage from IIIF Search API
// with pagination (startIndex, next), partOf AnnotationCollection,
// 20 annotations with TextualBody and supplementing motivation
// ──────────────────────────────────────────

describe('AnnotationPage with real sample (search.json)', () => {

  const json = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'samples', 'search.json'), 'utf-8')
  );
  const m = new Maniiifest(json, "AnnotationPage");

  test('getAnnotationPageId', () => {
    expect(m.getAnnotationPageId()).toBe('http://localhost:3000/issue1041/search?q=london&page=0');
  });

  test('getAnnotationPageContext', () => {
    expect(m.getAnnotationPageContext()).toBe('http://iiif.io/api/search/2/context.json');
  });

  test('getAnnotationPageStartIndex returns 0', () => {
    expect(m.getAnnotationPageStartIndex()).toBe(0);
  });

  test('getAnnotationPageNext returns next page URL', () => {
    expect(m.getAnnotationPageNext()).toBe('http://localhost:3000/issue1041/search?q=london&page=1');
  });

  test('getAnnotationPagePartOf returns AnnotationCollection with total', () => {
    const partOf = m.getAnnotationPagePartOf();
    expect(partOf).not.toBeNull();
    expect(typeof partOf).toBe('object');
    const partOfObj = partOf as { id: string; type: string; total: number };
    expect(partOfObj.type).toBe('AnnotationCollection');
    expect(partOfObj.total).toBe(58);
  });

  test('iterateAnnotationPageAnnotation yields 20 annotations', () => {
    const annotations = [...m.iterateAnnotationPageAnnotation()];
    expect(annotations.length).toBe(20);
  });

  test('all annotations have supplementing motivation', () => {
    const annotations = [...m.iterateAnnotationPageAnnotation()];
    for (const annotation of annotations) {
      expect(annotation.motivation).toBe('supplementing');
    }
  });

  test('all annotations have TextualBody', () => {
    const annotations = [...m.iterateAnnotationPageAnnotation()];
    for (const annotation of annotations) {
      expect(annotation.body).toBeDefined();
    }
  });

  test('annotation targets contain fragment selectors (xywh)', () => {
    const annotations = [...m.iterateAnnotationPageAnnotation()];
    expect(annotations[0].target).toBeDefined();
  });

  test('iterateAnnotationPageAnnotationPartOf yields 20 canvas refs', () => {
    const refs = [...m.iterateAnnotationPageAnnotationPartOf()];
    expect(refs.length).toBe(20);
    for (const ref of refs) {
      expect(ref.partOf).toBeDefined();
    }
  });
});

// ──────────────────────────────────────────
// allmaps1.json — AnnotationPage with 12 georeferencing annotations
// FeatureCollection bodies, SvgSelector targets, nested partOf chains
// ──────────────────────────────────────────

describe('AnnotationPage with real sample (allmaps1.json)', () => {

  const json = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'samples', 'allmaps1.json'), 'utf-8')
  );
  const m = new Maniiifest(json, "AnnotationPage");

  test('getAnnotationPageContext', () => {
    expect(m.getAnnotationPageContext()).toBe('http://www.w3.org/ns/anno.jsonld');
  });

  test('iterateAnnotationPageAnnotation yields 10 georef annotations', () => {
    const annotations = [...m.iterateAnnotationPageAnnotation()];
    expect(annotations.length).toBe(10);
  });

  test('all annotations have georeferencing motivation', () => {
    const annotations = [...m.iterateAnnotationPageAnnotation()];
    for (const annotation of annotations) {
      expect(annotation.motivation).toBe('georeferencing');
    }
  });

  test('all annotations have created and modified timestamps', () => {
    const annotations = [...m.iterateAnnotationPageAnnotation()];
    for (const annotation of annotations) {
      expect(annotation.created).toBeDefined();
      expect(annotation.modified).toBeDefined();
    }
  });

  test('annotations have FeatureCollection bodies', () => {
    const annotations = [...m.iterateAnnotationPageAnnotation()];
    for (const annotation of annotations) {
      expect(annotation.body).toBeDefined();
    }
  });

  test('first annotation can be parsed as standalone Annotation', () => {
    const firstAnno = json.items[0];
    const annoM = new Maniiifest(firstAnno, "Annotation");
    expect(annoM.getAnnotationId()).toBe('https://annotations.allmaps.org/maps/8b639501c40f2178');
    expect(annoM.getAnnotationMotivation()).toBe('georeferencing');
    expect(annoM.getAnnotationCreated()).toBe('2024-08-14T09:34:50.683Z');
    expect(annoM.getAnnotationModified()).toBe('2024-08-14T09:34:50.683Z');
  });

  test('first annotation has FeatureCollection with point geometries', () => {
    const firstAnno = json.items[0];
    const annoM = new Maniiifest(firstAnno, "Annotation");
    const fc = annoM.getAnnotationFeatureCollection();
    expect(fc).not.toBeNull();
    expect(fc!.type).toBe('FeatureCollection');
  });

  test('first annotation yields point coordinates', () => {
    const firstAnno = json.items[0];
    const annoM = new Maniiifest(firstAnno, "Annotation");
    const coords = [...annoM.iterateAnnotationGeometryPointCoordinates()];
    // 4 features × 2 coordinates (lng, lat) per Point
    expect(coords.length).toBe(8);
  });

  test('first annotation yields features', () => {
    const firstAnno = json.items[0];
    const annoM = new Maniiifest(firstAnno, "Annotation");
    const features = [...annoM.iterateAnnotationFeature()];
    expect(features.length).toBe(4);
    for (const feature of features) {
      expect(feature.type).toBe('Feature');
    }
  });
});

// ──────────────────────────────────────────
// allmaps2.json — Single georeferencing Annotation
// with FeatureCollection body, SvgSelector, transformation,
// created/modified timestamps, partOf chain (Canvas → Manifest)
// ──────────────────────────────────────────

describe('Annotation with real sample (allmaps2.json)', () => {

  const json = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'samples', 'allmaps2.json'), 'utf-8')
  );
  const m = new Maniiifest(json, "Annotation");

  test('getAnnotationId', () => {
    expect(m.getAnnotationId()).toBe('https://annotations.allmaps.org/maps/3b72f58c723da9c4');
  });

  test('getAnnotationType', () => {
    expect(m.getAnnotationType()).toBe('Annotation');
  });

  test('getAnnotationContext returns array context', () => {
    const ctx = m.getAnnotationContext();
    expect(ctx).not.toBeNull();
    expect(Array.isArray(ctx)).toBe(true);
    expect((ctx as string[]).length).toBe(2);
  });

  test('getAnnotationMotivation', () => {
    expect(m.getAnnotationMotivation()).toBe('georeferencing');
  });

  test('getAnnotationCreated', () => {
    expect(m.getAnnotationCreated()).toBe('2023-02-10T14:36:56.341Z');
  });

  test('getAnnotationModified', () => {
    expect(m.getAnnotationModified()).toBe('2023-02-10T14:53:10.671Z');
  });

  test('getAnnotationBody returns FeatureCollection body', () => {
    const body = m.getAnnotationBody();
    expect(body).not.toBeNull();
  });

  test('getAnnotationFeatureCollection', () => {
    const fc = m.getAnnotationFeatureCollection();
    expect(fc).not.toBeNull();
    expect(fc!.type).toBe('FeatureCollection');
    expect(fc!.transformation).toBeDefined();
    expect(fc!.transformation!.type).toBe('polynomial');
  });

  test('iterateAnnotationFeature yields 3 features', () => {
    const features = [...m.iterateAnnotationFeature()];
    expect(features.length).toBe(3);
  });

  test('iterateAnnotationGeometryPointCoordinates yields 6 point coords', () => {
    const coords = [...m.iterateAnnotationGeometryPointCoordinates()];
    // 3 features × 2 coordinates (lng, lat) per Point
    expect(coords.length).toBe(6);
  });

  test('iterateAnnotationTarget yields target', () => {
    const targets = [...m.iterateAnnotationTarget()];
    expect(targets.length).toBe(1);
  });
});

// ──────────────────────────────────────────
// allmaps3.json — Single georeferencing Annotation
// similar to allmaps2 but with 4 features
// ──────────────────────────────────────────

describe('Annotation with real sample (allmaps3.json)', () => {

  const json = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'samples', 'allmaps3.json'), 'utf-8')
  );
  const m = new Maniiifest(json, "Annotation");

  test('getAnnotationId', () => {
    expect(m.getAnnotationId()).toBe('https://annotations.allmaps.org/maps/8b639501c40f2178');
  });

  test('getAnnotationMotivation', () => {
    expect(m.getAnnotationMotivation()).toBe('georeferencing');
  });

  test('getAnnotationCreated', () => {
    expect(m.getAnnotationCreated()).toBe('2024-08-14T09:34:50.683Z');
  });

  test('getAnnotationModified', () => {
    expect(m.getAnnotationModified()).toBe('2024-08-14T09:34:50.683Z');
  });

  test('getAnnotationFeatureCollection returns FeatureCollection with transformation', () => {
    const fc = m.getAnnotationFeatureCollection();
    expect(fc).not.toBeNull();
    expect(fc!.type).toBe('FeatureCollection');
    expect(fc!.transformation).toBeDefined();
    expect(fc!.transformation!.options!.order).toBe(1);
  });

  test('iterateAnnotationFeature yields 4 features', () => {
    const features = [...m.iterateAnnotationFeature()];
    expect(features.length).toBe(4);
  });

  test('iterateAnnotationGeometryPointCoordinates yields 8 point coords', () => {
    const coords = [...m.iterateAnnotationGeometryPointCoordinates()];
    // 4 features × 2 coordinates (lng, lat) per Point
    expect(coords.length).toBe(8);
  });

  test('iterateAnnotationTarget yields SpecificResource target', () => {
    const targets = [...m.iterateAnnotationTarget()];
    expect(targets.length).toBe(1);
  });
});
