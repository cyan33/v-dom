const mountElement = require('./mountElement')
const { setProp, removeProp } = require('./DOM')

function changed(node1, node2) {
  return typeof node1 !== typeof node2 ||
    typeof node1 === 'string' && node1 !== node2 ||
    node1.type !== node2.type
}

function diff(prevElement, nextElement) {
  if (!prevElement) {
    return {
      type: 'CREATE',
      node: nextElement
    }
  }
  if (!nextElement) {
    return {
      type: 'REMOVE'
    }
  }
  if (changed(prevElement, nextElement)) {
    return {
      type: 'REPLACE',
      node: nextElement
    }
  }
  if (nextElement.type) {
    return {
      type: 'UPDATE',
      propsPatches: diffProps(prevElement.props, nextElement.props),
      childrenPatches: diffChildren(prevElement.children, nextElement.children)
    }
  }
}

function diffProps(prevProps, nextProps) {
  const props = Object.assign({}, prevProps, nextProps)
  const patches = []
  Object.keys(props).forEach((attr) => {
    if (!prevProps[attr] || nextProps[attr] !== prevProps[attr]) {
      patches.push({
        type: 'SET_PROP',
        attr,
        value: props[attr],
      })
    }
    if (!nextProps[attr]) {
      patches.push({
        type: 'REMOVE_PROP',
        attr,
      })
    }
  })
  return patches
}

function diffChildren(prevChildren, nextChildren) {
  const patches = []
  const diffLength = Math.max(
    prevChildren.length,
    nextChildren.length
  )
  for (let i = 0; i < diffLength; i++) {
    patches.push(diff(
      prevChildren[i],
      nextChildren[i]
    ))
  }
  return patches
}

module.exports = diff
