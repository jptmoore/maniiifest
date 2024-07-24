#!/bin/bash

# compile spec
atdts ../src/specification.atd
# rename functions to use adatper
sed -i 's/export function writeSpecificationT(/export function _writeSpecificationT(/g' specification.ts
sed -i 's/export function readSpecificationT(/export function _readSpecificationT(/g' specification.ts

sed -i 's/export function writeW3cAnnotationTargetT(/export function _writeW3cAnnotationTargetT(/g' specification.ts
sed -i 's/export function readW3cAnnotationTargetT(/export function _readW3cAnnotationTargetT(/g' specification.ts

sed -i 's/export function writeServiceT(/export function _writeServiceT(/g' specification.ts
sed -i 's/export function readServiceT(/export function _readServiceT(/g' specification.ts

sed -i 's/export function writeMotivationT(/export function _writeMotivationT(/g' specification.ts
sed -i 's/export function readMotivationT(/export function _readMotivationT(/g' specification.ts

sed -i 's/export function writeAnnotationBodyT(/export function _writeAnnotationBodyT(/g' specification.ts
sed -i 's/export function readAnnotationBodyT(/export function _readAnnotationBodyT(/g' specification.ts

# rename _type to use type
sed -i 's/_type/type/g' specification.ts
# add adapter code
cat use_adapter.ts >> specification.ts

# move to src
mv specification.ts ../src/specification.ts
