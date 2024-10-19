import { Maniiifest } from '../src/Maniiifest';

async function fetchJson(url: string) {
    const response = await fetch(url);
    return response.json();
}

async function processAnnotationPage(annotationPageUrl: string) {
    const jsonData = await fetchJson(annotationPageUrl);
    const parser = new Maniiifest(jsonData, "AnnotationPage");
    const textualBodies = parser.iterateAnnotationPageAnnotationTextualBody();
    for (const text of textualBodies) {
        console.log(text.value);
    }
}

async function processManifest(manifestUrl: string) {
    const jsonData = await fetchJson(manifestUrl);
    const parser = new Maniiifest(jsonData);
    const annotationPages = parser.iterateManifestCanvasW3cAnnotationPage();
    for (const page of annotationPages) {
        await processAnnotationPage(page.id);
    }
}

async function main() {
    const collectionUrl = 'https://iiif.wellcomecollection.org/presentation/b19974760';
    const jsonData = await fetchJson(collectionUrl);
    const parser = new Maniiifest(jsonData);
    const manifests = parser.iterateCollectionManifest();
    let count = 0;
    for (const item of manifests) {
        if (count >= 5) break;
        const manifestRef = new Maniiifest(item);
        const manifestId = manifestRef.getManifestId();
        if (manifestId) {
            await processManifest(manifestId);
        } else {
            console.error('Manifest ID is null');
        }
        count++;
    }
}

main().catch(console.error);