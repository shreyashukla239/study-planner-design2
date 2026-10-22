import { useProductivity } from '../context/ProductivityContext'
import StatCard from '../components/StatCard'
import { toISO, streak } from '../utils/dateUtils'
const mmss = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
export default function Dashboard() {
  const { tasks, focusLog, timer } = useProductivity()
  const done = tasks.filter(t => t.done).length
  const hrs = (focusLog.reduce((a, f) => a + f.minutes, 0) / 60).toFixed(1)
  const pct = tasks.length ? Math.round(done / tasks.length * 100) : 0
  const start = new Date(); start.setDate(start.getDate() - start.getDay())
  const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(start); d.setDate(start.getDate() + i); return { iso: toISO(d), name: d.toLocaleDateString('en', { weekday: 'short' }), n: d.getDate() } })
  return (
    <>
      <div className="quote">"Learning never exhausts the mind." - Leonardo da Vinci</div>
      <div className="stats">
        <StatCard value={tasks.length} label="Total Topics" grad="linear-gradient(135deg,#5b73e0,#6a43a0)" />
        <StatCard value={done} label="Completed" grad="linear-gradient(135deg,#f093fb,#f5576c)" />
        <StatCard value={hrs} label="Study Hours" grad="linear-gradient(135deg,#4facfe,#00f2fe)" />
        <StatCard value={pct + '%'} label="Completion Rate" grad="linear-gradient(135deg,#43e97b,#38f9d7)" />
      </div>
      <div className="streak"><span style={{ fontSize: 34 }}>🔥</span><div><b>{streak(tasks, focusLog)}</b><small>Day Streak</small></div></div>
      <div className="card"><h4 style={{ fontSize: 20 }}>Weekly Calendar</h4>
        <div className="week7">{days.map(d => <div key={d.iso} className="wday"><b>{d.name}</b><b>{d.n}</b>
          {tasks.filter(t => t.due === d.iso).slice(0, 3).map(t => <small key={t.id} className={t.done ? 'wdone' : ''}>{t.title}</small>)}</div>)}</div></div>
      <div className="card"><h4 style={{ fontSize: 20 }}>Pomodoro Timer</h4>
        <div className="pl-pomo"><p>{timer.mode === 'focus' ? 'Focus Session' : 'Break Time'}</p><div className="bigtime">{mmss(timer.left)}</div>
          <div className="ctrls"><button onClick={timer.start}>▶️ Start</button><button onClick={timer.pause}>⏸️ Pause</button><button onClick={timer.reset}>🔄 Reset</button></div></div></div>
    </>
  )
}
