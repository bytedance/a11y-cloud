/*
Copyright (2024) Bytedance Ltd. and/or its affiliates
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import { types as t } from '@babel/core';
import md5 from 'md5';

import { nameGenerator } from './name-generator';

function getCustomAttributes(params, options, md5ValueMap) {
  const propertyValue = nameGenerator(params, options);
  const propertyValueByMd5 = md5(propertyValue)?.slice(0, 8);

  // Store the generated MD5 string, as it will be needed when searching for the parent element
  // 将生成的 md5 字符串存起来，在查找父元素的时候需要用
  md5ValueMap[propertyValueByMd5] = propertyValue;

  return propertyValueByMd5;
}

export function setCustomAttributesForReactCreateElement(
  params,
  options,
  md5ValueMap,
  customIdProperty,
) {
  return [
    t.stringLiteral(customIdProperty),
    t.stringLiteral(getCustomAttributes(params, options, md5ValueMap)),
  ];
}

export function setCustomAttributesForJSX(
  params,
  options,
  md5ValueMap,
  customIdProperty,
) {
  return [
    t.jSXAttribute(
      t.jSXIdentifier(customIdProperty),
      t.stringLiteral(getCustomAttributes(params, options, md5ValueMap)),
    ),
  ];
}
