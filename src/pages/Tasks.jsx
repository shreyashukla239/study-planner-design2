import { useState } from 'react'
import { useProductivity } from '../context/ProductivityContext'
import TaskItem from '../components/TaskItem'
import { today } from '../utils/dateUtils'
export default function Tasks() {
  const { tasks, addTask } = useProductivity()
  const blank = { title: '', category: 'Study', priority: 'Medium', due: today(), time: '09:00' }
  const [f, setF] = useState(blank); const [err, setErr] = useState('')
  const [status, setStatus] = useState('all'); const [pri, setPri] = useState('all')
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const submit = e => { e.preventDefault(); if (!f.title.trim()) return setErr('Please enter a task title.'); addTask({ ...f, title: f.title.trim() }); setF(blank); setErr('') }
  const list = tasks.filter(t => (status === 'all' || (status === 'done') === t.done) && (pri === 'all' || t.priority === pri))
  return (
    <div className="page">
      <form className="card formrow" onSubmit={submit}>
        <input placeholder="Task title" value={f.title} onChange={set('title')} />
        <select value={f.category} onChange={set('category')}><option>Study</option><option>Work</option></select>
        <select value={f.priority} onChange={set('priority')}><option>High</option><option>Medium</option><option>Low</option></select>
        <input type="date" value={f.due} onChange={set('due')} /><input type="time" value={f.time} onChange={set('time')} />
        <button className="btn orange">Add Task</button>{err && <p className="err">{err}</p>}
      </form>
      <div className="card"><div className="filters">
        {['all', 'active', 'done'].map(s => <button key={s} className={'chip' + (status === s ? ' on' : '')} onClick={() => setStatus(s)}>{s}</button>)}
        <span className="sp" />{['all', 'High', 'Medium', 'Low'].map(s => <button key={s} className={'chip' + (pri === s ? ' on' : '')} onClick={() => setPri(s)}>{s}</button>)}</div>
        {list.length ? list.map(t => <TaskItem key={t.id} task={t} />) : <p className="empty">No tasks match. Add one above!</p>}</div>
    </div>
  )
}
