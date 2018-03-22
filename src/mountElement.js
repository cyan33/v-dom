const { setProps } = require('./DOM')

/**
 * element => real dom node
 */
function mountElement(element) {
  let node
  if (typeof element === 'number' || typeof element === 'string') {
    node = document.createTextNode(element)
  } else {
    node = document.createElement(element.type)
    setProps(node, element.props)
    if (typeof element.children === 'number' || typeof element.children === 'string') {
      node.appendChild(mountElement(element.children))
    } else if (element.children) {
      element.children.map(mountElement)
        .forEach(node.appendChild.bind(node))
    }
  }
  return node
}

module.exports = mountElement
