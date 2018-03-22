const { render, hyperscript, setState } = require('../src')

function createComponent(count) {
  const r = [...Array(count).keys()]
  return (
    <ul id="cool" className={`my-class-${count}`}>
      { r.map(n => <li>{count}</li>) }
    </ul>
  )
}

function inc(parent, count) {
  if (count > 20) return
  setState(parent, createComponent(count), createComponent(count + 1))

  setTimeout(() => inc(parent, count + 1), 500)
}

// test setState
(function() {
  const root = document.getElementById('root')
  render(createComponent(1), root)

  setTimeout(() => inc(root, 1), 500)
})()

// test mount
// (function() {
//   render(createComponent(2), document.getElementById('root'))
// })()