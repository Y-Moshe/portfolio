import { configureStore } from '@reduxjs/toolkit'
import authFeature, { IAuthState } from './Features/auth'

export { useAppDispatch, useAppSelector } from './hooks'

export interface IAppState {
  authState: IAuthState
}

export const store = configureStore<IAppState>({
  reducer: {
    authState: authFeature.reducer,
  },
})

export const actions = {
  ...authFeature.actions,
  ...authFeature.asyncActions,
}

export const selectors = {
  ...authFeature.selectors,
}
