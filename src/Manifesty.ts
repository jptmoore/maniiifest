import * as F from "./specification";
import type * as T from "./specification";

export class Manifesty {
    specification: any;

    constructor(data: any) {
        try {
            this.specification = F.readSpecificationT(data);
        } catch (error) {
            console.error("Failed to read specification:", error);
        }
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

    *getManifest(): IterableIterator<T.ManifestT> {
        if (this.specification.kind === 'Manifest') {
            yield F.writeManifestT(this.specification.value);
        } else if (this.specification.kind === 'Collection') {
            const traverse = function* (items: Array<{ kind: string; value: any }>): IterableIterator<T.ManifestT> {
                for (const item of items) {
                    if (item.kind === 'Manifest') {
                        yield F.writeManifestT(item.value);
                    } else if (item.kind === 'Collection') {
                        yield* traverse(item.value.items); 
                    }
                }
            };
            yield* traverse(this.specification.value.items);
        }
    }

    *getCollection(): IterableIterator<T.CollectionT> {
        if (this.specification.kind === 'Collection') {
            yield F.writeCollectionT(this.specification.value);
            const traverse = function* (items: Array<{ kind: string; value: any }>): IterableIterator<T.CollectionT> {
                for (const item of items) {
                    if (item.kind === 'Collection') {
                        yield F.writeCollectionT(item.value);
                        yield* traverse(item.value.items); 
                    }
                }
            };
            yield* traverse(this.specification.value.items);
        }
    }

}