const mountElement = require('./mountElement')
const { setProp, removeProp } = require('./DOM')

const CREATE = 'CREATE'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'
const UPDATE = 'UPDATE'
const SET_PROP = 'SET_PROP'
const REMOVE_PROP = 'REMOVE PROP'

function changed(node1, node2) {
  return typeof node1 !== typeof node2 ||
         typeof node1 === 'string' && node1 !== node2 ||
         node1.type !== node2.type
}

function diff(prevElement, nextElement) {
  if (!prevElement) {
    return {
      type: CREATE,
      node: nextElement
    }
  }
  if (!nextElement) {
    return {
      type: REMOVE
    }
  }
  if (changed(prevElement, nextElement)) {
    return {
      type: REPLACE,
      node: nextElement
    }
  }
  if (nextElement.type) {
    return {
      type: UPDATE,
      propPatches: diffProps(prevElement, nextElement),
      childrenPatches: diffChildren(prevElement, nextElement)
    }
  }
}

function diffProps(prevChild, nextChild) {
  const patches = []

  // use shallow equal
  // if (prevChild.props === nextChild.props)  return []

  const props = Object.assign({}, prevChild.props, nextChild.props)
  Object.keys(props).forEach((attr) => {
    if (!nextChild.props[attr]) {
      patches.push({
        type: REMOVE_PROP,
        attr
      })
    } else {
      patches.push({
        type: SET_PROP,
        attr,
        value: nextChild.props[attr]
      })
    }
  })

  return patches
}

function diffChildren(prevElement, nextElement) {
  const patches = []
  const patchesLength = Math.max(
    prevElement.children.length,
    nextElement.children.length
  )
  for (let i = 0; i < patchesLength; i++) {
    patches.push(diff(
      prevElement.children[i],
      nextElement.children[i]
    ))
  }
  return patches
}

function patch(parent, patches, index = 0) {
  if (!patches)  return
  const el = parent.childNodes[index]

  switch(patches.type) {
    case CREATE:
      const { node } = patches
      return parent.appendChild(mountElement(node))
    case REMOVE:
      return parent.removeChild(el)
    case UPDATE:
      const { propPatches, childrenPatches } = patches
      patchProps(el, propPatches)
      for (let i = 0; i < childrenPatches.length; i++) {
        patch(el, childrenPatches[i], i)
      }
  }
}

function patchProps(parent, patches) {
  patches.forEach((patch) => {
    const { type, attr, value } = patch

    switch(type) {
      case SET_PROP:
        setProp(parent, attr, value)
        break
      case REMOVE_PROP:
        removeProp(parent, attr)
        break
    }
  })
}

module.exports = {
  diff,
  patch
}
