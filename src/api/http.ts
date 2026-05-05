import axios from 'axios'
import { authState } from './auth'
import router from '../router'

const http = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      authState.isLoggedIn = false
      router.push('/login')
    }
    return Promise.reject(err)
  },
)

export default http
