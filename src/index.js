const mountElement = require('./mountElement')
const { diff, patch } = require('./diff')
const { setProps } = require('./DOM')

function render(element, node) {
  node.appendChild(mountElement(element))
}

function flatten(arr) {
  return [].concat.apply([], arr)
}

function hyperscript(type, props, ...children) {
  props = props || {}
  return {
    type,
    props,
    children: flatten(children)
  }
}

/** 
 * This is actually not `setState` at all,
 * it's just the entry for the diff algorithm.
 * In react, setState is the entry so here we keep the consistency
*/
function setState(parent, prevElement, nextElement) {
  // diff and patch
  const patches = diff(prevElement, nextElement)
  console.log(patches)

  patch(parent, patches)
}

module.exports = {
  hyperscript,
  render,
  setState
}
