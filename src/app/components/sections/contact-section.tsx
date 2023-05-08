import { Button, Form, Input } from 'antd'
import { useState } from 'react'
import { BsGithub, BsLinkedin } from 'react-icons/bs'

const initialFormValue = {
  fullName: '',
  subject: '',
  body: '',
}

export function ContactSection() {
  const [isPending, setIsPending] = useState(false)
  const [form] = Form.useForm()

  const handleSubmit = ({ fullName, subject, body }: any) => {
    setIsPending(true)

    const el = document.createElement('a')
    el.href = `mailto:moshe.nehemiah@gmail.com?subject=${subject}&body=${body}&from=${fullName}`
    setTimeout(() => {
      el.click()
      el.remove()

      setIsPending(false)
      form.resetFields()
    }, 1000)
  }

  return (
    <section className='contact-section section-view'>
      <fieldset className='contact-form'>
        <legend>
          <h1>Contact</h1>
        </legend>

        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ ...initialFormValue }}
          onFinish={handleSubmit}>
          <Form.Item
            label='Full Name'
            name='fullName'
            rules={[{ required: true, message: 'Full name is required!' }]}>
            <Input type='text' />
          </Form.Item>

          <Form.Item
            label='Subject'
            name='subject'
            rules={[{ required: true, message: 'Subject is required!' }]}>
            <Input type='text' />
          </Form.Item>

          <Form.Item
            label='Message'
            name='body'
            rules={[{ required: true, message: 'Message is required!' }]}>
            <Input.TextArea rows={10} />
          </Form.Item>

          <Form.Item wrapperCol={{ sm: { offset: 4, span: 16 } }}>
            <Button
              type='primary'
              htmlType='submit'
              loading={isPending}
              size='large'
              shape='round'
              block>
              Contact
            </Button>
          </Form.Item>
        </Form>

        <div className='d-flex' style={{ fontSize: 48 }}>
          <ul className='d-flex gap-10 m-auto align-items-center'>
            <li style={{ color: '#333' }}>
              <a className='hover-effect' href='https://github.com/Y-Moshe'>
                <BsGithub />
              </a>
            </li>
            <li style={{ color: '#0077B5' }}>
              <a
                className='hover-effect'
                href='https://www.linkedin.com/in/moshe-nehemiah-254506155/'>
                <BsLinkedin />
              </a>
            </li>
          </ul>
        </div>
      </fieldset>
    </section>
  )
}
