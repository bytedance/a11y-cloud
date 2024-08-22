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
import { isObjectAssign, isReactCreateElement } from './is';

function getParentTagNameFromMD5(
  md5ValueMap,
  temp,
  labelWrapper = { start: '{', end: '}' },
) {
  // Use [] instead of {}
  // 使用[]替代{}
  const reg = new RegExp(`\\${labelWrapper.start}[^]+\\${labelWrapper.end}`);

  if (md5ValueMap[temp]?.match(reg)) {
    temp = md5ValueMap[temp].match(reg)?.[0];
    temp = temp.substring(1, temp.length - 1);

    return temp;
  }

  return;
}

function getParentNodeNameFromCreateElement(
  propertie,
  customIdProperty,
  md5ValueMap,
) {
  if (propertie.key.value === customIdProperty) {
    const temp = propertie.value?.value;

    return getParentTagNameFromMD5(md5ValueMap, temp);
  }

  return;
}

export function findParentTagNameFromCreateElement(
  path,
  customIdProperty,
  md5ValueMap,
) {
  let parentNodeName = null;

  path.findParent((parentPath) => {
    if (parentPath.isCallExpression() && isReactCreateElement(parentPath)) {
      parentPath.get('arguments').forEach((argument, index) => {
        if (index === 1) {
          if (argument.node?.properties) {
            argument.node?.properties.forEach((propertie) => {
              parentNodeName = getParentNodeNameFromCreateElement(
                propertie,
                customIdProperty,
                md5ValueMap,
              );
            });
          } else if (isObjectAssign(argument.node)) {
            argument.node.arguments[0].properties.forEach((propertie) => {
              parentNodeName = getParentNodeNameFromCreateElement(
                propertie,
                customIdProperty,
                md5ValueMap,
              );
            });
          }
        }
      });

      return true;
    }

    return;
  });

  return parentNodeName;
}

export function findParentTagNameFromJSX(
  jsxPath,
  customIdProperty,
  md5ValueMap,
) {
  let parentNodeName = '';

  jsxPath.findParent((parentPath) => {
    if (parentPath.isJSXElement()) {
      for (const attribute of parentPath.node.openingElement.attributes) {
        if (attribute.name?.name === customIdProperty) {
          const temp = attribute.value?.value;

          parentNodeName = getParentTagNameFromMD5(md5ValueMap, temp);

          return true;
        }
      }
    }

    return;
  });

  return parentNodeName;
}
