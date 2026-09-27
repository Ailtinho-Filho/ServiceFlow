import axios from 'axios'

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333/api' })
api.interceptors.request.use(config => {
  const token = localStorage.getItem('serviceflow_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export function money(value: number | string) {
  return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
export function date(value?: string | null) {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('pt-BR')
}
