const pad = n => String(n).padStart(2, '0')
export const toISO = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const today = () => toISO(new Date())
export const addDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return toISO(d) }
export const lastNDays = (n) => Array.from({ length: n }, (_, i) => {
  const d = new Date(); d.setDate(d.getDate() - (n - 1 - i))
  return { date: toISO(d), label: d.toLocaleDateString('en', { weekday: 'short' }).slice(0, 2) }
})
export const fmtTime = t => { if (!t) return ''; const [h, m] = t.split(':').map(Number); return `${h % 12 || 12}:${pad(m)} ${h >= 12 ? 'PM' : 'AM'}` }
export const fmtDate = s => new Date(s + 'T00:00').toLocaleDateString('en', { day: 'numeric', month: 'short' })
export const greeting = () => { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening' }
export const streak = (tasks, focus) => {
  const s = new Set([...tasks.filter(t => t.completedAt).map(t => t.completedAt), ...focus.map(f => f.date)])
  let n = 0, i = s.has(addDays(0)) ? 0 : 1
  while (s.has(addDays(-i))) { n++; i++ }
  return n
}
export const endTime = (t, m) => { const [h, mi] = t.split(':').map(Number); const x = h * 60 + mi + m; return fmtTime(`${String(Math.floor(x / 60) % 24).padStart(2, '0')}:${String(x % 60).padStart(2, '0')}`) }
