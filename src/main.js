'use babel'

import {transform} from 'babel-core'
import Path from 'path'

export const compiler = true
export const minifier = false
export function process(contents, {fileName, relativePath}, {config, state}) {
  const beginning = contents.substr(0, 11)
  if (beginning !== '"use babel"' && beginning !== "'use babel'") {
    return contents
  }

  const transpiled = transform(contents, Object.assign({}, config.babel, {
    filename: fileName,
    filenameRelative: relativePath,
    sourceRoot: Path.join('sources', Path.dirname(relativePath)),
    sourceMaps: true,
    highlightCode: false
  }))
  state.sourceMap = transpiled.map
  return transpiled.code
}
