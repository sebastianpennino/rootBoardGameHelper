import { Routes, Route } from 'react-router-dom'
import { Landing, NoMatch } from './pages'
import { Results } from './pages/result'
import { RandomFilterSelect, PickManualSelect, PrioritySelect } from './pages/selection'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path="player-selection" element={<Landing />} />
      <Route path="faction-selection" element={<RandomFilterSelect />} />
      <Route path="manual-select" element={<PickManualSelect />} />
      <Route path="priority-select" element={<PrioritySelect />} />
      <Route path="results" element={<Results />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  )
}
