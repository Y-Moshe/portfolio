import { eventBus, portfolioService } from '@/services'
import { events } from '@/services/event-bus.service'
import { Button, Form, Input, Select } from 'antd'
import { DefaultOptionType } from 'antd/es/select'
import { useEffect } from 'react'

const tagsOptions: DefaultOptionType[] = [
  'Sass/Scss',
  'Bootstrap',
  'jQuery',
  'TypeScript',
  'React',
  'Redux',
  'Angular',
  'NgRx Store',
  'Vuex',
  'Pinia',
  'Vue (Options API)',
  'Vue (Composition API)',
  '.NET/.NET Core',
  'C#',
  'NodeJS',
  'Socket.io',
  'WebSockets',
  'Animate.css',
  'Unit-testing',
  'Backend server',
  'MongoDB',
  'Sqlite',
  'Expressjs',
  'rest API',
].map((t) => ({ label: t, value: t }))

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

  useEffect(() => {
    eventBus.on(events.EDIT_PROJECT, (project: any) => {
      console.log(project)
      delete project.id

      form.setFieldsValue({ ...project })
    })
  }, [])

  const handleTagsChange = (tags: string[]) => {
    form.setFieldValue('tags', tags)
  }

  const handleSubmit = (values: any) => {
    // Old technique
    // const text = JSON.stringify(values, null, 2)
    // console.log(text)
    // navigator.clipboard.writeText(text)
    console.log(values._id)
    console.log(form.getFieldValue('_id'))

    values._id
      ? portfolioService.updateProject(values)
      : portfolioService.addProject(values)
  }

  const handleDeleteProject = () => {
    portfolioService.deleteProject(form.getFieldValue('_id'))
  }

  return (
    <section className='d-flex flex-column justify-content-center'>
      <fieldset className='contact-form'>
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
              options={tagsOptions}
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
              block>
              Generate JSON
            </Button>
            <Button
              disabled={form.getFieldValue('_id')}
              style={{ marginTop: 10 }}
              type='primary'
              danger
              htmlType='button'
              size='large'
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
