import { useState } from 'react'
import { CiLocationOn, CiMail, CiPhone } from 'react-icons/ci'
import { Button, Form, Input } from 'antd'
import { BsGithub, BsLinkedin } from 'react-icons/bs'
import contactImgUrl from 'src/assets/img/contact.png'

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
    <section className='contact-section section-view' id='contact-section'>
      <div className='form-wrapper'>
        <div className='container contact-frame'>
          <div className='row'>
            <div className='col-lg-5 order-1 order-lg-0'>
              <div className='contact-img-wrapper'>
                <img
                  src={contactImgUrl}
                  alt='contact-background'
                  className='mt-4'
                />

                <ul className='contact-methods'>
                  <li>
                    <CiMail />
                    moshe.nehemiah@gmail.com
                  </li>
                  <li>
                    <CiPhone /> +972504226608
                  </li>
                  <li>
                    <CiLocationOn /> Ashdod, IL
                  </li>
                </ul>

                <ul
                  className='d-flex gap-10 align-items-center'
                  style={{ fontSize: 48 }}>
                  <li style={{ color: '#333' }}>
                    <a href='https://github.com/Y-Moshe'>
                      <BsGithub />
                    </a>
                  </li>
                  <li style={{ color: '#0077B5' }}>
                    <a href='https://www.linkedin.com/in/moshe-nehemiah-254506155/'>
                      <BsLinkedin />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-lg-7 order-0 order-lg-1'>
              <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                initialValues={{ ...initialFormValue }}
                onFinish={handleSubmit}>
                <Form.Item wrapperCol={{ sm: { offset: 4, span: 16 } }}>
                  <h1>Contact Me</h1>
                </Form.Item>

                <Form.Item
                  label='Full Name'
                  name='fullName'
                  rules={[
                    { required: true, message: 'Full name is required!' },
                  ]}>
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

                <Form.Item wrapperCol={{ sm: { offset: 4, span: 18 } }}>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
