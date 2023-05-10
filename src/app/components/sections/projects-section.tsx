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
        <div className='row gy-3'>
          {props.projects.map((p) => (
            <div className='col-md-4 col-lg-3' key={p._id}>
              <ProjectPreview
                project={p}
                onClick={(id) => props.onProjectClick(id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
