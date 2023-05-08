import { IProject } from '@/types'
import { ProjectPreview } from '../ui/project-preview'

interface ProjectListProps {
  projects: IProject[]
  onProjectClick: (projectId: string) => void
}

export function ProjectsSection(props: ProjectListProps) {
  return (
    <section id='projects' className='projects-section section-view full'>
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
