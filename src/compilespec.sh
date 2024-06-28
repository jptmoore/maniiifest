#!/bin/bash

# compile spec
atdts specification.atd
# rename functions to use adatper
sed -i '' 's/export function writeTargetT(/export function _writeTargetT(/g' specification.ts
sed -i '' 's/export function readTargetT(/export function _readTargetT(/g' specification.ts
# rename _type to use type
sed -i '' 's/_type/type/g' specification.ts
# add adapter code
cat use_adapter.ts >> specification.ts
