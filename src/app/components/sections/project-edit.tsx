import { useEffect, useState } from 'react'
import { Button, Form, Input, Select } from 'antd'
import { DefaultOptionType } from 'antd/es/select'

import { eventBus, portfolioService } from '@/services'
import { events } from '@/services/event-bus.service'

const initialFormValue = {
  _id: '',
  name: '',
  description: '',
  tags: [],
  imgUrls: [],
  githubUrl: '',
  websiteUrl: '',
}

export function ProjectEdit() {
  const [form] = Form.useForm()
  const [isPending, setIsPending] = useState(false)
  const [options, setOptions] = useState<DefaultOptionType[]>([])

  useEffect(() => {
    portfolioService
      .getTagOptions()
      .then((opts) => setOptions(opts))
      .catch(console.log)

    eventBus.on(events.EDIT_PROJECT, (project: any) => {
      delete project.id
      form.setFieldsValue({ ...project })
    })
    // eslint-disable-next-line
  }, [])

  const handleTagsChange = (tags: string[]) => {
    form.setFieldValue('tags', tags)
  }

  const handleSubmit = async (values: any) => {
    let action = portfolioService.addProject
    if (values._id) action = portfolioService.updateProject

    try {
      setIsPending(true)
      await action(values)
      form.resetFields()
    } catch (error) {
      console.log(error)
    } finally {
      setIsPending(false)
    }
  }

  const handleDeleteProject = () => {
    setIsPending(true)

    portfolioService
      .deleteProject(form.getFieldValue('_id'))
      .finally(() => setIsPending(false))
  }

  return (
    <section className='project-edit section-view d-flex flex-column justify-content-center'>
      <fieldset className='w-100'>
        <legend>
          <h1>Product Edit</h1>
        </legend>

        <Button
          type='dashed'
          htmlType='button'
          size='large'
          shape='round'
          onClick={() => form.resetFields()}>
          Clear All
        </Button>

        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ ...initialFormValue }}
          onFinish={handleSubmit}>
          <Form.Item label='Project Id' name='_id'>
            <Input type='text' disabled />
          </Form.Item>
          <Form.Item
            label='Project Name'
            name='name'
            rules={[{ required: true, message: 'Project name is required!' }]}>
            <Input type='text' />
          </Form.Item>

          <Form.Item
            label='Description'
            name='description'
            rules={[{ required: true, message: 'Description is required!' }]}>
            <Input type='text' />
          </Form.Item>

          {/* Img urls */}
          <Form.List name='imgUrls'>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    label={'Image url ' + (index + 1)}
                    key={field.key}
                    wrapperCol={{ span: 16 }}>
                    <div className='d-flex gap-10'>
                      <Form.Item {...field} className='w-100'>
                        <Input type='text' />
                      </Form.Item>
                      {fields.length > 0 ? (
                        <Form.Item noStyle>
                          <Button
                            shape='circle'
                            onClick={() => remove(field.name)}>
                            -
                          </Button>
                        </Form.Item>
                      ) : null}
                    </div>
                  </Form.Item>
                ))}
                <Form.Item labelCol={{ span: 4 }}>
                  <Button type='dashed' onClick={() => add()}>
                    Add image
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          {/* Tags */}
          <Form.Item label='Tags' name='tags'>
            <Select
              allowClear
              mode='multiple'
              style={{ minWidth: 200 }}
              placeholder='Please select'
              value={form.getFieldValue('tags')}
              onChange={handleTagsChange}
              options={options}
            />
          </Form.Item>

          <Form.Item
            label='Github Url'
            name='githubUrl'
            rules={[{ required: true, message: 'Github Url is required!' }]}>
            <Input type='text' />
          </Form.Item>

          <Form.Item
            label='Website Url'
            name='websiteUrl'
            rules={[{ required: true, message: 'Website Url is required!' }]}>
            <Input type='text' />
          </Form.Item>

          <Form.Item wrapperCol={{ sm: { offset: 4, span: 16 } }}>
            <Button
              type='primary'
              htmlType='submit'
              size='large'
              shape='round'
              loading={isPending}
              block>
              Save
            </Button>
            <Button
              disabled={form.getFieldValue('_id')}
              style={{ marginTop: 10 }}
              type='primary'
              danger
              htmlType='button'
              size='large'
              loading={isPending}
              onClick={handleDeleteProject}
              block>
              Delete project
            </Button>
          </Form.Item>
        </Form>
      </fieldset>
    </section>
  )
}
