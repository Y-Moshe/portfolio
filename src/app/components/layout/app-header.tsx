import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch, selectors, actions } from '@/store'
import { useCallback, useMemo } from 'react'

export function AppHeader() {
  const navigate = useNavigate()
  const loggedInUser = useAppSelector(selectors.selectLoggedInUser)
  const isSubmitting = useAppSelector(selectors.selectIsSubmitting)
  const dispatch = useAppDispatch()

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(actions.logoutUser())
      navigate('/', { replace: true })
    } catch (error) {
      console.log(error)
    }
    // eslint-disable-next-line
  }, [])

  const authLinks = useMemo(() => {
    if (!loggedInUser)
      return (
        <ul className='clean-list d-flex gap-5'>
          <li>
            <Link to={'/auth/signup'}>Signup</Link>
          </li>
          <li>
            <Link to={'/auth/login'}>Login</Link>
          </li>
        </ul>
      )

    return (
      <ul className='clean-list d-flex gap-5'>
        <li>
          <Link to={'/'}>{loggedInUser.email}</Link>
        </li>
        <li>
          <button type='button' onClick={handleLogout} disabled={isSubmitting}>
            Logout
          </button>
        </li>
      </ul>
    )
  }, [loggedInUser, isSubmitting, handleLogout])

  return (
    <header className='main-header main-layout full'>
      <nav className='main-nav'>
        <Link to={'/'}>
          <div className='brand'>BRAND LOGO</div>
        </Link>

        {authLinks}
      </nav>
    </header>
  )
}
