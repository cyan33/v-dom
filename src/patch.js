const mountElement = require('./mountElement')
const { setProp, removeProp } = require('./DOM')

function patch(parent, diff, index = 0) {
  if (!diff) return
  // from the very top level, we assume that the 0th element
  // is always the container node, since in older react we don't 
  // support Fragments
  const el = parent.childNodes[index]
  switch (diff.type) {
    case 'CREATE':
      return parent.appendChild(mountElement(diff.node))
    case 'REMOVE':
      return parent.removeChild(el)
    case 'REPLACE':
      return parent.replaceChild(mountElement(diff.node), el)
    case 'UPDATE':
      const { propsPatches, childrenPatches } = diff
      patchProps(el, propsPatches)
      
      for (let i = 0; i < childrenPatches.length; i++) {
        patch(el, childrenPatches[i], i)
      }
  }
}

function patchProps(node, patches) {
  patches.forEach((patch) => {
    const { type, attr, value } = patch
    if (type === 'SET_PROP') {
      setProp(node, attr, value)
    } else if (type === 'REMOVE_PROP') {
      removeProp(node, attr)
    }
  })
}

module.exports = patch
