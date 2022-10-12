$(initPage)

function initPage() {
  const projects = getProjects()
  renderProjects(projects)
}

function renderProjects(projects) {
  const projsHtml = projects.map(project => `
    <div class="col-md-4 col-sm-6 portfolio-item">
      <a class="portfolio-link" data-toggle="modal" href="#portfolioModal">
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
