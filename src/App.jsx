import { Routes, Route } from 'react-router-dom'
import PlannerShell from './components/PlannerShell'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import StudyPlanner from './pages/StudyPlanner'
import FocusTimer from './pages/FocusTimer'
import Progress from './pages/Progress'
export default function App() {
  return (
    <PlannerShell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/planner" element={<StudyPlanner />} />
        <Route path="/timer" element={<FocusTimer />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </PlannerShell>
  )
}
