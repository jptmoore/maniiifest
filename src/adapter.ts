
export function restore_specification<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${x}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_specification<T extends { type: string }, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (x.type === 'Manifest') {
        return fn(['Manifest', x], context);
    } else if (x.type === 'Collection') {
        return fn(['Collection', x], context);
    } else {
        throw new Error(`${x}: Input type did not match expected types.`);
    }
}

export function restore_service<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${x}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_service<T, R>(x: T, context: any = {}, fn: (input: [string, T], context: any) => R): R {
    if (x !== null && typeof x === 'object') {
        if ('id' in x) {
            return fn(['T1', x], context);
        } else if ('@id' in x) {
            return fn(['T2', x], context);
        } else {
            throw new Error(`${x}: Input type did not match expected types.`);
        }
    } else {
        throw new Error(`${x}: Input type did not match expected types.`);
    }
}

export function restore_motivation<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${x}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_motivation<T, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (typeof (x) === 'string') {
        return fn(['T1', x], context);
    } else if (Array.isArray(x)) {
        return fn(['T2', x], context);
    } else {
        throw new Error(`${x}: Input type did not match expected types.`);
    }
}

export function restore_annotation_body<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${x}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_annotation_body<T extends { type: string }, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (x.type === 'Image') {
        return fn(['T1', x], context);
    } else if (x.type === 'TextualBody') {
        return fn(['T2', x], context);
    } else if (x.type === 'Choice') {
        return fn(['T3', x], context)    
    } else {
        throw new Error(`${x}: Input type did not match expected types.`);
    }
}

export function restore_annotation_target<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${x}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_annotation_target<T extends { type: string }, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (typeof (x) === 'string') {
        return fn(['T1', x], context);
    } else if (typeof x === 'object' && x.type === 'SpecificResource') {
        return fn(['T2', x], context);
    } else if (typeof x === 'object' && ('source' in x) && ('scope' in x)) {
        return fn(['T3', x], context);        
    } else {
        throw new Error(`${x}: Input type did not match expected types.`);
    }
}

export function restore_selector<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${x}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_selector<T extends { type: string }, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (typeof x === 'string') {
        return fn(['T1', x], context);
    } else if (typeof x === 'object' && x.type === 'PointSelector') {
        return fn(['T2', x], context);
    } else if (typeof x === 'object' && x.type === 'FragmentSelector') {
        return fn(['T3', x], context);
    } else if (typeof x === 'object' && x.type === 'SvgSelector') {
        return fn(['T4', x], context);
    } else if (typeof x === 'object' && x.type === 'ImageApiSelector') {
        return fn(['T5', x], context);
    } else {
        throw new Error(`${x}: Input type did not match expected types.`);
    }
}


export function restore_source<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error(`${x}: Result array must contain at least two items.`);
    }
    return resultList[1];
}

export function normalize_source<T, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (typeof (x) === 'string') {
        return fn(['T1', x], context);
    } else if (typeof (x) === 'object') {
        return fn(['T2', x], context);
    } else {
        throw new Error(`${x}: Input type did not match expected types.`);
    }
}
