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
        if (this.specification.kind === 'Manifest') {
            for (const canvas of this.specification.value.items ?? []) {
                for (const annotationPage of canvas.annotations ?? []) {
                    for (const annotation of annotationPage.items ?? []) {
                        yield F.writeW3cAnnotationT(annotation);
                    }
                }
            }
        }
    }

    *getCanvasW3cAnnotationPage(): IterableIterator<T.W3cAnnotationPageT> {
        if (this.specification.kind === 'Manifest') {
            for (const canvas of this.specification.value.items ?? []) {
                for (const annotationPage of canvas.annotations ?? []) {
                    yield F.writeW3cAnnotationPageT(annotationPage);
                }
            }
        }
    }

    *getCanvasAnnotationPage(): IterableIterator<T.AnnotationPageT> {
        if (this.specification.kind === 'Manifest') {
            for (const canvas of this.specification.value.items ?? []) {
                for (const annotationPage of canvas.items ?? []) {
                    yield F.writeAnnotationPageT(annotationPage);
                }
            }
        }
    }

    *getCanvasAnnotation(): IterableIterator<T.AnnotationT> {
        if (this.specification.kind === 'Manifest') {
            for (const canvas of this.specification.value.items ?? []) {
                for (const annotationPage of canvas.items ?? []) {
                    for (const annotation of annotationPage.items ?? []) {
                        yield F.writeAnnotationT(annotation);
                    }
                }
            }
        }
    }

    *getCanvasAnnotationBodyService(): IterableIterator<T.ServiceT> {
        if (this.specification.kind === 'Manifest') {
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
    }

    *getCanvasAnnotationBodyServiceService(): IterableIterator<T.ServiceT> {
        if (this.specification.kind === 'Manifest') {
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
    }

    *getCanvas(): IterableIterator<T.CanvasT> {
        if (this.specification.kind === 'Manifest') {
            for (const canvas of this.specification.value.items ?? []) {
                yield F.writeCanvasT(canvas);
            }
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


    *getManifestService(): IterableIterator<T.ServiceT> {
        if (this.specification.kind === 'Manifest') {
            for (const service of this.specification.value.service ?? []) {
                yield F.writeServiceT(service);
            }
        }
    }


    *getManifestThumbnailService(): IterableIterator<T.ServiceT> {
        if (this.specification.kind === 'Manifest') {
            for (const thumbnail of this.specification.value.thumbnail ?? []) {
                for (const service of thumbnail.service ?? []) {
                    yield F.writeServiceT(service);
                }
            }
        }
    }

    *getManifestThumbnailServiceService(): IterableIterator<T.ServiceT> {
        if (this.specification.kind === 'Manifest') {
            for (const thumbnail of this.specification.value.thumbnail ?? []) {
                for (const service of thumbnail.service ?? []) {
                    for (const serviceService of service.value.service ?? []) {
                        yield F.writeServiceT(serviceService);
                    }
                }
            }
        }
    }

    *getManifestServiceService(): IterableIterator<T.ServiceT> {
        if (this.specification.kind === 'Manifest') {
            for (const service of this.specification.value.service ?? []) {
                for (const serviceService of service.value.service ?? []) {
                    yield F.writeServiceT(serviceService);
                }
            }
        }
    }

    *getManifestServices(): IterableIterator<T.ServiceT> {
        if (this.specification.kind === 'Manifest') {
            for (const services of this.specification.value.services ?? []) {
                yield F.writeServiceT(services);
            }
        }
    }

    *getManifestServicesService(): IterableIterator<T.ServiceT> {
        if (this.specification.kind === 'Manifest') {
            for (const services of this.specification.value.services ?? []) {
                for (const service of services.value.service ?? []) {
                    yield F.writeServiceT(service);
                }
            }
        }
    }

    *getManifestW3cAnnotation(): IterableIterator<T.W3cAnnotationT> {
        if (this.specification.kind === 'Manifest') {
            for (const annotationPage of this.specification.value.annotations ?? []) {
                for (const annotation of annotationPage.items ?? []) {
                    yield F.writeW3cAnnotationT(annotation);
                }
            }
        }
    }

}