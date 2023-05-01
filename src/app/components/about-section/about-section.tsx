import { IParallax } from '@react-spring/parallax'
import { FallingArrow } from '@/components'
import pictureUrl from '../../../assets/img/me.jpg'

interface AboutSectionProps {
  parallax: IParallax
}

export function AboutSection(props: AboutSectionProps) {
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
              <h3>Hi! I'm Moshe Nehemiah.</h3>
              <p>
                A Full Stack / Frontend Developer with an experience in writing
                complex web apps using Vue, React, Angular, .Net C#, and NodeJS.
              </p>

              <p>
                A great problem solver, self-driven, and a quick learner.
                Follows by best practices.
              </p>
              <p>
                My experience has been gained through learning and building
                projects, which are listed below.
              </p>

              <p>
                Graduate of the Coding Academy course - an intensive coding
                Bootcamp (640 hours) that qualifies Full stack developers.
              </p>

              <h3>Latest project: Toyz shop - in the projects section.</h3>
            </div>
          </div>
        </div>
      </div>

      <div className='gradient-background'></div>
      <FallingArrow
        className='arrow-down'
        onClick={() => props.parallax.scrollTo(1)}
      />
    </section>
  )
}
