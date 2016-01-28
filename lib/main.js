'use strict';
'use babel';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minifier = exports.compiler = undefined;
exports.process = process;

var _babelCore = require('babel-core');

const compiler = exports.compiler = true;
const minifier = exports.minifier = false;
function process(contents, _ref, _ref2) {
  let fileName = _ref.fileName;
  let relativePath = _ref.relativePath;
  let root = _ref.root;
  let config = _ref2.config;
  let state = _ref2.state;

  const beginning = contents.substr(0, 11);
  if (beginning !== '"use babel"' && beginning !== "'use babel'") {
    return contents;
  }

  const transpiled = (0, _babelCore.transform)(contents, Object.assign({}, config.babel, {
    filename: fileName,
    filenameRelative: relativePath,
    sourceRoot: root,
    sourceMaps: true,
    highlightCode: false
  }));
  state.sourceMap = transpiled.map;
  return transpiled.code;
}