import { Button, Modal, Tag, Image, Carousel } from 'antd'
import { BsGithub } from 'react-icons/bs'
import { FiLink } from 'react-icons/fi'

import { IProject } from '@/types'

interface ProjectModalProps {
  project: IProject | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal(props: ProjectModalProps) {
  const { project } = props

  return (
    <Modal
      open={props.isOpen}
      onCancel={props.onClose}
      className='project-modal'
      title={project?.name}
      footer={
        <footer className='ant-btn-group'>
          <a href={project?.websiteUrl} target='_blank' rel='noreferrer'>
            <Button type='text' size='large' icon={<FiLink size={24} />} />
          </a>
          <a href={project?.githubUrl} target='_blank' rel='noreferrer'>
            <Button type='text' size='large' icon={<BsGithub size={24} />} />
          </a>
        </footer>
      }>
      <div className='container'>
        <div className='project-gallery'>
          {project?.imgUrls.map((imgUrl, i) => (
            <Image key={i} src={imgUrl} alt='First project picture' />
          ))}
        </div>

        <Carousel
          dots={{ className: 'carousel-dots-controls' }}
          className='d-sm-none'
          draggable>
          {project?.imgUrls.map((imgUrl, i) => (
            <div key={i}>
              <Image src={imgUrl} alt='Project img' />
            </div>
          ))}
        </Carousel>

        <ul className='d-flex justify-content-center flex-wrap gap-5 m-3'>
          {project?.tags.map((tag) => (
            <li key={tag}>
              <Tag color='#597ef7'>{tag}</Tag>
            </li>
          ))}
        </ul>

        <div
          className='mt-3'
          dangerouslySetInnerHTML={{
            __html: project?.description || '',
          }}></div>
      </div>
    </Modal>
  )
}
