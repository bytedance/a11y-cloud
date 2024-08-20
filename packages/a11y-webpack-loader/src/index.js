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
import { getOptions } from 'loader-utils';
import path from 'path';
import { codeGenerate } from './code-generate';
import { isShouldHandle } from './utils';

export default function a11yLoader(content, map, meta) {
  const tagsCounter = {};
  const md5ValueMap = {};
  const options = getOptions(this);
  const {
    dirPrefix = '',
    customProperty = 'a11y',
    customIdProperty = `${customProperty}-id`,
    customSeparator = '_',
  } = options;
  const callback = this.async();
  const { rootContext: rootPath, resourcePath: filePath } = this;
  const relativePath = `${dirPrefix}/${path.relative(rootPath, filePath)}`;

  if (!isShouldHandle(filePath, content)) {
    callback(null, content, map, meta);

    return;
  }

  const fileIdentifier = `${filePath}${customSeparator}`;

  callback(
    null,
    codeGenerate(content, {
      customIdProperty,
      md5ValueMap,
      fileIdentifier,
      customSeparator,
      tagsCounter,
      filePath,
      options,
      relativePath,
    }),
    map,
    meta
  );
}
