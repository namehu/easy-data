/**
 * 将驼峰字符转换成下划线的字符
 * @param name 需要添加下划线的字符
 */
export function underScoreName (name: string) {
  return String(name).replace(/([A-Z]+)/g, v => `_${v.toLowerCase()}`);
}