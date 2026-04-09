import * as F from "./specification";
import type * as U from "./iiif-types";

/**
 * Parses and provides access to a standalone W3C Annotation Collection.
 *
 * Create via `Maniiifest.parseAnnotationCollection(data)` or `new ManiiifestAnnotationCollection(data)`.
 */
export class ManiiifestAnnotationCollection {
    private spec: F.AnnotationCollectionT;

    constructor(data: any) {
        try {
            this.spec = F.readAnnotationCollectionT(data);
        } catch (error) {
            throw new Error(`Failed to parse IIIF data as AnnotationCollection: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    getAnnotationCollection(): U.AnnotationCollection {
        return F.writeAnnotationCollectionT(this.spec);
    }

    getAnnotationCollectionId(): U.Id | null {
        return this.spec.id !== undefined ? F.writeIdT(this.spec.id) : null;
    }

    getAnnotationCollectionType(): U.Type {
        return F.writeTypeT(this.spec.type);
    }

    getAnnotationCollectionContext(): U.Context | null {
        return this.spec.context !== undefined
            ? F.writeContextT(this.spec.context) as unknown as U.Context
            : null;
    }

    getAnnotationCollectionLabel(): U.Label | null {
        return this.spec.label !== undefined
            ? F.writeLabelT(this.spec.label) as unknown as U.Label
            : null;
    }

    getAnnotationCollectionFirst(): U.First | null {
        return this.spec.first !== undefined
            ? F.writeFirstT(this.spec.first) as unknown as U.First
            : null;
    }

    getAnnotationCollectionLast(): U.Last | null {
        return this.spec.last !== undefined ? F.writeLastT(this.spec.last) : null;
    }

    getAnnotationCollectionTotal(): U.Total | null {
        return this.spec.total !== undefined ? F.writeTotalT(this.spec.total) : null;
    }

    *iterateAnnotationCollectionAnnotation(): IterableIterator<U.Annotation> {
        for (const annotation of this.spec.items ?? []) {
            yield F.writeAnnotationT(annotation);
        }
    }
}
