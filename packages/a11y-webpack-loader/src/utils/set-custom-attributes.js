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
