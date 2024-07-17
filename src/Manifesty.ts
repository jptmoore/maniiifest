import * as F from "./specification";
import type * as T from "./specification";

class UndefinedPropertyError extends Error {
    constructor(property: string) {
        super(`${property} is undefined`);
        this.name = 'UndefinedPropertyError';
    }
}

export class Manifesty {
    specification: any;

    constructor(data: any) {
        try {
            this.specification = F.readSpecificationT(data);
        } catch (error) {
            console.error("Failed to read specification:", error);
        }
    }

    getSpecification(): T.SpecificationT {
        if (!this.specification) {
            throw new UndefinedPropertyError('Specification');
        }
        return F.writeSpecificationT(this.specification);
    }

    getLabel(): T.LabelT {
        if (!this.specification?.value?.label) {
            throw new UndefinedPropertyError('Label');
        }
        return F.writeLabelT(this.specification.value.label);
    }

    getRequiredStatement(): T.RequiredStatementT {
        if (!this.specification?.value?.requiredStatement) {
            throw new UndefinedPropertyError('Required statement');
        }
        return F.writeRequiredStatementT(this.specification.value.requiredStatement);
    }

    getSummary(): T.SummaryT {
        if (!this.specification?.value?.summary) {
            throw new UndefinedPropertyError('Summary');
        }
        return F.writeSummaryT(this.specification.value.summary);
    }



    *getCanvasW3cAnnotation(): IterableIterator<T.W3cAnnotationT> {
        for (const canvas of this.specification.value.items ?? []) {
            for (const annotationPage of canvas.annotations ?? []) {
                for (const annotation of annotationPage.items ?? []) {
                    yield F.writeW3cAnnotationT(annotation);
                }
            }
        }
    }

    *getCanvasW3cAnnotationPage(): IterableIterator<T.W3cAnnotationPageT> {
        for (const canvas of this.specification.value.items ?? []) {
            for (const annotationPage of canvas.annotations ?? []) {
                yield F.writeW3cAnnotationPageT(annotationPage);
            }
        }
    }

    *getCanvasAnnotationPage(): IterableIterator<T.AnnotationPageT> {
        for (const canvas of this.specification.value.items ?? []) {
            for (const annotationPage of canvas.items ?? []) {
                yield F.writeAnnotationPageT(annotationPage);
            }
        }
    }

    *getCanvasAnnotation(): IterableIterator<T.AnnotationT> {
        for (const canvas of this.specification.value.items ?? []) {
            for (const annotationPage of canvas.items ?? []) {
                for (const annotation of annotationPage.items ?? []) {
                    yield F.writeAnnotationT(annotation);
                }
            }
        }
    }

    *getCanvasAnnotationBodyService(): IterableIterator<T.ServiceT> {
        for (const canvas of this.specification.value.items ?? []) {
            for (const annotationPage of canvas.items ?? []) {
                for (const annotation of annotationPage.items ?? []) {
                    for (const service of annotation.body.service ?? []) {
                            yield F.writeServiceT(service);
                        }
                }
            }
        }
    }

    *getCanvasAnnotationBodyServiceService(): IterableIterator<T.ServiceT> {
        for (const canvas of this.specification.value.items ?? []) {
            for (const annotationPage of canvas.items ?? []) {
                for (const annotation of annotationPage.items ?? []) {
                    for (const service of annotation.body.service ?? []) {
                            for (const serviceService of service.value.service ?? []) {
                                yield F.writeServiceT(serviceService);
                            }
                        }
                }
            }
        }
    }

    *getCanvas(): IterableIterator<T.CanvasT> {
        for (const canvas of this.specification.value.items ?? []) {
            yield F.writeCanvasT(canvas);
        }
    }
    
    *getThumbnail(): IterableIterator<T.ThumbnailT> {
        for (const thumbnail of this.specification.value.thumbnail ?? []) {
            yield F.writeThumbnailT(thumbnail);
        }
    }
    
    *getMetadata(): IterableIterator<T.MetadataT> {
        for (const metadata of this.specification.value.metadata ?? []) {
            yield F.writeMetadataT(metadata);
        }
    }

}