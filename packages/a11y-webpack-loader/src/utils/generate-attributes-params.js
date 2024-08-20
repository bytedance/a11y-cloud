export function generateAttributesParams(options) {
  const { fileIdentifier, functionName, parentNodeName, nodeName, tagsCounter, customSeparator } = options;
  const tagPathName = `${fileIdentifier}${functionName}${parentNodeName}${nodeName}`;

  if (!tagsCounter[tagPathName]) {
    tagsCounter[tagPathName] = 1;
  } else {
    tagsCounter[tagPathName] += 1;
  }

  return {
    path: fileIdentifier,
    customSeparator,
    parentNodeName,
    nodeName,
    functionName,
    index: tagsCounter[tagPathName],
  };
}
