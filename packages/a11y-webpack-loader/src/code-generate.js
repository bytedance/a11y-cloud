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
import generate from '@babel/generator';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

import callExpression from './traverse-options/call-expression';
import jsxElement from './traverse-options/jsx-element';

export function codeGenerate(content, params) {
  let functionName;
  const {
    customIdProperty,
    md5ValueMap,
    fileIdentifier,
    customSeparator,
    tagsCounter,
    filePath,
    options,
    relativePath,
  } = params;
  let ast;

  try {
    ast = parse(content, {
      sourceType: 'module',
      allowUndeclaredExports: true,
      allowImportExportEverywhere: true,
      plugins: ['jsx', 'typescript', 'decorators-legacy', 'classProperties'],
    });

    traverse(ast, {
      // Process the built artifacts, React.createElement('div', {}, 'demo')
      // 处理打包后产物，React.createElement('div', {}, 'demo')
      CallExpression(callExpressionPath) {
        callExpression({
          path: callExpressionPath,
          customIdProperty,
          md5ValueMap,
          functionName,
          fileIdentifier,
          customSeparator,
          tagsCounter,
          filePath,
          loaderOptions: options,
        });
      },
      // deal JSX code
      // 处理 JSX 代码
      JSXElement(JSXElementPath) {
        jsxElement({
          path: JSXElementPath,
          customIdProperty,
          md5ValueMap,
          functionName,
          fileIdentifier,
          customSeparator,
          tagsCounter,
          filePath,
          relativePath,
        });
      },
      /**
       * const ASD = () => {}
       * const ASD = function(){}
       */
      VariableDeclaration(variablePath) {
        variablePath.traverse({
          ArrowFunctionExpression(arrowPath) {
            arrowPath.stop();
            functionName = variablePath.node.declarations[0].id.name;
          },
          FunctionExpression(functionPath) {
            functionPath.stop();
            functionName = variablePath.node.declarations[0].id.name;
          },
        });
      },
      /**
       * function ASD()
       */
      FunctionDeclaration(functionPath) {
        functionName = functionPath.node.id?.name;
      },
    });
    const { code } = generate(ast, {
      decoratorsBeforeExport: true,
    });

    return code;
  } catch (e) {
    console.log(e);

    return content;
  }
}
