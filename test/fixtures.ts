/**
 * IIIF Cookbook recipe fixtures.
 *
 * Each entry maps a local filename (cached in test/cookbook/) to a
 * remote URL on iiif.io.  The setup script (setup-fixtures.ts)
 * downloads any missing files before the test suite runs.
 */

export interface Fixture {
  /** Local filename in test/cookbook/ */
  name: string;
  /** Remote cookbook URL */
  url: string;
}

export const fixtures: Fixture[] = [
  // ── Basic types ──────────────────────────────────────────────
  { name: '0001-mvm-image.json', url: 'https://iiif.io/api/cookbook/recipe/0001-mvm-image/manifest.json' },
  { name: '0002-mvm-audio.json', url: 'https://iiif.io/api/cookbook/recipe/0002-mvm-audio/manifest.json' },
  { name: '0003-mvm-video.json', url: 'https://iiif.io/api/cookbook/recipe/0003-mvm-video/manifest.json' },
  { name: '0004-canvas-size.json', url: 'https://iiif.io/api/cookbook/recipe/0004-canvas-size/manifest.json' },
  { name: '0005-image-service.json', url: 'https://iiif.io/api/cookbook/recipe/0005-image-service/manifest.json' },

  // ── Labels, language, and string formatting ──────────────────
  { name: '0006-text-language.json', url: 'https://iiif.io/api/cookbook/recipe/0006-text-language/manifest.json' },
  { name: '0118-multivalue.json', url: 'https://iiif.io/api/cookbook/recipe/0118-multivalue/manifest.json' },
  { name: '0007-string-formats.json', url: 'https://iiif.io/api/cookbook/recipe/0007-string-formats/manifest.json' },

  // ── Metadata ─────────────────────────────────────────────────
  { name: '0029-metadata-anywhere.json', url: 'https://iiif.io/api/cookbook/recipe/0029-metadata-anywhere/manifest.json' },

  // ── Rights ───────────────────────────────────────────────────
  { name: '0008-rights.json', url: 'https://iiif.io/api/cookbook/recipe/0008-rights/manifest.json' },

  // ── Multi-canvas / books ─────────────────────────────────────
  { name: '0009-book-1.json', url: 'https://iiif.io/api/cookbook/recipe/0009-book-1/manifest.json' },
  { name: '0011-book-3-behavior.json', url: 'https://iiif.io/api/cookbook/recipe/0011-book-3-behavior/manifest-continuous.json' },
  { name: '0299-region.json', url: 'https://iiif.io/api/cookbook/recipe/0299-region/manifest.json' },
  { name: '0010-book-2-viewing-direction.json', url: 'https://iiif.io/api/cookbook/recipe/0010-book-2-viewing-direction/manifest-rtl.json' },
  { name: '0283-missing-image.json', url: 'https://iiif.io/api/cookbook/recipe/0283-missing-image/manifest.json' },

  // ── Thumbnails ───────────────────────────────────────────────
  { name: '0117-add-image-thumbnail.json', url: 'https://iiif.io/api/cookbook/recipe/0117-add-image-thumbnail/manifest.json' },
  { name: '0232-image-thumbnail-canvas.json', url: 'https://iiif.io/api/cookbook/recipe/0232-image-thumbnail-canvas/manifest-av.json' },

  // ── Special canvases ─────────────────────────────────────────
  { name: '0013-placeholderCanvas.json', url: 'https://iiif.io/api/cookbook/recipe/0013-placeholderCanvas/manifest.json' },
  { name: '0014-accompanyingcanvas.json', url: 'https://iiif.io/api/cookbook/recipe/0014-accompanyingcanvas/manifest.json' },

  // ── Navigation ───────────────────────────────────────────────
  { name: '0202-start-canvas.json', url: 'https://iiif.io/api/cookbook/recipe/0202-start-canvas/manifest.json' },
  { name: '0015-start.json', url: 'https://iiif.io/api/cookbook/recipe/0015-start/manifest.json' },
  { name: '0230-navdate.json', url: 'https://iiif.io/api/cookbook/recipe/0230-navdate/navdate-collection.json' },

  // ── Geo / navPlace ───────────────────────────────────────────
  { name: '0154-geo-extension.json', url: 'https://iiif.io/api/cookbook/recipe/0154-geo-extension/manifest.json' },
  { name: '0240-navPlace-on-canvases.json', url: 'https://iiif.io/api/cookbook/recipe/0240-navPlace-on-canvases/manifest.json' },

  // ── Provider ─────────────────────────────────────────────────
  { name: '0234-provider.json', url: 'https://iiif.io/api/cookbook/recipe/0234-provider/manifest.json' },

  // ── Collections ──────────────────────────────────────────────
  { name: '0032-collection.json', url: 'https://iiif.io/api/cookbook/recipe/0032-collection/collection.json' },
  { name: '0030-multi-volume.json', url: 'https://iiif.io/api/cookbook/recipe/0030-multi-volume/collection.json' },
  { name: '0068-newspaper.json', url: 'https://iiif.io/api/cookbook/recipe/0068-newspaper/newspaper_title-collection.json' },
  { name: '0318-navPlace-navDate.json', url: 'https://iiif.io/api/cookbook/recipe/0318-navPlace-navDate/collection.json' },

  // ── Annotations: supplementing ────────────────────────────────
  { name: '0017-transcription-av.json', url: 'https://iiif.io/api/cookbook/recipe/0017-transcription-av/manifest.json' },
  { name: '0219-using-caption-file.json', url: 'https://iiif.io/api/cookbook/recipe/0219-using-caption-file/manifest.json' },
  { name: '0046-rendering.json', url: 'https://iiif.io/api/cookbook/recipe/0046-rendering/manifest.json' },

  // ── Annotations: commenting / tagging ─────────────────────────
  { name: '0266-full-canvas-annotation.json', url: 'https://iiif.io/api/cookbook/recipe/0266-full-canvas-annotation/manifest.json' },
  { name: '0019-html-in-annotations.json', url: 'https://iiif.io/api/cookbook/recipe/0019-html-in-annotations/manifest.json' },
  { name: '0021-tagging.json', url: 'https://iiif.io/api/cookbook/recipe/0021-tagging/manifest.json' },
  { name: '0261-non-rectangular-commenting.json', url: 'https://iiif.io/api/cookbook/recipe/0261-non-rectangular-commenting/manifest.json' },
  { name: '0022-linking-with-a-hotspot.json', url: 'https://iiif.io/api/cookbook/recipe/0022-linking-with-a-hotspot/manifest.json' },
  { name: '0326-annotating-image-layer.json', url: 'https://iiif.io/api/cookbook/recipe/0326-annotating-image-layer/manifest.json' },
  { name: '0135-annotating-point-in-canvas.json', url: 'https://iiif.io/api/cookbook/recipe/0135-annotating-point-in-canvas/manifest.json' },
  { name: '0139-geolocate-canvas-fragment.json', url: 'https://iiif.io/api/cookbook/recipe/0139-geolocate-canvas-fragment/manifest.json' },
  { name: '0269-embedded-or-referenced-annotations.json', url: 'https://iiif.io/api/cookbook/recipe/0269-embedded-or-referenced-annotations/manifest.json' },
  { name: '0306-linking-annotations-to-manifests.json', url: 'https://iiif.io/api/cookbook/recipe/0306-linking-annotations-to-manifests/manifest.json' },
  { name: '0377-image-in-annotation.json', url: 'https://iiif.io/api/cookbook/recipe/0377-image-in-annotation/manifest.json' },
  { name: '0346-multilingual-annotation-body.json', url: 'https://iiif.io/api/cookbook/recipe/0346-multilingual-annotation-body/manifest.json' },

  // ── Ranges / table of contents ────────────────────────────────
  { name: '0024-book-4-toc.json', url: 'https://iiif.io/api/cookbook/recipe/0024-book-4-toc/manifest.json' },
  { name: '0026-toc-opera.json', url: 'https://iiif.io/api/cookbook/recipe/0026-toc-opera/manifest.json' },

  // ── Multi-volume / bound volumes ──────────────────────────────
  { name: '0031-bound-multivolume.json', url: 'https://iiif.io/api/cookbook/recipe/0031-bound-multivolume/manifest.json' },

  // ── Choice ────────────────────────────────────────────────────
  { name: '0033-choice.json', url: 'https://iiif.io/api/cookbook/recipe/0033-choice/manifest.json' },
  { name: '0434-choice-av.json', url: 'https://iiif.io/api/cookbook/recipe/0434-choice-av/manifest.json' },

  // ── Layout / composition ──────────────────────────────────────
  { name: '0035-foldouts.json', url: 'https://iiif.io/api/cookbook/recipe/0035-foldouts/manifest.json' },
  { name: '0036-composition-from-multiple-images.json', url: 'https://iiif.io/api/cookbook/recipe/0036-composition-from-multiple-images/manifest.json' },
  { name: '0040-image-rotation-service.json', url: 'https://iiif.io/api/cookbook/recipe/0040-image-rotation-service/manifest-service.json' },

  // ── Linking: homepage, seeAlso ────────────────────────────────
  { name: '0047-homepage.json', url: 'https://iiif.io/api/cookbook/recipe/0047-homepage/manifest.json' },
  { name: '0053-seeAlso.json', url: 'https://iiif.io/api/cookbook/recipe/0053-seeAlso/manifest.json' },

  // ── A/V complex ───────────────────────────────────────────────
  { name: '0064-opera-one-canvas.json', url: 'https://iiif.io/api/cookbook/recipe/0064-opera-one-canvas/manifest.json' },
  { name: '0065-opera-multiple-canvases.json', url: 'https://iiif.io/api/cookbook/recipe/0065-opera-multiple-canvases/manifest.json' },
  { name: '0074-multiple-language-captions.json', url: 'https://iiif.io/api/cookbook/recipe/0074-multiple-language-captions/manifest.json' },
];
