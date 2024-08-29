
/**
 * Imports all exports from the "specification" module as F and imports types from the "specification" module as T.
 *
 * The F namespace is used to access functions and constants defined in the "specification" module.
 * The T namespace is used to access types defined in the "specification" module.
 */
import * as F from "./specification";
import type * as T from "./specification";

/**
 * The `Maniiifest` class provides methods to parse and manipulate IIIF JSON manifests and collections.
 * It ensures type safety and offers utility functions for working with IIIF data.
 */
export class Maniiifest {
    specification: any;

    /**
     * Constructs a new instance of the class and initializes the specification.
     *
     * This constructor attempts to read the specification from the provided data.
     * If reading the specification fails, an error is logged to the console.
     *
     * @param {any} data - The data from which to read the specification.
     */
    constructor(data: any) {
        try {
            this.specification = F.readSpecificationT(data);
        } catch (error) {
            console.error("Failed to read specification:", error);
        }
    }

    /**
     * Retrieves the manifest ID if the specification kind is 'Manifest'.
     *
     * @returns {T.IdT | null} The manifest ID if the specification kind is 'Manifest', otherwise `null`.
     */    
    getManifestId(): T.IdT | null {
        return this.specification.kind === 'Manifest' ? F.writeIdT(this.specification.value.id) : null;
    }
    
    /**
     * Retrieves the label from the manifest specification if it is of kind 'Manifest'.
     *
     * @returns {T.LabelT | null} The label if the specification is of kind 'Manifest' and has a label value, otherwise null.
     */
    getManifestLabel(): T.LabelT | null {
        return this.specification.kind === 'Manifest' ? F.writeLabelT(this.specification.value.label) : null;
    }

    /**
     * Retrieves the summary from the manifest specification if it is of kind 'Manifest'.
     *
     * @returns {T.SummaryT | null} The summary if the specification is of kind 'Manifest' and has a summary value, otherwise null.
     */
    getManifestSummary(): T.SummaryT | null {
        return this.specification.kind === 'Manifest' && this.specification.value?.summary !== undefined
            ? F.writeSummaryT(this.specification.value.summary)
            : null;
    }

    /**
     * Retrieves the viewing direction from the manifest specification if it is of kind 'Manifest'.
     *
     * @returns {T.ViewingDirectionT | null} The viewing direction if the specification is of kind 'Manifest' and has a viewing direction value, otherwise null.
     */
    getManifestViewingDirection(): T.ViewingDirectionT | null {
        return this.specification.kind === 'Manifest' && this.specification.value.viewingDirection !== undefined
            ? F.writeViewingDirectionT(this.specification.value.viewingDirection)
            : null;
    }

    /**
     * Retrieves the navigation date from the manifest specification if it is of kind 'Manifest'.
     *
     * @returns {T.NavDateT | null} The navigation date if the specification is of kind 'Manifest' and has a navDate value, otherwise null.
     */
    getManifestNavDate(): T.NavDateT | null {
        return this.specification.kind === 'Manifest' && this.specification.value.navDate !== undefined
            ? F.writeNavDateT(this.specification.value.navDate)
            : null;
    }

    /**
     * Retrieves the navigation place from the manifest specification if it is of kind 'Manifest'.
     *
     * @returns {T.NavPlaceT | null} The navigation place if the specification is of kind 'Manifest' and has a navPlace value, otherwise null.
     */
    getManifestNavPlace(): T.NavPlaceT | null {
        return this.specification.kind === 'Manifest' && this.specification.value.navPlace !== undefined
            ? F.writeNavPlaceT(this.specification.value.navPlace)
            : null;
    }

    /**
     * Retrieves the rights statement from the manifest specification if it is of kind 'Manifest'.
     *
     * @returns {T.RightsT | null} The rights statement if the specification is of kind 'Manifest' and has a rights value, otherwise null.
     */
    getManifestRights(): T.RightsT | null {
        return this.specification.kind === 'Manifest' && this.specification.value.rights !== undefined
            ? F.writeRightsT(this.specification.value.rights)
            : null;
    }

    /**
     * Retrieves the required statement from the manifest specification if it is of kind 'Manifest'.
     *
     * @returns {T.RequiredStatementT | null} The required statement if the specification is of kind 'Manifest' and has a required statement value, otherwise null.
     */
    getManifestRequiredStatement(): T.RequiredStatementT | null {
        return this.specification.kind === 'Manifest' && this.specification.value.requiredStatement !== undefined
            ? F.writeRequiredStatementT(this.specification.value.requiredStatement)
            : null;
    }

    /**
     * Retrieves the start element from the manifest specification if it is of kind 'Manifest'.
     *
     * @returns {T.StartT | null} The start element if the specification is of kind 'Manifest' and has a start value, otherwise null.
     */
    getManifestStart(): T.StartT | null {
        return this.specification.kind === 'Manifest' && this.specification.value.start !== undefined
            ? F.writeStartT(this.specification.value.start)
            : null;
    }

    /**
     * Retrieves the manifest from the manifest specification if it is of kind 'Manifest'.
     *
     * @returns {T.ManifestT | null} The manifest if the specification is of kind 'Manifest' and has a value, otherwise null.
     */
    getManifest(): T.ManifestT | null {
        return this.specification.kind === 'Manifest' && this.specification.value !== undefined
            ? F.writeManifestT(this.specification.value)
            : null;
    }

    /**
     * Retrieves the collection from the manifest specification if it is of kind 'Collection'.
     *
     * @returns {T.CollectionT | null} The collection if the specification is of kind 'Collection' and has a value, otherwise null.
     */
    getCollection(): T.CollectionT | null {
        return this.specification.kind === 'Collection' && this.specification.value !== undefined
            ? F.writeCollectionT(this.specification.value)
            : null;
    }

    /**
     * Retrieves the collection ID from the manifest specification if it is of kind 'Collection'.
     *
     * @returns {T.IdT | null} The collection ID if the specification is of kind 'Collection', otherwise null.
     */
    getCollectionId(): T.IdT | null {
        return this.specification.kind === 'Collection' ? F.writeIdT(this.specification.value.id) : null;
    }

    /**
     * Retrieves the collection label from the manifest specification if it is of kind 'Collection'.
     *
     * @returns {T.LabelT | null} The collection label if the specification is of kind 'Collection', otherwise null.
     */
    getCollectionLabel(): T.LabelT | null {
        return this.specification.kind === 'Collection' ? F.writeLabelT(this.specification.value.label) : null;
    }


    /**
     * Iterates over the W3C annotation elements on the canvases in the manifest.
     *
     * This generator function yields W3C annotation elements from the canvases in the manifest.
     *
     * @yields {T.AnnotationT} The next W3C annotation element on the canvases in the manifest.
     */
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

    /**
     * Iterates over the W3C annotation page elements on the canvases in the manifest.
     *
     * This generator function yields W3C annotation page elements from the canvases in the manifest.
     *
     * @yields {T.AnnotationPageT} The next W3C annotation page element on the canvases in the manifest.
     */
    *iterateManifestCanvasW3cAnnotationPage(): IterableIterator<T.AnnotationPageT> {
        if (this.specification.kind === 'Manifest') {
            for (const canvas of this.specification.value.items ?? []) {
                for (const annotationPage of canvas.annotations ?? []) {
                    yield F.writeAnnotationPageT(annotationPage);
                }
            }
        }
    }

    /**
     * Iterates over the annotation page elements on the canvases in the manifest.
     *
     * This generator function yields annotation page elements from the canvases in the manifest.
     *
     * @yields {T.AnnotationPageT} The next annotation page element on the canvases in the manifest.
     */
    *iterateManifestCanvasAnnotationPage(): IterableIterator<T.AnnotationPageT> {
        if (this.specification.kind === 'Manifest') {
            for (const canvas of this.specification.value.items ?? []) {
                for (const annotationPage of canvas.items ?? []) {
                    yield F.writeAnnotationPageT(annotationPage);
                }
            }
        }
    }

    /**
     * Iterates over the annotation elements on the canvases in the manifest.
     *
     * This generator function yields annotation elements from the canvases in the manifest.
     *
     * @yields {T.AnnotationT} The next annotation element on the canvases in the manifest.
     */
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

    /**
     * Iterates over the service elements within the annotation bodies on the canvases in the manifest.
     *
     * This generator function yields service elements from the annotation bodies on the canvases in the manifest.
     *
     * @yields {T.ServiceT} The next service element within the annotation bodies on the canvases in the manifest.
     */
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

    /**
     * Iterates over the service elements within the services of the annotation bodies on the canvases in the manifest.
     *
     * This generator function yields service elements from the services within the annotation bodies on the canvases in the manifest.
     *
     * @yields {T.ServiceT} The next service element within the services of the annotation bodies on the canvases in the manifest.
     */
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

    /**
     * Iterates over the canvas elements in the manifest.
     *
     * This generator function yields canvas elements from the manifest.
     *
     * @yields {T.CanvasT} The next canvas element in the manifest.
     */
    *iterateManifestCanvas(): IterableIterator<T.CanvasT> {
        if (this.specification.kind === 'Manifest') {
            for (const canvas of this.specification.value.items ?? []) {
                yield F.writeCanvasT(canvas);
            }
        }
    }

    /**
     * Iterates over the thumbnail elements in the manifest.
     *
     * This generator function yields thumbnail elements from the manifest.
     *
     * @yields {T.ThumbnailT} The next thumbnail element in the manifest.
     */
    *iterateManifestThumbnail(): IterableIterator<T.ThumbnailT> {
        if (this.specification.kind === 'Manifest') {
            for (const thumbnail of this.specification.value.thumbnail ?? []) {
                yield F.writeThumbnailT(thumbnail);
            }
        }
    }

    /**
     * Iterates over the homepage elements in the manifest.
     *
     * This generator function yields homepage elements from the manifest.
     *
     * @yields {T.HomepageT} The next homepage element in the manifest.
     */
    *iterateManifestHomepage(): IterableIterator<T.HomepageT> {
        if (this.specification.kind === 'Manifest') {
            for (const homepage of this.specification.value.homepage ?? []) {
                yield F.writeHomepageT(homepage);
            }
        }
    }


    /**
     * Iterates over the behavior elements in the manifest.
     *
     * This generator function yields behavior elements from the manifest.
     *
     * @yields {T.BehaviorT} The next behavior element in the manifest.
     */
    *iterateManifestBehavior(): IterableIterator<T.BehaviorT> {
        if (this.specification.kind === 'Manifest') {
            for (const behavior of this.specification.value.behavior ?? []) {
                yield F.writeBehaviorT(behavior);
            }
        }
    }

    /**
     * Iterates over the providers in the manifest.
     *
     * This generator function yields providers from the manifest.
     *
     * @yields {T.ProviderT} The next provider in the manifest.
     */
    *iterateManifestProvider(): IterableIterator<T.ProviderT> {
        if (this.specification.kind === 'Manifest') {
            for (const provider of this.specification.value.provider ?? []) {
                yield F.writeProviderT(provider);
            }
        }
    }



    /**
     * Iterates over the "rendering" elements in the manifest.
     *
     * This generator function yields "rendering" elements from the manifest.
     *
     * @yields {T.RenderingT} The next "rendering" element in the manifest.
     */
    *iterateManifestRendering(): IterableIterator<T.RenderingT> {
        if (this.specification.kind === 'Manifest') {
            for (const rendering of this.specification.value.rendering ?? []) {
                yield F.writeRenderingT(rendering);
            }
        }
    }

    /**
     * Iterates over the "homepage" elements in the providers of the manifest.
     *
     * This generator function yields "homepage" elements from the providers within the manifest.
     *
     * @yields {T.HomepageT} The next "homepage" element in the providers of the manifest.
     */
    *iterateManifestProviderHomepage(): IterableIterator<T.HomepageT> {
        if (this.specification.kind === 'Manifest') {
            for (const provider of this.specification.value.provider ?? []) {
                for (const homepage of provider.homepage ?? []) {
                    yield F.writeHomepageT(homepage);
                }
            }
        }
    }

    /**
     * Iterates over the "seeAlso" elements in the providers of the manifest.
     *
     * This generator function yields "seeAlso" elements from the providers within the manifest.
     *
     * @yields {T.SeeAlsoT} The next "seeAlso" element in the providers of the manifest.
     */
    *iterateManifestProviderSeeAlso(): IterableIterator<T.SeeAlsoT> {
        if (this.specification.kind === 'Manifest') {
            for (const provider of this.specification.value.provider ?? []) {
                for (const seeAlso of provider.seeAlso ?? []) {
                    yield F.writeSeeAlsoT(seeAlso);
                }
            }
        }
    }

    /**
     * Iterates over the metadata elements in the manifest.
     *
     * This generator function yields metadata elements from the manifest.
     *
     * @yields {T.MetadataT} The next metadata element in the manifest.
     */
    *iterateManifestMetadata(): IterableIterator<T.MetadataT> {
        if (this.specification.kind === 'Manifest') {
            for (const metadata of this.specification.value.metadata ?? []) {
                yield F.writeMetadataT(metadata);
            }
        }
    }

    /**
     * Iterates over the "seeAlso" elements in the manifest.
     *
     * This generator function yields "seeAlso" elements from the manifest.
     *
     * @yields {T.SeeAlsoT} The next "seeAlso" element in the manifest.
     */
    *iterateManifestSeeAlso(): IterableIterator<T.SeeAlsoT> {
        if (this.specification.kind === 'Manifest') {
            for (const seeAlso of this.specification.value.seeAlso ?? []) {
                yield F.writeSeeAlsoT(seeAlso);
            }
        }
    }

    /**
     * Iterates over the "partOf" elements in the manifest.
     *
     * This generator function yields "partOf" elements from the manifest.
     *
     * @yields {T.PartOfT} The next "partOf" element in the manifest.
     */
    *iterateManifestPartOf(): IterableIterator<T.PartOfT> {
        if (this.specification.kind === 'Manifest') {
            for (const partOf of this.specification.value.partOf ?? []) {
                yield F.writePartOfT(partOf);
            }
        }
    }

    /**
     * Iterates over the ranges in the manifest.
     *
     * This generator function yields ranges from the structures within the manifest.
     *
     * @yields {T.RangeT} The next range in the manifest.
     */
    *iterateManifestRange(): IterableIterator<T.RangeT> {
        if (this.specification.kind === 'Manifest') {
            for (const range of this.specification.value.structures ?? []) {
                yield F.writeRangeT(range);
            }
        }
    }

    /**
     * Iterates over the navigation place features in the manifest.
     *
     * This generator function yields features from the navigation places within the manifest.
     *
     * @yields {T.FeatureT} The next feature in the navigation places of the manifest.
     */
    *iterateManifestNavPlaceFeature(): IterableIterator<T.FeatureT> {
        if (this.specification.kind === 'Manifest') {
            for (const feature of this.specification.value.navPlace?.features ?? []) {
                yield F.writeFeatureT(feature);
            }

        }
    }

    /**
     * Iterates over the navigation place features in the manifest's canvases.
     *
     * This generator function yields features from the navigation places within the canvases of the manifest.
     *
     * @yields {T.FeatureT} The next feature in the navigation places of the manifest's canvases.
     */
    *iterateManifestCanvasNavPlaceFeature(): IterableIterator<T.FeatureT> {
        if (this.specification.kind === 'Manifest') {
            for (const canvas of this.specification.value.items ?? []) {
                for (const feature of canvas.navPlace?.features ?? []) {
                    yield F.writeFeatureT(feature);
                }
            }
        }
    }

    /**
     * Iterates over the range items in the manifest.
     *
     * This generator function yields range items from the structures within the manifest.
     *
     * @yields {T.RangeItemsT} The next range item in the manifest.
     */
    *iterateManifestRangeItem(): IterableIterator<T.RangeItemsT> {
        if (this.specification.kind === 'Manifest') {
            for (const range of this.specification.value.structures ?? []) {
                for (const item of range.items ?? []) {
                    yield F.writeRangeItemsT(item);
                }
            }
        }
    }

    /**
     * Iterates over the collections in the specification.
     *
     * This generator function yields collections from the specification and recursively from nested collections.
     *
     * @yields {T.CollectionT} The next collection item in the specification.
     */
    *iterateCollection(): IterableIterator<T.CollectionT> {
        if (this.specification.kind === 'Collection') {
            yield F.writeCollectionT(this.specification.value);
            const traverse = function* (items?: Array<{ kind: string; value: any }>): IterableIterator<T.CollectionT> {
                if (!items) return; // Handle case where items might not exist
                for (const item of items) {
                    if (item.kind === 'Collection') {
                        yield F.writeCollectionT(item.value);
                        if (item.value.items) { // Check if items exist before recursion
                            yield* traverse(item.value.items);
                        }
                    }
                }
            };
            if (this.specification.value.items) { // Check if items exist before starting traversal
                yield* traverse(this.specification.value.items);
            }
        }
    }

    /**
     * Iterates over the manifests in the collection.
     *
     * This generator function yields manifests from the collection's manifest and recursively from nested collections.
     *
     * @yields {T.ManifestT} The next manifest item in the collection.
     */
    *iterateCollectionManifest(): IterableIterator<T.ManifestT> {
        if (this.specification.kind === 'Manifest') {
            yield F.writeManifestT(this.specification.value);
        } else if (this.specification.kind === 'Collection' && this.specification.value.items) {
            const traverse = function* (items?: Array<{ kind: string; value: any }>): IterableIterator<T.ManifestT> {
                if (!items) return; // Handle case where items might not exist
                for (const item of items) {
                    if (item.kind === 'Manifest') {
                        yield F.writeManifestT(item.value);
                    } else if (item.kind === 'Collection' && item.value.items) {
                        yield* traverse(item.value.items);
                    }
                }
            };
            yield* traverse(this.specification.value.items);
        }
    }

    /**
     * Iterates over the labels in the collection.
     *
     * This generator function yields labels from the collection's label and recursively from nested collections.
     *
     * @yields {T.LabelT} The next label item in the collection.
     */
    *iterateCollectionLabel(): IterableIterator<T.LabelT> {
        if (this.specification.kind === 'Collection') {
            yield F.writeLabelT(this.specification.value.label);
            const traverse = function* (items?: Array<{ kind: string; value: any }>): IterableIterator<T.LabelT> {
                if (!items) return; // Handle case where items might not exist
                for (const item of items) {
                    if (item.kind === 'Collection') {
                        yield F.writeLabelT(item.value.label);
                        if (item.value.items) { // Check if items exist before recursion
                            yield* traverse(item.value.items);
                        }
                    }
                }
            };
            if (this.specification.value.items) { // Check if items exist before starting traversal
                yield* traverse(this.specification.value.items);
            }
        }
    }

    /**
     * Iterates over the metadata in the collection.
     *
     * This generator function yields metadata from the collection's metadata and recursively from nested collections.
     *
     * @yields {T.MetadataT} The next metadata item in the collection.
     */
    *iterateCollectionMetadata(): IterableIterator<T.MetadataT> {
        if (this.specification.kind === 'Collection') {
            for (const metadata of this.specification.value.metadata ?? []) {
                yield F.writeMetadataT(metadata);
            }
            const traverse = function* (items?: Array<{ kind: string; value: any }>): IterableIterator<T.MetadataT> {
                if (!items) return; // Handle case where items might not exist
                for (const item of items) {
                    if (item.kind === 'Collection') {
                        for (const metadata of item.value.metadata ?? []) {
                            yield F.writeMetadataT(metadata);
                        }
                        if (item.value.items) { // Check if items exist before recursion
                            yield* traverse(item.value.items);
                        }
                    }
                }
            };
            if (this.specification.value.items) { // Check if items exist before starting traversal
                yield* traverse(this.specification.value.items);
            }
        }
    }


    /**
     * Iterates over the services in the manifest.
     *
     * This generator function yields services from the service pages within the manifest.
     *
     * @yields {T.ServiceT} The next service in the manifest.
     */
    *iterateManifestService(): IterableIterator<T.ServiceT> {
        if (this.specification.kind === 'Manifest') {
            for (const service of this.specification.value.service ?? []) {
                yield F.writeServiceT(service);
            }
        }
    }


    /**
     * Iterates over the services within the thumbnail services in the manifest.
     *
     * This generator function yields services from the service pages within the thumbnail services of the manifest.
     *
     * @yields {T.ServiceT} The next service within the thumbnail services in the manifest.
     */
    *iterateManifestThumbnailService(): IterableIterator<T.ServiceT> {
        if (this.specification.kind === 'Manifest') {
            for (const thumbnail of this.specification.value.thumbnail ?? []) {
                for (const service of thumbnail.service ?? []) {
                    yield F.writeServiceT(service);
                }
            }
        }
    }

    /**
     * Iterates over the nested services within the thumbnail services in the manifest.
     *
     * This generator function yields services from the nested service pages within the thumbnail services of the manifest.
     *
     * @yields {T.ServiceT} The next nested service within the thumbnail services in the manifest.
     */
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

    /**
     * Iterates over the nested services in the manifest.
     *
     * This generator function yields services from the nested service pages within the manifest.
     *
     * @yields {T.ServiceT} The next nested service in the manifest.
     */
    *iterateManifestServiceService(): IterableIterator<T.ServiceT> {
        if (this.specification.kind === 'Manifest') {
            for (const service of this.specification.value.service ?? []) {
                for (const serviceService of service.value.service ?? []) {
                    yield F.writeServiceT(serviceService);
                }
            }
        }
    }

    /**
     * Iterates over the services in the manifest.
     *
     * This generator function yields services from the manifest's service pages.
     *
     * @yields {T.ServiceT} The next service in the manifest.
     */
    *iterateManifestServices(): IterableIterator<T.ServiceT> {
        if (this.specification.kind === 'Manifest') {
            for (const services of this.specification.value.services ?? []) {
                yield F.writeServiceT(services);
            }
        }
    }

    /**
     * Iterates over the services in the manifest.
     *
     * This generator function yields services from the manifest's service pages.
     *
     * @yields {T.ServiceT} The next service in the manifest.
     */
    *iterateManifestServicesService(): IterableIterator<T.ServiceT> {
        if (this.specification.kind === 'Manifest') {
            for (const services of this.specification.value.services ?? []) {
                for (const service of services.value.service ?? []) {
                    yield F.writeServiceT(service);
                }
            }
        }
    }



    /**
     * Iterates over the W3C annotations in the manifest.
     *
     * This generator function yields annotations from the manifest's annotation pages.
     *
     * @yields {T.AnnotationT} The next annotation in the manifest.
     */
    *iterateManifestW3cAnnotation(): IterableIterator<T.AnnotationT> {
        if (this.specification.kind === 'Manifest') {
            for (const annotationPage of this.specification.value.annotations ?? []) {
                for (const annotation of annotationPage.items ?? []) {
                    yield F.writeAnnotationT(annotation);
                }
            }
        }
    }

    /**
     * Iterates over W3C Annotation Pages in a Manifest.
     * 
     * This generator function iterates through each annotation page present in the manifest's annotations.
     * It yields each annotation page transformed by `F.writeAnnotationPageT` for further processing.
     * 
     * @yields {IterableIterator<T.AnnotationPageT>} An iterator that yields annotation pages as `T.AnnotationPageT` objects.
     */
    *iterateManifestW3cAnnotationPage(): IterableIterator<T.AnnotationPageT> {
        if (this.specification.kind === 'Manifest') {
            for (const annotationPage of this.specification.value.annotations ?? []) {
                yield F.writeAnnotationPageT(annotationPage);
            }
        }
    }

}