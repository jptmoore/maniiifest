
export function restore<T, R>(x: T, context: any = x, fn: (input: T, context: any) => R[]): R {
    const resultList = fn(x, context);
    if (resultList.length < 2) {
        throw new Error('Result array must contain at least two items.');
    }
    return resultList[1];
}

export function normalize<T, R>(x: T, context: any = x, fn: (input: [string, T], context: any) => R): R {
    if (typeof (x) === 'string') {
        return fn(['T1', x], context);
    } else if (typeof (x) === 'object') {
        return fn(['T2', x], context);
    } else {
        throw new Error('Input type did not match expected types.');
    }
}

