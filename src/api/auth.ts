import axios from 'axios'

const FLAG_KEY = 'isLoggedIn'

export const authState = {
  get isLoggedIn() {
    return localStorage.getItem(FLAG_KEY) === 'true'
  },
  set isLoggedIn(val: boolean) {
    if (val) localStorage.setItem(FLAG_KEY, 'true')
    else localStorage.removeItem(FLAG_KEY)
  },
}

export async function login(username: string, password: string): Promise<void> {
  const form = new URLSearchParams()
  form.append('username', username)
  form.append('password', password)
  await axios.post('/api/token', form, { withCredentials: true })
  authState.isLoggedIn = true
}

export async function logout(): Promise<void> {
  await axios.post('/api/logout', null, { withCredentials: true }).catch(() => {})
  authState.isLoggedIn = false
}
