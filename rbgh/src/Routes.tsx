import { Routes, Route } from 'react-router-dom'
import { PlayerSelection, NoMatch } from './pages'
import { Results } from './pages/result'
import { FactionSelection, ManualSelect, PrioritySelect } from './pages/selection'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<PlayerSelection />} />
      <Route path="player-selection" element={<PlayerSelection />} />
      <Route path="faction-selection" element={<FactionSelection />} />
      <Route path="manual-select" element={<ManualSelect />} />
      <Route path="priority-select" element={<PrioritySelect />} />
      <Route path="results" element={<Results />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  )
}
