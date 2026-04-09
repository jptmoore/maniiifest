import * as F from "./specification";
import type * as U from "./iiif-types";

/**
 * Parses and provides access to a standalone W3C Annotation.
 *
 * Create via `Maniiifest.parseAnnotation(data)` or `new ManiiifestAnnotation(data)`.
 */
export class ManiiifestAnnotation {
    private spec: F.AnnotationT;

    constructor(data: any) {
        try {
            this.spec = F.readAnnotationT(data);
        } catch (error) {
            throw new Error(`Failed to parse IIIF data as Annotation: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    getAnnotation(): U.Annotation {
        return F.writeAnnotationT(this.spec);
    }

    getAnnotationId(): U.Id | null {
        return this.spec.id !== undefined ? F.writeIdT(this.spec.id) : null;
    }

    getAnnotationType(): U.Type {
        return F.writeTypeT(this.spec.type);
    }

    getAnnotationContext(): U.Context | null {
        return this.spec.context !== undefined
            ? F.writeContextT(this.spec.context) as unknown as U.Context
            : null;
    }

    getAnnotationBody(): U.Body | null {
        return this.spec.body !== undefined
            ? F.writeBodyT(this.spec.body) as unknown as U.Body
            : null;
    }

    getAnnotationTarget(): U.Target | null {
        return this.spec.target !== undefined
            ? F.writeTargetT(this.spec.target) as unknown as U.Target
            : null;
    }

    getAnnotationMotivation(): U.Motivation | null {
        return this.spec.motivation !== undefined
            ? F.writeMotivationT(this.spec.motivation) as unknown as U.Motivation
            : null;
    }

    getAnnotationCreator(): U.Creator | null {
        return this.spec.creator !== undefined
            ? F.writeCreatorT(this.spec.creator) as unknown as U.Creator
            : null;
    }

    getAnnotationCreated(): U.Created | null {
        return this.spec.created !== undefined ? F.writeCreatedT(this.spec.created) : null;
    }

    getAnnotationModified(): U.Modified | null {
        return this.spec.modified !== undefined ? F.writeModifiedT(this.spec.modified) : null;
    }

    getAnnotationFeatureCollection(): U.FeatureCollection | null {
        if (this.spec.body?.kind === 'Value' && this.spec.body.value.kind === 'FeatureCollection') {
            return F.writeFeatureCollectionT(this.spec.body.value.value);
        }
        return null;
    }

    *iterateAnnotationTextualBody(): IterableIterator<U.AnnotationBodyTextualBody> {
        if (this.spec.body?.kind === 'Array') {
            for (const body of this.spec.body.value) {
                if (body.kind === 'TextualBody') {
                    yield F.writeAnnotationBodyTextualBody(body.value);
                }
            }
        } else if (this.spec.body?.kind === 'Value') {
            if (this.spec.body.value.kind === 'TextualBody') {
                yield F.writeAnnotationBodyTextualBody(this.spec.body.value.value);
            }
        }
    }

    *iterateAnnotationResourceBody(): IterableIterator<U.AnnotationBodyResource> {
        if (this.spec.body?.kind === 'Array') {
            for (const body of this.spec.body.value) {
                if (body.kind === 'Resource') {
                    yield F.writeAnnotationBodyResource(body.value);
                }
            }
        } else if (this.spec.body?.kind === 'Value') {
            if (this.spec.body.value.kind === 'Resource') {
                yield F.writeAnnotationBodyResource(this.spec.body.value.value);
            }
        }
    }

    *iterateAnnotationTarget(): IterableIterator<U.AnnotationTarget> {
        if (this.spec.target?.kind === 'Array') {
            for (const target of this.spec.target.value) {
                yield F.writeAnnotationTargetT(target) as unknown as U.AnnotationTarget;
            }
        } else if (this.spec.target) {
            yield F.writeAnnotationTargetT(this.spec.target.value) as unknown as U.AnnotationTarget;
        }
    }

    *iterateAnnotationFeature(): IterableIterator<U.Feature> {
        if (this.spec.body?.kind === 'Value' && this.spec.body.value.kind === 'FeatureCollection') {
            for (const feature of this.spec.body.value.value.features ?? []) {
                yield F.writeFeatureT(feature);
            }
        }
    }

    *iterateAnnotationGeometryPointCoordinates(): IterableIterator<U.PointCoordinates> {
        if (this.spec.body?.kind === 'Value' && this.spec.body.value.kind === 'FeatureCollection') {
            for (const feature of this.spec.body.value.value.features ?? []) {
                if (feature.geometry?.kind === 'Point') {
                    for (const coordinates of feature.geometry.value.coordinates ?? []) {
                        yield F.writePointCoordinatesT(coordinates);
                    }
                }
            }
        }
    }
}
