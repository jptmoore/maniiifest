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
        if (!Array.isArray(this.specification?.value?.items)) {
            throw new UndefinedPropertyError('Canvas items');
        }
        for (const canvas of this.specification.value.items) {
            if (!Array.isArray(canvas.annotations)) {
                throw new UndefinedPropertyError('Canvas annotations');
            }
            for (const annotationPage of canvas.annotations) {
                if (!Array.isArray(annotationPage.items)) {
                    throw new UndefinedPropertyError('Annotation page items');
                }
                for (const annotation of annotationPage.items) {
                    yield F.writeW3cAnnotationT(annotation);
                }
            }
        }
    }

    *getCanvas(): IterableIterator<T.CanvasT> {
        if (!Array.isArray(this.specification?.value?.items)) {
            throw new UndefinedPropertyError('Canvas items');
        }
        for (const canvas of this.specification.value.items) {
            yield F.writeCanvasT(canvas);
        }
    }
    
    *getThumbnail(): IterableIterator<T.ThumbnailT> {
        if (!Array.isArray(this.specification?.value?.thumbnail)) {
            throw new UndefinedPropertyError('Thumbnail');
        }
        for (const thumbnail of this.specification.value.thumbnail) {
            yield F.writeThumbnailT(thumbnail);
        }
    }
    
    *getMetadata(): IterableIterator<T.MetadataT> {
        if (!Array.isArray(this.specification?.value?.metadata)) {
            throw new UndefinedPropertyError('Metadata');
        }
        for (const metadata of this.specification.value.metadata) {
            yield F.writeMetadataT(metadata);
        }
    }

}