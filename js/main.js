$(initPage)

function initPage() {
  const projects = getProjects()
  renderProjects(projects)
}

function renderProjects(projects) {
  const projsHtml = projects.map(project => `
    <div class="col-md-4 col-sm-6 portfolio-item">
      <a onclick="onProjClick('${project.id}')" class="portfolio-link" data-toggle="modal" href="#portfolioModal">
        <div class="portfolio-hover">
          <div class="portfolio-hover-content">
            <i class="fa fa-plus fa-3x"></i>
          </div>
        </div>
        <img class="img-fluid" src="img/portfolio/${project.id}.png" alt="${project.name}">
      </a>
      <div class="portfolio-caption">
        <h4>${project.name}</h4>
        <p class="text-muted">${project.title}</p>
        ${getProjLabels(project)}
      </div>
    </div>
  `)
  
  $('.projects').html(projsHtml)
}

function getProjLabels(project) {
  const labels = project.labels.map(label => `<span class="badge mx-1 badge-secondary">${label}</span>`)
  return labels.join('')
}

// prepare the modal content
function onProjClick(id) {
  const project = getProject(id)
  console.log(project);
  const $modalBody = $('.modal-body')

  console.log($modalBody.children('h2'));
  $modalBody.children('h2').text(project.name)
  $modalBody.children('.item-intro').text(project.title)
  $modalBody.children('img').attr('src', 'img/portfolio/' + project.id + '.png')
  $modalBody.children('.description').text(project.desc)
  $modalBody.children('ul') // ??? labels?
  $modalBody.children('a').attr('href', project.url)
}
