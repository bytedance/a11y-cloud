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
import {
  findParentTagNameFromJSX,
  generateAttributesParams,
  setCustomAttributesForJSX,
} from '../utils';

const blackList = ['html', 'head', 'link', 'meta', 'script', 'Fragment'];

export default function (options) {
  try {
    const {
      path,
      customIdProperty,
      md5ValueMap,
      functionName,
      fileIdentifier,
      customSeparator,
      tagsCounter,
      filePath,
    } = options;
    let nodeName = '';
    let dataIDDefined = false;

    path.traverse({
      JSXOpeningElement(openingPath) {
        openingPath.stop();
        const identifierNode = openingPath.get('name').node;

        nodeName = identifierNode.name;

        openingPath.traverse({
          // Determine if the user has already defined the relevant properties
          // 判断用户是否已经定义相关属性
          JSXAttribute(attributePath) {
            const attributeName = attributePath.get('name').node.name;

            if (!dataIDDefined) {
              dataIDDefined = attributeName === customIdProperty;
            }
          },
        });
      },
    });

    const parentNodeName = findParentTagNameFromJSX(
      path,
      customIdProperty,
      md5ValueMap,
    );

    if (!dataIDDefined && nodeName && !blackList.includes(nodeName)) {
      const params = generateAttributesParams({
        fileIdentifier,
        functionName,
        parentNodeName,
        nodeName,
        tagsCounter,
        customSeparator,
        filePath,
      });

      path.node.openingElement.attributes.push(
        ...setCustomAttributesForJSX(
          params,
          options,
          md5ValueMap,
          customIdProperty,
        ),
      );
    }
  } catch (e) {
    // noop
  }
}
