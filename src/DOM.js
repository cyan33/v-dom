function setProps(node, props) {
  if (!props) return
  Object.keys(props).forEach((attr) => {
    setProp(node, attr, props[attr])
  })
}

function setProp(node, attr, value) {
  node.setAttribute(attr, value)
}

function removeProp(node, attr) {
  node.removeAttribute(attr)
}

module.exports = {
  setProps,
  setProp,
  removeProp
}
