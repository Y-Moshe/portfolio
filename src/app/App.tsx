import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { AppHeader, AppFooter } from '@components'
import { actions, useAppDispatch } from '@store'

export default function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(actions.loadUser())
  }, [])

  return (
    <div className='main-layout'>
      <AppHeader />
      <main className='main-view'>
        <Outlet />
      </main>
      <AppFooter />
    </div>
  )
}
