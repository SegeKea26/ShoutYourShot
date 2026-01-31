import { Routes, Route } from 'react-router'
import { ToastProvider } from './hooks/context/useToastContext'
import ToastContainer from './components/general/Toast/Toast'
import SetupPage from './pages/SetupPage/SetupPage'
import GamePage from './pages/GamePage/GamePage'
import StatisticsPage from './pages/StatisticsPage/StatisticsPage'

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<SetupPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/stats" element={<StatisticsPage />} />
      </Routes>
      <ToastContainer />
    </ToastProvider>
  )
}

export default App

