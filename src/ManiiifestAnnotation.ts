import * as F from "./specification";
import type * as U from "./iiif-types";

/**
 * Parses and provides access to a standalone W3C Annotation.
 *
 * Create via `Maniiifest.parseAnnotation(data)` or `new ManiiifestAnnotation(data)`.
 */
export class ManiiifestAnnotation {
    private specification: F.AnnotationT;

    constructor(data: any) {
        try {
            this.specification = F.readAnnotationT(data);
        } catch (error) {
            throw new Error(`Failed to parse IIIF data as Annotation: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    getAnnotation(): U.Annotation {
        return F.writeAnnotationT(this.specification);
    }

    getAnnotationId(): U.Id | null {
        return this.specification.id !== undefined ? F.writeIdT(this.specification.id) : null;
    }

    getAnnotationType(): U.Type {
        return F.writeTypeT(this.specification.type);
    }

    getAnnotationContext(): U.Context | null {
        return this.specification.context !== undefined
            ? F.writeContextT(this.specification.context) as unknown as U.Context
            : null;
    }

    getAnnotationBody(): U.Body | null {
        return this.specification.body !== undefined
            ? F.writeBodyT(this.specification.body) as unknown as U.Body
            : null;
    }

    getAnnotationTarget(): U.Target | null {
        return this.specification.target !== undefined
            ? F.writeTargetT(this.specification.target) as unknown as U.Target
            : null;
    }

    getAnnotationMotivation(): U.Motivation | null {
        return this.specification.motivation !== undefined
            ? F.writeMotivationT(this.specification.motivation) as unknown as U.Motivation
            : null;
    }

    getAnnotationCreator(): U.Creator | null {
        return this.specification.creator !== undefined
            ? F.writeCreatorT(this.specification.creator) as unknown as U.Creator
            : null;
    }

    getAnnotationGenerator(): U.Generator | null {
        return this.specification.generator !== undefined
            ? F.writeGeneratorT(this.specification.generator) as unknown as U.Generator
            : null;
    }

    getAnnotationCreated(): U.Created | null {
        return this.specification.created !== undefined ? F.writeCreatedT(this.specification.created) : null;
    }

    getAnnotationModified(): U.Modified | null {
        return this.specification.modified !== undefined ? F.writeModifiedT(this.specification.modified) : null;
    }

    getAnnotationFeatureCollection(): U.FeatureCollection | null {
        if (this.specification.body?.kind === 'Value' && this.specification.body.value.kind === 'FeatureCollection') {
            return F.writeFeatureCollectionT(this.specification.body.value.value);
        }
        return null;
    }

    /** @returns {U.AnnotationTargetFeature | null} The GeoJSON Feature target, if present. */
    getAnnotationTargetFeature(): U.AnnotationTargetFeature | null {
        if (this.specification.target?.kind === 'Value' && this.specification.target.value.kind === 'Feature') {
            return F.writeAnnotationTargetFeature(this.specification.target.value.value) as unknown as U.AnnotationTargetFeature;
        }
        return null;
    }

    /** @returns {U.AnnotationTargetFeatureCollection | null} The GeoJSON FeatureCollection target, if present. */
    getAnnotationTargetFeatureCollection(): U.AnnotationTargetFeatureCollection | null {
        if (this.specification.target?.kind === 'Value' && this.specification.target.value.kind === 'FeatureCollection') {
            return F.writeAnnotationTargetFeatureCollection(this.specification.target.value.value) as unknown as U.AnnotationTargetFeatureCollection;
        }
        return null;
    }

    /** @yields {U.AnnotationBodyTextualBody} Each textual body from the annotation. */
    *iterateAnnotationTextualBody(): IterableIterator<U.AnnotationBodyTextualBody> {
        if (this.specification.body?.kind === 'Array') {
            for (const body of this.specification.body.value) {
                if (body.kind === 'TextualBody') {
                    yield F.writeAnnotationBodyTextualBody(body.value);
                }
            }
        } else if (this.specification.body?.kind === 'Value') {
            if (this.specification.body.value.kind === 'TextualBody') {
                yield F.writeAnnotationBodyTextualBody(this.specification.body.value.value);
            }
        }
    }

    /** @yields {U.AnnotationBodyResource} Each resource body from the annotation. */
    *iterateAnnotationResourceBody(): IterableIterator<U.AnnotationBodyResource> {
        if (this.specification.body?.kind === 'Array') {
            for (const body of this.specification.body.value) {
                if (body.kind === 'Resource') {
                    yield F.writeAnnotationBodyResource(body.value);
                }
            }
        } else if (this.specification.body?.kind === 'Value') {
            if (this.specification.body.value.kind === 'Resource') {
                yield F.writeAnnotationBodyResource(this.specification.body.value.value);
            }
        }
    }

    /** @yields {U.AnnotationTarget} Each target of the annotation. */
    *iterateAnnotationTarget(): IterableIterator<U.AnnotationTarget> {
        if (this.specification.target?.kind === 'Array') {
            for (const target of this.specification.target.value) {
                yield F.writeAnnotationTargetT(target) as unknown as U.AnnotationTarget;
            }
        } else if (this.specification.target) {
            yield F.writeAnnotationTargetT(this.specification.target.value) as unknown as U.AnnotationTarget;
        }
    }

    /** @yields {U.Feature} Each GeoJSON feature from a FeatureCollection body. */
    *iterateAnnotationFeature(): IterableIterator<U.Feature> {
        if (this.specification.body?.kind === 'Value' && this.specification.body.value.kind === 'FeatureCollection') {
            for (const feature of this.specification.body.value.value.features ?? []) {
                yield F.writeFeatureT(feature);
            }
        }
    }

    /** @yields {U.PointCoordinates} Each point coordinate pair from FeatureCollection geometry. */
    *iterateAnnotationGeometryPointCoordinates(): IterableIterator<U.PointCoordinates> {
        if (this.specification.body?.kind === 'Value' && this.specification.body.value.kind === 'FeatureCollection') {
            for (const feature of this.specification.body.value.value.features ?? []) {
                if (feature.geometry?.kind === 'Point') {
                    for (const coordinates of feature.geometry.value.coordinates ?? []) {
                        yield F.writePointCoordinatesT(coordinates);
                    }
                }
            }
        }
    }

    /** @yields {U.Feature} Each GeoJSON feature from a Feature or FeatureCollection target. */
    *iterateAnnotationTargetFeature(): IterableIterator<U.Feature> {
        if (this.specification.target?.kind === 'Value') {
            const target = this.specification.target.value;
            if (target.kind === 'Feature') {
                yield F.writeFeatureT(target.value);
            } else if (target.kind === 'FeatureCollection') {
                for (const feature of target.value.features ?? []) {
                    yield F.writeFeatureT(feature);
                }
            }
        }
    }

    /** @yields {U.PointCoordinates} Each point coordinate pair from target geometry. */
    *iterateAnnotationTargetGeometryPointCoordinates(): IterableIterator<U.PointCoordinates> {
        if (this.specification.target?.kind !== 'Value') {
            return;
        }
        const target = this.specification.target.value;
        const features = target.kind === 'Feature'
            ? [target.value]
            : target.kind === 'FeatureCollection'
                ? target.value.features ?? []
                : [];
        for (const feature of features) {
            if (feature.geometry?.kind === 'Point') {
                for (const coordinates of feature.geometry.value.coordinates ?? []) {
                    yield F.writePointCoordinatesT(coordinates);
                }
            }
        }
    }
}
