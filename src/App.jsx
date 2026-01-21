import { Routes, Route } from 'react-router'
import SetupPage from './pages/SetupPage/SetupPage'
import GamePage from './pages/GamePage/GamePage'
import StatisticsPage from './pages/StatisticsPage/StatisticsPage'

import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SetupPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/stats" element={<StatisticsPage />} />
      </Routes>
    </>
  )
}

export default App
