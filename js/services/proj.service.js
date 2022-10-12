var gProjs = [
  {
    id: 'minesweeper',
    name: 'Minesweeper',
    title: 'Minesweeper Game',
    desc: 'Minesweeper game build with html, css and javascript with a great features.',
    url: 'https://y-moshe.github.io/Minesweeper/',
    publishedAt: 1663770417000,
    labels: ['HTML', 'CSS', 'JS']
  },
  {
    id: 'fxp-generator',
    name: 'FxP - Generator',
    title: 'A Generate tool for Fxp.co.il common tasks.',
    desc: 'Simple BBCode string generator tool to quickly generate a common "Templates" to use in fxp.co.il posts.',
    url: 'https://ym-fxp-generator.netlify.app/',
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
