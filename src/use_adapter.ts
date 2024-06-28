import { normalize,restore } from "./adapter";

export function writeTargetT(x: any, context: any = x): TargetT {
    return restore(x, context, _writeTargetT);
}

export function readTargetT(x: any, context: any = x): TargetT {
    return normalize(x, context, _readTargetT);
}
