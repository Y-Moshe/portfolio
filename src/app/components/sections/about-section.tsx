import { useState } from 'react'
import { TypeAnimation } from 'react-type-animation'

import { FallingArrow } from '@/components'

interface IAboutSectionProps {
  isScrolled: boolean
  onLinkClick: (page: number) => void
}

export function AboutSection(props: IAboutSectionProps) {
  const [isGreetingFinished, setIsGreetingFinished] = useState(false)

  const scrollToProjects = () => {
    props.onLinkClick(1)
  }

  return (
    <section className='about-section full'>
      <div className='profile-wrapper'>
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
                  
                    My experience has been gained through learning and building projects, which are listed next.\n
                    Graduate of the Coding Academy course - an intensive coding Bootcamp (640 hours) that qualifies Full stack developers.\n
                  
                    My Latest project: Toyz shop - in the listed projects below.`,
                    1000,
                    () => {
                      !props.isScrolled && scrollToProjects()
                    },
                  ]}
                  speed={80}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='gradient-background'></div>
      <FallingArrow className='arrow-down' onClick={scrollToProjects} />
    </section>
  )
}
