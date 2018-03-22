const mountElement = require('./mountElement')
const { setProp, removeProp } = require('./DOM')

const CREATE = 'CREATE'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'
const UPDATE = 'UPDATE'
const SET_PROP = 'SET_PROP'
const REMOVE_PROP = 'REMOVE PROP'

function changed(node1, node2) {
  
}

function diff(prevElement, nextElement) {
  
}

function diffProps(prevChild, nextChild) {
  
}

function diffChildren(prevElement, nextElement) {
  
}

function patch(parent, patches, index = 0) {
  
}

function patchProps(parent, patches) {
  
}

module.exports = {
  diff,
  patch
}
