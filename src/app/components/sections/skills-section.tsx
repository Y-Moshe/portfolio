import { Tooltip } from 'antd'
import { animated as a, useInView, useTrail } from '@react-spring/web'
import { ISkill } from '@/types'

interface SkillListProps {
  skills: ISkill[]
}

export function SkillsSection({ skills }: SkillListProps) {
  const [skillsRef, skillsInView] = useInView()
  const [skillsStyle] = useTrail(
    skills.length,
    () => ({
      from: {
        opacity: 0,
        scale: 1.2,
        x: -50,
      },
      to: {
        opacity: 1,
        scale: 1,
        x: 0,
      },
      reset: true,
      config: {
        duration: 50,
      },
    }),
    [skillsInView]
  )

  return (
    <section className='skills-section section-view' id='skills-section'>
      <div className='container'>
        <h1>Skills</h1>
        <a.ul
          className='d-flex justify-content-center flex-wrap gap-10 m-auto'
          ref={skillsRef}>
          {skillsStyle.map((style, i) => (
            <a.span style={style} key={skills[i]._id}>
              <Tooltip title={skills[i].title}>
                <a.li className='skill-item'>
                  <i className={skills[i].cssClass}></i>
                </a.li>
              </Tooltip>
            </a.span>
          ))}
        </a.ul>
      </div>
    </section>
  )
}
