'use strict'
const MY_GMAIL = 'moshe.nehemiah@gmail.com'

var gSocials = [
  { name: 'linkedin', link: 'https://www.linkedin.com/in/moshe-nehemiah-254506155/' },
  { name: 'stack-overflow', link: 'https://stackoverflow.com/users/9301293/y-moshe' },
  { name: 'github', link: 'https://github.com/Y-Moshe' }
]

$(initPage)

function initPage() {
  const projects = getProjects()
  renderProjects(projects)

  renderSocials(gSocials)
}

function renderSocials(socials) {
  const socialsHtml = socials.map(social => `
    <li class="list-inline-item">
      <a href="${social.link}">
        <i class="fa fa-${social.name}"></i>
      </a>
    </li>
  `)

  $('#me .social-buttons').html(socialsHtml) // me section
  $('footer .social-buttons').html(socialsHtml) // footer
}

function renderProjects(projects) {
  const projsHtml = projects.map(project => `
    <div class="col-md-4 col-sm-6">
      <div class="portfolio-item d-flex flex-column">
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
  $modalBody.find('.published-at').text(new Date(project.publishedAt).toLocaleString())
  $modalBody.find('.btn-group a.btn-dark').attr('href', project.githubUrl)
  $modalBody.find('.btn-group a.btn-success').attr('href', project.url)
}

function onContactSubmit() {
  const email = $('#email').val().trim()
  const subject = $('#subject').val().trim()
  const message = $('#message').val().trim()
  const bodyMessage = `You got a new message from ${email}: <br />${message}`
  
  const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${MY_GMAIL}&su=${subject}&body=${bodyMessage}`
  window.open(url)
}
