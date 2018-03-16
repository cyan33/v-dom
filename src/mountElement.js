const { setProps } = require('./DOM')

/**
 * element => real dom node
 */
function mountElement(element) {
  if (typeof element === 'string' || typeof element === 'number') {
    return document.createTextNode(element)
  }
  const node = document.createElement(element.type)

  setProps(node, element.props)

  if (element.children) {
    element.children
      .map(mountElement)
      .forEach(node.appendChild.bind(node))
  }

  return node
}

module.exports = mountElement
