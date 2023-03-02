import { useCallback } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AsyncThunkAction, unwrapResult } from '@reduxjs/toolkit'
import { IAppState, store } from '@/store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppSelector: TypedUseSelectorHook<IAppState> = useSelector
export const useAppDispatch = () => {
  const dispatch = useDispatch<typeof store.dispatch>()
  return useCallback(
    <R extends any>(asyncThunk: AsyncThunkAction<R, any, any>): Promise<R> =>
      dispatch(asyncThunk).then(unwrapResult),
    [dispatch]
  )
}
