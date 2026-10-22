import { createContext, useContext, useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { initialTasks, initialSessions, initialFocus } from '../data/initialData'
import { today } from '../utils/dateUtils'
const Ctx = createContext()
export const useProductivity = () => useContext(Ctx)
export function ProductivityProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('fm_tasks', initialTasks())
  const [sessions, setSessions] = useLocalStorage('fm_sessions', initialSessions())
  const [focusLog, setFocusLog] = useLocalStorage('fm_focus', initialFocus())
  const [focusLen, setFocusLen] = useLocalStorage('fm_focuslen', 25)
  const [mode, setMode] = useState('focus')
  const [left, setLeft] = useState(focusLen * 60)
  const [running, setRunning] = useState(false)
  const breakLen = 5
  const total = (mode === 'focus' ? focusLen : breakLen) * 60

  const addTask = t => setTasks(p => [{ id: Date.now(), done: false, ...t }, ...p])
  const updateTask = (id, c) => setTasks(p => p.map(t => t.id === id ? { ...t, ...c } : t))
  const toggleTask = id => setTasks(p => p.map(t => t.id === id ? { ...t, done: !t.done, completedAt: !t.done ? today() : null } : t))
  const deleteTask = id => setTasks(p => p.filter(t => t.id !== id))
  const addSession = s => setSessions(p => [...p, { id: Date.now(), done: false, ...s }])
  const toggleSession = id => setSessions(p => p.map(s => s.id === id ? { ...s, done: !s.done } : s))
  const deleteSession = id => setSessions(p => p.filter(s => s.id !== id))

  useEffect(() => {
    if (!running) return
    const i = setInterval(() => setLeft(l => l - 1), 1000)
    return () => clearInterval(i)
  }, [running])
  useEffect(() => {
    if (left > 0) return
    if (mode === 'focus') { setFocusLog(p => [...p, { date: today(), minutes: focusLen }]); setMode('break'); setLeft(breakLen * 60) }
    else { setMode('focus'); setLeft(focusLen * 60) }
    setRunning(false)
  }, [left])
  useEffect(() => { if (!running && mode === 'focus') setLeft(focusLen * 60) }, [focusLen])
  const reset = () => { setRunning(false); setLeft(total) }
  const switchMode = m => { setRunning(false); setMode(m); setLeft((m === 'focus' ? focusLen : breakLen) * 60) }

  return <Ctx.Provider value={{ tasks, sessions, focusLog, addTask, updateTask, toggleTask, deleteTask, addSession, toggleSession, deleteSession,
    timer: { mode, left, running, total, focusLen, setFocusLen, start: () => setRunning(true), pause: () => setRunning(false), reset, switchMode } }}>{children}</Ctx.Provider>
}
