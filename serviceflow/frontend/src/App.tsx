import { Navigate, Route, Routes } from 'react-router-dom'
import type { ReactNode } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Customers from './pages/Customers'
import Services from './pages/Services'
import Finance from './pages/Finance'
import AppLayout from './layouts/AppLayout'

function PrivateRoute({ children }: { children: ReactNode }) {
  return localStorage.getItem('serviceflow_token') ? <>{children}</> : <Navigate to="/login" replace />
}

export default function App() {
  return <Routes>
    <Route path="/login" element={<Login />} />
    <Route element={<PrivateRoute><AppLayout /></PrivateRoute>}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/clientes" element={<Customers />} />
      <Route path="/servicos" element={<Services />} />
      <Route path="/financeiro" element={<Finance />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
}
