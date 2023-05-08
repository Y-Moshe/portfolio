import { Tooltip } from 'antd'
import { animated as a, useInView, useSprings } from '@react-spring/web'
import { ISkill } from '@/types'

interface SkillListProps {
  skills: ISkill[]
}

export function SkillsSection({ skills }: SkillListProps) {
  const [skillsRef, skillsInView] = useInView()
  const [skillsStyle] = useSprings(
    skills.length,
    () => ({
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
      reset: true,
    }),
    [skillsInView]
  )

  return (
    <section id='skills' className='skills-section section-view'>
      <div className='container'>
        <h1>Skills</h1>
        <a.ul
          className='d-flex justify-content-center flex-wrap gap-10 m-auto'
          ref={skillsRef}>
          {skillsInView &&
            skillsStyle.map((style, i) => (
              <Tooltip title={skills[i].title} key={skills[i]._id}>
                <a.li className='skill-item' style={style}>
                  <i className={skills[i].cssClass}></i>
                </a.li>
              </Tooltip>
            ))}
        </a.ul>
      </div>
    </section>
  )
}
