import { IProject } from '@/types'
import { ProjectPreview } from '../ui/project-preview'

interface ProjectListProps {
  projects: IProject[]
  onProjectClick: (projectId: string) => void
}

export function ProjectsSection(props: ProjectListProps) {
  return (
    <section className='projects-section section-view full'>
      <div className='container'>
        {props.projects.map((p, idx) => (
          <ProjectPreview
            key={p._id}
            project={p}
            isEven={(idx + 1) % 2 === 0}
            onClick={(id) => props.onProjectClick(id)}
          />
        ))}
      </div>
    </section>
  )
}
