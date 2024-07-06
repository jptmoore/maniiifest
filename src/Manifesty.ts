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

    getSomeMetadata({ n }: { n: number }): Array<T.MetadataT> {
        const metadata = [];
        const count = Math.min(n, this.getMetadataCount());
        for (let index = 0; index < count; index++) {
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

    getSomeThumbnails({ n }: { n: number }): Array<T.ThumbnailT> {
        const thumbnails = [];
        const count = Math.min(n, this.getThumbnailCount());
        for (let index = 0; index < count; index++) {
            const thumbnail = this.getThumbnailAtIndex({ index });
            thumbnails.push(thumbnail);
        }
        return thumbnails;
    }

    getAllThumbnails(): Array<T.ThumbnailT> {
        const thumbnails = [];
        for (let index = 0; index < this.getThumbnailCount(); index++) {
            const thumbnail = this.getThumbnailAtIndex({ index });
            thumbnails.push(thumbnail);
        }
        return thumbnails;
    }

    getW3cAnnotationAtIndex({ index }: { index: number }): T.W3cAnnotationT {
        switch (this.getSpecificationType()) {
            case "Manifest":
                return F.writeW3cAnnotationT(this.specification.value.annotations[index]);
            default:
                throw new Error("Not of type Manifest.");
        }
    }

    getW3cAnnotationCount(): number {
        switch (this.getSpecificationType()) {
            case "Manifest":
                return this.specification.value.annotations.length;
            default:
                throw new Error("Not of type Manifest.");
        }
    }

    getAllW3cAnnotations(): Array<T.W3cAnnotationT> {
        const annotations = [];
        for (let index = 0; index < this.getW3cAnnotationCount(); index++) {
            const annotation = this.getW3cAnnotationAtIndex({ index });
            annotations.push(annotation);
        }
        return annotations;
    }

    getSomeW3cAnnotations({ n }: { n: number }): Array<T.W3cAnnotationT> {
        const annotations = [];
        const count = Math.min(n, this.getW3cAnnotationCount());
        for (let index = 0; index < count; index++) {
            const annotation = this.getW3cAnnotationAtIndex({ index });
            annotations.push(annotation);
        }
        return annotations;
    }

    getW3cAnnnotationBodyAtIndex({ index }: { index: number }): T.W3cAnnotationBodyT {
        switch (this.getSpecificationType()) {
            case "Manifest":
                return F.writeW3cAnnotationBodyT(this.specification.value.annotations[index].body);
            default:
                throw new Error("Not of type Manifest.");
        }
    }

    getW3cAnnotationBodyCount(): number {
        switch (this.getSpecificationType()) {
            case "Manifest":
                return this.specification.value.annotations.length;
            default:
                throw new Error("Not of type Manifest.");
        }
    }

    getAllW3cAnnotationsBody(): Array<T.W3cAnnotationBodyT> {
        const bodies = [];
        for (let index = 0; index < this.getW3cAnnotationBodyCount(); index++) {
            const body = this.getW3cAnnnotationBodyAtIndex({ index });
            bodies.push(body);
        }
        return bodies;

    }

    getSomeW3cAnnotationsBody({ n }: { n: number }): Array<T.W3cAnnotationBodyT> {
        const bodies = [];
        const count = Math.min(n, this.getW3cAnnotationBodyCount());
        for (let index = 0; index < count; index++) {
            const body = this.getW3cAnnnotationBodyAtIndex({ index });
            bodies.push(body);
        }
        return bodies;
    }

    getW3cAnnotationTargetAtIndex({ index }: { index: number }): T.W3cAnnotationTargetT1 | T.W3cAnnotationTargetT2 {
        switch (this.getSpecificationType()) {
            case "Manifest":
                const target = this.specification.value.annotations[index].target;
                switch (target.kind) {
                    case "T1":
                        return F.writeW3cAnnotationTargetT1(target.value);
                    case "T2":
                        return F.writeW3cAnnotationTargetT2(target.value);
                    default:
                        throw new Error("Unknown target kind.");
                }
            default:
                throw new Error("Not of type Manifest.");
        }
    }

    getW3cAnnotationTargetCount(): number {
        switch (this.getSpecificationType()) {
            case "Manifest":
                return this.specification.value.annotations.length;
            default:
                throw new Error("Not of type Manifest.");
        }
    }

    getAllW3cAnnotationTargets(): Array<T.W3cAnnotationTargetT1 | T.W3cAnnotationTargetT2> {
        const targets = [];
        for (let index = 0; index < this.getW3cAnnotationTargetCount(); index++) {
            const target = this.getW3cAnnotationTargetAtIndex({ index });
            targets.push(target);
        }
        return targets;
    }

    getSomeW3cAnnotationTargets({ n }: { n: number }): Array<T.W3cAnnotationTargetT1 | T.W3cAnnotationTargetT2> {
        const targets = [];
        const count = Math.min(n, this.getW3cAnnotationTargetCount());
        for (let index = 0; index < count; index++) {
            const target = this.getW3cAnnotationTargetAtIndex({ index });
            targets.push(target);
        }
        return targets;
    }


}