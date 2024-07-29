/**
 * This module (`Manifesty.ts`) is responsible for handling manifest data structures
 * within the application. It leverages types and functions from the `specification`
 * module to ensure that the manifest data adheres to the defined specification.
 * 
 * - `F` contains all exported members from `specification`, used for implementing
 *   specification logic.
 * - `T` is used to import types from `specification` for type-checking and defining
 *   interfaces within `Manifesty.ts`.
 */
import * as F from "./specification";
import type * as T from "./specification";

export class Manifesty {
    specification: any;

    /**
     * Constructs a new instance of the Manifesty class.
     * 
     * This constructor attempts to read and process the specification data provided. It uses the `F.readSpecificationT` function
     * to parse and validate the incoming data against the expected specification format. If the data is valid, it assigns the processed
     * data to the `specification` property of the instance. In case of any errors during the processing, it logs the error to the console.
     * 
     * @param data - The raw data intended to populate the `specification` property. The structure and content of this data should
     * comply with the expected specification format that `F.readSpecificationT` can process.
     */
    constructor(data: any) {
        try {
            this.specification = F.readSpecificationT(data);
        } catch (error) {
            console.error("Failed to read specification:", error);
        }
    }

    /**
     * Retrieves the label of the manifest if the specification kind is 'Manifest'.
     * 
     * This method checks if the current specification's `kind` property equals 'Manifest'. If so, it attempts to retrieve the label
     * using the `F.writeLabelT` function, passing the label value from the specification. If the `kind` is not 'Manifest', it returns null,
     * indicating that no label could be retrieved under the current specification.
     * 
     * @returns The label of the manifest as a `T.LabelT` type if the specification kind is 'Manifest'; otherwise, null.
     */
    getManifestLabel(): T.LabelT | null {
        return this.specification.kind === 'Manifest' ? F.writeLabelT(this.specification.value.label) : null;
    }

    /**
     * Retrieves the summary of the manifest if the specification kind is 'Manifest'.
     * 
     * This method evaluates whether the current specification's `kind` property is equal to 'Manifest'. If the condition is met,
     * it proceeds to retrieve the summary by invoking the `F.writeSummaryT` function, passing in the summary value from the specification.
     * If the `kind` is not 'Manifest', the method returns null, indicating that no summary is available for the current specification.
     * 
     * @returns The summary of the manifest as a `T.SummaryT` type if the specification kind is 'Manifest'; otherwise, null.
     */    
    getManifestSummary(): T.SummaryT | null {
        return this.specification.kind === 'Manifest' ? F.writeSummaryT(this.specification.value.summary) : null;
    }

    /**
     * Retrieves the viewing direction of the manifest if the specification kind is 'Manifest'.
     * 
     * This method checks if the current specification's `kind` property is equal to 'Manifest'. If true, it attempts to retrieve the
     * viewing direction by calling the `F.writeViewingDirectionT` function, passing in the viewingDirection value from the specification.
     * If the `kind` is not 'Manifest', it returns null, indicating that the viewing direction is not applicable or available for the current
     * specification.
     * 
     * @returns The viewing direction of the manifest as a `T.ViewingDirectionT` type if the specification kind is 'Manifest'; otherwise, null.
     */    
    getManifestViewingDirection(): T.ViewingDirectionT | null {
        return this.specification.kind === 'Manifest' ? F.writeViewingDirectionT(this.specification.value.viewingDirection) : null;
    }

    /**
     * Retrieves the navigation date of the manifest if the specification kind is 'Manifest'.
     * 
     * This method evaluates whether the current specification's `kind` property matches 'Manifest'. If it does, the method attempts to
     * retrieve the navigation date by calling the `F.writeNavDateT` function, passing in the `navDate` value from the specification. If the
     * `kind` is not 'Manifest', the method returns null, indicating that the navigation date is not applicable or available for the current
     * specification context.
     * 
     * @returns The navigation date of the manifest as a `T.NavDateT` type if the specification kind is 'Manifest'; otherwise, null.
     */    
    getManifestNavDate(): T.NavDateT | null {
        return this.specification.kind === 'Manifest' ? F.writeNavDateT(this.specification.value.navDate) : null;
    }

    /**
     * Retrieves the navigation place of the manifest if the specification kind is 'Manifest'.
     * 
     * This method checks if the current specification's `kind` property equals 'Manifest'. If so, it attempts to retrieve the
     * navigation place by invoking the `F.writeNavPlaceT` function, passing the `navPlace` value from the specification. If the
     * `kind` is not 'Manifest', it returns null, indicating that the navigation place is not applicable or available for the
     * current specification.
     * 
     * @returns The navigation place of the manifest as a `T.NavPlaceT` type if the specification kind is 'Manifest'; otherwise, null.
     */    
    getManifestNavPlace(): T.NavPlaceT | null {
        return this.specification.kind === 'Manifest' ? F.writeNavPlaceT(this.specification.value.navPlace) : null;
    }

    /**
     * Retrieves the rights information of the manifest if the specification kind is 'Manifest'.
     * 
     * This method checks if the current specification's `kind` property is equal to 'Manifest'. If true, it attempts to retrieve the
     * rights information by calling the `F.writeRightsT` function, passing in the `rights` value from the specification. If the `kind` is not
     * 'Manifest', it returns null, indicating that the rights information is not applicable or available for the current specification.
     * 
     * @returns The rights information of the manifest as a `T.RightsT` type if the specification kind is 'Manifest'; otherwise, null.
     */    
    getManifestRights(): T.RightsT | null {
        return this.specification.kind === 'Manifest' ? F.writeRightsT(this.specification.value.rights) : null;
    }

    /**
     * Retrieves the required statement of the manifest if the specification kind is 'Manifest'.
     * 
     * This method checks if the current specification's `kind` property equals 'Manifest'. If so, it attempts to retrieve the
     * required statement by invoking the `F.writeRequiredStatementT` function, passing the `requiredStatement` value from the specification.
     * If the `kind` is not 'Manifest', it returns null, indicating that the required statement is not applicable or available for the
     * current specification.
     * 
     * @returns The required statement of the manifest as a `T.RequiredStatementT` type if the specification kind is 'Manifest'; otherwise, null.
     */    
    getManifestRequiredStatement(): T.RequiredStatementT | null {
        return this.specification.kind === 'Manifest' ? F.writeRequiredStatementT(this.specification.value.requiredStatement) : null;
    }

    /**
     * Retrieves the start property of the manifest if the specification kind is 'Manifest'.
     * 
     * This method evaluates whether the current specification's `kind` property is 'Manifest'. If the condition is met,
     * it proceeds to retrieve the start property by invoking the `F.writeStartT` function, passing in the `start` value from the specification.
     * If the `kind` is not 'Manifest', the method returns null, indicating that the start property is not applicable or available for the
     * current specification.
     * 
     * @returns The start property of the manifest as a `T.StartT` type if the specification kind is 'Manifest'; otherwise, null.
     */    
    getManifestStart(): T.StartT | null {
        return this.specification.kind === 'Manifest' ? F.writeStartT(this.specification.value.start) : null;
    }

    /**
     * Retrieves the manifest object if the specification kind is 'Manifest'.
     * 
     * This method checks the `kind` property of the current specification. If it equals 'Manifest', the method attempts to
     * construct and return a manifest object by invoking the `F.writeManifestT` function, passing the entire `value` of the
     * specification as its argument. If the `kind` is not 'Manifest', the method returns null, indicating that no manifest object
     * can be constructed from the current specification.
     * 
     * @returns The constructed manifest object as a `T.ManifestT` type if the specification kind is 'Manifest'; otherwise, null.
     */    
    getManifest(): T.ManifestT | null {
        return this.specification.kind === 'Manifest' ? F.writeManifestT(this.specification.value) : null;
    }

    /**
     * Retrieves the collection object if the specification kind is 'Collection'.
     * 
     * This method checks the `kind` property of the current specification. If it equals 'Collection', the method attempts to
     * construct and return a collection object by invoking the `F.writeCollectionT` function, passing the entire `value` of the
     * specification as its argument. If the `kind` is not 'Collection', the method returns null, indicating that no collection object
     * can be constructed from the current specification.
     * 
     * @returns The constructed collection object as a `T.CollectionT` type if the specification kind is 'Collection'; otherwise, null.
     */    
    getCollection(): T.CollectionT | null {
        return this.specification.kind === 'Collection' ? F.writeCollectionT(this.specification.value) : null;
    }

    /**
     * Iterates over annotations in the manifest's canvas items according to the W3C Annotation specification.
     * 
     * This generator function iterates through each canvas in the manifest, provided the specification kind is 'Manifest'.
     * For each canvas, it iterates over the annotation pages and then over each annotation within those pages. Each annotation
     * is processed through the `F.writeAnnotationT` function to conform to a specific type `T.AnnotationT`. The function yields
     * each processed annotation one at a time.
     * 
     * This allows for lazy evaluation and processing of annotations, making it efficient for handling large numbers of annotations
     * without loading them all into memory at once.
     * 
     * @yields {IterableIterator<T.AnnotationT>} An iterator that yields annotations as `T.AnnotationT` objects.
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
     * Iterates over annotation pages in the manifest's canvas items according to the W3C Annotation Page specification.
     * 
     * This generator function iterates through each canvas in the manifest, provided the specification kind is 'Manifest'.
     * For each canvas, it iterates over the annotation pages. Each annotation page is processed through the `F.writeAnnotationPageT`
     * function to conform to a specific type `T.AnnotationPageT`. The function yields each processed annotation page one at a time.
     * 
     * This approach allows for lazy evaluation and processing of annotation pages, making it efficient for handling large numbers
     * of annotation pages without loading them all into memory at once.
     * 
     * @yields {IterableIterator<T.AnnotationPageT>} An iterator that yields annotation pages as `T.AnnotationPageT` objects.
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
     * Iterates over annotation pages in each canvas of the manifest.
     * 
     * This generator function is designed to iterate through annotation pages found within each canvas of a manifest, assuming
     * the specification kind is 'Manifest'. It navigates through the `items` array of each canvas, accessing the annotation pages
     * contained within. Each annotation page is then processed through the `F.writeAnnotationPageT` function, which is expected
     * to conform the annotation page data to a specific type `T.AnnotationPageT`.
     * 
     * The function yields each processed annotation page, allowing for lazy evaluation and efficient processing of potentially
     * large sets of annotation pages without requiring them all to be loaded into memory simultaneously.
     * 
     * @yields {IterableIterator<T.AnnotationPageT>} An iterator that yields annotation pages as `T.AnnotationPageT` objects.
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
     * Iterates over annotations in each canvas of the manifest.
     * 
     * This generator function is designed to iterate through annotations found within each canvas of a manifest, provided
     * the specification kind is 'Manifest'. It navigates through the `items` array of each canvas, accessing the annotation pages
     * contained within. For each annotation page, it further iterates over the annotations contained within those pages.
     * 
     * Each annotation is processed through the `F.writeAnnotationT` function, which conforms the annotation data to a specific
     * type `T.AnnotationT`. The function yields each processed annotation, allowing for lazy evaluation and efficient processing
     * of potentially large sets of annotations without requiring them all to be loaded into memory simultaneously.
     * 
     * @yields {IterableIterator<T.AnnotationT>} An iterator that yields annotations as `T.AnnotationT` objects.
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
     * Iterates over service objects within annotation bodies in each canvas of the manifest.
     * 
     * This generator function is tailored to iterate through service objects found within the bodies of annotations across
     * each canvas of a manifest, assuming the specification kind is 'Manifest'. It navigates through the nested structure of
     * the manifest: from canvases to annotation pages, then to annotations, and finally to the service objects within the
     * annotation bodies.
     * 
     * Each service object encountered is processed through the `F.writeServiceT` function, which adapts the service data to
     * conform to a specific type `T.ServiceT`. The function yields each processed service object, facilitating lazy evaluation
     * and efficient processing of potentially large sets of service objects without necessitating their complete loading into
     * memory at once.
     * 
     * @yields {IterableIterator<T.ServiceT>} An iterator that yields service objects as `T.ServiceT` objects.
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
     * Iterates over "service" objects within "service" objects in annotation bodies across each canvas of the manifest.
     * 
     * This generator function is specifically designed to navigate through a deeply nested structure within a manifest, provided
     * the specification kind is 'Manifest'. Starting from the manifest's canvases, it drills down through annotation pages, annotations,
     * and into the "service" objects contained within the annotation bodies. It further delves into nested "service" objects within
     * these "service" objects.
     * 
     * At each level of "service" within "service", the function processes the data through the `F.writeServiceT` function, adapting
     * it to conform to a specific type `T.ServiceT`. This allows for the efficient, lazy evaluation of potentially large sets of nested
     * service objects, yielding each processed "service" object within a "service" without loading all data into memory simultaneously.
     * 
     * @yields {IterableIterator<T.ServiceT>} An iterator that yields nested "service" objects as `T.ServiceT` objects.
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
     * Iterates over canvases in the manifest.
     * 
     * This generator function is designed to iterate through canvases contained within a manifest, assuming the specification kind
     * is 'Manifest'. It navigates through the `items` array of the manifest, which holds the canvases. Each canvas encountered is
     * processed through the `F.writeCanvasT` function, which adapts the canvas data to conform to a specific type `T.CanvasT`.
     * 
     * The function yields each processed canvas, facilitating lazy evaluation and efficient processing of potentially large sets of
     * canvases without necessitating their complete loading into memory at once.
     * 
     * @yields {IterableIterator<T.CanvasT>} An iterator that yields canvases as `T.CanvasT` objects.
     */    
    *iterateManifestCanvas(): IterableIterator<T.CanvasT> {
        if (this.specification.kind === 'Manifest') {
            for (const canvas of this.specification.value.items ?? []) {
                yield F.writeCanvasT(canvas);
            }
        }
    }

    /**
     * Iterates over thumbnails in the manifest.
     * 
     * This generator function is designed to iterate through thumbnails specified in a manifest, provided the specification kind
     * is 'Manifest'. It navigates through the `thumbnail` array of the manifest's `value` property, if it exists. Each thumbnail
     * encountered is processed through the `F.writeThumbnailT` function, which adapts the thumbnail data to conform to a specific
     * type `T.ThumbnailT`.
     * 
     * The function yields each processed thumbnail, allowing for lazy evaluation and efficient processing of potentially large sets
     * of thumbnails without requiring them all to be loaded into memory simultaneously.
     * 
     * @yields {IterableIterator<T.ThumbnailT>} An iterator that yields thumbnails as `T.ThumbnailT` objects.
     */    
    *iterateManifestThumbnail(): IterableIterator<T.ThumbnailT> {
        if (this.specification.kind === 'Manifest') {
            for (const thumbnail of this.specification.value.thumbnail ?? []) {
                yield F.writeThumbnailT(thumbnail);
            }
        }
    }

    /**
     * Iterates over homepage URLs in the manifest.
     * 
     * This generator function is tailored to iterate through homepage URLs specified within a manifest, assuming the specification kind
     * is 'Manifest'. It navigates through the `homepage` array of the manifest's `value` property, if it exists. Each homepage URL
     * encountered is processed through the `F.writeHomepageT` function, which adapts the homepage data to conform to a specific
     * type `T.HomepageT`.
     * 
     * The function yields each processed homepage URL, facilitating lazy evaluation and efficient processing of potentially large sets
     * of homepage URLs without necessitating their complete loading into memory at once.
     * 
     * @yields {IterableIterator<T.HomepageT>} An iterator that yields homepage URLs as `T.HomepageT` objects.
     */    
    *iterateManifestHomepage(): IterableIterator<T.HomepageT> {
        if (this.specification.kind === 'Manifest') {
            for (const homepage of this.specification.value.homepage ?? []) {
                yield F.writeHomepageT(homepage);
            }
        }
    }

    /**
     * Iterates over behavior specifications in the manifest.
     * 
     * This generator function is specifically designed to iterate through behavior specifications within a manifest, provided the specification kind
     * is 'Manifest'. It navigates through the `behavior` array of the manifest's `value` property, if present. Each behavior specification
     * encountered is processed through the `F.writeBehaviorT` function, which adapts the behavior data to conform to a specific
     * type `T.BehaviorT`.
     * 
     * The function yields each processed behavior specification, enabling lazy evaluation and efficient processing of potentially large sets
     * of behavior specifications without requiring their complete loading into memory simultaneously.
     * 
     * @yields {IterableIterator<T.BehaviorT>} An iterator that yields behavior specifications as `T.BehaviorT` objects.
     */    
    *iterateManifestBehavior(): IterableIterator<T.BehaviorT> {
        if (this.specification.kind === 'Manifest') {
            for (const behavior of this.specification.value.behavior ?? []) {
                yield F.writeBehaviorT(behavior);
            }
        }
    }

    /**
     * Iterates over providers in the manifest.
     * 
     * This generator function is designed to iterate through providers specified within a manifest, provided the specification kind
     * is 'Manifest'. It navigates through the `provider` array of the manifest's `value` property, if it exists. Each provider
     * encountered is processed through the `F.writeProviderT` function, which adapts the provider data to conform to a specific
     * type `T.ProviderT`.
     * 
     * The function yields each processed provider, facilitating lazy evaluation and efficient processing of potentially large sets
     * of providers without necessitating their complete loading into memory at once.
     * 
     * @yields {IterableIterator<T.ProviderT>} An iterator that yields providers as `T.ProviderT` objects.
     */    
    *iterateManifestProvider(): IterableIterator<T.ProviderT> {
        if (this.specification.kind === 'Manifest') {
            for (const provider of this.specification.value.provider ?? []) {
                yield F.writeProviderT(provider);
            }
        }
    }

    /**
     * Iterates over rendering objects in the manifest.
     * 
     * This generator function is specifically designed to iterate through rendering objects contained within a manifest, assuming
     * the specification kind is 'Manifest'. It navigates through the `rendering` array of the manifest's `value` property, if it exists.
     * Each rendering object encountered is processed through the `F.writeRenderingT` function, which adapts the rendering data to
     * conform to a specific type `T.RenderingT`.
     * 
     * The function yields each processed rendering object, enabling lazy evaluation and efficient processing of potentially large sets
     * of rendering objects without requiring them all to be loaded into memory simultaneously.
     * 
     * @yields {IterableIterator<T.RenderingT>} An iterator that yields rendering objects as `T.RenderingT` objects.
     */    
    *iterateManifestRendering(): IterableIterator<T.RenderingT> {
        if (this.specification.kind === 'Manifest') {
            for (const rendering of this.specification.value.rendering ?? []) {
                yield F.writeRenderingT(rendering);
            }
        }
    }

    /**
     * Iterates over homepage URLs of providers in the manifest.
     * 
     * This generator function is designed to iterate through homepage URLs specified for providers within a manifest, assuming
     * the specification kind is 'Manifest'. It navigates through the `provider` array of the manifest's `value` property, if present.
     * For each provider, it further iterates through the `homepage` array, if present. Each homepage URL encountered is processed
     * through the `F.writeHomepageT` function, which adapts the homepage data to conform to a specific type `T.HomepageT`.
     * 
     * The function yields each processed homepage URL, facilitating lazy evaluation and efficient processing of potentially large sets
     * of homepage URLs without necessitating their complete loading into memory at once.
     * 
     * @yields {IterableIterator<T.HomepageT>} An iterator that yields homepage URLs as `T.HomepageT` objects.
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
     * Iterates over "seeAlso" references of providers in the manifest.
     * 
     * This generator function is designed to iterate through "seeAlso" references specified for providers within a manifest,
     * assuming the specification kind is 'Manifest'. It navigates through the `provider` array of the manifest's `value` property,
     * if present. For each provider, it further iterates through the `seeAlso` array, if present. Each "seeAlso" reference encountered
     * is processed through the `F.writeSeeAlsoT` function, which adapts the "seeAlso" data to conform to a specific type `T.SeeAlsoT`.
     * 
     * The function yields each processed "seeAlso" reference, facilitating lazy evaluation and efficient processing of potentially
     * large sets of "seeAlso" references without necessitating their complete loading into memory at once.
     * 
     * @yields {IterableIterator<T.SeeAlsoT>} An iterator that yields "seeAlso" references as `T.SeeAlsoT` objects.
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
     * Iterates over metadata entries in the manifest.
     * 
     * This generator function is specifically designed to iterate through metadata entries contained within a manifest, provided
     * the specification kind is 'Manifest'. It navigates through the `metadata` array of the manifest's `value` property, if it exists.
     * Each metadata entry encountered is processed through the `F.writeMetadataT` function, which adapts the metadata entry to
     * conform to a specific type `T.MetadataT`.
     * 
     * The function yields each processed metadata entry, enabling lazy evaluation and efficient processing of potentially large sets
     * of metadata entries without requiring them all to be loaded into memory simultaneously.
     * 
     * @yields {IterableIterator<T.MetadataT>} An iterator that yields metadata entries as `T.MetadataT` objects.
     */    
    *iterateManifestMetadata(): IterableIterator<T.MetadataT> {
        if (this.specification.kind === 'Manifest') {
            for (const metadata of this.specification.value.metadata ?? []) {
                yield F.writeMetadataT(metadata);
            }
        }
    }

    /**
     * Iterates over "seeAlso" references in the manifest.
     * 
     * This generator function is designed to iterate through "seeAlso" references specified within a manifest, assuming
     * the specification kind is 'Manifest'. It navigates through the `seeAlso` array of the manifest's `value` property,
     * if present. Each "seeAlso" reference encountered is processed through the `F.writeSeeAlsoT` function, which adapts
     * the "seeAlso" data to conform to a specific type `T.SeeAlsoT`.
     * 
     * The function yields each processed "seeAlso" reference, facilitating lazy evaluation and efficient processing of
     * potentially large sets of "seeAlso" references without necessitating their complete loading into memory at once.
     * 
     * @yields {IterableIterator<T.SeeAlsoT>} An iterator that yields "seeAlso" references as `T.SeeAlsoT` objects.
     */    
    *iterateManifestSeeAlso(): IterableIterator<T.SeeAlsoT> {
        if (this.specification.kind === 'Manifest') {
            for (const seeAlso of this.specification.value.seeAlso ?? []) {
                yield F.writeSeeAlsoT(seeAlso);
            }
        }
    }

    /**
     * Iterates over "partOf" references in the manifest.
     * 
     * This generator function is tailored to iterate through "partOf" references specified within a manifest, provided
     * the specification kind is 'Manifest'. It navigates through the `partOf` array of the manifest's `value` property,
     * if present. Each "partOf" reference encountered is processed through the `F.writePartOfT` function, which adapts
     * the "partOf" data to conform to a specific type `T.PartOfT`.
     * 
     * The function yields each processed "partOf" reference, enabling lazy evaluation and efficient processing of
     * potentially large sets of "partOf" references without requiring them all to be loaded into memory simultaneously.
     * 
     * @yields {IterableIterator<T.PartOfT>} An iterator that yields "partOf" references as `T.PartOfT` objects.
     */    
    *iterateManifestPartOf(): IterableIterator<T.PartOfT> {
        if (this.specification.kind === 'Manifest') {
            for (const partOf of this.specification.value.partOf ?? []) {
                yield F.writePartOfT(partOf);
            }
        }
    }

    /**
     * Iterates over range structures in the manifest.
     * 
     * This generator function is designed to iterate through range structures contained within a manifest, assuming
     * the specification kind is 'Manifest'. It navigates through the `structures` array of the manifest's `value` property,
     * if it exists and is not null, utilizing the nullish coalescing operator to provide a fallback empty array. Each range
     * structure encountered is processed through the `F.writeRangeT` function, which adapts the range data to conform to a
     * specific type `T.RangeT`.
     * 
     * The function yields each processed range structure, facilitating lazy evaluation and efficient processing of potentially
     * large sets of range structures without necessitating their complete loading into memory at once.
     * 
     * @yields {IterableIterator<T.RangeT>} An iterator that yields range structures as `T.RangeT` objects.
     */    
    *iterateManifestRange(): IterableIterator<T.RangeT> {
        if (this.specification.kind === 'Manifest') {
            for (const range of this.specification.value.structures ?? []) {
                yield F.writeRangeT(range);
            }
        }
    }

    /**
     * Iterates over range structures in the manifest.
     * 
     * This generator function is designed to iterate through range structures contained within a manifest, assuming
     * the specification kind is 'Manifest'. It navigates through the `structures` array of the manifest's `value` property,
     * if it exists and is not null, utilizing the nullish coalescing operator to provide a fallback empty array. Each range
     * structure encountered is processed through the `F.writeRangeT` function, which adapts the range data to conform to a
     * specific type `T.RangeT`.
     * 
     * The function yields each processed range structure, facilitating lazy evaluation and efficient processing of potentially
     * large sets of range structures without necessitating their complete loading into memory at once.
     * 
     * @yields {IterableIterator<T.RangeT>} An iterator that yields range structures as `T.RangeT` objects.
     */    
    *iterateManifestNavPlaceFeature(): IterableIterator<T.FeatureT> {
        if (this.specification.kind === 'Manifest') {
            for (const feature of this.specification.value.navPlace?.features ?? []) {
                yield F.writeFeatureT(feature);
            }

        }
    }

    /**
     * Iterates over navigation place features in each canvas of the manifest.
     * 
     * This generator function is designed to iterate through navigation place features specified within each canvas of a manifest,
     * assuming the specification kind is 'Manifest'. It first iterates through the `items` array of the manifest's `value` property,
     * representing each canvas. For each canvas, it then iterates through the `navPlace` property's `features` array, if these
     * properties exist. Each navigation place feature encountered is processed through the `F.writeFeatureT` function, which adapts
     * the feature data to conform to a specific type `T.FeatureT`.
     * 
     * The function yields each processed navigation place feature from all canvases, facilitating lazy evaluation and efficient
     * processing of potentially large sets of navigation place features without necessitating their complete loading into memory at once.
     * 
     * @yields {IterableIterator<T.FeatureT>} An iterator that yields navigation place features as `T.FeatureT` objects from each canvas.
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
     * Iterates over range items in each range structure of the manifest.
     * 
     * This generator function is designed to iterate through range items contained within each range structure of a manifest,
     * provided the specification kind is 'Manifest'. It navigates through the `structures` array of the manifest's `value` property,
     * if it exists, utilizing the nullish coalescing operator to provide a fallback empty array. For each range structure encountered,
     * it further iterates through the `items` array within each range, again using the nullish coalescing operator for safety.
     * Each range item encountered is processed through the `F.writeRangeItemsT` function, which adapts the range item data to conform
     * to a specific type `T.RangeItemsT`.
     * 
     * The function yields each processed range item from all range structures, enabling lazy evaluation and efficient processing of
     * potentially large sets of range items without necessitating their complete loading into memory at once.
     * 
     * @yields {IterableIterator<T.RangeItemsT>} An iterator that yields range items as `T.RangeItemsT` objects from each range structure.
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
     * Iterates over collections and their nested collections in the manifest.
     * 
     * This generator function is specifically designed for manifests of the 'Collection' kind. It iterates through the top-level
     * collection and recursively through any nested collections contained within. The iteration is performed by first yielding the
     * top-level collection processed through the `F.writeCollectionT` function, which adapts the collection data to conform to a
     * specific type `T.CollectionT`.
     * 
     * A recursive helper function, `traverse`, is defined and used to iterate through each item in the `items` array of a collection.
     * If an item is of the 'Collection' kind, the function yields the processed collection and recursively iterates through its items.
     * 
     * This approach facilitates the iteration over potentially complex nested collection structures, enabling the efficient processing
     * of each collection without loading all data into memory simultaneously.
     * 
     * @yields {IterableIterator<T.CollectionT>} An iterator that yields collections as `T.CollectionT` objects, including nested collections.
     */    
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

    /**
     * Iterates over manifest and collection items within the current specification.
     * 
     * This generator function is designed to handle both 'Manifest' and 'Collection' kinds within a specification. It yields
     * manifest items directly if the specification kind is 'Manifest'. For specifications of the 'Collection' kind, it recursively
     * iterates through the collection's items, yielding manifest items found within any nested collections.
     * 
     * The recursive iteration is facilitated by the `traverse` inner function, which iterates through an array of items. Each item
     * is checked for its kind: if it is a 'Manifest', the function yields it after processing through `F.writeManifestT`. If the item
     * is a 'Collection', the function recursively iterates through its items.
     * 
     * This approach allows for efficient traversal and processing of deeply nested collection structures, yielding each manifest item
     * for further processing without loading the entire structure into memory.
     * 
     * @yields {IterableIterator<T.ManifestT>} An iterator that yields manifest items as `T.ManifestT` objects, including those nested
     * within collections.
     */    
    *iterateCollectionManifest(): IterableIterator<T.ManifestT> {
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

    /**
     * Iterates over labels of collections and nested collections within the specification.
     * 
     * This generator function is specifically designed for specifications of the 'Collection' kind. It yields the label of the
     * top-level collection processed through the `F.writeLabelT` function, which adapts the label data to conform to a specific
     * type `T.LabelT`. It then recursively iterates through any nested collections contained within, yielding their labels as well.
     * 
     * The recursion is facilitated by the `traverse` inner function, which iterates through an array of items. For each item that
     * is a 'Collection', the function yields its label after processing and recursively iterates through its nested collections.
     * 
     * This approach enables the efficient traversal and processing of collection labels in potentially complex nested structures,
     * yielding each label for further processing without loading the entire structure into memory.
     * 
     * @yields {IterableIterator<T.LabelT>} An iterator that yields collection labels as `T.LabelT` objects, including those from nested collections.
     */    
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

    /**
     * Iterates over metadata of collections and nested collections within the specification.
     * 
     * This generator function is tailored for specifications of the 'Collection' kind. It yields metadata entries of the
     * top-level collection processed through the `F.writeMetadataT` function, which adapts the metadata data to conform to a
     * specific type `T.MetadataT`. It then recursively iterates through any nested collections contained within, yielding their
     * metadata entries as well.
     * 
     * The recursion is facilitated by the `traverse` inner function, which iterates through an array of items. For each item that
     * is a 'Collection', the function yields its metadata entries after processing and recursively iterates through its nested
     * collections to yield their metadata entries as well.
     * 
     * This approach enables the efficient traversal and processing of metadata in potentially complex nested collection structures,
     * yielding each metadata entry for further processing without loading the entire structure into memory.
     * 
     * @yields {IterableIterator<T.MetadataT>} An iterator that yields metadata entries as `T.MetadataT` objects, including those from nested collections.
     */    
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


    /**
     * Iterates over service entries in the manifest.
     * 
     * This generator function is designed to iterate through service entries specified within a manifest, assuming
     * the specification kind is 'Manifest'. It navigates through the `service` array of the manifest's `value` property,
     * if present, utilizing the nullish coalescing operator to provide a fallback empty array. Each service entry encountered
     * is processed through the `F.writeServiceT` function, which adapts the service data to conform to a specific type `T.ServiceT`.
     * 
     * The function yields each processed service entry, facilitating lazy evaluation and efficient processing of potentially
     * large sets of service entries without necessitating their complete loading into memory at once.
     * 
     * @yields {IterableIterator<T.ServiceT>} An iterator that yields service entries as `T.ServiceT` objects.
     */    
    *iterateManifestService(): IterableIterator<T.ServiceT> {
        if (this.specification.kind === 'Manifest') {
            for (const service of this.specification.value.service ?? []) {
                yield F.writeServiceT(service);
            }
        }
    }


    /**
     * Iterates over thumbnail service entries in the manifest.
     * 
     * This generator function is specifically designed to iterate through service entries associated with thumbnails
     * within a manifest, provided the specification kind is 'Manifest'. It navigates through the `thumbnail` array of
     * the manifest's `value` property, if present, and for each thumbnail, iterates through the `service` array, if present.
     * Each service entry encountered is processed through the `F.writeServiceT` function, which adapts the service data to
     * conform to a specific type `T.ServiceT`.
     * 
     * The function yields each processed service entry from the thumbnails, enabling lazy evaluation and efficient processing
     * of potentially large sets of service entries without requiring them all to be loaded into memory simultaneously.
     * 
     * @yields {IterableIterator<T.ServiceT>} An iterator that yields thumbnail service entries as `T.ServiceT` objects.
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
     * Iterates over "service" entries within "service" objects associated with thumbnails in the manifest.
     * 
     * This generator function is crafted for manifests of the 'Manifest' kind. It specifically targets iterating through
     * "service" entries that are nested within "service" objects of each thumbnail defined in the manifest. The iteration
     * process navigates through the `thumbnail` array of the manifest's `value` property, if present. For each thumbnail,
     * it iterates through the `service` array, and for each service object, it further iterates through the nested `service`
     * array within the service object's `value` property.
     * 
     * Each nested "service" entry encountered is processed through the `F.writeServiceT` function, which adapts the service
     * data to conform to a specific type `T.ServiceT`. This allows for the efficient processing and transformation of nested
     * service entries related to thumbnails, facilitating their use in various application contexts.
     * 
     * @yields {IterableIterator<T.ServiceT>} An iterator that yields nested "service" entries as `T.ServiceT` objects, specifically
     * from the "service" objects associated with thumbnails in the manifest.
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
     * Iterates over nested "service" entries within "service" objects in the manifest.
     * 
     * This generator function is designed for use with manifests of the 'Manifest' kind. It iterates over "service" entries
     * that are nested within "service" objects specified in the manifest. The iteration begins by checking if the current
     * specification's kind is 'Manifest'. If so, it proceeds to iterate through the `service` array of the manifest's `value`
     * property, utilizing the nullish coalescing operator to ensure an empty array is used if `service` is undefined.
     * 
     * For each "service" object encountered in this array, the function iterates through the nested `service` array within
     * the `value` property of the "service" object, again using the nullish coalescing operator for safety. Each nested "service"
     * entry encountered is then processed through the `F.writeServiceT` function, which adapts the service data to conform to
     * a specific type `T.ServiceT`.
     * 
     * This function facilitates the efficient processing and iteration over nested "service" entries, yielding each one for
     * further processing or use within the application.
     * 
     * @yields {IterableIterator<T.ServiceT>} An iterator that yields nested "service" entries as `T.ServiceT` objects from
     * the "service" objects in the manifest.
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
     * Iterates over service entries in the manifest.
     * 
     * This generator function is designed to iterate through service entries specified within a manifest, assuming
     * the specification kind is 'Manifest'. It navigates through the `services` array of the manifest's `value` property,
     * if present, utilizing the nullish coalescing operator to provide a fallback empty array. Each service entry encountered
     * is processed through the `F.writeServiceT` function, which adapts the service data to conform to a specific type `T.ServiceT`.
     * 
     * The function yields each processed service entry, facilitating lazy evaluation and efficient processing of potentially
     * large sets of service entries without necessitating their complete loading into memory at once.
     * 
     * @yields {IterableIterator<T.ServiceT>} An iterator that yields service entries as `T.ServiceT` objects.
     */    
    *iterateManifestServices(): IterableIterator<T.ServiceT> {
        if (this.specification.kind === 'Manifest') {
            for (const services of this.specification.value.services ?? []) {
                yield F.writeServiceT(services);
            }
        }
    }

    /**
     * Iterates over "service" entries within "services" objects in a manifest.
     * 
     * This generator function is tailored for manifests identified by the 'Manifest' kind. It specifically targets the iteration
     * over "service" entries that are nested within "services" objects contained in the manifest. The process begins by checking
     * if the current specification's kind is 'Manifest'. If so, it proceeds to iterate through the `services` array found in the
     * manifest's `value` property. Utilizing the nullish coalescing operator ensures that an empty array is used if `services` is
     * undefined, preventing potential runtime errors.
     * 
     * For each "services" object encountered in this array, the function iterates through the nested `service` array within the
     * `value` property of the "services" object. Each "service" entry found is then processed through the `F.writeServiceT` function,
     * which adapts the service data to conform to a specific type `T.ServiceT`, suitable for further processing or use within the
     * application.
     * 
     * This function facilitates efficient processing and iteration over nested "service" entries, yielding each one for further
     * processing or use, thereby enhancing the application's capability to handle complex manifest data structures.
     * 
     * @yields {IterableIterator<T.ServiceT>} An iterator that yields "service" entries as `T.ServiceT` objects from the "services"
     * objects in the manifest.
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
     * Iterates over W3C annotation objects in a manifest.
     * 
     * This generator function is designed for manifests that conform to the W3C Web Annotation Data Model. It specifically targets
     * the iteration over annotation objects contained within annotation pages of a manifest. The function checks if the current
     * specification's kind is 'Manifest'. If so, it proceeds to iterate through the `annotations` array found in the manifest's
     * `value` property, using the nullish coalescing operator to default to an empty array if `annotations` is undefined.
     * 
     * For each annotation page encountered in this array, the function iterates through the `items` array within the annotation
     * page, again using the nullish coalescing operator for safety. Each annotation encountered is then processed through the
     * `F.writeAnnotationT` function, which adapts the annotation data to conform to a specific type `T.AnnotationT`, suitable for
     * further processing or use within the application.
     * 
     * This function facilitates the efficient processing and iteration over W3C annotation objects, yielding each one for further
     * processing or use, thereby enhancing the application's capability to handle complex annotation data structures.
     * 
     * @yields {IterableIterator<T.AnnotationT>} An iterator that yields W3C annotation objects as `T.AnnotationT` objects from the
     * annotation pages in the manifest.
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

}