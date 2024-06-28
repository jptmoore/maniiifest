#!/bin/bash

# compile spec
atdts specification.atd
# rename functions to use adatper
sed -i '' 's/export function writeW3cAnnotationTargetT(/export function _writeW3cAnnotationTargetT(/g' specification.ts
sed -i '' 's/export function readW3cAnnotationTargetT(/export function _readW3cAnnotationTargetT(/g' specification.ts
# rename _type to use type
sed -i '' 's/_type/type/g' specification.ts
# add adapter code
cat use_adapter.ts >> specification.ts
