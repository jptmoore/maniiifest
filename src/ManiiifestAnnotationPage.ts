import * as F from "./specification";
import type * as U from "./iiif-types";

/**
 * Parses and provides access to a standalone W3C Annotation Page.
 *
 * Create via `Maniiifest.parseAnnotationPage(data)` or `new ManiiifestAnnotationPage(data)`.
 */
export class ManiiifestAnnotationPage {
    private spec: F.AnnotationPageT;

    constructor(data: any) {
        try {
            this.spec = F.readAnnotationPageT(data);
        } catch (error) {
            throw new Error(`Failed to parse IIIF data as AnnotationPage: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    getAnnotationPage(): U.AnnotationPage {
        return F.writeAnnotationPageT(this.spec);
    }

    getAnnotationPageId(): U.Id | null {
        return this.spec.id !== undefined ? F.writeIdT(this.spec.id) : null;
    }

    getAnnotationPageType(): U.Type {
        return F.writeTypeT(this.spec.type);
    }

    getAnnotationPageContext(): U.Context | null {
        return this.spec.context !== undefined
            ? F.writeContextT(this.spec.context) as unknown as U.Context
            : null;
    }

    getAnnotationPagePartOf(): U.PartOf | null {
        return this.spec.partOf !== undefined
            ? F.writePartOfT(this.spec.partOf) as unknown as U.PartOf
            : null;
    }

    getAnnotationPageLabel(): U.Label | null {
        return this.spec.label !== undefined
            ? F.writeLabelT(this.spec.label) as unknown as U.Label
            : null;
    }

    getAnnotationPageNext(): U.Next | null {
        return this.spec.next !== undefined ? F.writeNextT(this.spec.next) : null;
    }

    getAnnotationPageStartIndex(): U.StartIndex | null {
        return this.spec.startIndex !== undefined ? F.writeStartIndexT(this.spec.startIndex) : null;
    }

    *iterateAnnotationPageAnnotation(): IterableIterator<U.Annotation> {
        for (const annotation of this.spec.items ?? []) {
            yield F.writeAnnotationT(annotation);
        }
    }

    *iterateAnnotationPageAnnotationTextualBody(): IterableIterator<U.AnnotationBodyTextualBody> {
        for (const annotation of this.spec.items ?? []) {
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

    *iterateAnnotationPageAnnotationPartOf(): IterableIterator<U.AnnotationTargetCanvasRef> {
        for (const annotation of this.spec.items ?? []) {
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
