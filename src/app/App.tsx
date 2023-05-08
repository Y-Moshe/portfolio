import { useEffect, useRef, useState } from 'react'
import {
  // eslint-disable-next-line
  AppHeader,
  ProjectsSection,
  SkillsSection,
  ContactSection,
  ProjectModal,
  AboutSection,
  ProjectEdit,
} from '@/components'
import { IParallax, Parallax, ParallaxLayer } from '@react-spring/parallax'
import { useMediaQuery } from 'react-responsive'

import { portfolioService } from '@/services'
import { IProject, ISkill } from '@/types'
import pkg from '../../package.json'

const REACT_APP_IS_EDIT_MODE = JSON.parse(process.env.REACT_APP_IS_EDIT_MODE)

export default function App() {
  const [projectList, setProjectList] = useState<IProject[]>([])
  const [selectedProject, setSelectedProject] = useState<IProject>()
  const [skillList, setSkillList] = useState<ISkill[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const parallaxRef = useRef<IParallax>(null)
  const isDesktop = useMediaQuery({ minWidth: 768 })

  useEffect(() => {
    console.log('App running v' + pkg.version)
    loadAppContent()
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScrolling)
    return () => {
      window.removeEventListener('scroll', handleScrolling)
    }
  }, [])

  const handleScrolling = (e: any) => {
    // console.log(e);
  }

  const loadAppContent = async () => {
    try {
      const projects = await portfolioService.getProjects()
      const skills = await portfolioService.getSkills()

      setProjectList(projects)
      setSkillList(skills)
    } catch (error) {
      console.log('Failed to get app content')
      console.log(error)
    }
  }

  const handleProjectClicked = (projectId: string) => {
    // const project = portfolioService.getProject(projectId)
    const project = projectList.find((p) => p._id === projectId)
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  return (
    <Parallax pages={4} ref={parallaxRef}>
      <div className='app-background'></div>
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />

      {/* <ParallaxLayer
          sticky={{ start: 0, end: 4 }}
          style={{ height: 'max-content' }}>
          {parallaxRef.current && <AppHeader parallax={parallaxRef.current} />}
        </ParallaxLayer> */}

      <ParallaxLayer
        offset={0}
        speed={isDesktop ? 1 : 0.5}
        className='main-layout'>
        {parallaxRef.current && <AboutSection parallax={parallaxRef.current} />}
      </ParallaxLayer>

      <ParallaxLayer
        offset={1}
        speed={isDesktop ? 1 : 0.5}
        className='main-layout full'>
        <ProjectsSection
          projects={projectList}
          onProjectClick={handleProjectClicked}
        />
      </ParallaxLayer>

      <ParallaxLayer
        offset={2}
        speed={isDesktop ? 1 : 0.5}
        className='main-layout'>
        <SkillsSection skills={skillList} />
      </ParallaxLayer>

      <ParallaxLayer offset={3} speed={0.1} className='main-layout'>
        {REACT_APP_IS_EDIT_MODE ? <ProjectEdit /> : <ContactSection />}
      </ParallaxLayer>
    </Parallax>
  )
}
