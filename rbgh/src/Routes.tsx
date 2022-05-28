import { Routes, Route } from 'react-router-dom'
import { PlayerSelection, NoMatch } from './pages'
import { Results } from './pages/result'
import { FactionSelection, ManualSelect, PrioritySelect } from './pages/selection'
import { Player } from './types'

interface AppProps {
  playerList: Player[]
  addPlayer: (id: any) => void
  removePlayer: (id: any) => void
  hidePlayer: (id: any) => void
  updatePlayer: (id: any, newName: string) => void
}

export const AppRoutes = (props: AppProps) => {
  return (
    <Routes>
      <Route index element={<PlayerSelection {...props} />} />
      <Route path="player-selection" element={<PlayerSelection {...props} />} />
      <Route path="faction-selection" element={<FactionSelection />} />
      <Route path="manual-select" element={<ManualSelect />} />
      <Route path="priority-select" element={<PrioritySelect />} />
      <Route path="results" element={<Results />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  )
}
