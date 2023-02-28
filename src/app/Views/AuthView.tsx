import { FormEvent, ChangeEvent, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, actions, useAppSelector, selectors } from '@store'
import { ICredentials, IUser } from '@types'

interface IAuthPageProps {
  isLogin: boolean
}

interface IAuthForm extends IUser {
  [key: string]: any
}

const inputsData = [
  {
    type: 'text',
    label: 'First Name',
    name: 'firstName',
    placeholder: 'Type your first name',
  },
  {
    type: 'text',
    label: 'Last Name',
    name: 'lastName',
    placeholder: 'Type your last name',
  },
  {
    type: 'email',
    label: 'Email Address',
    name: 'email',
    placeholder: 'Type your email address',
  },
  {
    type: 'password',
    label: 'Password',
    name: 'password',
    placeholder: 'Type your password',
  },
]

export default function AuthView(props: IAuthPageProps) {
  const isSubmitting = useAppSelector(selectors.selectIsSubmitting)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [authForm, setAuthForm] = useState<IAuthForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const authText = useMemo(
    () => (props.isLogin ? 'Log-in' : 'Sign-up'),
    [props.isLogin]
  )

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setAuthForm((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

  const inputs = inputsData.slice(props.isLogin ? 2 : 0).map((inp) => (
    <div className={'form-control'} key={inp.name}>
      <label htmlFor={inp.name}>{inp.label}</label>
      <input
        disabled={isSubmitting}
        id={inp.name}
        name={inp.name}
        placeholder={inp.placeholder}
        value={authForm[inp.name]}
        onChange={handleChange}
      />
    </div>
  ))

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      let action: any = login
      if (!props.isLogin) action = signup
      await action(authForm)

      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  const signup = (user: IUser) => dispatch(actions.signupUser(user))
  const login = (credentials: ICredentials) =>
    dispatch(actions.loginUser(credentials))

  return (
    <section className='auth-view'>
      <h1>{authText}</h1>
      <form onSubmit={handleSubmit}>
        {inputs}

        <section className='d-flex justify-content-end'>
          <button type='submit' className='w-100' disabled={isSubmitting}>
            {authText}
          </button>
        </section>
      </form>
    </section>
  )
}
