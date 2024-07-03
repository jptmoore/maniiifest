
export function restore_target<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error('Result array must contain at least two items.');
    }
    return resultList[1];
}

export function normalize_target<T, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (typeof (x) === 'string') {
        return fn(['T1', x], context);
    } else if (typeof (x) === 'object') {
        return fn(['T2', x], context);
    } else {
        throw new Error('Input type did not match expected types.');
    }
}

export function restore_specification<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error('Result array must contain at least two items.');
    }
    return resultList[1];
}

export function normalize_specification<T extends { type: string }, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (x.type === 'Manifest') {
        return fn(['Manifest', x], context);
    } else if (x.type === 'Collection') {
        return fn(['Collection', x], context);
    } else {
        throw new Error('Input type did not match expected types.');
    }
}



export function normalize_label<T, R>(x: T, context: any = x, fn: (input: [string, any], context: any) => R): R {
    if (typeof x === 'string') {
        return fn(['T1', x], context);
    } else if (typeof x === 'object' && x !== null && !Array.isArray(x)) {
        const arrayRepresentation = Object.entries(x);
        return fn(['T2', arrayRepresentation], context);
    } else {
        throw new Error('Input type did not match expected types.');
    }
}


export function restore_label<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): { [key: string]: string[] } {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error('Result array must contain at least two items.');
    }
    // Assuming resultList[1] is an array of [string, string[]] tuples
    const listRepresentation = resultList[1] as [string, string[]][];
    return listRepresentation.reduce<{ [key: string]: string[] }>((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});
}