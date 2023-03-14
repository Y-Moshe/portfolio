import { IProject } from '@/types'
import { ProjectPreview } from './project-preview/project-preview'

interface ProjectListProps {
  projects: IProject[]
  onProjectClick: (projectId: string) => void
}

export function ProjectList(props: ProjectListProps) {
  return (
    <section id='projects' className='project-list d-flex flex-column gap-15'>
      {props.projects.map((p, idx) => (
        <ProjectPreview
          key={p._id}
          project={p}
          isEven={(idx + 1) % 2 === 0}
          onClick={(id) => props.onProjectClick(id)}
        />
      ))}
    </section>
  )
}
