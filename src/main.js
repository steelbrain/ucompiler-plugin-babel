'use babel'

import {transform} from 'babel-core'

export const compiler = true
export const minifier = false
export function process(contents, {fileName, relativePath, root}, {config, state}) {
  const beginning = contents.substr(0, 11)
  if (beginning !== '"use babel"' && beginning !== "'use babel'") {
    return contents
  }

  const transpiled = transform(contents, Object.assign({}, config.babel, {
    filename: fileName,
    filenameRelative: relativePath,
    sourceRoot: root,
    sourceMaps: true,
    highlightCode: false
  }))
  state.sourceMap = transpiled.map
  return transpiled.code
}
