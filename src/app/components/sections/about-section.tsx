import { useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { a, useSpring } from '@react-spring/web'

import { FallingArrow } from '@/components'

interface IAboutSectionProps {
  onArrowClick: (sectionId: string) => void
}

export function AboutSection(props: IAboutSectionProps) {
  const [isGreetingFinished, setIsGreetingFinished] = useState(false)
  const [style] = useSpring(() => ({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  }))

  return (
    <section className='about-section section-view' id='about-section'>
      <a.div className='profile-wrapper' style={style}>
        <div className='container'>
          <div className='row'>
            {/* <div className='offser-lg-3'>
              <div className='profile-img-wrapper'>
              </div>
            </div> */}
            <div className='offset-lg-3 col-lg-9'>
              <TypeAnimation
                wrapper='h3'
                sequence={[
                  'Hi!',
                  500,
                  "Hi! I'm Moshe Nehemiah.",
                  () => setIsGreetingFinished(true),
                ]}
                cursor={false}
              />
              {isGreetingFinished && (
                <TypeAnimation
                  wrapper='p'
                  style={{ whiteSpace: 'pre-line' }}
                  sequence={[
                    'Full-stack developer',
                    `A Full-stack/frontend developer with experience in writing complex web apps using the most popular frameworks and technologies (Vue, React, Angular, .NET C#, and NodeJS Express).
                  
                    Known as a great problem-solver, self-driven, and a quick learner. Follows by best practices.\n
                    Highly motivated, focused, and well-organized with good interpersonal and communication skills.\n
                  
                    My experience has been gained through learning and building projects, which are listed next`,
                    1000,
                  ]}
                  speed={80}
                />
              )}
            </div>
          </div>
        </div>
      </a.div>

      <div className='gradient-background'></div>
      <FallingArrow
        className='arrow-down'
        onClick={() => props.onArrowClick('projects-section')}
      />
    </section>
  )
}
