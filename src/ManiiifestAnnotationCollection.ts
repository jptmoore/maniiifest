import * as F from "./specification";
import type * as U from "./iiif-types";

/**
 * Parses and provides access to a standalone W3C Annotation Collection.
 *
 * Create via `Maniiifest.parseAnnotationCollection(data)` or `new ManiiifestAnnotationCollection(data)`.
 */
export class ManiiifestAnnotationCollection {
    private specification: F.AnnotationCollectionT;

    constructor(data: any) {
        try {
            this.specification = F.readAnnotationCollectionT(data);
        } catch (error) {
            throw new Error(`Failed to parse IIIF data as AnnotationCollection: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    getAnnotationCollection(): U.AnnotationCollection {
        return F.writeAnnotationCollectionT(this.specification);
    }

    getAnnotationCollectionId(): U.Id | null {
        return this.specification.id !== undefined ? F.writeIdT(this.specification.id) : null;
    }

    getAnnotationCollectionType(): U.Type {
        return F.writeTypeT(this.specification.type);
    }

    getAnnotationCollectionContext(): U.Context | null {
        return this.specification.context !== undefined
            ? F.writeContextT(this.specification.context) as unknown as U.Context
            : null;
    }

    getAnnotationCollectionLabel(): U.Label | null {
        return this.specification.label !== undefined
            ? F.writeLabelT(this.specification.label) as unknown as U.Label
            : null;
    }

    getAnnotationCollectionFirst(): U.First | null {
        return this.specification.first !== undefined
            ? F.writeFirstT(this.specification.first) as unknown as U.First
            : null;
    }

    getAnnotationCollectionLast(): U.Last | null {
        return this.specification.last !== undefined ? F.writeLastT(this.specification.last) : null;
    }

    getAnnotationCollectionTotal(): U.Total | null {
        return this.specification.total !== undefined ? F.writeTotalT(this.specification.total) : null;
    }

    *iterateAnnotationCollectionAnnotation(): IterableIterator<U.Annotation> {
        for (const annotation of this.specification.items ?? []) {
            yield F.writeAnnotationT(annotation);
        }
    }
}
