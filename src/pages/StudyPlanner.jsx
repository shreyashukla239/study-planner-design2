import { useState } from 'react'
import { Trash2, Check } from 'lucide-react'
import { useProductivity } from '../context/ProductivityContext'
import { today, fmtTime, fmtDate } from '../utils/dateUtils'
export default function StudyPlanner() {
  const { sessions, addSession, toggleSession, deleteSession } = useProductivity()
  const [f, setF] = useState({ subject: '', date: today(), time: '09:00', duration: 60 }); const [err, setErr] = useState('')
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const submit = e => { e.preventDefault(); if (!f.subject.trim() || +f.duration < 5) return setErr('Enter a subject and a duration of at least 5 minutes.'); addSession({ ...f, subject: f.subject.trim(), duration: +f.duration }); setF({ ...f, subject: '' }); setErr('') }
  const sorted = [...sessions].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
  return (
    <div className="page">
      <form className="card formrow" onSubmit={submit}>
        <input placeholder="Subject" value={f.subject} onChange={set('subject')} /><input type="date" value={f.date} onChange={set('date')} />
        <input type="time" value={f.time} onChange={set('time')} /><input type="number" min="5" step="5" value={f.duration} onChange={set('duration')} title="Minutes" />
        <button className="btn orange">Schedule</button>{err && <p className="err">{err}</p>}
      </form>
      <div className="card"><h4>Upcoming Sessions</h4>
        {sorted.length ? sorted.map(s => (
          <div key={s.id} className={'task' + (s.done ? ' done' : '')}>
            <div className="tinfo"><b>{s.subject}</b><small>{fmtDate(s.date)} · {fmtTime(s.time)} · {s.duration} min</small></div>
            <button className="icon" title="Complete" onClick={() => toggleSession(s.id)}><Check size={16} /></button>
            <button className="icon" title="Remove" onClick={() => deleteSession(s.id)}><Trash2 size={16} /></button>
          </div>)) : <p className="empty">No sessions scheduled yet.</p>}</div>
    </div>
  )
}
