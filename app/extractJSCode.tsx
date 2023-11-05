'skip ssr'
'use client'
export function extractJSCode(str: string) {
  const matches = str.match(/<javascript>([\s\S]*?)<\/javascript>/)
  return matches ? matches[1] : ''
}
