import { useEffect, useState } from 'react'
import { Parallax } from 'react-parallax'

import {
  AppHeader,
  ProjectsSection,
  SkillsSection,
  ContactSection,
  ProjectModal,
  AboutSection,
  ProjectEdit,
} from '@/components'
import { portfolioService } from '@/services'
import { IProject, ISkill } from '@/types'

import aboutBgImgUrl from 'src/assets/img/about-bg.jpg'
import projectsBgImgUrl from 'src/assets/img/projects.jpg'
import pkg from '../../package.json'

const REACT_APP_IS_EDIT_MODE = JSON.parse(process.env.REACT_APP_IS_EDIT_MODE)

export default function App() {
  const [projectList, setProjectList] = useState<IProject[]>([])
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null)
  const [skillList, setSkillList] = useState<ISkill[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState('')

  useEffect(() => {
    console.log('App running v' + pkg.version)
    loadAppContent()
  }, [])

  const handleActiveSection: IntersectionObserverCallback = ([item]) => {
    item.isIntersecting && setCurrentSection(item.target.id)
  }

  // Setup IntersectionObserver for each section to set navigation active link
  useEffect(() => {
    const sectionObserver = new IntersectionObserver(handleActiveSection, {
      threshold: window.innerWidth > 768 ? 0.5 : 0,
    })
    const elTargets = document.querySelectorAll('.section-view')!
    elTargets.forEach((t) => sectionObserver.observe(t))

    return () => {
      elTargets.forEach((t) => sectionObserver.unobserve(t))
    }
  }, [])

  const loadAppContent = async () => {
    try {
      const [projects, skills] = await Promise.all([
        portfolioService.getProjects(),
        portfolioService.getSkills(),
      ])

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

  const handleSectionChange = (sectionId: string) => {
    setCurrentSection(sectionId)
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <div className='main-layout app-background'>
      <AppHeader
        activeSection={currentSection}
        onLinkClick={handleSectionChange}
      />

      <Parallax
        bgImage={aboutBgImgUrl}
        className='full'
        bgImageSizes='cover'
        strength={200}>
        <AboutSection onArrowClick={handleSectionChange} />
      </Parallax>
      <div className='placeholder-view'></div>

      <Parallax
        bgImage={projectsBgImgUrl}
        className='full'
        bgImageSizes='100% 100%'
        strength={250}>
        <ProjectsSection
          projects={projectList}
          onProjectClick={handleProjectClicked}
        />
      </Parallax>
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
