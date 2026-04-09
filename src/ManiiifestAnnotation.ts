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

    *iterateAnnotationTarget(): IterableIterator<U.AnnotationTarget> {
        if (this.specification.target?.kind === 'Array') {
            for (const target of this.specification.target.value) {
                yield F.writeAnnotationTargetT(target) as unknown as U.AnnotationTarget;
            }
        } else if (this.specification.target) {
            yield F.writeAnnotationTargetT(this.specification.target.value) as unknown as U.AnnotationTarget;
        }
    }

    *iterateAnnotationFeature(): IterableIterator<U.Feature> {
        if (this.specification.body?.kind === 'Value' && this.specification.body.value.kind === 'FeatureCollection') {
            for (const feature of this.specification.body.value.value.features ?? []) {
                yield F.writeFeatureT(feature);
            }
        }
    }

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
}
