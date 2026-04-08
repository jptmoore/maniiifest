
export function restore_specification<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${JSON.stringify(x)}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_specification<T extends { type: string }, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (x.type === 'Manifest') {
        return fn(['Manifest', x], context);
    } else if (x.type === 'Collection') {
        return fn(['Collection', x], context);
    } else {
        throw new Error(`${JSON.stringify(x)}: Input type did not match expected types.`);
    }
}

export function restore_service<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${JSON.stringify(x)}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_service<T, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (Array.isArray(x)) {
        return fn(['Array', x], context);
    } else {
        return fn(['Value', x], context);
    }
}

export function restore_service_item<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${JSON.stringify(x)}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_service_item<T, R>(x: T, context: any = {}, fn: (input: [string, T], context: any) => R): R {
    if (x !== null && typeof x === 'object') {
        if ('id' in x) {
            return fn(['Modern', x], context);
        } else if ('@id' in x) {
            return fn(['Legacy', x], context);
        } else {
            throw new Error(`${JSON.stringify(x)}: Input type did not match expected types.`);
        }
    } else {
        throw new Error(`${JSON.stringify(x)}: Input type did not match expected types.`);
    }
}

export function restore_motivation<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${JSON.stringify(x)}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_motivation<T, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (typeof (x) === 'string') {
        return fn(['Value', x], context);
    } else if (Array.isArray(x)) {
        return fn(['Array', x], context);
    } else {
        throw new Error(`${JSON.stringify(x)}: Input type did not match expected types.`);
    }
}

export function restore_annotation_body<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${JSON.stringify(x)}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_annotation_body<T extends { type: string }, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    const resourceTypes = ['Image', 'Video', 'Audio', 'Sound', 'Text'];
    if (typeof x === 'string') {
        return fn(['String', x], context);
    } else if (typeof x === 'object' && resourceTypes.includes(x.type)) {
        return fn(['Resource', x], context);
    } else if (typeof x === 'object' && x.type === 'SpecificResource') {
        return fn(['SpecificResource', x], context);
    } else if (typeof x === 'object' && x.type === 'TextualBody') {
        return fn(['TextualBody', x], context);
    } else if (typeof x === 'object' && x.type === 'Feature') {
        return fn(['Feature', x], context);
    } else if (typeof x === 'object' && x.type === 'FeatureCollection') {
        return fn(['FeatureCollection', x], context);
    } else if (typeof x === 'object' && x.type === 'Choice') {
        // Choice before Untyped: Untyped is the catch-all and must come last
        return fn(['Choice', x], context);
    } else if (typeof x === 'object') {
        return fn(['Untyped', x], context);
    } else {
        throw new Error(`${JSON.stringify(x)}: Input type did not match expected types.`);
    }
}

export function restore_annotation_body_items<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${JSON.stringify(x)}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_annotation_body_items<T extends { type: string }, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    const resourceTypes = ['Image', 'Video', 'Audio', 'Sound', 'Text'];
    if (typeof x === 'string') {
        return fn(['String', x], context);
    } else if (typeof x === 'object' && resourceTypes.includes(x.type)) {
        return fn(['Resource', x], context);
    } else if (typeof x === 'object' && x.type === 'SpecificResource') {
        return fn(['SpecificResource', x], context);
    } else if (typeof x === 'object' && x.type === 'TextualBody') {
        return fn(['TextualBody', x], context);
    } else if (typeof x === 'object' && x.type === 'Feature') {
        return fn(['Feature', x], context);
    } else {
        throw new Error(`${JSON.stringify(x)}: Input type did not match expected types.`);
    }
}


export function restore_annotation_target<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${JSON.stringify(x)}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_annotation_target<T extends { type: string }, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (typeof (x) === 'string') {
        return fn(['String', x], context);
    } else if (('source' in x) && ('scope' in x)) {
        return fn(['SelectorTarget', x], context);
    } else if (('source' in x)) {
        return fn(['SpecificResource', x], context);        
    } else if (('id' in x)) {
        return fn(['CanvasRef', x], context);    
    } else {
        throw new Error(`${JSON.stringify(x)}: Input type did not match expected types.`);
    }
}

export function restore_resource_selector<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${JSON.stringify(x)}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_resource_selector<T extends { type: string }, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (typeof x === 'string') {
        return fn(['String', x], context);
    } else if (typeof x === 'object' && x.type === 'PointSelector') {
        return fn(['PointSelector', x], context);
    } else if (typeof x === 'object' && x.type === 'FragmentSelector') {
        return fn(['FragmentSelector', x], context);
    } else if (typeof x === 'object' && x.type === 'SvgSelector') {
        return fn(['SvgSelector', x], context);
    } else if (typeof x === 'object' && (x.type === 'ImageApiSelector' || x.type === 'iiif:ImageApiSelector')) {
        return fn(['ImageApiSelector', x], context);
    } else if (typeof x === 'object' && x.type === 'TextQuoteSelector') {
        return fn(['TextQuoteSelector', x], context);
    } else if (typeof x === 'object' && x.type === 'XPathSelector') {
        return fn(['XPathSelector', x], context);
    } else {
        throw new Error(`${JSON.stringify(x)}: Input type did not match expected types.`);
    }
}


export function restore_source<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${JSON.stringify(x)}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_source<T, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (typeof (x) === 'string') {
        return fn(['Ref', x], context);
    } else if (typeof (x) === 'object') {
        return fn(['Object', x], context);
    } else {
        throw new Error(`${JSON.stringify(x)}: Input type did not match expected types.`);
    }
}

export function restore_body<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${JSON.stringify(x)}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_body<T, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (Array.isArray(x)) {
        return fn(['Array', x], context);
    } else {
        return fn(['Value', x], context);
    }
}

export function restore_target<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${JSON.stringify(x)}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_target<T, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (Array.isArray(x)) {
        return fn(['Array', x], context);
    } else {
        return fn(['Value', x], context);
    }
}

export function restore_first<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${JSON.stringify(x)}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_first<T, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (typeof (x) === 'string') {
        return fn(['Ref', x], context);
    } else if (typeof (x) === 'object') {
        return fn(['Object', x], context);
    } else {
        throw new Error(`${JSON.stringify(x)}: Input type did not match expected types.`);
    }
}

export function restore_label<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${JSON.stringify(x)}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_label<T, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (typeof (x) === 'string') {
        return fn(['Plain', x], context);
    } else if (typeof (x) === 'object') {
        return fn(['Multilingual', x], context);
    } else {
        throw new Error(`${JSON.stringify(x)}: Input type did not match expected types.`);
    }
}

export function restore_selector<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${JSON.stringify(x)}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_selector<T, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (Array.isArray(x)) {
        return fn(['Array', x], context);
    } else {
        return fn(['Value', x], context);
    }
}

export function restore_range_items<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${JSON.stringify(x)}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_range_items<T extends { type: string }, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (typeof x === 'object' && x.type === 'SpecificResource') {
        return fn(['SpecificResource', x], context);
    } else if (typeof x === 'object' && x.type === 'Canvas') {
        return fn(['Canvas', x], context);
    } else if (typeof x === 'object' && x.type === 'Range') {
        return fn(['Range', x], context);
    } else {
        throw new Error(`${JSON.stringify(x)}: Input type did not match expected types.`);
    }
}

export function restore_geometry<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${JSON.stringify(x)}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_geometry<T extends { type: string }, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (typeof x === 'object' && x.type === 'Point') {
        return fn(['Point', x], context);
    } else if (typeof x === 'object' && x.type === 'MultiPoint') {
        return fn(['MultiPoint', x], context);
    } else if (typeof x === 'object' && x.type === 'LineString') {
        return fn(['LineString', x], context);
    } else if (typeof x === 'object' && x.type === 'MultiLineString') {
        return fn(['MultiLineString', x], context);
    } else if (typeof x === 'object' && x.type === 'Polygon') {
        return fn(['Polygon', x], context);
    } else if (typeof x === 'object' && x.type === 'MultiPolygon') {
        return fn(['MultiPolygon', x], context);
    } else if (typeof x === 'object' && x.type === 'GeometryCollection') {
        return fn(['GeometryCollection', x], context);
    } else {
        throw new Error(`${JSON.stringify(x)}: Input type did not match expected types.`);
    }
}

export function restore_language<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${JSON.stringify(x)}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_language<T, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (Array.isArray(x)) {
        return fn(['Array', x], context);
    } else {
        return fn(['Value', x], context);
    }
}

export function restore_context<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${JSON.stringify(x)}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_context<T, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (Array.isArray(x)) {
        return fn(['Array', x], context);
    } else {
        return fn(['Value', x], context);
    }
}

export function restore_part_of<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${JSON.stringify(x)}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_part_of<T, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (typeof (x) === 'string') {
        return fn(['Ref', x], context);
    } else if (typeof (x) === 'object') {
        return fn(['Object', x], context);
    } else {
        throw new Error(`${JSON.stringify(x)}: Input type did not match expected types.`);
    }
}

export function restore_creator<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${JSON.stringify(x)}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_creator<T, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (Array.isArray(x)) {
        return fn(['Array', x], context);
    } else {
        return fn(['Value', x], context);
    }
}

export function restore_creator_item<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${JSON.stringify(x)}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_creator_item<T, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (typeof (x) === 'string') {
        return fn(['Ref', x], context);
    } else if (typeof (x) === 'object') {
        return fn(['Object', x], context);
    } else {
        throw new Error(`${JSON.stringify(x)}: Input type did not match expected types.`);
    }
}

export function restore_email_strings<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${JSON.stringify(x)}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_email_strings<T, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (Array.isArray(x)) {
        return fn(['Array', x], context);
    } else {
        return fn(['Value', x], context);
    }
}

export function restore_email_sha1_strings<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${JSON.stringify(x)}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_email_sha1_strings<T, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (Array.isArray(x)) {
        return fn(['Array', x], context);
    } else {
        return fn(['Value', x], context);
    }
}

export function restore_homepage_strings<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${JSON.stringify(x)}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_homepage_strings<T, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (Array.isArray(x)) {
        return fn(['Array', x], context);
    } else {
        return fn(['Value', x], context);
    }
}