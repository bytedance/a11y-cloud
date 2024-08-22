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
export function nameGenerator(
  params,
  options,
  labelWrapper = { start: '{', end: '}' },
) {
  const prefix = options.prefix || null;
  const separator = params.customSeparator || '_';
  const filePath = params.path || null;
  const functionName = params.functionName || null;
  const parentNodeName = params.parentNodeName || null;
  const nodeName = params.nodeName || null;
  const index = params.index;

  return (
    // Wrap all tag contents in {} to facilitate the use of regular expressions to extract the content within
    // 所有标签内容用 {} 包裹，方便利用正则表达式获取其中的内容
    [prefix, filePath, functionName].filter(Boolean).join(separator) +
    `${labelWrapper.start}${parentNodeName || ''}${nodeName}${index}${labelWrapper.end}`
  );
}
