import { ISkill } from '@/types'

interface SkillListProps {
  skills: ISkill[]
}

export function SkillList(props: SkillListProps) {
  return (
    <section id='skills' className='skill-list'>
      {props.skills.map((s) => (
        <span key={s._id}>{s.title}</span>
      ))}
    </section>
  )
}
