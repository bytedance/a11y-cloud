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
