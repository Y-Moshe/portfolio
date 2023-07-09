import { useEffect, useMemo, useState } from 'react'
import { animated as a, useSpring, useTrail } from '@react-spring/web'

const links = [
  {
    label: 'Projects',
    sectionId: 'projects-section',
  },
  {
    label: 'Skills',
    sectionId: 'skills-section',
  },
  {
    label: 'Contact',
    sectionId: 'contact-section',
  },
]

interface IAppHeaderProps {
  activeSection: string
  onLinkClick: (sectionId: string) => void
}

export function AppHeader(props: IAppHeaderProps) {
  const [linksSpring, linksAnimCtrl] = useTrail(links.length, () => ({
    from: {
      y: -100,
      opacity: 0,
    },
    to: {
      y: 0,
      opacity: 1,
    },
    config: {
      mass: 2,
      tension: 250,
    },
    pause: true,
  }))

  const [initAnimation] = useSpring(() => ({
    delay: 100,
    from: {
      width: '70%',
    },
    to: {
      width: '100%',
    },
    onResolve: () => linksAnimCtrl.resume(),
  }))

  const [isInstersected, setIsInstersected] = useState(false)

  const getLinkActiveClass = (sectionId: string) =>
    props.activeSection === sectionId ? 'active' : ''

  const handleHeaderVisibility: IntersectionObserverCallback = ([target]) =>
    setIsInstersected(target.isIntersecting)

  // Setup IntersectionObserver
  useEffect(() => {
    const headerObserver = new IntersectionObserver(handleHeaderVisibility)
    const elTarget = document.querySelector('.intersection-control')!
    headerObserver.observe(elTarget)

    return () => {
      headerObserver.unobserve(elTarget)
    }
  }, [])

  const growClass = useMemo(
    () => (!isInstersected ? 'grow-fixed' : ''),
    [isInstersected]
  )

  return (
    <>
      <div className='intersection-control'></div>

      <a.header
        className={`main-header main-layout full ${growClass}`}
        style={initAnimation}>
        <nav className='main-nav'>
          <div
            className={`brand nav-link ${getLinkActiveClass('about-section')}`}
            onClick={() => props.onLinkClick('about-section')}
            title='Moshe Nehemiah'>
            MN
          </div>

          <ul className='d-flex gap-15 h-100'>
            {linksSpring.map((springStyle, i) => (
              <a.li
                className={`nav-link ${getLinkActiveClass(links[i].sectionId)}`}
                style={springStyle}
                key={links[i].label}
                onClick={() => props.onLinkClick(links[i].sectionId)}>
                {links[i].label}
              </a.li>
            ))}
          </ul>
        </nav>
      </a.header>
    </>
  )
}
