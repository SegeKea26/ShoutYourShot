import { createContext } from 'react'
import useGameHook from '../hooks/game/useGameHook'
import { addSetupToStorage, getSetupFromStorage } from '../hooks/storage/useStorageManager'

export const GameContext = createContext(null)

export default function GameProvider({ children }) {
  const game = useGameHook()
  const value = {
    ...game,
    addSetupToStorage,
    getSetupFromStorage,
  }
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}
