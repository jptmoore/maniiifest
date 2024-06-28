///// appended to specification.ts

import { normalize,restore } from "./adapter";

export function writeW3cAnnotationTargetT(x: any, context: any = x): W3cAnnotationTargetT {
    return restore(x, context, _writeW3cAnnotationTargetT);
}

export function readW3cAnnotationTargetT(x: any, context: any = x): W3cAnnotationTargetT {
    return normalize(x, context, _readW3cAnnotationTargetT);
}
