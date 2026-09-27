import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { BarChart3, BriefcaseBusiness, LogOut, Menu, Users, WalletCards, X } from 'lucide-react'
import { useState } from 'react'

const links = [
  { to: '/', label: 'Dashboard', icon: BarChart3 },
  { to: '/servicos', label: 'Ordens de serviço', icon: BriefcaseBusiness },
  { to: '/clientes', label: 'Clientes', icon: Users },
  { to: '/financeiro', label: 'Financeiro', icon: WalletCards },
]

export default function AppLayout() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('serviceflow_user') || '{"name":"Usuário"}')
  const logout = () => { localStorage.clear(); navigate('/login') }
  return <div className="app-shell">
    <aside className={open ? 'sidebar open' : 'sidebar'}>
      <div className="brand"><div className="brand-mark">S</div><div><strong>ServiceFlow</strong><small>Gestão de serviços</small></div><button className="mobile-close" onClick={()=>setOpen(false)}><X size={20}/></button></div>
      <nav>{links.map(({to,label,icon:Icon}) => <NavLink key={to} to={to} end={to==='/'} onClick={()=>setOpen(false)}><Icon size={18}/><span>{label}</span></NavLink>)}</nav>
      <div className="sidebar-footer"><div className="avatar">{user.name?.slice(0,1).toUpperCase() || 'U'}</div><div className="user-mini"><strong>{user.name}</strong><span>{user.role || 'Usuário'}</span></div><button onClick={logout} title="Sair"><LogOut size={18}/></button></div>
    </aside>
    <main className="main-area"><header className="topbar"><button className="menu-button" onClick={()=>setOpen(true)}><Menu size={22}/></button><div><span className="eyebrow">Painel administrativo</span><h1>Visão geral</h1></div><div className="topbar-right"><span className="online-dot"/> Sistema online</div></header><section className="page"><Outlet /></section></main>
  </div>
}
