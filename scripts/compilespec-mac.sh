#!/bin/bash

# compile spec
atdts ../src/specification.atd
# rename functions to use adatper
sed -i '' 's/export function writeSpecificationT(/export function _writeSpecificationT(/g' specification.ts
sed -i '' 's/export function readSpecificationT(/export function _readSpecificationT(/g' specification.ts

sed -i '' 's/export function writeServiceT(/export function _writeServiceT(/g' specification.ts
sed -i '' 's/export function readServiceT(/export function _readServiceT(/g' specification.ts

sed -i '' 's/export function writeServiceItemT(/export function _writeServiceItemT(/g' specification.ts
sed -i '' 's/export function readServiceItemT(/export function _readServiceItemT(/g' specification.ts

sed -i '' 's/export function writeMotivationT(/export function _writeMotivationT(/g' specification.ts
sed -i '' 's/export function readMotivationT(/export function _readMotivationT(/g' specification.ts

sed -i '' 's/export function writeAnnotationBodyT(/export function _writeAnnotationBodyT(/g' specification.ts
sed -i '' 's/export function readAnnotationBodyT(/export function _readAnnotationBodyT(/g' specification.ts

sed -i '' 's/export function writeAnnotationBodyItemsT(/export function _writeAnnotationBodyItemsT(/g' specification.ts
sed -i '' 's/export function readAnnotationBodyItemsT(/export function _readAnnotationBodyItemsT(/g' specification.ts

sed -i '' 's/export function writeAnnotationTargetT(/export function _writeAnnotationTargetT(/g' specification.ts
sed -i '' 's/export function readAnnotationTargetT(/export function _readAnnotationTargetT(/g' specification.ts

sed -i '' 's/export function writeSelectorT(/export function _writeSelectorT(/g' specification.ts
sed -i '' 's/export function readSelectorT(/export function _readSelectorT(/g' specification.ts

sed -i '' 's/export function writeSourceT(/export function _writeSourceT(/g' specification.ts
sed -i '' 's/export function readSourceT(/export function _readSourceT(/g' specification.ts

sed -i '' 's/export function writeBodyT(/export function _writeBodyT(/g' specification.ts
sed -i '' 's/export function readBodyT(/export function _readBodyT(/g' specification.ts

sed -i '' 's/export function writeTargetT(/export function _writeTargetT(/g' specification.ts
sed -i '' 's/export function readTargetT(/export function _readTargetT(/g' specification.ts

sed -i '' 's/export function writeFirstT(/export function _writeFirstT(/g' specification.ts
sed -i '' 's/export function readFirstT(/export function _readFirstT(/g' specification.ts

sed -i '' 's/export function writeLabelT(/export function _writeLabelT(/g' specification.ts
sed -i '' 's/export function readLabelT(/export function _readLabelT(/g' specification.ts

sed -i '' 's/export function writeResourceSelectorT(/export function _writeResourceSelectorT(/g' specification.ts
sed -i '' 's/export function readResourceSelectorT(/export function _readResourceSelectorT(/g' specification.ts

sed -i '' 's/export function writeRangeItemsT(/export function _writeRangeItemsT(/g' specification.ts
sed -i '' 's/export function readRangeItemsT(/export function _readRangeItemsT(/g' specification.ts

sed -i '' 's/export function writeGeometryT(/export function _writeGeometryT(/g' specification.ts
sed -i '' 's/export function readGeometryT(/export function _readGeometryT(/g' specification.ts

sed -i '' 's/export function writeLanguageT(/export function _writeLanguageT(/g' specification.ts
sed -i '' 's/export function readLanguageT(/export function _readLanguageT(/g' specification.ts

sed -i '' 's/export function writeContextT(/export function _writeContextT(/g' specification.ts
sed -i '' 's/export function readContextT(/export function _readContextT(/g' specification.ts

sed -i '' 's/export function writePartOfT(/export function _writePartOfT(/g' specification.ts
sed -i '' 's/export function readPartOfT(/export function _readPartOfT(/g' specification.ts

# rename _type to use type
sed -i '' 's/_type/type/g' specification.ts
# add adapter code
cat use_adapter.ts >> specification.ts

# move to src
mv specification.ts ../src/specification.ts
