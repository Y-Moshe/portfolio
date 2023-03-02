import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit'
import { authService } from '@/services'
import { ICredentials, IUser } from '@/types'
import { IAppState } from '@/store'

export interface IAuthState {
  loggedInUser: IUser | null
  isSubmitting: boolean
}

const initialState: IAuthState = {
  loggedInUser: null,
  isSubmitting: false,
}

const signupUser = createAsyncThunk(
  '[Auth API] Signup User',
  async (userData: IUser, { dispatch }) => {
    const { user, token } = await authService.signup(userData)
    authService.saveAuthToken(token)
    dispatch(setLoggedInUser(user))
    return user
  }
)

const loginUser = createAsyncThunk(
  '[Auth API] Login User',
  async (credentials: ICredentials, { dispatch }) => {
    const { user, token } = await authService.login(credentials)
    authService.saveAuthToken(token)
    dispatch(setLoggedInUser(user))
    return user
  }
)

const logoutUser = createAsyncThunk(
  '[Auth API] Logout User',
  async (_, { dispatch }) => {
    await authService.logout()
    authService.clearAuthToken()
    dispatch(setLoggedInUser(null))
  }
)

const loadUser = createAsyncThunk(
  '[Auth API] Load User',
  async (_, { dispatch }) => {
    try {
      const token = authService.loadAuthToken()
      if (!token) return

      const { user } = await authService.verifyToken(token)
      dispatch(setLoggedInUser(user))
      return user
    } catch (error) {
      // Incase of invalid token remove from local storage
      authService.clearAuthToken()
      throw error
    }
  }
)

const authSlice = createSlice({
  name: '[Auth API]',
  initialState,
  reducers: {
    setLoggedInUser: (state, action: PayloadAction<IUser | null>) => {
      state.loggedInUser = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          signupUser.pending,
          loginUser.pending,
          logoutUser.pending,
          loadUser.pending
        ),
        (state) => {
          state.isSubmitting = true
        }
      )
      .addMatcher(
        isAnyOf(
          signupUser.fulfilled,
          signupUser.rejected,
          loginUser.fulfilled,
          loginUser.rejected,
          logoutUser.fulfilled,
          logoutUser.rejected,
          loadUser.fulfilled,
          loadUser.rejected
        ),
        (state) => {
          state.isSubmitting = false
        }
      )
  },
})

const { setLoggedInUser } = authSlice.actions

const selectLoggedInUser = (state: IAppState) => state.authState.loggedInUser
const selectIsSubmitting = (state: IAppState) => state.authState.isSubmitting

const authFeatures = {
  selectors: {
    selectLoggedInUser,
    selectIsSubmitting,
  },
  reducer: authSlice.reducer,
  actions: authSlice.actions,
  asyncActions: {
    signupUser,
    loginUser,
    logoutUser,
    loadUser,
  },
}

export default authFeatures
