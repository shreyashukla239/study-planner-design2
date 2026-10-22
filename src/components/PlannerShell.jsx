import { NavLink, Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
const nav = [['/', '📊', 'Dashboard'], ['/tasks', '📚', 'Topics'], ['/planner', '📝', 'Notes'], ['/timer', '🔄', 'Review'], ['/progress', '📈', 'Analytics']]
export default function PlannerShell({ children }) {
  const { pathname } = useLocation(); const { dark, setDark } = useTheme()
  const title = (nav.find(n => n[0] === pathname) || nav[0])[2]
  return (
    <div className={'pl-wrap t-planner' + (dark ? ' dark' : '')}>
      <aside className="pl-side"><h1>Study Planner Template<br />-- My Study Plan</h1><p>Learn. Note. Review.</p>
        <nav>{nav.map(([to, e, l]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => 'pl-nav' + (isActive ? ' active' : '')}><span>{e}</span>{l}</NavLink>)}</nav></aside>
      <main className="pl-main"><button className="moon" onClick={() => setDark(!dark)}>{dark ? '☀️' : '🌙'}</button>
        <div className="pl-top"><h1>{title}</h1><Link to="/tasks" className="btn accent">+ Add Task</Link></div>{children}</main>
    </div>
  )
}
