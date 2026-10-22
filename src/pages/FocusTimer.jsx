import { useProductivity } from '../context/ProductivityContext'
import { today } from '../utils/dateUtils'
const mmss = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
export default function FocusTimer() {
  const { timer: t, focusLog } = useProductivity()
  const todayLog = focusLog.filter(f => f.date === today())
  const R = 110, C = 2 * Math.PI * R
  return (
    <div className="page"><div className="card pomo big">
      <div className="tabs"><button className={'chip' + (t.mode === 'focus' ? ' on' : '')} onClick={() => t.switchMode('focus')}>Focus {t.focusLen}m</button>
        <button className={'chip' + (t.mode === 'break' ? ' on' : '')} onClick={() => t.switchMode('break')}>Break 5m</button></div>
      <div className="ring"><svg width="260" height="260" viewBox="0 0 260 260"><circle cx="130" cy="130" r={R} fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="12" />
        <circle cx="130" cy="130" r={R} fill="none" stroke="#fff" strokeWidth="12" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - t.left / t.total)} transform="rotate(-90 130 130)" /></svg><b>{mmss(t.left)}</b></div>
      <div className="ctrls"><button className="btn white" onClick={t.start} disabled={t.running}>Start</button><button className="btn white" onClick={t.pause} disabled={!t.running}>Pause</button><button className="btn white" onClick={t.reset}>Reset</button></div>
      <p>Focused today: <b>{todayLog.reduce((a, f) => a + f.minutes, 0)} min</b> · Sessions completed: <b>{todayLog.length}</b></p>
    </div></div>
  )
}
