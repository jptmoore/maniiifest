///// appended to specification.ts

import { normalize,restore } from "./adapter";

export function writeW3cTargetT(x: any, context: any = x): W3cTargetT {
    return restore(x, context, _writeW3cTargetT);
}

export function readW3cTargetT(x: any, context: any = x): W3cTargetT {
    return normalize(x, context, _readW3cTargetT);
}
