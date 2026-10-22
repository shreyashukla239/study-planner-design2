import { useState } from 'react'
import { Pencil, Trash2, Check, X } from 'lucide-react'
import { useProductivity } from '../context/ProductivityContext'
import { fmtTime, fmtDate } from '../utils/dateUtils'
export default function TaskItem({ task, compact }) {
  const { toggleTask, deleteTask, updateTask } = useProductivity()
  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState(task.title)
  const save = () => { if (title.trim()) updateTask(task.id, { title: title.trim() }); setEdit(false) }
  return (
    <div className={'task' + (task.done ? ' done' : '')}>
      <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
      <div className="tinfo">
        {edit ? <input className="inline" autoFocus value={title} onChange={e => setTitle(e.target.value)} onKeyDown={e => e.key === 'Enter' && save()} /> : <b>{task.title}</b>}
        <small><i className={'dot ' + task.category}></i>{task.category}{!compact && <> · <span className={'pri ' + task.priority}>{task.priority}</span> · {fmtDate(task.due)}</>}</small>
      </div>
      <span className="ttime">{fmtTime(task.time)}</span>
      {!compact && (edit
        ? <><button className="icon" onClick={save}><Check size={15} /></button><button className="icon" onClick={() => setEdit(false)}><X size={15} /></button></>
        : <><button className="icon" onClick={() => setEdit(true)}><Pencil size={15} /></button><button className="icon" onClick={() => deleteTask(task.id)}><Trash2 size={15} /></button></>)}
    </div>
  )
}
