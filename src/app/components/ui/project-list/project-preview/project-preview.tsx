import { IProject } from '@/types'

interface ProjectPreviewProps {
  project: IProject
}

export function ProjectPreview({ project }: ProjectPreviewProps) {
  return (
    <article className='container row'>
      <div className='col-md-6'>
        <h1>{project.name}</h1>
        <p>{project.description}</p>
        <ul className='clean-list'>
          {project.tags.map((t) => (
            <li>{t}</li>
          ))}
        </ul>
        <a href={project.websiteUrl}>Website</a>
        <a href={project.githubUrl}>Github</a>
      </div>

      <div className='col-md-6'>
        <img src={project.imgUrls[0]} alt='' />
      </div>
    </article>
  )
}
