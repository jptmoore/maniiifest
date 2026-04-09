/**
 * Tests that exercise Maniiifest against the official IIIF Cookbook recipes.
 *
 * Fixtures are downloaded automatically by  npm run pretest  (setup-fixtures.ts).
 * Each recipe URL is defined in  test/fixtures.ts.
 */

import { Maniiifest } from '../src';
import { fixtures } from './fixtures';
import * as fs from 'fs';
import * as path from 'path';

const cookbookDir = path.join(__dirname, 'cookbook');

function load(name: string): any {
  const filePath = path.join(cookbookDir, name);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Fixture ${name} not downloaded – run: npx ts-node test/setup-fixtures.ts`);
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

const collectionFixtures = new Set([
  '0032-collection.json',
  '0030-multi-volume.json',
  '0068-newspaper.json',
  '0230-navdate.json',
  '0318-navPlace-navDate.json',
]);

// ═══════════════════════════════════════════════════════════════
// 1. Every recipe parses without error
// ═══════════════════════════════════════════════════════════════

describe('all cookbook recipes parse', () => {
  for (const fixture of fixtures) {
    it(fixture.name, () => {
      const m = new Maniiifest(load(fixture.name));
      if (collectionFixtures.has(fixture.name)) {
        expect(m.getSpecificationType()).toBe('Collection');
      } else {
        expect(m.getSpecificationType()).toBe('Manifest');
      }
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// 2. Manifest basics
// ═══════════════════════════════════════════════════════════════

describe('manifest basics', () => {
  it('0001: id, label, and one canvas with a painting annotation', () => {
    const m = new Maniiifest(load('0001-mvm-image.json'));
    expect(m.getManifestId()).toBeTruthy();
    expect(m.getManifestLabel()).toBeTruthy();
    const canvases = Array.from(m.iterateManifestCanvas());
    expect(canvases.length).toBe(1);
    const annos = Array.from(m.iterateManifestCanvasAnnotation());
    expect(annos.length).toBe(1);
  });

  it('0002: audio manifest has a canvas', () => {
    const m = new Maniiifest(load('0002-mvm-audio.json'));
    expect(m.getManifestLabel()).toBeTruthy();
    const canvases = Array.from(m.iterateManifestCanvas());
    expect(canvases.length).toBe(1);
  });

  it('0003: video manifest has a canvas', () => {
    const m = new Maniiifest(load('0003-mvm-video.json'));
    const canvases = Array.from(m.iterateManifestCanvas());
    expect(canvases.length).toBe(1);
  });

  it('0004: canvas has explicit width and height', () => {
    const m = new Maniiifest(load('0004-canvas-size.json'));
    const canvas = Array.from(m.iterateManifestCanvas())[0];
    expect(canvas.width).toBeDefined();
    expect(canvas.height).toBeDefined();
  });
});

// ═══════════════════════════════════════════════════════════════
// 3. Image service
// ═══════════════════════════════════════════════════════════════

describe('image service', () => {
  it('0005: annotation body has a service', () => {
    const m = new Maniiifest(load('0005-image-service.json'));
    const annos = Array.from(m.iterateManifestCanvasAnnotation());
    expect(annos.length).toBe(1);
    // The annotation body should contain a service
    const body = annos[0].body;
    expect(body).toBeDefined();
  });
});

// ═══════════════════════════════════════════════════════════════
// 4. Labels, language, and string formatting
// ═══════════════════════════════════════════════════════════════

describe('labels and language', () => {
  it('0006: multilingual label', () => {
    const m = new Maniiifest(load('0006-text-language.json'));
    const label = m.getManifestLabel();
    expect(label).toBeTruthy();
  });

  it('0118: multiple label values', () => {
    const m = new Maniiifest(load('0118-multivalue.json'));
    const label = m.getManifestLabel();
    expect(label).toBeTruthy();
  });

  it('0007: summary with HTML formatting', () => {
    const m = new Maniiifest(load('0007-string-formats.json'));
    const summary = m.getManifestSummary();
    expect(summary).toBeTruthy();
  });
});

// ═══════════════════════════════════════════════════════════════
// 5. Metadata
// ═══════════════════════════════════════════════════════════════

describe('metadata', () => {
  it('0029: metadata on manifest and canvas levels', () => {
    const m = new Maniiifest(load('0029-metadata-anywhere.json'));
    const manifestMeta = Array.from(m.iterateManifestMetadata());
    expect(manifestMeta.length).toBe(4);
    const canvasMeta = Array.from(m.iterateManifestCanvasMetadata());
    expect(canvasMeta.length).toBe(2);
  });
});

// ═══════════════════════════════════════════════════════════════
// 6. Rights
// ═══════════════════════════════════════════════════════════════

describe('rights', () => {
  it('0008: rights and requiredStatement', () => {
    const m = new Maniiifest(load('0008-rights.json'));
    expect(m.getManifestRights()).toBeTruthy();
    expect(m.getManifestRequiredStatement()).toBeTruthy();
  });
});

// ═══════════════════════════════════════════════════════════════
// 7. Multi-canvas / books
// ═══════════════════════════════════════════════════════════════

describe('multi-canvas books', () => {
  it('0009: multiple canvases', () => {
    const m = new Maniiifest(load('0009-book-1.json'));
    const canvases = Array.from(m.iterateManifestCanvas());
    expect(canvases.length).toBe(5);
  });

  it('0011: behavior continuous', () => {
    const m = new Maniiifest(load('0011-book-3-behavior.json'));
    const behaviors = Array.from(m.iterateManifestBehavior());
    expect(behaviors).toContain('continuous');
  });

  it('0010: RTL viewing direction', () => {
    const m = new Maniiifest(load('0010-book-2-viewing-direction.json'));
    expect(m.getManifestViewingDirection()).toBe('right-to-left');
  });
});

// ═══════════════════════════════════════════════════════════════
// 8. Thumbnails
// ═══════════════════════════════════════════════════════════════

describe('thumbnails', () => {
  it('0117: manifest-level thumbnail', () => {
    const m = new Maniiifest(load('0117-add-image-thumbnail.json'));
    const thumbs = Array.from(m.iterateManifestThumbnail());
    expect(thumbs.length).toBe(1);
    expect(thumbs[0].id).toBeTruthy();
  });

  it('0232: canvas-level thumbnail on AV', () => {
    const m = new Maniiifest(load('0232-image-thumbnail-canvas.json'));
    const thumbs = Array.from(m.iterateManifestCanvasThumbnail());
    expect(thumbs.length).toBe(2);
  });
});

// ═══════════════════════════════════════════════════════════════
// 9. Special canvases
// ═══════════════════════════════════════════════════════════════

describe('special canvases', () => {
  it('0013: placeholderCanvas', () => {
    const m = new Maniiifest(load('0013-placeholderCanvas.json'));
    const manifest = m.getManifest();
    const canvas = manifest?.items?.[0];
    expect(canvas?.placeholderCanvas).toBeDefined();
  });

  it('0014: accompanyingCanvas', () => {
    const m = new Maniiifest(load('0014-accompanyingcanvas.json'));
    const manifest = m.getManifest();
    const canvas = manifest?.items?.[0];
    expect(canvas?.accompanyingCanvas).toBeDefined();
  });
});

// ═══════════════════════════════════════════════════════════════
// 10. Navigation: start, navDate, navPlace
// ═══════════════════════════════════════════════════════════════

describe('navigation', () => {
  it('0202: start canvas', () => {
    const m = new Maniiifest(load('0202-start-canvas.json'));
    expect(m.getManifestStart()).toBeTruthy();
  });

  it('0015: start with time offset', () => {
    const m = new Maniiifest(load('0015-start.json'));
    expect(m.getManifestStart()).toBeTruthy();
  });

  it('0154: navPlace on manifest', () => {
    const m = new Maniiifest(load('0154-geo-extension.json'));
    expect(m.getManifestNavPlace()).toBeTruthy();
    const features = Array.from(m.iterateManifestNavPlaceFeature());
    expect(features.length).toBe(1);
  });

  it('0240: navPlace on individual canvases', () => {
    const m = new Maniiifest(load('0240-navPlace-on-canvases.json'));
    const features = Array.from(m.iterateManifestCanvasNavPlaceFeature());
    expect(features.length).toBe(2);
  });
});

// ═══════════════════════════════════════════════════════════════
// 11. Provider
// ═══════════════════════════════════════════════════════════════

describe('provider', () => {
  it('0234: provider with homepage and logo', () => {
    const m = new Maniiifest(load('0234-provider.json'));
    const providers = Array.from(m.iterateManifestProvider());
    expect(providers.length).toBe(1);
    expect(providers[0].id).toBeTruthy();
    const homepages = Array.from(m.iterateManifestProviderHomepage());
    expect(homepages.length).toBe(1);
  });
});

// ═══════════════════════════════════════════════════════════════
// 12. Collections
// ═══════════════════════════════════════════════════════════════

describe('collections', () => {
  it('0032: simple collection with manifests', () => {
    const m = new Maniiifest(load('0032-collection.json'));
    expect(m.getCollectionId()).toBeTruthy();
    expect(m.getCollectionLabel()).toBeTruthy();
    const manifests = Array.from(m.iterateCollectionManifest());
    expect(manifests.length).toBe(2);
  });

  it('0030: multi-volume collection', () => {
    const m = new Maniiifest(load('0030-multi-volume.json'));
    const manifests = Array.from(m.iterateCollectionManifest());
    expect(manifests.length).toBe(2);
  });

  it('0068: nested newspaper collection', () => {
    const m = new Maniiifest(load('0068-newspaper.json'));
    expect(m.getCollectionId()).toBeTruthy();
    expect(m.getCollectionLabel()).toBeTruthy();
  });

  it('0318: collection with navPlace and navDate', () => {
    const m = new Maniiifest(load('0318-navPlace-navDate.json'));
    expect(m.getCollectionId()).toBeTruthy();
  });

  it('0230: collection with navDate', () => {
    const m = new Maniiifest(load('0230-navdate.json'));
    expect(m.getCollectionId()).toBeTruthy();
  });
});

// ═══════════════════════════════════════════════════════════════
// 13. Annotations: supplementing / W3C
// ═══════════════════════════════════════════════════════════════

describe('annotations', () => {
  it('0017: transcription AV has rendering on canvas', () => {
    const m = new Maniiifest(load('0017-transcription-av.json'));
    const rendering = Array.from(m.iterateManifestCanvasRendering());
    expect(rendering.length).toBe(1);
    expect(rendering[0].format).toBe('text/plain');
  });

  it('0266: full-canvas annotation with commenting motivation', () => {
    const m = new Maniiifest(load('0266-full-canvas-annotation.json'));
    const annos = Array.from(m.iterateManifestCanvasW3cAnnotation());
    expect(annos.length).toBe(1);
  });

  it('0019: HTML annotation body', () => {
    const m = new Maniiifest(load('0019-html-in-annotations.json'));
    const annos = Array.from(m.iterateManifestCanvasW3cAnnotation());
    expect(annos.length).toBe(1);
  });

  it('0021: tagging annotation', () => {
    const m = new Maniiifest(load('0021-tagging.json'));
    const annos = Array.from(m.iterateManifestCanvasW3cAnnotation());
    expect(annos.length).toBe(1);
  });

  it('0269: embedded vs referenced annotation pages', () => {
    const m = new Maniiifest(load('0269-embedded-or-referenced-annotations.json'));
    const pages = Array.from(m.iterateManifestCanvasW3cAnnotationPage());
    expect(pages.length).toBe(1);
  });

  it('0377: image in annotation body', () => {
    const m = new Maniiifest(load('0377-image-in-annotation.json'));
    const annos = Array.from(m.iterateManifestCanvasW3cAnnotation());
    expect(annos.length).toBe(1);
  });

  it('0135: point annotation on canvas', () => {
    const m = new Maniiifest(load('0135-annotating-point-in-canvas.json'));
    const annos = Array.from(m.iterateManifestCanvasW3cAnnotation());
    expect(annos.length).toBe(1);
  });

  it('0139: geolocate canvas fragment', () => {
    const m = new Maniiifest(load('0139-geolocate-canvas-fragment.json'));
    const annos = Array.from(m.iterateManifestCanvasW3cAnnotation());
    expect(annos.length).toBe(1);
  });

  it('0346: multilingual annotation body', () => {
    const m = new Maniiifest(load('0346-multilingual-annotation-body.json'));
    const annos = Array.from(m.iterateManifestCanvasW3cAnnotation());
    expect(annos.length).toBe(1);
  });
});

// ═══════════════════════════════════════════════════════════════
// 14. Ranges / table of contents
// ═══════════════════════════════════════════════════════════════

describe('ranges and table of contents', () => {
  it('0024: book with structures (TOC)', () => {
    const m = new Maniiifest(load('0024-book-4-toc.json'));
    const ranges = Array.from(m.iterateManifestRange());
    expect(ranges.length).toBe(1);
    const labels = Array.from(m.iterateManifestRangeLabel());
    expect(labels.length).toBe(1);
  });

  it('0026: opera with nested TOC ranges', () => {
    const m = new Maniiifest(load('0026-toc-opera.json'));
    const ranges = Array.from(m.iterateManifestRange());
    expect(ranges.length).toBe(1);
    const items = Array.from(m.iterateManifestRangeItem());
    expect(items.length).toBe(2);
  });
});

// ═══════════════════════════════════════════════════════════════
// 15. Choice
// ═══════════════════════════════════════════════════════════════

describe('choice', () => {
  it('0033: image choice', () => {
    const m = new Maniiifest(load('0033-choice.json'));
    const annos = Array.from(m.iterateManifestCanvasAnnotation());
    expect(annos.length).toBe(1);
  });

  it('0434: AV choice', () => {
    const m = new Maniiifest(load('0434-choice-av.json'));
    const annos = Array.from(m.iterateManifestCanvasAnnotation());
    expect(annos.length).toBe(1);
  });
});

// ═══════════════════════════════════════════════════════════════
// 16. Rendering, seeAlso, homepage
// ═══════════════════════════════════════════════════════════════

describe('rendering, seeAlso, homepage', () => {
  it('0046: rendering (PDF download)', () => {
    const m = new Maniiifest(load('0046-rendering.json'));
    const renderings = Array.from(m.iterateManifestRendering());
    expect(renderings.length).toBe(1);
    expect(renderings[0].id).toBeTruthy();
  });

  it('0047: homepage', () => {
    const m = new Maniiifest(load('0047-homepage.json'));
    const homepages = Array.from(m.iterateManifestHomepage());
    expect(homepages.length).toBe(1);
  });

  it('0053: seeAlso', () => {
    const m = new Maniiifest(load('0053-seeAlso.json'));
    const seeAlso = Array.from(m.iterateManifestSeeAlso());
    expect(seeAlso.length).toBe(1);
  });
});

// ═══════════════════════════════════════════════════════════════
// 17. Complex A/V
// ═══════════════════════════════════════════════════════════════

describe('complex A/V', () => {
  it('0064: opera on one canvas', () => {
    const m = new Maniiifest(load('0064-opera-one-canvas.json'));
    const canvases = Array.from(m.iterateManifestCanvas());
    expect(canvases.length).toBe(1);
    expect(canvases[0].duration).toBeDefined();
  });

  it('0065: opera on multiple canvases', () => {
    const m = new Maniiifest(load('0065-opera-multiple-canvases.json'));
    const canvases = Array.from(m.iterateManifestCanvas());
    expect(canvases.length).toBe(2);
  });

  it('0074: multiple language captions', () => {
    const m = new Maniiifest(load('0074-multiple-language-captions.json'));
    const pages = Array.from(m.iterateManifestCanvasW3cAnnotationPage());
    expect(pages.length).toBe(1);
  });
});

// ═══════════════════════════════════════════════════════════════
// 18. Layout / composition
// ═══════════════════════════════════════════════════════════════

describe('layout and composition', () => {
  it('0035: foldouts with behavior', () => {
    const m = new Maniiifest(load('0035-foldouts.json'));
    const canvases = Array.from(m.iterateManifestCanvas());
    expect(canvases.length).toBe(9);
    const behaviors = Array.from(m.iterateManifestBehavior());
    expect(behaviors.length).toBe(1);
  });

  it('0036: composition from multiple images', () => {
    const m = new Maniiifest(load('0036-composition-from-multiple-images.json'));
    const annos = Array.from(m.iterateManifestCanvasAnnotation());
    expect(annos.length).toBe(2);
  });

  it('0031: bound multivolume', () => {
    const m = new Maniiifest(load('0031-bound-multivolume.json'));
    const ranges = Array.from(m.iterateManifestRange());
    expect(ranges.length).toBe(1);
  });
});

// ═══════════════════════════════════════════════════════════════
// Collection getters (0068-newspaper)
// ═══════════════════════════════════════════════════════════════

describe('collection getters (0068-newspaper)', () => {
  it('parses as Collection', () => {
    const m = new Maniiifest(load('0068-newspaper.json'));
    expect(m.getSpecificationType()).toBe('Collection');
  });

  it('getCollectionContext returns plain value (polymorphic unwrap)', () => {
    const m = new Maniiifest(load('0068-newspaper.json'));
    const ctx = m.getCollectionContext();
    expect(Array.isArray(ctx)).toBe(true);
  });

  it('iterateCollectionProvider finds providers', () => {
    const m = new Maniiifest(load('0068-newspaper.json'));
    const providers = Array.from(m.iterateCollectionProvider());
    expect(providers.length).toBe(1);
    expect(providers[0]).toHaveProperty('id');
    expect(providers[0]).toHaveProperty('type');
  });

  it('getCollectionRequiredStatement returns the statement', () => {
    const m = new Maniiifest(load('0068-newspaper.json'));
    const rs = m.getCollectionRequiredStatement();
    expect(rs).toBeDefined();
    expect(rs).toHaveProperty('label');
    expect(rs).toHaveProperty('value');
  });

  it('iterateCollectionMetadata yields metadata entries', () => {
    const m = new Maniiifest(load('0068-newspaper.json'));
    const meta = Array.from(m.iterateCollectionMetadata());
    expect(meta.length).toBe(2);
    for (const item of meta) {
      expect(item).toHaveProperty('label');
      expect(item).toHaveProperty('value');
    }
  });

  it('iterateCollectionSeeAlso yields seeAlso', () => {
    const m = new Maniiifest(load('0068-newspaper.json'));
    const seeAlso = Array.from(m.iterateCollectionSeeAlso());
    expect(seeAlso.length).toBe(1);
    expect(seeAlso[0]).toHaveProperty('id');
  });
});

// ═══════════════════════════════════════════════════════════════
// Collection summary (0318-navPlace-navDate)
// ═══════════════════════════════════════════════════════════════

describe('collection summary (0318-navPlace-navDate)', () => {
  it('getCollectionSummary returns the summary from real data', () => {
    const m = new Maniiifest(load('0318-navPlace-navDate.json'));
    const summary = m.getCollectionSummary();
    expect(summary).toBeDefined();
    expect((summary as any).en[0]).toContain("Rome");
  });
});

// ═══════════════════════════════════════════════════════════════
// Canvas iterators (0029-metadata-anywhere)
// ═══════════════════════════════════════════════════════════════

describe('canvas iterators (0029-metadata-anywhere)', () => {
  it('iterateManifestCanvasLabel yields canvas labels', () => {
    const m = new Maniiifest(load('0029-metadata-anywhere.json'));
    const result = Array.from(m.iterateManifestCanvasLabel());
    expect(result.length).toBe(2);
  });

  it('iterateManifestCanvasMetadata yields canvas metadata', () => {
    const m = new Maniiifest(load('0029-metadata-anywhere.json'));
    const result = Array.from(m.iterateManifestCanvasMetadata());
    expect(result.length).toBe(2);
  });

  it('iterateManifestCanvasThumbnail yields canvas thumbnails', () => {
    const m = new Maniiifest(load('0029-metadata-anywhere.json'));
    const result = Array.from(m.iterateManifestCanvasThumbnail());
    expect(Array.isArray(result)).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════
// Manifest extended getters (0029, 0008, 0266)
// ═══════════════════════════════════════════════════════════════

describe('manifest extended getters', () => {
  it('parses as Manifest and returns correct type', () => {
    const m = new Maniiifest(load('0029-metadata-anywhere.json'));
    expect(m.getSpecificationType()).toBe('Manifest');
  });

  it('getManifestLabel returns a plain label object', () => {
    const m = new Maniiifest(load('0029-metadata-anywhere.json'));
    const label = m.getManifestLabel();
    expect(label).toBeDefined();
    expect(label).not.toHaveProperty('kind');
  });

  it('getManifestSummary returns the summary', () => {
    const m = new Maniiifest(load('0008-rights.json'));
    expect(m.getManifestSummary()).toBeDefined();
  });

  it('getManifestRequiredStatement returns the statement', () => {
    const m = new Maniiifest(load('0029-metadata-anywhere.json'));
    const rs = m.getManifestRequiredStatement();
    expect(rs).toBeDefined();
    expect(rs).toHaveProperty('label');
    expect(rs).toHaveProperty('value');
  });

  it('iterateManifestMetadata yields metadata items', () => {
    const m = new Maniiifest(load('0029-metadata-anywhere.json'));
    const meta = Array.from(m.iterateManifestMetadata());
    expect(meta.length).toBe(4);
    for (const item of meta) {
      expect(item).toHaveProperty('label');
      expect(item).toHaveProperty('value');
    }
  });

  it('iterateManifestCanvas yields canvases', () => {
    const m = new Maniiifest(load('0029-metadata-anywhere.json'));
    const canvases = Array.from(m.iterateManifestCanvas());
    expect(canvases.length).toBe(2);
    expect(canvases[0]).toHaveProperty('id');
    expect(canvases[0]).toHaveProperty('type');
  });

  it('iterateManifestCanvasW3cAnnotation yields W3C annotations from canvas', () => {
    const m = new Maniiifest(load('0266-full-canvas-annotation.json'));
    const annos = Array.from(m.iterateManifestCanvasW3cAnnotation());
    expect(annos.length).toBe(1);
    expect(annos[0]).toHaveProperty('id');
    expect(annos[0]).toHaveProperty('type');
  });
});
