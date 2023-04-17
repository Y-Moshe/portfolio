import { IParallax } from '@react-spring/parallax'
import { animated as a, useSpring, useTrail } from '@react-spring/web'

const links = [
  {
    label: 'Projects',
    page: 1,
  },
  {
    label: 'Skills',
    page: 2,
  },
  {
    label: 'Contact',
    page: 3,
  },
]

interface HeaderProps {
  parallax: IParallax
}

export function AppHeader(props: HeaderProps) {
  const [linksSpring, linksAnimCtrl] = useTrail(3, () => ({
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

  const handleLinkClick = (page: number) => {
    props.parallax.scrollTo(page)
  }

  return (
    <a.header
      className='main-header main-layout full'
      style={initAnimation}
      id='head'>
      <nav className='main-nav'>
        <div className='brand' onClick={() => handleLinkClick(0)}>
          Moshe Nehemiah
        </div>

        <ul className='d-flex gap-15'>
          {linksSpring.map((springStyle, i) => (
            <a.li
              style={springStyle}
              key={links[i].label}
              onClick={() => handleLinkClick(links[i].page)}>
              {links[i].label}
            </a.li>
          ))}
        </ul>
      </nav>
    </a.header>
  )
}
