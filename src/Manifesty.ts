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

    getSpecification(): T.ManifestT | T.CollectionT {
        switch (this.specification.kind) {
            case "Manifest":
                return F.writeManifestT(this.specification.value);
            case "Collection":
                return F.writeCollectionT(this.specification.value);
            default:
                throw new Error("Unknown specification kind.");
        }
    }

    getJson(): any {
        return JSON.stringify(this.getSpecification())
    }

    getSpecificationType(): "Manifest" | "Collection" {
        return this.specification.kind;
    }

    getLabel(): T.LabelT {
        switch (this.getSpecificationType()) {
            case "Manifest":
                return F.writeLabelT(this.specification.value.label);
            default:
                throw new Error("Not of type Manifest.");
        }
    }

    getRequiredStatement(): T.RequiredStatementT {
        switch (this.getSpecificationType()) {
            case "Manifest":
                return F.writeRequiredStatementT(this.specification.value.requiredStatement);
            default:
                throw new Error("Not of type Manifest.");
        }
    }

    getSummary(): T.SummaryT {
        switch (this.getSpecificationType()) {
            case "Manifest":
                return F.writeSummaryT(this.specification.value.summary);
            default:
                throw new Error("Not of type Manifest.");
        }
    }

    getMetadata(): T.MetadataT {
        switch (this.getSpecificationType()) {
            case "Manifest":
                return F.writeMetadataT(this.specification.value.metadata);
            default:
                throw new Error("Not of type Manifest.");
        }
    }

    getMetadataAtIndex({ index }: { index: number }): T.MetadataT {
        switch (this.getSpecificationType()) {
            case "Manifest":
                return F.writeMetadataT(this.specification.value.metadata[index]);
            default:
                throw new Error("Not of type Manifest.");
        }
    }

    getMetadataCount(): number {
        switch (this.getSpecificationType()) {
            case "Manifest":
                return this.specification.value.metadata.length;
            default:
                throw new Error("Not of type Manifest.");
        }
    }

    getAllMetadata(): Array<T.MetadataT> {
        const metadata = [];
        for (let index = 0; index < this.getMetadataCount(); index++) {
            const meta = this.getMetadataAtIndex({ index });
            metadata.push(meta);
        }
        return metadata;
    }

    getThumbnailCount(): number {
        switch (this.getSpecificationType()) {
            case "Manifest":
                return this.specification.value.thumbnail.length;
            default:
                throw new Error("Not of type Manifest.");
        }
    }

    getThumbnailAtIndex({ index }: { index: number }): T.ThumbnailT {
        switch (this.getSpecificationType()) {
            case "Manifest":
                return F.writeThumbnailT(this.specification.value.thumbnail[index]);
            default:
                throw new Error("Not of type Manifest.");
        }
    }

    getAllThumbnails(): Array<T.ThumbnailT> {
        const thumbnails = [];
        for (let index = 0; index < this.getThumbnailCount(); index++) {
            const thumbnail = this.getThumbnailAtIndex({ index });
            thumbnails.push(thumbnail);
        }
        return thumbnails;
    }

    getW3cAnnotationCount(): number {
        switch (this.getSpecificationType()) {
            case "Manifest":
                return this.specification.value.annotations.length;
            default:
                throw new Error("Not of type Manifest.");
        }
    }

    getSliceOfW3cAnnotations({ start, end }: { start: number; end: number }): Array<T.W3cAnnotationPageT> {
        if (!Array.isArray(this.specification.value.annotations) || start < 0 || end <= start) return [];
        const result: Array<T.W3cAnnotationPageT> = [];
        const annotations = this.specification.value.annotations;
    
        // Directly iterate over the range, avoiding the creation of a large intermediate array.
        for (let i = start; i < end && i < annotations.length; i++) {
            const annotation = annotations[i];
            result.push(F.writeW3cAnnotationPageT(annotation));
        }
    
        return result;
    }

    getAllW3cAnnotations(): Array<T.W3cAnnotationPageT> {
        return this.getSliceOfW3cAnnotations({ start: 0, end: this.getW3cAnnotationCount() });
    }
        

    getSliceOfW3cAnnotationsBody({ start, end }: { start: number; end: number }): Array<T.W3cAnnotationBodyT> {
        if (!Array.isArray(this.specification.value.annotations) || start < 0 || end <= start) return [];
        let currentIndex = 0;
        const result: Array<T.W3cAnnotationBodyT> = [];

        for (const annotation_page of this.specification.value.annotations) {
            if (currentIndex >= end) break; // Early exit if end of range is reached
            const items = annotation_page.items || [];
            for (const item of items) {
                if (item.body) {
                    if (currentIndex >= start && currentIndex < end) {
                        result.push(item.body);
                    }
                    currentIndex++;
                    if (currentIndex >= end) break; // Stop adding bodies once the end of the range is reached
                }
            }
        }

        return result;
    }

    getAllAnnotationsBody(): Array<T.W3cAnnotationBodyT> {
        return this.getSliceOfW3cAnnotationsBody({ start: 0, end: this.getW3cAnnotationsBodyCount() });
    }

    getW3cAnnotationsBodyCount(): number {
        if (!Array.isArray(this.specification.value.annotations)) {
            return 0;
        }
        return this.specification.value.annotations.reduce((count: number, annotation_page: { items: T.W3cAnnotationT[]; }) =>
            count + (annotation_page.items?.reduce((itemCount, item) => itemCount + (item.body ? 1 : 0), 0) || 0),
            0);
    }

    getSliceOfAnnotationsTarget({ start, end }: { start: number; end: number }): Array<T.W3cAnnotationTargetT1 | T.W3cAnnotationTargetT2> {
        if (!Array.isArray(this.specification.value.annotations) || start < 0 || end <= start) return [];
        let currentIndex = 0;
        const result: Array<T.W3cAnnotationTargetT1 | T.W3cAnnotationTargetT2> = [];

        for (const annotation_page of this.specification.value.annotations) {
            if (currentIndex >= end) break; // Early exit if end of range is reached
            const items = annotation_page.items || [];
            for (const item of items) {
                if (item.target) {
                    if (currentIndex >= start && currentIndex < end) {
                        switch (item.target.kind) {
                            case "T1":
                                result.push(F.writeW3cAnnotationTargetT1(item.target.value));
                                break;
                            case "T2":
                                result.push(F.writeW3cAnnotationTargetT2(item.target.value));
                                break;
                            default:
                                throw new Error("Unknown target kind.");
                        }
                    }
                    currentIndex++;
                    if (currentIndex >= end) break; // Stop adding targets once the end of the range is reached
                }
            }
        }

        return result;
    }


    getAllW3cAnnotationsTarget(): Array<T.W3cAnnotationTargetT1 | T.W3cAnnotationTargetT2> {
        return this.getSliceOfAnnotationsTarget({ start: 0, end: this.getW3cAnnotationsTargetCount() });
    }


    getW3cAnnotationsTargetCount(): number {
        if (!Array.isArray(this.specification.value.annotations)) {
            return 0;
        }
        return this.specification.value.annotations.reduce((count: number, annotation_page: { items: T.W3cAnnotationT[]; }) =>
            count + (annotation_page.items?.reduce((itemCount, item) => itemCount + (item.target ? 1 : 0), 0) || 0),
            0);
    }

}