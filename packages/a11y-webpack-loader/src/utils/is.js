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
