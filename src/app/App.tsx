import { useEffect, useState } from 'react'
import { AppHeader, AppFooter, ProjectList, SkillList } from '@/components'
import { portfolioService } from '@/services'
import { IProject, ISkill } from '@/types'
import pkg from '../../package.json'

export default function App() {
  const [projectList, setProjectList] = useState<IProject[]>([])
  const [skillList, setSkillList] = useState<ISkill[]>([])

  useEffect(() => {
    console.log('App running v' + pkg.version)

    setProjectList(portfolioService.getProjects())
    setSkillList(portfolioService.getSkills())
  }, [])

  return (
    <div className='main-layout'>
      <AppHeader />
      <main className='main-layout full'>
        <div className='summary full'>
          background color
          <div>
            Moshe Nehemiah - English / Hebrew
            <span>summary</span>
          </div>
          Arrow down
        </div>

        <ProjectList projects={projectList} />
        <SkillList skills={skillList} />

        <a href='mailto:moshe.nehemiah@gmail.com' title='moshe.nehemiah@gmail.com'>Contact</a>
      </main>
      <AppFooter />
    </div>
  )
}
