import { useContext } from 'react'
import { GameContext } from '../../contexts/GameContext'

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within a GameProvider')
  return ctx
}

export default useGame
