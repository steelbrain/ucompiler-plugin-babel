'use babel'

import {transform} from 'babel-core'
import Path from 'path'

export const compiler = true
export const minifier = false
export function process(contents, {rootDirectory, filePath, config}) {
  const fileName = Path.dirname(filePath)
  const relativePath = Path.relative(rootDirectory, filePath)
  const transpiled = transform(contents, Object.assign({}, config.babel, {
    filename: fileName,
    filenameRelative: relativePath,
    sourceRoot: rootDirectory,
    sourceMaps: true,
    highlightCode: false
  }))
  return {
    contents: transpiled.code,
    sourceMap: transpiled.map
  }
}
