# v-dom

> :point_right: A minimal implementation of the Virtual DOM

## What's a Virtual DOM

Let's talk about **Real DOM** first.

DOM manipulation is the heart of web development. Five years before, jQuery was popular because it wraps up a set of useful DOM manipulation functions and css-like selectors, which are more intuitive and easier to use. However, later, we began to value more the cleaness and maintainability of front-end code. And the spegatti style of jQuery doesn't fit into what we need. Then we have many even higher level frameworks like React, Vue, Angular, etc. Under the hood of which, they are actually building a even higher level of abstraction over DOM manipulation, which saves the pain of calling DOM API directly.

The so-called term **"Virtual DOM"** was first brought by developers from React. Behind the fancy name, the idea is actually quite simple. **DOM manipulation is expensive, but operating native types like object, array is quick.** So in React we have a the mapping between real DOM and react element, which is nothing more than a JavaScript object. Thus we represent the DOM structure with an object tree. This is what Virtual DOM is all about.

To build the simplest form of Virtual DOM, we care only two aspects: **Mounting and Updating**.

## Mount

Mounting is the process of take the element as input and create the real DOM node. The `type` field of each element indicates what kind of element it is. And since the `children` attribute itself is a list of element, it enables the recursion in the process of mounting.

## Patch

Compared to mounting, patching is more complicated. Inside patch, we have two sub processes.

The first one is diffing, aka the Virtual DOM Diff algorithm. Here is where the JavaScript native object comes in to the rescue because it's so much faster than comparing actuall DOM nodes. By comparing the element tree, we generate the operations sequence that we need to perform, aka patches.

Using these operation sequence, which are generally an array, we iterate on it and perform real DOM update functions, for example, we use `document.createElement`, `appendChild`, `replaceChild`, to do `CREATE`, `REPLACE`, and if the element stays the same, we go deep into its children property to perform diff and patches recursively.
