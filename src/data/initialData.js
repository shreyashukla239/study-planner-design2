import { today, addDays } from '../utils/dateUtils'
export const initialTasks = () => [
  { id: 1, title: 'Meeting', category: 'Work', priority: 'High', due: today(), time: '08:00', done: false },
  { id: 2, title: 'Learning Python', category: 'Study', priority: 'Medium', due: today(), time: '14:00', done: false },
  { id: 3, title: 'Research', category: 'Work', priority: 'Low', due: today(), time: '18:00', done: false },
  { id: 4, title: 'Calculus problem set', category: 'Study', priority: 'High', due: addDays(-1), time: '10:00', done: true, completedAt: addDays(-1) },
  { id: 5, title: 'Physics lab report', category: 'Study', priority: 'Medium', due: addDays(-2), time: '11:00', done: true, completedAt: addDays(-2) },
  { id: 6, title: 'Read chapter 4', category: 'Study', priority: 'Low', due: addDays(-3), time: '09:00', done: true, completedAt: addDays(-3) },
  { id: 7, title: 'Group project outline', category: 'Work', priority: 'Medium', due: addDays(-4), time: '15:00', done: true, completedAt: addDays(-4) },
  { id: 8, title: 'Revise notes', category: 'Study', priority: 'Low', due: addDays(-2), time: '16:00', done: true, completedAt: addDays(-2) },
]
export const initialSessions = () => [
  { id: 1, subject: 'Advanced Calculus', date: addDays(1), time: '09:00', duration: 90, done: false },
  { id: 2, subject: 'Machine Learning', date: addDays(2), time: '11:00', duration: 60, done: false },
]
export const initialFocus = () => [
  { date: addDays(-1), minutes: 50 }, { date: addDays(-2), minutes: 75 }, { date: addDays(-3), minutes: 100 }, { date: addDays(-4), minutes: 25 },
]
