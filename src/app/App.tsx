import { useCallback, useEffect, useState } from 'react'
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
import { useMediaQuery } from 'react-responsive'

import { portfolioService } from '@/services'
import { IProject, ISkill } from '@/types'
import pkg from '../../package.json'

const REACT_APP_IS_EDIT_MODE = JSON.parse(process.env.REACT_APP_IS_EDIT_MODE)

declare global {
  interface Window {
    MyApp: {
      isDesktop: boolean
      isModalOpen: boolean
    }
  }
}

export default function App() {
  const [projectList, setProjectList] = useState<IProject[]>([])
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null)
  const [skillList, setSkillList] = useState<ISkill[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const isDesktop = useMediaQuery({ minWidth: 992 })
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    console.log('App running v' + pkg.version)
    loadAppContent()
  }, [])

  useEffect(() => {
    window.addEventListener('wheel', handleWheelScroll)
    return () => {
      window.removeEventListener('wheel', handleWheelScroll)
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    // TODO
  }, [currentPage])

  useEffect(() => {
    window.MyApp = {
      isDesktop,
      isModalOpen,
    }
  }, [isDesktop, isModalOpen])

  const handleWheelScroll = useCallback((e: WheelEvent) => {
    // Auto scrolling by mouse wheel enabled only for desktops

    if (window.MyApp?.isDesktop && !window.MyApp?.isModalOpen) {
      e.deltaY > 0
        ? setCurrentPage((prev) => (prev === 3 ? 3 : ++prev))
        : setCurrentPage((prev) => (prev === 0 ? 0 : --prev))
    }
  }, [])

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
    if (project) {
      setSelectedProject(project)
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className='main-layout app-background'>
      {/* <AppHeader activePage={currentPage} onLinkClick={handlePageChange} /> */}

      <AboutSection onLinkClick={handlePageChange} />
      <div className='placeholder-view'></div>

      <ProjectsSection
        projects={projectList}
        onProjectClick={handleProjectClicked}
      />
      <div className='placeholder-view'></div>

      <SkillsSection skills={skillList} />
      <div className='placeholder-view'></div>

      {REACT_APP_IS_EDIT_MODE ? <ProjectEdit /> : <ContactSection />}

      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </div>
  )
}
