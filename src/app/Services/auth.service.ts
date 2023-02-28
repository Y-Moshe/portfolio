import { storageService } from './storage.service'
import { httpService, axios } from './http.service'
import { IUser, ICredentials, IAuthToken, ILoginResponse } from '@types'

// Attach Authorization header with token
axios.interceptors.request.use((req) => {
  req.headers.Authorization = 'Bearer ' + loadAuthToken()
  return req
})

const STORAGE_KEY = 'loggedInUser'

function signup(user: IUser): Promise<ILoginResponse> {
  return httpService.post<ILoginResponse>('/auth/signup', user)
}

function login(credentials: ICredentials): Promise<ILoginResponse> {
  return httpService.post<ILoginResponse>('/auth/login', credentials)
}

function logout(): Promise<any> {
  return httpService.post('/auth/logout', {})
}

function verifyToken(token: string): Promise<IAuthToken> {
  return httpService.post<IAuthToken>('/auth/verify/token', { token })
}

function saveAuthToken(token: string): void {
  storageService.saveToStorage(STORAGE_KEY, token)
}

function loadAuthToken(): string | null {
  return storageService.loadFromStorage<string>(STORAGE_KEY)
}

function clearAuthToken(): void {
  storageService.removeFromStorage(STORAGE_KEY)
}

export const authService = {
  signup,
  login,
  logout,
  verifyToken,
  saveAuthToken,
  loadAuthToken,
  clearAuthToken,
}
