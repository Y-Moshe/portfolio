import { Button, Image, Tag } from 'antd'
import { BsGithub } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { FiLink } from 'react-icons/fi'
import { useInView, animated as a, useTrail } from '@react-spring/web'
import { IProject } from '@/types'
import { useMediaQuery } from 'react-responsive'
import { eventBus } from '@/services'
import { events } from '@/services/event-bus.service'

const { REACT_APP_IS_EDIT_MODE } = process.env

interface ProjectPreviewProps {
  project: IProject
  isEven: boolean
  onClick: (projectId: string) => void
}

export function ProjectPreview(props: ProjectPreviewProps) {
  const [imgRef, imgSprings] = useInView(() => ({
    from: {
      opacity: 0,
      x: 100,
    },
    to: {
      opacity: 1,
      x: 0,
    },
    config: {
      mass: 2,
      tension: 350,
    },
  }))

  const [titleRef, titleSprings] = useInView(() => ({
    from: {
      opacity: 0,
      y: -50,
    },
    to: {
      opacity: 1,
      y: 0,
    },
    config: {
      duration: 500,
    },
  }))

  const [descRef, descSprings] = useInView(() => ({
    from: {
      opacity: 0,
      x: -50,
    },
    to: {
      opacity: 1,
      x: 0,
    },
  }))

  const { project } = props
  const [tagsRef, tagsInView] = useInView()
  const [tagsStyle] = useTrail(
    project.tags.length,
    () => ({
      from: {
        y: 50,
        opacity: 0,
      },
      to: {
        y: 0,
        opacity: 1,
      },
      reset: true,
    }),
    [tagsInView]
  )

  const isDesktop = useMediaQuery({ minWidth: 768 })
  const getOrder = () => (props.isEven && isDesktop ? 'order-2' : 'order-0')

  const handleEditProject = () => {
    eventBus.emit(events.EDIT_PROJECT, project)
  }

  return (
    <article
      className='project-preview container'
      onClick={() => props.onClick(project._id)}>
      <div className='row'>
        <div className={`col-md-6 ${getOrder()} d-flex flex-column`}>
          <a.h1 ref={titleRef} style={titleSprings}>
            {project.name}
          </a.h1>
          <a.p ref={descRef} style={descSprings}>
            {project.description}
          </a.p>
          <a.ul
            className='d-flex justify-content-center flex-wrap gap-5 flex-grow-1'
            ref={tagsRef}>
            {tagsInView &&
              tagsStyle.map((tagStyle, i) => (
                <a.li key={project.tags[i]} style={tagStyle}>
                  <Tag color='#597ef7'>{project.tags[i]}</Tag>
                </a.li>
              ))}
          </a.ul>

          <div className='ant-btn-group' onClick={(e) => e.stopPropagation()}>
            <a href={project.websiteUrl} target='_blank' rel='noreferrer'>
              <Button type='text' size='large' icon={<FiLink size={24} />} />
            </a>
            <a href={project.githubUrl} target='_blank' rel='noreferrer'>
              <Button type='text' size='large' icon={<BsGithub size={24} />} />
            </a>
            {REACT_APP_IS_EDIT_MODE && (
              <Button
                type='text'
                size='large'
                icon={<AiFillEdit size={24} onClick={handleEditProject} />}
              />
            )}
          </div>
        </div>

        <div className='col-md-6 order-1'>
          <a.div ref={imgRef} style={imgSprings}>
            <Image src={project.imgUrls[0]} alt='Project img' preview={false} />
          </a.div>
        </div>
      </div>
    </article>
  )
}
