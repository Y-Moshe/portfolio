import React, { Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { Spinner } from '@/components'
import HomeView from '../views/home-view'
import App from '../App'

const AuthView = React.lazy(() => import('../views/auth-view'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Navigate to='/home' />,
      },
      {
        path: 'home',
        element: <HomeView />,
      },
      {
        path: 'auth/signup',
        element: (
          <Suspense fallback={<Spinner />}>
            <AuthView isLogin={false} />,
          </Suspense>
        ),
      },
      {
        path: 'auth/login',
        element: (
          <Suspense fallback={<Spinner />}>
            <AuthView isLogin={true} />,
          </Suspense>
        ),
      },
    ],
  },
])
