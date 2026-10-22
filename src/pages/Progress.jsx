import { useProductivity } from '../context/ProductivityContext'
import ProgressChart from '../components/ProgressChart'
import StatCard from '../components/StatCard'
import { lastNDays } from '../utils/dateUtils'
export default function Progress() {
  const { tasks, focusLog } = useProductivity()
  const days = lastNDays(7)
  const done = tasks.filter(t => t.done).length
  const pct = tasks.length ? Math.round(done / tasks.length * 100) : 0
  const completed = days.map(d => ({ label: d.label, count: tasks.filter(t => t.completedAt === d.date).length }))
  const hours = days.map(d => ({ label: d.label, hours: +(focusLog.filter(f => f.date === d.date).reduce((a, f) => a + f.minutes, 0) / 60).toFixed(1) }))
  const totalH = (focusLog.reduce((a, f) => a + f.minutes, 0) / 60).toFixed(1)
  return (
    <div className="page">
      <div className="stats">
        <StatCard value={tasks.length} label="Total Tasks" grad="linear-gradient(135deg,#667eea,#764ba2)" />
        <StatCard value={done} label="Completed" grad="linear-gradient(135deg,#f093fb,#f5576c)" />
        <StatCard value={totalH} label="Focus Hours" grad="linear-gradient(135deg,#4facfe,#00f2fe)" />
        <StatCard value={pct + '%'} label="Completion Rate" grad="linear-gradient(135deg,#43e97b,#38f9d7)" />
      </div>
      <div className="row"><div className="card"><h4>Tasks Completed (7 days)</h4><ProgressChart data={completed} dataKey="count" grid height={240} /></div>
        <div className="card"><h4>Focus Hours (7 days)</h4><ProgressChart data={hours} dataKey="hours" color="#ff9a5a" grid height={240} unit="h" /></div></div>
    </div>
  )
}
