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
