import * as F from "./specification";
import type * as U from "./iiif-types";

/**
 * Parses and provides access to a standalone W3C Annotation Page.
 *
 * Create via `Maniiifest.parseAnnotationPage(data)` or `new ManiiifestAnnotationPage(data)`.
 */
export class ManiiifestAnnotationPage {
    private specification: F.AnnotationPageT;

    constructor(data: any) {
        try {
            this.specification = F.readAnnotationPageT(data);
        } catch (error) {
            throw new Error(`Failed to parse IIIF data as AnnotationPage: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    getAnnotationPage(): U.AnnotationPage {
        return F.writeAnnotationPageT(this.specification);
    }

    getAnnotationPageId(): U.Id | null {
        return this.specification.id !== undefined ? F.writeIdT(this.specification.id) : null;
    }

    getAnnotationPageType(): U.Type {
        return F.writeTypeT(this.specification.type);
    }

    getAnnotationPageContext(): U.Context | null {
        return this.specification.context !== undefined
            ? F.writeContextT(this.specification.context) as unknown as U.Context
            : null;
    }

    getAnnotationPagePartOf(): U.PartOf | null {
        return this.specification.partOf !== undefined
            ? F.writePartOfT(this.specification.partOf) as unknown as U.PartOf
            : null;
    }

    getAnnotationPageLabel(): U.Label | null {
        return this.specification.label !== undefined
            ? F.writeLabelT(this.specification.label) as unknown as U.Label
            : null;
    }

    getAnnotationPageNext(): U.Next | null {
        return this.specification.next !== undefined ? F.writeNextT(this.specification.next) : null;
    }

    getAnnotationPageStartIndex(): U.StartIndex | null {
        return this.specification.startIndex !== undefined ? F.writeStartIndexT(this.specification.startIndex) : null;
    }

    /** @yields {U.Annotation} Each annotation in the page. */
    *iterateAnnotationPageAnnotation(): IterableIterator<U.Annotation> {
        for (const annotation of this.specification.items ?? []) {
            yield F.writeAnnotationT(annotation);
        }
    }

    /** @yields {U.AnnotationBodyTextualBody} Each textual body from annotations in the page. */
    *iterateAnnotationPageAnnotationTextualBody(): IterableIterator<U.AnnotationBodyTextualBody> {
        for (const annotation of this.specification.items ?? []) {
            if (annotation.body?.kind === 'Array') {
                for (const body of annotation.body.value) {
                    if (body.kind === 'TextualBody') {
                        yield F.writeAnnotationBodyTextualBody(body.value);
                    }
                }
            } else {
                if (annotation.body?.value?.kind === 'TextualBody') {
                    yield F.writeAnnotationBodyTextualBody(annotation.body.value.value);
                }
            }
        }
    }

    /** @yields {U.AnnotationTargetCanvasRef} Each canvas reference target from annotations in the page. */
    *iterateAnnotationPageAnnotationCanvasRef(): IterableIterator<U.AnnotationTargetCanvasRef> {
        for (const annotation of this.specification.items ?? []) {
            if (annotation.target?.kind === 'Array') {
                for (const target of annotation.target.value) {
                    if (target.kind === 'CanvasRef') {
                        yield F.writeAnnotationTargetCanvasRef(target.value);
                    }
                }
            } else {
                if (annotation.target?.value?.kind === 'CanvasRef') {
                    yield F.writeAnnotationTargetCanvasRef(annotation.target.value.value);
                }
            }
        }
    }
}
