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
import path from 'path';

export function isReactCreateElement(ASTPath) {
  if (
    (ASTPath.node.callee?.object?.name === 'React' ||
      ASTPath.node.callee?.object?.name === 'react') &&
    ASTPath.node.callee?.property?.name === 'createElement'
  ) {
    return true;
  }

  return false;
}

export function isObjectAssign(ASTPath) {
  if (
    ASTPath.callee?.object?.name === 'Object' &&
    ASTPath.callee?.property?.name === 'assign'
  ) {
    return true;
  }

  return false;
}

export function isShouldHandle(filePath, content) {
  // Whether it is a .tsx or .jsx file
  // 是否是 tsx 或者 jsx 文件
  if (path.extname(filePath).match(/(t|j)sx/)) {
    return true;
  }

  // Whether it contains keywords related to React
  // 是否包含 React 相关的关键字
  if (content.match(/(R|r)eact/)) {
    return true;
  }

  return false;
}
