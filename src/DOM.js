function setProps(node, props) {
  if (!props) return
  Object.keys(props).forEach((attr) => {
    setProp(node, attr, props[attr])
  })
}

function setProp(node, attr, value) {
  if (attr === 'className') {
    node.className = value
  } else {
    node.setAttribute(attr, value)
  }
}

function removeProp(node, attr) {
  if (attr === 'className') {
    node.className = ''
  } else {
    node.removeAttribute(attr)
  }
}

module.exports = {
  setProps,
  setProp,
  removeProp
}
