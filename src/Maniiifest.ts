
/**
 * Imports all exports from the "specification" module as F and types from "iiif-types" as U.
 *
 * The F namespace is used to access functions and constants defined in the "specification" module.
 * The U namespace is used to access user-facing types from the "iiif-types" module.
 */
import * as F from "./specification";
import type * as U from "./iiif-types";

/**
 * The `Maniiifest` class provides methods to parse and manipulate IIIF JSON manifests and collections.
 * It ensures type safety and offers utility functions for working with IIIF data.
 */
export class Maniiifest {
    private specification: any;

    /**
     * Constructs a new instance of the Maniiifest class.
     *
     * This constructor initializes the specification based on the provided data and type.
     * It supports the following types:
     * - "AnnotationCollection": Reads the data as an AnnotationCollection specification.
     * - "AnnotationPage": Reads the data as an AnnotationPage specification.
     * - "Annotation": Reads the data as an Annotation specification.
     * - undefined: Reads the data as a general specification.
     *
     * @param data - The data to be parsed into a specification.
     * @param type - The type of the specification. Can be "AnnotationCollection", "AnnotationPage", "Annotation", or undefined.
     * @throws {Error} Throws an error if an unsupported type is provided.
     */
    constructor(data: any, type?: string) {
        try {
            switch (type) {
                case "AnnotationCollection":
                    this.specification = F.readAnnotationCollectionT(data);
                    break;
                case "AnnotationPage":
                    this.specification = F.readAnnotationPageT(data);
                    break;
                case "Annotation":
                    this.specification = F.readAnnotationT(data);
                    break;
                case undefined:
                    this.specification = F.readSpecificationT(data);
                    break;
                default:
                    throw new Error(`Unsupported type: ${type}`);
            }
        } catch (error) {
            if (error instanceof Error && error.message.startsWith('Unsupported type:')) {
                throw error;
            }
            throw new Error(`Failed to parse IIIF data${type ? ` as ${type}` : ''}: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    /**
     * Yields service items from an ATD service field that may be Array or single Value.
     */
    private *yieldServiceItems(service: any): IterableIterator<U.ServiceItem> {
        if (service?.kind === 'Array') {
            for (const item of service.value ?? []) {
                yield F.writeServiceItemT(item) as unknown as U.ServiceItem;
            }
        } else if (service?.kind === 'Value') {
            yield F.writeServiceItemT(service.value) as unknown as U.ServiceItem;
        }
    }

    /**
     * Retrieves the type of the manifest specification.
     *
     * @returns {string} The type of the manifest specification.
     */
    getSpecificationType(): 'Manifest' | 'Collection' {
        return this.specification.kind;
    }

    /**
     * Retrieves the context from the manifest specification if it is of kind 'Manifest'.
     *
     * @returns {U.Context | null} The context if the specification is of kind 'Manifest', otherwise null.
     */
    getManifestContext(): U.Context | null {
        return this.specification.kind === 'Manifest' && this.specification.value.context !== undefined
            ? F.writeContextT(this.specification.value.context) as unknown as U.Context
            : null;
    }

    /**
     * Retrieves the manifest ID if the specification kind is 'Manifest'.
     *
     * @returns {U.Id | null} The manifest ID if the specification kind is 'Manifest', otherwise `null`.
     */
    getManifestId(): U.Id | null {
        return this.specification.kind === 'Manifest' && this.specification.value.id !== undefined
            ? F.writeIdT(this.specification.value.id)
            : null;
    }

    /**
     * Retrieves the label from the manifest specification if it is of kind 'Manifest'.
     *
     * @returns {U.Label | null} The label if the specification is of kind 'Manifest' and has a label value, otherwise null.
     */
    getManifestLabel(): U.Label | null {
        return this.specification.kind === 'Manifest' && this.specification.value.label !== undefined
            ? F.writeLabelT(this.specification.value.label) as unknown as U.Label
            : null;
    }

    /**
     * Retrieves the label from the manifest specification by language if it is of kind 'Manifest'.
     *
     * @param {string} language - The language code to retrieve the label for.
     * @returns {U.LngString | null} The label for the specified language if it exists, otherwise null.
     */
    getManifestLabelByLanguage(language: string): U.LngString | null {
        if (this.specification.kind === 'Manifest' && this.specification.value.label !== undefined && this.specification.value.label.kind === 'Multilingual') {
            const labels = this.specification.value.label.value;
            for (const [lang, values] of labels) {
                if (lang === language) {
                    return F.writeLngStringT([[lang, values]]);
                }
            }
        }
        return null;
    }

    /**
     * Retrieves the summary from the manifest specification if it is of kind 'Manifest'.
     *
     * @returns {U.Summary | null} The summary if the specification is of kind 'Manifest' and has a summary value, otherwise null.
     */
    getManifestSummary(): U.Summary | null {
        return this.specification.kind === 'Manifest' && this.specification.value?.summary !== undefined
            ? F.writeSummaryT(this.specification.value.summary)
            : null;
    }

    /**
     * Retrieves the viewing direction from the manifest specification if it is of kind 'Manifest'.
     *
     * @returns {U.ViewingDirection | null} The viewing direction if the specification is of kind 'Manifest' and has a viewing direction value, otherwise null.
     */
    getManifestViewingDirection(): U.ViewingDirection | null {
        return this.specification.kind === 'Manifest' && this.specification.value.viewingDirection !== undefined
            ? F.writeViewingDirectionT(this.specification.value.viewingDirection)
            : null;
    }

    /**
     * Retrieves the navigation date from the manifest specification if it is of kind 'Manifest'.
     *
     * @returns {U.NavDate | null} The navigation date if the specification is of kind 'Manifest' and has a navDate value, otherwise null.
     */
    getManifestNavDate(): U.NavDate | null {
        return this.specification.kind === 'Manifest' && this.specification.value.navDate !== undefined
            ? F.writeNavDateT(this.specification.value.navDate)
            : null;
    }

    /**
     * Retrieves the navigation place from the manifest specification if it is of kind 'Manifest'.
     *
     * @returns {U.NavPlace | null} The navigation place if the specification is of kind 'Manifest' and has a navPlace value, otherwise null.
     */
    getManifestNavPlace(): U.NavPlace | null {
        return this.specification.kind === 'Manifest' && this.specification.value.navPlace !== undefined
            ? F.writeNavPlaceT(this.specification.value.navPlace)
            : null;
    }

    /**
     * Retrieves the rights statement from the manifest specification if it is of kind 'Manifest'.
     *
     * @returns {U.Rights | null} The rights statement if the specification is of kind 'Manifest' and has a rights value, otherwise null.
     */
    getManifestRights(): U.Rights | null {
        return this.specification.kind === 'Manifest' && this.specification.value.rights !== undefined
            ? F.writeRightsT(this.specification.value.rights)
            : null;
    }

    /**
     * Retrieves the required statement from the manifest specification if it is of kind 'Manifest'.
     *
     * @returns {U.RequiredStatement | null} The required statement if the specification is of kind 'Manifest' and has a required statement value, otherwise null.
     */
    getManifestRequiredStatement(): U.RequiredStatement | null {
        return this.specification.kind === 'Manifest' && this.specification.value.requiredStatement !== undefined
            ? F.writeRequiredStatementT(this.specification.value.requiredStatement)
            : null;
    }

    /**
     * Retrieves the start element from the manifest specification if it is of kind 'Manifest'.
     *
     * @returns {U.Start | null} The start element if the specification is of kind 'Manifest' and has a start value, otherwise null.
     */
    getManifestStart(): U.Start | null {
        return this.specification.kind === 'Manifest' && this.specification.value.start !== undefined
            ? F.writeStartT(this.specification.value.start)
            : null;
    }

    /**
     * Retrieves the service from the manifest specification if it is of kind 'Manifest'.
     *
     * @returns {U.Service | null} The service if the specification is of kind 'Manifest' and has a service value, otherwise null.
     */
    getManifestService(): U.Service | null {
        return this.specification.kind === 'Manifest' && this.specification.value.service !== undefined
            ? F.writeServiceT(this.specification.value.service) as unknown as U.Service
            : null;
    }

    /**
     * Retrieves the manifest from the manifest specification if it is of kind 'Manifest'.
     *
     * @returns {U.Manifest | null} The manifest if the specification is of kind 'Manifest' and has a value, otherwise null.
     */
    getManifest(): U.Manifest | null {
        return this.specification.kind === 'Manifest' && this.specification.value !== undefined
            ? F.writeManifestT(this.specification.value)
            : null;
    }

    /**
     * Retrieves the collection from the manifest specification if it is of kind 'Collection'.
     *
     * @returns {U.Collection | null} The collection if the specification is of kind 'Collection' and has a value, otherwise null.
     */
    getCollection(): U.Collection | null {
        return this.specification.kind === 'Collection' && this.specification.value !== undefined
            ? F.writeCollectionT(this.specification.value)
            : null;
    }

    /**
     * Retrieves the context from the manifest specification if it is of kind 'Collection'.
     *
     * @returns {U.Context | null} The context if the specification is of kind 'Collection', otherwise null.
     */
    getCollectionContext(): U.Context | null {
        return this.specification.kind === 'Collection' && this.specification.value.context !== undefined
            ? F.writeContextT(this.specification.value.context) as unknown as U.Context
            : null;
    }

    /**
     * Retrieves the collection ID from the manifest specification if it is of kind 'Collection'.
     *
     * @returns {U.Id | null} The collection ID if the specification is of kind 'Collection', otherwise null.
     */
    getCollectionId(): U.Id | null {
        return this.specification.kind === 'Collection' && this.specification.value.id !== undefined
            ? F.writeIdT(this.specification.value.id)
            : null;
    }

    /**
     * Retrieves the collection label from the manifest specification if it is of kind 'Collection'.
     *
     * @returns {U.Label | null} The collection label if the specification is of kind 'Collection', otherwise null.
     */
    getCollectionLabel(): U.Label | null {
        return this.specification.kind === 'Collection' && this.specification.value.label !== undefined
            ? F.writeLabelT(this.specification.value.label) as unknown as U.Label
            : null;
    }

    /**
     * Retrieves the label from the collection specification by language if it is of kind 'Collection'.
     *
     * @param {string} language - The language code to retrieve the label for.
     * @returns {U.LngString | null} The label for the specified language if it exists, otherwise null.
     */
    getCollectionLabelByLanguage(language: string): U.LngString | null {
        if (this.specification.kind === 'Collection' && this.specification.value.label !== undefined && this.specification.value.label.kind === 'Multilingual') {
            const labels = this.specification.value.label.value;
            for (const [lang, values] of labels) {
                if (lang === language) {
                    return F.writeLngStringT([[lang, values]]);
                }
            }
        }
        return null;
    }

    /**
     * Retrieves the service from the collection specification if it is of kind 'Collection'.
     *
     * @returns {U.Service | null} The service if the specification is of kind 'Collection' and has a service value, otherwise null.
     */
    getCollectionService(): U.Service | null {
        return this.specification.kind === 'Collection' && this.specification.value.service !== undefined
            ? F.writeServiceT(this.specification.value.service) as unknown as U.Service
            : null;
    }

    /**
     * Retrieves the required statement from the collection specification if it is of kind 'Collection'.
     *
     * @returns {U.RequiredStatement | null} The required statement if the specification is of kind 'Collection' and has a required statement value, otherwise null.
     */
    getCollectionRequiredStatement(): U.RequiredStatement | null {
        return this.specification.kind === 'Collection' && this.specification.value.requiredStatement !== undefined
            ? F.writeRequiredStatementT(this.specification.value.requiredStatement)
            : null;
    }

    /**
     * Iterates over the W3C annotation elements on the canvases in the manifest.
     *
     * This generator function yields W3C annotation elements from the canvases in the manifest.
     *
     * @yields {U.Annotation} The next W3C annotation element on the canvases in the manifest.
     */
    *iterateManifestCanvasW3cAnnotation(): IterableIterator<U.Annotation> {
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
     * Iterates over the textual bodies of annotations in the manifest's canvases.
     *
     * @returns {IterableIterator<U.AnnotationBodyTextualBody>} An iterator over the textual bodies of annotations.
     */
    *iterateManifestCanvasW3cAnnotationTextualBody(): IterableIterator<U.AnnotationBodyTextualBody> {
        if (this.specification.kind === 'Manifest') {
            for (const canvas of this.specification.value.items ?? []) {
                for (const annotationPage of canvas.annotations ?? []) {
                    for (const annotation of annotationPage.items ?? []) {
                        if (annotation.body?.kind === 'Array') { /* if body is an array */
                            for (const body of annotation.body.value) {
                                if (body.kind === 'TextualBody') {
                                    yield F.writeAnnotationBodyTextualBody(body.value);
                                }
                            }
                        } else { /* single value */
                            if (annotation.body?.value?.kind === 'TextualBody') {
                                yield F.writeAnnotationBodyTextualBody(annotation.body.value.value);
                            }
                        }
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
     * @yields {U.AnnotationPage} The next W3C annotation page element on the canvases in the manifest.
     */
    *iterateManifestCanvasW3cAnnotationPage(): IterableIterator<U.AnnotationPage> {
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
     * @yields {U.AnnotationPage} The next annotation page element on the canvases in the manifest.
     */
    *iterateManifestCanvasAnnotationPage(): IterableIterator<U.AnnotationPage> {
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
     * @yields {U.Annotation} The next annotation element on the canvases in the manifest.
     */
    *iterateManifestCanvasAnnotation(): IterableIterator<U.Annotation> {
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
     * Iterates over the canvas elements in the manifest.
     *
     * This generator function yields canvas elements from the manifest.
     *
     * @yields {U.Canvas} The next canvas element in the manifest.
     */
    *iterateManifestCanvas(): IterableIterator<U.Canvas> {
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
     * @yields {U.Thumbnail} The next thumbnail element in the manifest.
     */
    *iterateManifestThumbnail(): IterableIterator<U.Thumbnail> {
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
     * @yields {U.Homepage} The next homepage element in the manifest.
     */
    *iterateManifestHomepage(): IterableIterator<U.Homepage> {
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
     * @yields {U.Behavior} The next behavior element in the manifest.
     */
    *iterateManifestBehavior(): IterableIterator<U.Behavior> {
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
     * @yields {U.Provider} The next provider in the manifest.
     */
    *iterateManifestProvider(): IterableIterator<U.Provider> {
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
     * @yields {U.Rendering} The next "rendering" element in the manifest.
     */
    *iterateManifestRendering(): IterableIterator<U.Rendering> {
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
     * @yields {U.Homepage} The next "homepage" element in the providers of the manifest.
     */
    *iterateManifestProviderHomepage(): IterableIterator<U.Homepage> {
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
     * @yields {U.SeeAlso} The next "seeAlso" element in the providers of the manifest.
     */
    *iterateManifestProviderSeeAlso(): IterableIterator<U.SeeAlso> {
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
     * @yields {U.Metadata} The next metadata element in the manifest.
     */
    *iterateManifestMetadata(): IterableIterator<U.Metadata> {
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
     * @yields {U.SeeAlso} The next "seeAlso" element in the manifest.
     */
    *iterateManifestSeeAlso(): IterableIterator<U.SeeAlso> {
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
     * @yields {U.PartOf} The next "partOf" element in the manifest.
     */
    *iterateManifestPartOf(): IterableIterator<U.PartOf> {
        if (this.specification.kind === 'Manifest') {
            for (const partOf of this.specification.value.partOf ?? []) {
                yield F.writePartOfT(partOf) as unknown as U.PartOf;
            }
        }
    }

    /**
     * Iterates over the ranges in the manifest.
     *
     * This generator function yields ranges from the structures within the manifest.
     *
     * @yields {U.Range} The next range in the manifest.
     */
    *iterateManifestRange(): IterableIterator<U.Range> {
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
     * @yields {U.Feature} The next feature in the navigation places of the manifest.
     */
    *iterateManifestNavPlaceFeature(): IterableIterator<U.Feature> {
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
     * @yields {U.Feature} The next feature in the navigation places of the manifest's canvases.
     */
    *iterateManifestCanvasNavPlaceFeature(): IterableIterator<U.Feature> {
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
     * @yields {U.RangeItems} The next range item in the manifest.
     */
    *iterateManifestRangeItem(): IterableIterator<U.RangeItems> {
        if (this.specification.kind === 'Manifest') {
            for (const range of this.specification.value.structures ?? []) {
                for (const item of range.items ?? []) {
                    yield F.writeRangeItemsT(item) as unknown as U.RangeItems;
                }
            }
        }
    }


    /**
     * Iterates over the collections and manifests in the specification.
     *
     * This generator function yields collections from the specification, recursively from nested collections,
     * and manifests found within the collections.
     *
     * @yields {U.Collection | U.Manifest} The next collection or manifest item in the specification.
     */
    *iterateCollection(): IterableIterator<U.Collection | U.Manifest> {
        if (!this.specification || !this.specification.kind || !this.specification.value) {
            return; // Handle invalid specification
        }
        if (this.specification.kind === "Collection") {
            yield F.writeCollectionT(this.specification.value);

            const traverse = function* (items?: Array<{ kind: string; value: any }>) {
                if (!items) return; // Handle case where items might not exist
                for (const item of items) {
                    if (item.kind === "Collection") {
                        yield F.writeCollectionT(item.value);
                        if (item.value.items) {
                            yield* traverse(item.value.items); // Recursively process nested collections
                        }
                    } else if (item.kind === "Manifest") {
                        yield F.writeManifestT(item.value); // Yield manifests found in the collection
                    }
                }
            };
            if (this.specification.value.items) {
                yield* traverse(this.specification.value.items);
            }
        } else if (this.specification.kind === "Manifest") {
            // If the specification is a Manifest, yield it directly
            yield F.writeManifestT(this.specification.value);
        }
    }




    /**
     * Iterates over the collections in the specification.
     *
     * This generator function yields collections from the specification and recursively from nested collections.
     *
     * @yields {U.Collection} The next collection item in the specification.
     */
    *iterateCollectionCollection(): IterableIterator<U.Collection> {
        if (this.specification.kind === 'Collection') {
            yield F.writeCollectionT(this.specification.value);
            const traverse = function* (items?: Array<{ kind: string; value: any }>): IterableIterator<U.Collection> {
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
     * @yields {U.Manifest} The next manifest item in the collection.
     */
    *iterateCollectionManifest(): IterableIterator<U.Manifest> {
        if (this.specification.kind === 'Manifest') {
            yield F.writeManifestT(this.specification.value);
        } else if (this.specification.kind === 'Collection' && this.specification.value.items) {
            const traverse = function* (items?: Array<{ kind: string; value: any }>): IterableIterator<U.Manifest> {
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
     * @yields {U.Label} The next label item in the collection.
     */
    *iterateCollectionLabel(): IterableIterator<U.Label> {
        if (this.specification.kind === 'Collection') {
            yield F.writeLabelT(this.specification.value.label) as unknown as U.Label;
            const traverse = function* (items?: Array<{ kind: string; value: any }>): IterableIterator<U.Label> {
                if (!items) return; // Handle case where items might not exist
                for (const item of items) {
                    if (item.kind === 'Collection') {
                        yield F.writeLabelT(item.value.label) as unknown as U.Label;
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
     * Iterates over the thumbnails in the collection.
     *
     * This generator function yields thumbnails from the collection's thumbnail and recursively from nested collections.
     *
     * @yields {U.Thumbnail} The next thumbnail item in the collection.
     */
    *iterateCollectionThumbnail(): IterableIterator<U.Thumbnail> {
        if (this.specification.kind === 'Collection') {
            for (const thumbnail of this.specification.value.thumbnail ?? []) {
                yield F.writeThumbnailT(thumbnail);
            }
            const traverse = function* (items?: Array<{ kind: string; value: any }>): IterableIterator<U.Thumbnail> {
                if (!items) return; // Handle case where items might not exist
                for (const item of items) {
                    if (item.kind === 'Collection') {
                        for (const thumbnail of item.value.thumbnail ?? []) {
                            yield F.writeThumbnailT(thumbnail);
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
     * Iterates over the metadata in the collection.
     *
     * This generator function yields metadata from the collection's metadata and recursively from nested collections.
     *
     * @yields {U.Metadata} The next metadata item in the collection.
     */
    *iterateCollectionMetadata(): IterableIterator<U.Metadata> {
        if (this.specification.kind === 'Collection') {
            for (const metadata of this.specification.value.metadata ?? []) {
                yield F.writeMetadataT(metadata);
            }
            const traverse = function* (items?: Array<{ kind: string; value: any }>): IterableIterator<U.Metadata> {
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
     * Iterates over the providers in the collection.
     *
     * This generator function yields providers from the collection's provider property and recursively from nested collections.
     *
     * @yields {U.Provider} The next provider item in the collection.
     */
    *iterateCollectionProvider(): IterableIterator<U.Provider> {
        if (this.specification.kind === 'Collection') {
            // Yield providers from the top-level collection
            for (const provider of this.specification.value.provider ?? []) {
                yield F.writeProviderT(provider);
            }
            // Define a recursive generator function to traverse nested collections
            const traverse = function* (items?: Array<{ kind: string; value: any }>): IterableIterator<U.Provider> {
                if (!items) return; // Handle case where items might not exist
                for (const item of items) {
                    if (item.kind === 'Collection') {
                        // Yield providers from nested collections
                        for (const provider of item.value.provider ?? []) {
                            yield F.writeProviderT(provider);
                        }
                        // Recursively traverse nested collections
                        if (item.value.items) {
                            yield* traverse(item.value.items);
                        }
                    }
                }
            };
            // Start traversal if there are nested items
            if (this.specification.value.items) {
                yield* traverse(this.specification.value.items);
            }
        }
    }

    /**
     * Iterates over the homepages in the collection.
     *
     * This generator function yields homepages from the collection's homepage property and recursively from nested collections.
     *
     * @yields {U.Homepage} The next homepage item in the collection.
     */
    *iterateCollectionHomepage(): IterableIterator<U.Homepage> {
        if (this.specification.kind === 'Collection') {
            // Yield homepages from the top-level collection
            for (const homepage of this.specification.value.homepage ?? []) {
                yield F.writeHomepageT(homepage);
            }
            // Define a recursive generator function to traverse nested collections
            const traverse = function* (items?: Array<{ kind: string; value: any }>): IterableIterator<U.Homepage> {
                if (!items) return; // Handle case where items might not exist
                for (const item of items) {
                    if (item.kind === 'Collection') {
                        // Yield homepages from nested collections
                        for (const homepage of item.value.homepage ?? []) {
                            yield F.writeHomepageT(homepage);
                        }
                        // Recursively traverse nested collections
                        if (item.value.items) {
                            yield* traverse(item.value.items);
                        }
                    }
                }
            };
            // Start traversal if there are nested items
            if (this.specification.value.items) {
                yield* traverse(this.specification.value.items);
            }
        }
    }

    /**
     * Iterates over the services in the collection.
     *
     * This generator function yields services from the collection's service property and recursively from nested collections.
     *
     * @yields {U.ServiceItem} The next service item in the collection.
     */
    *iterateCollectionService(): IterableIterator<U.ServiceItem> {
        if (this.specification.kind === 'Collection') {
            yield* this.yieldServiceItems(this.specification.value.service);
            const self = this;
            const traverse = function* (items?: Array<{ kind: string; value: any }>): IterableIterator<U.ServiceItem> {
                if (!items) return;
                for (const item of items) {
                    if (item.kind === 'Collection') {
                        yield* self.yieldServiceItems(item.value.service);
                        if (item.value.items) {
                            yield* traverse(item.value.items);
                        }
                    }
                }
            };
            if (this.specification.value.items) {
                yield* traverse(this.specification.value.items);
            }
        }
    }


    /**
     * Iterates over the services in the manifest.
     *
     * This generator function yields services from the service pages within the manifest.
     *
     * @yields {U.Service} The next service in the manifest.
     */
    *iterateManifestService(): IterableIterator<U.ServiceItem> {
        if (this.specification.kind === 'Manifest') {
            yield* this.yieldServiceItems(this.specification.value.service);
        }
    }


    /**
     * Iterates over the services within the thumbnail services in the manifest.
     *
     * This generator function yields services from the service pages within the thumbnail services of the manifest.
     *
     * @yields {U.Service} The next service within the thumbnail services in the manifest.
     */
    *iterateManifestThumbnailService(): IterableIterator<U.ServiceItem> {
        if (this.specification.kind === 'Manifest') {
            for (const thumbnail of this.specification.value.thumbnail ?? []) {
                yield* this.yieldServiceItems(thumbnail.service);
            }
        }
    }

    /**
     * Iterates over the services in the manifest.
     *
     * This generator function yields services from the manifest's service pages.
     *
     * @yields {U.Service} The next service in the manifest.
     */
    *iterateManifestServices(): IterableIterator<U.ServiceItem> {
        if (this.specification.kind === 'Manifest') {
            yield* this.yieldServiceItems(this.specification.value.services);
        }
    }

    /**
     * Iterates over the W3C annotations in the manifest.
     *
     * This generator function yields annotations from the manifest's annotation pages.
     *
     * @yields {U.Annotation} The next annotation in the manifest.
     */
    *iterateManifestW3cAnnotation(): IterableIterator<U.Annotation> {
        if (this.specification.kind === 'Manifest') {
            for (const annotationPage of this.specification.value.annotations ?? []) {
                for (const annotation of annotationPage.items ?? []) {
                    yield F.writeAnnotationT(annotation);
                }
            }
        }
    }

    /**
     * Iterates over the textual bodies of annotations in the manifest.
     *
     * @returns {IterableIterator<U.AnnotationBodyTextualBody>} An iterator over the textual bodies of annotations.
     */
    *iterateManifestW3cAnnotationTextualBody(): IterableIterator<U.AnnotationBodyTextualBody> {
        if (this.specification.kind === 'Manifest') {
            for (const annotationPage of this.specification.value.annotations ?? []) {
                for (const annotation of annotationPage.items ?? []) {
                    if (annotation.body?.kind === 'Array') { /* if body is an array */
                        for (const body of annotation.body.value) {
                            if (body.kind === 'TextualBody') {
                                yield F.writeAnnotationBodyTextualBody(body.value);
                            }
                        }
                    } else { /* single value */
                        if (annotation.body?.value?.kind === 'TextualBody') {
                            yield F.writeAnnotationBodyTextualBody(annotation.body.value.value);
                        }
                    }
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
     * @yields {IterableIterator<U.AnnotationPage>} An iterator that yields annotation pages as `U.AnnotationPage` objects.
     */
    *iterateManifestW3cAnnotationPage(): IterableIterator<U.AnnotationPage> {
        if (this.specification.kind === 'Manifest') {
            for (const annotationPage of this.specification.value.annotations ?? []) {
                yield F.writeAnnotationPageT(annotationPage);
            }
        }
    }


    /**
     * Retrieves the annotation collection if the specification type is 'AnnotationCollection'.
     *
     * @returns {U.AnnotationCollection | null} The annotation collection if the specification type is 'AnnotationCollection', otherwise `null`.
     */
    getAnnotationCollection(): U.AnnotationCollection | null {
        return this.specification.type === 'AnnotationCollection'
            ? F.writeAnnotationCollectionT(this.specification)
            : null;
    }

    /**
     * Retrieves the annotation collection ID if the specification type is 'AnnotationCollection'.
     *
     * @returns {U.Id | null} The annotation collection ID if the specification type is 'AnnotationCollection', otherwise `null`.
     */
    getAnnotationCollectionId(): U.Id | null {
        return this.specification.type === 'AnnotationCollection' && this.specification.id !== undefined
            ? F.writeIdT(this.specification.id)
            : null;
    }

    /**
     * Retrieves the type of the annotation collection if the specification type is 'AnnotationCollection'.
     *
     * @returns {U.Type | null} The type of the annotation collection if the specification type is 'AnnotationCollection', otherwise `null`.
     */
    getAnnotationCollectionType(): U.Type | null {
        return this.specification.type === 'AnnotationCollection'
            ? F.writeTypeT(this.specification.type)
            : null;
    }

    /**
     * Retrieves the annotation collection context if the specification type is 'AnnotationCollection'.
     *
     * @returns {U.Context | null} The annotation collection context if the specification type is 'AnnotationCollection', otherwise `null`.
     */
    getAnnotationCollectionContext(): U.Context | null {
        return this.specification.type === 'AnnotationCollection' && this.specification.context !== undefined
            ? F.writeContextT(this.specification.context) as unknown as U.Context
            : null;
    }

    /**
     * Retrieves the annotation collection label if the specification type is 'AnnotationCollection'.
     *
     * @returns {U.Label | null} The annotation collection label if the specification type is 'AnnotationCollection', otherwise `null`.
     */
    getAnnotationCollectionLabel(): U.Label | null {
        return this.specification.type === 'AnnotationCollection' && this.specification.label !== undefined
            ? F.writeLabelT(this.specification.label) as unknown as U.Label
            : null;
    }

    /**
     * Retrieves the first annotation in the collection if the specification type is 'AnnotationCollection'.
     *
     * @returns {U.First | null} The first annotation in the collection if the specification type is 'AnnotationCollection', otherwise `null`.
     */
    getAnnotationCollectionFirst(): U.First | null {
        return this.specification.type === 'AnnotationCollection' && this.specification.first !== undefined
            ? F.writeFirstT(this.specification.first) as unknown as U.First
            : null;
    }

    /**
     * Retrieves the last annotation in the collection if the specification type is 'AnnotationCollection'.
     *
     * @returns {U.Last | null} The last annotation in the collection if the specification type is 'AnnotationCollection', otherwise `null`.
     */
    getAnnotationCollectionLast(): U.Last | null {
        return this.specification.type === 'AnnotationCollection' && this.specification.last !== undefined
            ? F.writeLastT(this.specification.last)
            : null;
    }

    /**
     * Retrieves the total number of annotations in the collection if the specification type is 'AnnotationCollection'.
     *
     * @returns {U.Total | null} The total number of annotations in the collection if the specification type is 'AnnotationCollection', otherwise `null`.
     */
    getAnnotationCollectionTotal(): U.Total | null {
        return this.specification.type === 'AnnotationCollection' && this.specification.total !== undefined
            ? F.writeTotalT(this.specification.total)
            : null;
    }

    /**
     * Retrieves the annotation page if the specification type is 'AnnotationPage'.
     *
     * @returns {U.AnnotationPage | null} The annotation page if the specification type is 'AnnotationPage', otherwise `null`.
     */
    getAnnotationPage(): U.AnnotationPage | null {
        return this.specification.type === 'AnnotationPage'
            ? F.writeAnnotationPageT(this.specification)
            : null;
    }

    /**
     * Retrieves the type of the annotation page if the specification type is 'AnnotationPage'.
     *
     * @returns {U.Type | null} The type of the annotation page if the specification type is 'AnnotationPage', otherwise `null`.
     */
    getAnnotationPageType(): U.Type | null {
        return this.specification.type === 'AnnotationPage'
            ? F.writeTypeT(this.specification.type)
            : null;
    }

    /**
     * Retrieves the annotation page ID if the specification type is 'AnnotationPage'.
     *
     * @returns {U.Id | null} The annotation page ID if the specification type is 'AnnotationPage', otherwise `null`.
     */
    getAnnotationPageId(): U.Id | null {
        return this.specification.type === 'AnnotationPage' && this.specification.id !== undefined
            ? F.writeIdT(this.specification.id)
            : null;
    }

    /**
     * Retrieves the annotation page context if the specification type is 'AnnotationPage'.
     *
     * @returns {U.Context | null} The annotation page context if the specification type is 'AnnotationPage', otherwise `null`.
     */
    getAnnotationPageContext(): U.Context | null {
        return this.specification.type === 'AnnotationPage' && this.specification.context !== undefined
            ? F.writeContextT(this.specification.context) as unknown as U.Context
            : null;
    }

    /**
     * Retrieves the 'partOf' property from the specification if the type is 'AnnotationPage'.
     *
     * @returns {U.PartOf | null} The 'partOf' property if the specification type is 'AnnotationPage', otherwise null.
     */
    getAnnotationPagePartOf(): U.PartOf | null {
        return this.specification.type === 'AnnotationPage' && this.specification.partOf !== undefined
            ? F.writePartOfT(this.specification.partOf) as unknown as U.PartOf
            : null;
    }

    /**
     * Iterates over the annotations in the specification if the type is 'AnnotationPage'.
     *
     * @yields {U.Annotation} The annotations from the specification.
     */
    *iterateAnnotationPageAnnotation(): IterableIterator<U.Annotation> {
        if (this.specification.type === 'AnnotationPage') {
            for (const annotation of this.specification.items ?? []) {
                yield F.writeAnnotationT(annotation);
            }
        }
    }

    /**
     * Iterates over the textual bodies of annotations in the annotation page.
     *
     * @returns {IterableIterator<U.AnnotationBodyTextualBody>} An iterator over the textual bodies of annotations.
     */
    *iterateAnnotationPageAnnotationTextualBody(): IterableIterator<U.AnnotationBodyTextualBody> {
        if (this.specification.type === 'AnnotationPage') {
            for (const annotation of this.specification.items ?? []) {
                if (annotation.body?.kind === 'Array') { /* if body is an array */
                    for (const body of annotation.body.value) {
                        if (body.kind === 'TextualBody') {
                            yield F.writeAnnotationBodyTextualBody(body.value);
                        }
                    }
                } else { /* single value */
                    if (annotation.body?.value?.kind === 'TextualBody') {
                        yield F.writeAnnotationBodyTextualBody(annotation.body.value.value);
                    }
                }
            }
        }
    }

    /**
     * Iterates over the textual bodies in a single annotation.
     *
     * @returns {IterableIterator<U.AnnotationBodyTextualBody>} An iterator over the textual bodies of an annotation.
     */
    *iterateAnnotationTextualBody(): IterableIterator<U.AnnotationBodyTextualBody> {
        if (this.specification.type === 'Annotation') {
            if (this.specification.body?.kind === 'Array') { /* if body is an array */
                for (const body of this.specification.body.value) {
                    if (body.kind === 'TextualBody') {
                        yield F.writeAnnotationBodyTextualBody(body.value);
                    }
                }
            } else { /* single value */
                if (this.specification.body?.value?.kind === 'TextualBody') {
                    yield F.writeAnnotationBodyTextualBody(this.specification.body.value.value);
                }
            }
        }
    }

    /**
     * Iterates over the resource bodies in a single annotation.
     *
     * @returns {IterableIterator<U.AnnotationBodyResource>} An iterator over the resource bodies of an annotation.
     */
    *iterateAnnotationResourceBody(): IterableIterator<U.AnnotationBodyResource> {
        if (this.specification.type === 'Annotation') {
            if (this.specification.body?.kind === 'Array') { /* if body is an array */
                for (const body of this.specification.body.value) {
                    if (body.kind === 'Resource') {
                        yield F.writeAnnotationBodyResource(body.value);
                    }
                }
            } else { /* single value */
                if (this.specification.body?.value?.kind === 'Resource') {
                    yield F.writeAnnotationBodyResource(this.specification.body.value.value);
                }
            }
        }
    }

    /**
     * Iterates over targets in a single annotation.
     *
     * @returns {IterableIterator<U.AnnotationTarget>} An iterator over the target of an annotation.
     */
    *iterateAnnotationTarget(): IterableIterator<U.AnnotationTarget> {
        if (this.specification.type === 'Annotation') {
            if (this.specification.target?.kind === 'Array') { /* if target is an array */
                for (const target of this.specification.target.value) {
                    yield F.writeAnnotationTargetT(target) as unknown as U.AnnotationTarget;
                }
            } else if (this.specification.target) { /* single value */
                yield F.writeAnnotationTargetT(this.specification.target.value) as unknown as U.AnnotationTarget;
            }
        }
    }


    /**
     * Iterates over the target of annotations that contain partOf properties in the annotation page.
     *
     * @returns {IterableIterator<U.AnnotationTargetCanvasRef>} An iterator over the target of annotations with partOf properties.
     */
    *iterateAnnotationPageAnnotationPartOf(): IterableIterator<U.AnnotationTargetCanvasRef> {
        if (this.specification.type === 'AnnotationPage') {
            for (const annotation of this.specification.items ?? []) {
                if (annotation.target?.kind === 'Array') { /* if target is an array */
                    for (const target of annotation.target.value) {
                        if (target.kind === 'CanvasRef') {
                            yield F.writeAnnotationTargetCanvasRef(target.value);
                        }
                    }
                } else { /* single value */
                    if (annotation.target?.value?.kind === 'CanvasRef') {
                        yield F.writeAnnotationTargetCanvasRef(annotation.target.value.value);
                    }
                }
            }
        }
    }

    /**
     * Retrieves the annotation if the specification type is 'Annotation'.
     *
     * @returns {U.Annotation | null} The annotation if the specification type is 'Annotation', otherwise `null`.
     */
    getAnnotation(): U.Annotation | null {
        return this.specification.type === 'Annotation'
            ? F.writeAnnotationT(this.specification)
            : null;
    }

    /**
     * Retrieves the annotation ID if the specification type is 'Annotation'.
     *
     * @returns {U.Id | null} The annotation ID if the specification type is 'Annotation', otherwise `null`.
     */
    getAnnotationId(): U.Id | null {
        return this.specification.type === 'Annotation' && this.specification.id !== undefined
            ? F.writeIdT(this.specification.id)
            : null;
    }

    /**
     * Retrieves the annotation type if the specification type is 'Annotation'.
     *
     * @returns {U.Type | null} The annotation type if the specification type is 'Annotation', otherwise `null`.
     */
    getAnnotationType(): U.Type | null {
        return this.specification.type === 'Annotation'
            ? F.writeTypeT(this.specification.type)
            : null;
    }

    /**
     * Retrieves the annotation context if the specification type is 'Annotation'.
     *
     * @returns {U.Context | null} The annotation context if the specification type is 'Annotation', otherwise `null`.
     */
    getAnnotationContext(): U.Context | null {
        return this.specification.type === 'Annotation' && this.specification.context !== undefined
            ? F.writeContextT(this.specification.context) as unknown as U.Context
            : null;
    }

    /**
     * Retrieves the annotation body if the specification type is 'Annotation'.
     *
     * @returns {U.Body | null} The annotation body if the specification type is 'Annotation', otherwise `null`.
     */
    getAnnotationBody(): U.Body | null {
        return this.specification.type === 'Annotation' && this.specification.body !== undefined
            ? F.writeBodyT(this.specification.body) as unknown as U.Body
            : null;
    }

    /**
     * Retrieves the annotation target if the specification type is 'Annotation'.
     *
     * @returns {U.Target | null} The annotation target if the specification type is 'Annotation', otherwise `null`.
     */
    getAnnotationTarget(): U.Target | null {
        return this.specification.type === 'Annotation' && this.specification.target !== undefined
            ? F.writeTargetT(this.specification.target) as unknown as U.Target
            : null;
    }

    /**
     * Retrieves the annotation motivation if the specification type is 'Annotation'.
     *
     * @returns {U.Motivation | null} The annotation motivation if the specification type is 'Annotation', otherwise `null`.
     */
    getAnnotationMotivation(): U.Motivation | null {
        return this.specification.type === 'Annotation' && this.specification.motivation !== undefined
            ? F.writeMotivationT(this.specification.motivation) as unknown as U.Motivation
            : null;
    }

    /**
     * Returns the feature collection if the specification kind is 'FeatureCollection', otherwise returns null.
     */
    getAnnotationFeatureCollection(): U.FeatureCollection | null {
        return this.specification.type === 'Annotation' && this.specification.body?.value?.kind === 'FeatureCollection' ? F.writeFeatureCollectionT(this.specification.body.value.value) : null;
    }

    /**
     * Generator function that yields each feature if the specification kind is 'FeatureCollection'.
     */
    *iterateAnnotationFeature(): IterableIterator<U.Feature> {
        if (this.specification.type === 'Annotation' && this.specification.body?.value?.kind === 'FeatureCollection') {
            for (const feature of this.specification.body.value.value.features ?? []) {
                yield F.writeFeatureT(feature);
            }
        }
    }

    /**
     * Generator function that yields point coordinates for each feature with geometry kind 'Point' 
     * if the specification kind is 'FeatureCollection'.
     */
    *iterateAnnotationGeometryPointCoordinates(): IterableIterator<U.PointCoordinates> {
        if (this.specification.type === 'Annotation' && this.specification.body?.value?.kind === 'FeatureCollection') {
            for (const feature of this.specification.body.value.value.features ?? []) {
                if (feature.geometry?.kind === 'Point') {
                    for (const coordinates of feature.geometry.value.coordinates ?? []) {
                        yield F.writePointCoordinatesT(coordinates);
                    }
                }
            }
        }
    }

    // ──────────────────────────────────────────
    // Canvas accessors (within Manifest context)
    // ──────────────────────────────────────────

    /**
     * Iterates over the labels of canvases in the manifest.
     *
     * @yields {U.Label} The next canvas label in the manifest.
     */
    *iterateManifestCanvasLabel(): IterableIterator<U.Label> {
        if (this.specification.kind === 'Manifest') {
            for (const canvas of this.specification.value.items ?? []) {
                if (canvas.label !== undefined) {
                    yield F.writeLabelT(canvas.label) as unknown as U.Label;
                }
            }
        }
    }

    /**
     * Iterates over the metadata elements of canvases in the manifest.
     *
     * @yields {U.Metadata} The next canvas metadata element in the manifest.
     */
    *iterateManifestCanvasMetadata(): IterableIterator<U.Metadata> {
        if (this.specification.kind === 'Manifest') {
            for (const canvas of this.specification.value.items ?? []) {
                for (const metadata of canvas.metadata ?? []) {
                    yield F.writeMetadataT(metadata);
                }
            }
        }
    }

    /**
     * Iterates over the thumbnail elements of canvases in the manifest.
     *
     * @yields {U.Thumbnail} The next canvas thumbnail element in the manifest.
     */
    *iterateManifestCanvasThumbnail(): IterableIterator<U.Thumbnail> {
        if (this.specification.kind === 'Manifest') {
            for (const canvas of this.specification.value.items ?? []) {
                for (const thumbnail of canvas.thumbnail ?? []) {
                    yield F.writeThumbnailT(thumbnail);
                }
            }
        }
    }

    /**
     * Iterates over the rendering elements of canvases in the manifest.
     *
     * @yields {U.Rendering} The next canvas rendering element in the manifest.
     */
    *iterateManifestCanvasRendering(): IterableIterator<U.Rendering> {
        if (this.specification.kind === 'Manifest') {
            for (const canvas of this.specification.value.items ?? []) {
                for (const rendering of canvas.rendering ?? []) {
                    yield F.writeRenderingT(rendering);
                }
            }
        }
    }

    /**
     * Iterates over the seeAlso elements of canvases in the manifest.
     *
     * @yields {U.SeeAlso} The next canvas seeAlso element in the manifest.
     */
    *iterateManifestCanvasSeeAlso(): IterableIterator<U.SeeAlso> {
        if (this.specification.kind === 'Manifest') {
            for (const canvas of this.specification.value.items ?? []) {
                for (const seeAlso of canvas.seeAlso ?? []) {
                    yield F.writeSeeAlsoT(seeAlso);
                }
            }
        }
    }

    /**
     * Iterates over the homepage elements of canvases in the manifest.
     *
     * @yields {U.Homepage} The next canvas homepage element in the manifest.
     */
    *iterateManifestCanvasHomepage(): IterableIterator<U.Homepage> {
        if (this.specification.kind === 'Manifest') {
            for (const canvas of this.specification.value.items ?? []) {
                for (const homepage of canvas.homepage ?? []) {
                    yield F.writeHomepageT(homepage);
                }
            }
        }
    }

    /**
     * Iterates over the provider elements of canvases in the manifest.
     *
     * @yields {U.Provider} The next canvas provider element in the manifest.
     */
    *iterateManifestCanvasProvider(): IterableIterator<U.Provider> {
        if (this.specification.kind === 'Manifest') {
            for (const canvas of this.specification.value.items ?? []) {
                for (const provider of canvas.provider ?? []) {
                    yield F.writeProviderT(provider);
                }
            }
        }
    }

    /**
     * Iterates over the service elements of canvases in the manifest.
     *
     * @yields {U.ServiceItem} The next canvas service item in the manifest.
     */
    *iterateManifestCanvasService(): IterableIterator<U.ServiceItem> {
        if (this.specification.kind === 'Manifest') {
            for (const canvas of this.specification.value.items ?? []) {
                yield* this.yieldServiceItems(canvas.service);
            }
        }
    }

    /**
     * Iterates over the behavior elements of canvases in the manifest.
     *
     * @yields {U.Behavior} The next canvas behavior element in the manifest.
     */
    *iterateManifestCanvasBehavior(): IterableIterator<U.Behavior> {
        if (this.specification.kind === 'Manifest') {
            for (const canvas of this.specification.value.items ?? []) {
                for (const behavior of canvas.behavior ?? []) {
                    yield F.writeBehaviorT(behavior);
                }
            }
        }
    }

    // ──────────────────────────────────────────
    // Range accessors (within Manifest context)
    // ──────────────────────────────────────────

    /**
     * Iterates over the labels of ranges in the manifest.
     *
     * @yields {U.Label} The next range label in the manifest.
     */
    *iterateManifestRangeLabel(): IterableIterator<U.Label> {
        if (this.specification.kind === 'Manifest') {
            for (const range of this.specification.value.structures ?? []) {
                if (range.label !== undefined) {
                    yield F.writeLabelT(range.label) as unknown as U.Label;
                }
            }
        }
    }

    /**
     * Iterates over the rendering elements of ranges in the manifest.
     *
     * @yields {U.Rendering} The next range rendering element in the manifest.
     */
    *iterateManifestRangeRendering(): IterableIterator<U.Rendering> {
        if (this.specification.kind === 'Manifest') {
            for (const range of this.specification.value.structures ?? []) {
                for (const rendering of range.rendering ?? []) {
                    yield F.writeRenderingT(rendering);
                }
            }
        }
    }

    /**
     * Iterates over the thumbnail elements of ranges in the manifest.
     *
     * @yields {U.Thumbnail} The next range thumbnail element in the manifest.
     */
    *iterateManifestRangeThumbnail(): IterableIterator<U.Thumbnail> {
        if (this.specification.kind === 'Manifest') {
            for (const range of this.specification.value.structures ?? []) {
                for (const thumbnail of range.thumbnail ?? []) {
                    yield F.writeThumbnailT(thumbnail);
                }
            }
        }
    }

    /**
     * Iterates over the annotations in ranges of the manifest.
     *
     * @yields {U.Annotation} The next annotation in the ranges of the manifest.
     */
    *iterateManifestRangeAnnotation(): IterableIterator<U.Annotation> {
        if (this.specification.kind === 'Manifest') {
            for (const range of this.specification.value.structures ?? []) {
                for (const annotationPage of range.annotations ?? []) {
                    for (const annotation of annotationPage.items ?? []) {
                        yield F.writeAnnotationT(annotation);
                    }
                }
            }
        }
    }

    // ──────────────────────────────────────────
    // Collection getters & iterators
    // ──────────────────────────────────────────

    /**
     * Retrieves the summary from the collection specification if it is of kind 'Collection'.
     *
     * @returns {U.Summary | null} The summary if the specification is of kind 'Collection', otherwise null.
     */
    getCollectionSummary(): U.Summary | null {
        return this.specification.kind === 'Collection' && this.specification.value?.summary !== undefined
            ? F.writeSummaryT(this.specification.value.summary)
            : null;
    }

    /**
     * Retrieves the rights statement from the collection specification if it is of kind 'Collection'.
     *
     * @returns {U.Rights | null} The rights statement if the specification is of kind 'Collection', otherwise null.
     */
    getCollectionRights(): U.Rights | null {
        return this.specification.kind === 'Collection' && this.specification.value.rights !== undefined
            ? F.writeRightsT(this.specification.value.rights)
            : null;
    }

    /**
     * Retrieves the navigation date from the collection specification if it is of kind 'Collection'.
     *
     * @returns {U.NavDate | null} The navigation date if the specification is of kind 'Collection', otherwise null.
     */
    getCollectionNavDate(): U.NavDate | null {
        return this.specification.kind === 'Collection' && this.specification.value.navDate !== undefined
            ? F.writeNavDateT(this.specification.value.navDate)
            : null;
    }

    /**
     * Retrieves the navigation place from the collection specification if it is of kind 'Collection'.
     *
     * @returns {U.NavPlace | null} The navigation place if the specification is of kind 'Collection', otherwise null.
     */
    getCollectionNavPlace(): U.NavPlace | null {
        return this.specification.kind === 'Collection' && this.specification.value.navPlace !== undefined
            ? F.writeNavPlaceT(this.specification.value.navPlace)
            : null;
    }

    /**
     * Iterates over the rendering elements in the collection and nested collections.
     *
     * @yields {U.Rendering} The next rendering element in the collection.
     */
    *iterateCollectionRendering(): IterableIterator<U.Rendering> {
        if (this.specification.kind === 'Collection') {
            for (const rendering of this.specification.value.rendering ?? []) {
                yield F.writeRenderingT(rendering);
            }
            const traverse = function* (items?: Array<{ kind: string; value: any }>): IterableIterator<U.Rendering> {
                if (!items) return;
                for (const item of items) {
                    if (item.kind === 'Collection') {
                        for (const rendering of item.value.rendering ?? []) {
                            yield F.writeRenderingT(rendering);
                        }
                        if (item.value.items) {
                            yield* traverse(item.value.items);
                        }
                    }
                }
            };
            if (this.specification.value.items) {
                yield* traverse(this.specification.value.items);
            }
        }
    }

    /**
     * Iterates over the seeAlso elements in the collection and nested collections.
     *
     * @yields {U.SeeAlso} The next seeAlso element in the collection.
     */
    *iterateCollectionSeeAlso(): IterableIterator<U.SeeAlso> {
        if (this.specification.kind === 'Collection') {
            for (const seeAlso of this.specification.value.seeAlso ?? []) {
                yield F.writeSeeAlsoT(seeAlso);
            }
            const traverse = function* (items?: Array<{ kind: string; value: any }>): IterableIterator<U.SeeAlso> {
                if (!items) return;
                for (const item of items) {
                    if (item.kind === 'Collection') {
                        for (const seeAlso of item.value.seeAlso ?? []) {
                            yield F.writeSeeAlsoT(seeAlso);
                        }
                        if (item.value.items) {
                            yield* traverse(item.value.items);
                        }
                    }
                }
            };
            if (this.specification.value.items) {
                yield* traverse(this.specification.value.items);
            }
        }
    }

    /**
     * Iterates over the behavior elements in the collection and nested collections.
     *
     * @yields {U.Behavior} The next behavior element in the collection.
     */
    *iterateCollectionBehavior(): IterableIterator<U.Behavior> {
        if (this.specification.kind === 'Collection') {
            for (const behavior of this.specification.value.behavior ?? []) {
                yield F.writeBehaviorT(behavior);
            }
            const traverse = function* (items?: Array<{ kind: string; value: any }>): IterableIterator<U.Behavior> {
                if (!items) return;
                for (const item of items) {
                    if (item.kind === 'Collection') {
                        for (const behavior of item.value.behavior ?? []) {
                            yield F.writeBehaviorT(behavior);
                        }
                        if (item.value.items) {
                            yield* traverse(item.value.items);
                        }
                    }
                }
            };
            if (this.specification.value.items) {
                yield* traverse(this.specification.value.items);
            }
        }
    }

    /**
     * Iterates over the partOf elements in the collection and nested collections.
     *
     * @yields {U.PartOf} The next partOf element in the collection.
     */
    *iterateCollectionPartOf(): IterableIterator<U.PartOf> {
        if (this.specification.kind === 'Collection') {
            for (const partOf of this.specification.value.partOf ?? []) {
                yield F.writePartOfT(partOf) as unknown as U.PartOf;
            }
            const traverse = function* (items?: Array<{ kind: string; value: any }>): IterableIterator<U.PartOf> {
                if (!items) return;
                for (const item of items) {
                    if (item.kind === 'Collection') {
                        for (const partOf of item.value.partOf ?? []) {
                            yield F.writePartOfT(partOf) as unknown as U.PartOf;
                        }
                        if (item.value.items) {
                            yield* traverse(item.value.items);
                        }
                    }
                }
            };
            if (this.specification.value.items) {
                yield* traverse(this.specification.value.items);
            }
        }
    }

    // ──────────────────────────────────────────
    // Annotation provenance
    // ──────────────────────────────────────────

    /**
     * Retrieves the creator from the annotation if the specification type is 'Annotation'.
     *
     * @returns {U.Creator | null} The creator if the specification type is 'Annotation', otherwise null.
     */
    getAnnotationCreator(): U.Creator | null {
        return this.specification.type === 'Annotation' && this.specification.creator !== undefined
            ? F.writeCreatorT(this.specification.creator) as unknown as U.Creator
            : null;
    }

    /**
     * Retrieves the created date from the annotation if the specification type is 'Annotation'.
     *
     * @returns {U.Created | null} The created date if the specification type is 'Annotation', otherwise null.
     */
    getAnnotationCreated(): U.Created | null {
        return this.specification.type === 'Annotation' && this.specification.created !== undefined
            ? F.writeCreatedT(this.specification.created)
            : null;
    }

    /**
     * Retrieves the modified date from the annotation if the specification type is 'Annotation'.
     *
     * @returns {U.Modified | null} The modified date if the specification type is 'Annotation', otherwise null.
     */
    getAnnotationModified(): U.Modified | null {
        return this.specification.type === 'Annotation' && this.specification.modified !== undefined
            ? F.writeModifiedT(this.specification.modified)
            : null;
    }

    // ──────────────────────────────────────────
    // AnnotationPage pagination
    // ──────────────────────────────────────────

    /**
     * Retrieves the label from the annotation page if the specification type is 'AnnotationPage'.
     *
     * @returns {U.Label | null} The label if the specification type is 'AnnotationPage', otherwise null.
     */
    getAnnotationPageLabel(): U.Label | null {
        return this.specification.type === 'AnnotationPage' && this.specification.label !== undefined
            ? F.writeLabelT(this.specification.label) as unknown as U.Label
            : null;
    }

    /**
     * Retrieves the next page reference from the annotation page if the specification type is 'AnnotationPage'.
     *
     * @returns {U.Next | null} The next page reference if the specification type is 'AnnotationPage', otherwise null.
     */
    getAnnotationPageNext(): U.Next | null {
        return this.specification.type === 'AnnotationPage' && this.specification.next !== undefined
            ? F.writeNextT(this.specification.next)
            : null;
    }

    /**
     * Retrieves the start index from the annotation page if the specification type is 'AnnotationPage'.
     *
     * @returns {U.StartIndex | null} The start index if the specification type is 'AnnotationPage', otherwise null.
     */
    getAnnotationPageStartIndex(): U.StartIndex | null {
        return this.specification.type === 'AnnotationPage' && this.specification.startIndex !== undefined
            ? F.writeStartIndexT(this.specification.startIndex)
            : null;
    }

    // ──────────────────────────────────────────
    // AnnotationCollection items
    // ──────────────────────────────────────────

    /**
     * Iterates over the annotations in the annotation collection.
     *
     * @yields {U.Annotation} The next annotation in the annotation collection.
     */
    *iterateAnnotationCollectionAnnotation(): IterableIterator<U.Annotation> {
        if (this.specification.type === 'AnnotationCollection') {
            for (const annotation of this.specification.items ?? []) {
                yield F.writeAnnotationT(annotation);
            }
        }
    }

}