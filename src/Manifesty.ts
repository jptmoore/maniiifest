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

    getManifestLabel(): T.LabelT | null {
        return this.specification.kind === 'Manifest' ? F.writeLabelT(this.specification.value.label) : null;
    }

    getManifestSummary(): T.SummaryT | null {
        return this.specification.kind === 'Manifest' ? F.writeSummaryT(this.specification.value.summary) : null;
    }

    getManifestViewingDirection(): T.ViewingDirectionT | null {
        return this.specification.kind === 'Manifest' ? F.writeViewingDirectionT(this.specification.value.viewingDirection) : null;
    }

    getManifestBehavior(): T.BehaviorT | null {
        return this.specification.kind === 'Manifest' ? F.writeBehaviorT(this.specification.value.behavior) : null;
    }

    getManifestNavDate(): T.NavDateT | null {
        return this.specification.kind === 'Manifest' ? F.writeNavDateT(this.specification.value.navDate) : null;
    }

    getManifestRights(): T.RightsT | null {
        return this.specification.kind === 'Manifest' ? F.writeRightsT(this.specification.value.rights) : null;
    }

    getManifestRequiredStatement(): T.RequiredStatementT | null {
        return this.specification.kind === 'Manifest' ? F.writeRequiredStatementT(this.specification.value.requiredStatement) : null;
    }

    getManifestStart(): T.StartT | null {
        return this.specification.kind === 'Manifest' ? F.writeStartT(this.specification.value.start) : null;
    }

    getManifest(): T.ManifestT | null {
        return this.specification.kind === 'Manifest' ? F.writeManifestT(this.specification.value) : null;
    }

    getCollection(): T.CollectionT | null {
        return this.specification.kind === 'Collection' ? F.writeCollectionT(this.specification.value) : null;
    }

    *iterateManifestCanvasW3cAnnotation(): IterableIterator<T.AnnotationT> {
        if (this.specification.kind === 'Manifest') {
            for (const canvas of this.specification.value.items ?? []) {
                for (const annotationPage of canvas.annotations ?? []) {
                    for (const annotation of annotationPage.items ?? []) {
                        yield F.writeAnnotationT(annotation);
                    }
                }
            }
        }
    }

    *iterateManifestCanvasW3cAnnotationPage(): IterableIterator<T.AnnotationPageT> {
        if (this.specification.kind === 'Manifest') {
            for (const canvas of this.specification.value.items ?? []) {
                for (const annotationPage of canvas.annotations ?? []) {
                    yield F.writeAnnotationPageT(annotationPage);
                }
            }
        }
    }

    *iterateManifestCanvasAnnotationPage(): IterableIterator<T.AnnotationPageT> {
        if (this.specification.kind === 'Manifest') {
            for (const canvas of this.specification.value.items ?? []) {
                for (const annotationPage of canvas.items ?? []) {
                    yield F.writeAnnotationPageT(annotationPage);
                }
            }
        }
    }

    *iterateManifestCanvasAnnotation(): IterableIterator<T.AnnotationT> {
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

    *iterateManifestCanvasAnnotationBodyService(): IterableIterator<T.ServiceT> {
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

    *iterateManifestCanvasAnnotationBodyServiceService(): IterableIterator<T.ServiceT> {
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

    *iterateManifestCanvas(): IterableIterator<T.CanvasT> {
        if (this.specification.kind === 'Manifest') {
            for (const canvas of this.specification.value.items ?? []) {
                yield F.writeCanvasT(canvas);
            }
        }
    }

    *iterateManifestThumbnail(): IterableIterator<T.ThumbnailT> {
        if (this.specification.kind === 'Manifest') {
            for (const thumbnail of this.specification.value.thumbnail ?? []) {
                yield F.writeThumbnailT(thumbnail);
            }
        }
    }

    *iterateManifestHomepage(): IterableIterator<T.HomepageT> {
        if (this.specification.kind === 'Manifest') {
            for (const homepage of this.specification.value.homepage ?? []) {
                yield F.writeHomepageT(homepage);
            }
        }
    }

    *iterateManifestProvider(): IterableIterator<T.ProviderT> {
        if (this.specification.kind === 'Manifest') {
            for (const provider of this.specification.value.provider ?? []) {
                yield F.writeProviderT(provider);
            }
        }
    }

    *iterateManifestRendering(): IterableIterator<T.RenderingT> {
        if (this.specification.kind === 'Manifest') {
            for (const rendering of this.specification.value.rendering ?? []) {
                yield F.writeRenderingT(rendering);
            }
        }
    }

    *iterateManifestProviderHomepage(): IterableIterator<T.HomepageT> {
        if (this.specification.kind === 'Manifest') {
            for (const provider of this.specification.value.provider ?? []) {
                for (const homepage of provider.homepage ?? []) {
                    yield F.writeHomepageT(homepage);
                }
            }
        }
    }

    *iterateManifestProviderSeeAlso(): IterableIterator<T.SeeAlsoT> {
        if (this.specification.kind === 'Manifest') {
            for (const provider of this.specification.value.provider ?? []) {
                for (const seeAlso of provider.seeAlso ?? []) {
                    yield F.writeSeeAlsoT(seeAlso);
                }
            }
        }
    }

    *iterateManifestMetadata(): IterableIterator<T.MetadataT> {
        if (this.specification.kind === 'Manifest') {
            for (const metadata of this.specification.value.metadata ?? []) {
                yield F.writeMetadataT(metadata);
            }
        }
    }

    *iterateManifestSeeAlso(): IterableIterator<T.SeeAlsoT> {
        if (this.specification.kind === 'Manifest') {
            for (const seeAlso of this.specification.value.seeAlso ?? []) {
                yield F.writeSeeAlsoT(seeAlso);
            }
        }
    }

    *iterateManifestPartOf(): IterableIterator<T.PartOfT> {
        if (this.specification.kind === 'Manifest') {
            for (const partOf of this.specification.value.partOf ?? []) {
                yield F.writePartOfT(partOf);
            }
        }
    }

    *iterateManifestStructures(): IterableIterator<T.RangeT> {
        if (this.specification.kind === 'Manifest') {
            for (const range of this.specification.value.structures ?? []) {
                yield F.writeRangeT(range);
            }
        }
    }

    *iterateManifestStructuresItems(): IterableIterator<T.RangeItemsT> {
        if (this.specification.kind === 'Manifest') {
            for (const range of this.specification.value.structures ?? []) {
                for (const item of range.items ?? []) {
                    yield F.writeRangeItemsT(item);
                }
            }
        }
    }

    *iterateManifest(): IterableIterator<T.ManifestT> {
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

    *iterateCollection(): IterableIterator<T.CollectionT> {
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

    *iterateCollectionLabel(): IterableIterator<T.LabelT> {
        if (this.specification.kind === 'Collection') {
            yield F.writeLabelT(this.specification.value.label);
            const traverse = function* (items: Array<{ kind: string; value: any }>): IterableIterator<T.LabelT> {
                for (const item of items) {
                    if (item.kind === 'Collection') {
                        yield F.writeLabelT(item.value.label);
                        yield* traverse(item.value.items);
                    }
                }
            };
            yield* traverse(this.specification.value.items);
        }
    }

    *iterateCollectionMetadata(): IterableIterator<T.MetadataT> {
        if (this.specification.kind === 'Collection') {
            for (const metadata of this.specification.value.metadata ?? []) {
                yield F.writeMetadataT(metadata);
            }
            const traverse = function* (items: Array<{ kind: string; value: any }>): IterableIterator<T.MetadataT> {
                for (const item of items) {
                    if (item.kind === 'Collection') {
                        for (const metadata of item.value.metadata ?? []) {
                            yield F.writeMetadataT(metadata);
                        }
                        yield* traverse(item.value.items);
                    }
                }
            };
            yield* traverse(this.specification.value.items);
        }

    }


    *iterateManifestService(): IterableIterator<T.ServiceT> {
        if (this.specification.kind === 'Manifest') {
            for (const service of this.specification.value.service ?? []) {
                yield F.writeServiceT(service);
            }
        }
    }


    *iterateManifestThumbnailService(): IterableIterator<T.ServiceT> {
        if (this.specification.kind === 'Manifest') {
            for (const thumbnail of this.specification.value.thumbnail ?? []) {
                for (const service of thumbnail.service ?? []) {
                    yield F.writeServiceT(service);
                }
            }
        }
    }

    *iterateManifestThumbnailServiceService(): IterableIterator<T.ServiceT> {
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

    *iterateManifestServiceService(): IterableIterator<T.ServiceT> {
        if (this.specification.kind === 'Manifest') {
            for (const service of this.specification.value.service ?? []) {
                for (const serviceService of service.value.service ?? []) {
                    yield F.writeServiceT(serviceService);
                }
            }
        }
    }

    *iterateManifestServices(): IterableIterator<T.ServiceT> {
        if (this.specification.kind === 'Manifest') {
            for (const services of this.specification.value.services ?? []) {
                yield F.writeServiceT(services);
            }
        }
    }

    *iterateManifestServicesService(): IterableIterator<T.ServiceT> {
        if (this.specification.kind === 'Manifest') {
            for (const services of this.specification.value.services ?? []) {
                for (const service of services.value.service ?? []) {
                    yield F.writeServiceT(service);
                }
            }
        }
    }

    *iterateManifestW3cAnnotation(): IterableIterator<T.AnnotationT> {
        if (this.specification.kind === 'Manifest') {
            for (const annotationPage of this.specification.value.annotations ?? []) {
                for (const annotation of annotationPage.items ?? []) {
                    yield F.writeAnnotationT(annotation);
                }
            }
        }
    }

}