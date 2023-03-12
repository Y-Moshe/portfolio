import { IProject } from '@/types'
import { ProjectPreview } from './project-preview/project-preview'

interface ProjectListProps {
  projects: IProject[]
}

export function ProjectList(props: ProjectListProps) {
  return (
    <section id='projects' className='project-list'>
      {props.projects.map((p) => (
        <ProjectPreview key={p._id} project={p} />
      ))}
    </section>
  )
}
