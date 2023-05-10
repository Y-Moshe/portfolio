import { Button, Carousel, Image, Tag } from 'antd'
import {
  BsGithub,
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
} from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { FiLink } from 'react-icons/fi'
import { useInView, animated as a, useTrail } from '@react-spring/web'

import { IProject } from '@/types'
import { eventBus } from '@/services'
import { events } from '@/services/event-bus.service'

const REACT_APP_IS_EDIT_MODE = JSON.parse(process.env.REACT_APP_IS_EDIT_MODE)
const MAX_RENDERED_TAGS = 5

interface ProjectPreviewProps {
  project: IProject
  onClick: (projectId: string) => void
}

export function ProjectPreview(props: ProjectPreviewProps) {
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

  const { project } = props
  const [tagsRef, tagsInView] = useInView()
  const [tagsStyle] = useTrail(
    project.tags.length > MAX_RENDERED_TAGS
      ? MAX_RENDERED_TAGS
      : project.tags.length,
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
    [tagsInView, project.tags.length]
  )

  const handleEditProject = () => {
    eventBus.emit(events.EDIT_PROJECT, project)
  }

  return (
    <article
      className='project-preview'
      onClick={() => props.onClick(project._id)}>
      <a.h1 ref={titleRef} style={titleSprings} className='heading'>
        {project.name}
      </a.h1>

      <div onClick={(e) => e.stopPropagation()}>
        <Carousel
          className={project.imgUrls.length > 1 ? 'drag-mouse' : 'undragable'}
          dots={{ className: 'carousel-dots-controls' }}
          arrows={true}
          prevArrow={<SlickPrevArrow />}
          nextArrow={<SlickNextArrow />}
          draggable>
          {project?.imgUrls.map((imgUrl, i) => (
            <Image key={i} src={imgUrl} alt='Project img' preview={false} />
          ))}
        </Carousel>
      </div>

      <a.ul className='project-tags-list' ref={tagsRef}>
        {tagsInView &&
          tagsStyle.slice(0, MAX_RENDERED_TAGS).map((tagStyle, i) => (
            <a.li key={project.tags[i]} style={tagStyle}>
              <Tag color='#597ef7'>{project.tags[i]}</Tag>
            </a.li>
          ))}
        {project.tags.length > MAX_RENDERED_TAGS && (
          <span style={{ color: '#597ef7' }}>...</span>
        )}
      </a.ul>

      <span className='flex-grow-1'></span>

      <div className='ant-btn-group my-2'>
        <a
          href={project.websiteUrl}
          target='_blank'
          rel='noreferrer'
          onClick={(e) => e.stopPropagation()}>
          <Button type='text' size='large' icon={<FiLink size={24} />} />
        </a>
        <a
          href={project.githubUrl}
          target='_blank'
          rel='noreferrer'
          onClick={(e) => e.stopPropagation()}>
          <Button type='text' size='large' icon={<BsGithub size={24} />} />
        </a>
        {REACT_APP_IS_EDIT_MODE && (
          <Button
            type='text'
            size='large'
            icon={<AiFillEdit size={24} onClick={handleEditProject} />}
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>
    </article>
  )
}

const iconSize = {
  width: 25,
  height: 25,
}

function SlickNextArrow(props: any) {
  const { className, style, onClick } = props
  return (
    <BsArrowRightCircleFill
      className={className}
      style={{ ...style, ...iconSize, display: 'block' }}
      onClick={onClick}
    />
  )
}

function SlickPrevArrow(props: any) {
  const { className, style, onClick } = props
  return (
    <BsArrowLeftCircleFill
      className={className}
      style={{ ...style, ...iconSize, display: 'block' }}
      onClick={onClick}
    />
  )
}
