'use strict'

var gProjs = [
  {
    id: 'minesweeper',
    name: 'Minesweeper',
    title: 'Minesweeper Game',
    desc: 'Minesweeper game build with html, css and javascript with a great features.',
    url: 'https://y-moshe.github.io/Minesweeper/',
    githubUrl: 'https://github.com/Y-Moshe/Minesweeper',
    publishedAt: 1663770417000,
    labels: ['HTML', 'CSS', 'JS']
  },
  {
    id: 'todo-gallery',
    name: 'Todo Gallery',
    title: 'Photos Gallery',
    desc: 'Gallery application build with React.js uses unsplash api, a todo app to practice react.',
    url: 'https://ym-todo-gallery.netlify.app/',
    githubUrl: 'https://github.com/Y-Moshe/todo-gallery',
    publishedAt: 1624477465000,
    labels: ['HTML', 'CSS', 'JS', 'React', 'restfulAPI']
  },
  {
    id: 'fxp-generator',
    name: 'FxP - Generator',
    title: 'A Generate tool for Fxp.co.il common tasks.',
    desc: 'Simple BBCode string generator tool to quickly generate a common "Templates" to use in fxp.co.il posts.',
    url: 'https://ym-fxp-generator.netlify.app/',
    githubUrl: 'https://github.com/Y-Moshe/fxp-generator',
    publishedAt: 1610278837000,
    labels: ['HTML', 'CSS', 'JS', 'React', 'Material-UI']
  }
]

function getProjects() {
  return gProjs
}

function getProject(id) {
  return gProjs.find(p => p.id === id)
}
