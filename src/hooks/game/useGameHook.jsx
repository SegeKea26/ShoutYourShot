import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { getRawStorage } from '../storage/useStorageManager'
import { initializeGame, switchActivePlayer, submitScore, recordMiss, undoLastThrow, startNextLeg } from './useGameManager'
import { validateGamePresence } from '../setup/useValidationManager'

export function useGame() {
  const [gameStorage, setGameStorage] = useState(() => getRawStorage()?.game || {})
  const [throwCount, setThrowCount] = useState(() => {
    // Calculate initial throw count from history
    const game = getRawStorage()?.game || {}
    const legs = game.legs || []
    const current = legs[legs.length - 1] || { history: [] }
    const history = current.history || []
    let cnt = 0
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].playerIndex === game.activePlayerIndex) cnt++
      else break
    }
    return cnt
  })
  const [winnerModalVisible, setWinnerModalVisible] = useState(false)
  const [winnerName, setWinnerName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const run = () => {
      const res = validateGamePresence(navigate)
      if (!res.ok) return
      initializeGame()
      setGameStorage(getRawStorage()?.game || {})
    }

    run()
  }, [navigate])

  function handleThrow(value, multiplier = 1) {
    const res = submitScore(value, multiplier)

    if (res && res.result === 'finished') {
      setGameStorage(getRawStorage()?.game || {})
      setThrowCount(0)

      const latestStorage = getRawStorage()?.game || {}
      const playerIndex = typeof res.index === 'number' ? res.index : latestStorage.activePlayerIndex
      const playerName = latestStorage.players && latestStorage.players[playerIndex] ? latestStorage.players[playerIndex].name : 'Player'

      setWinnerName(playerName)
      setWinnerModalVisible(true)

      const legs = latestStorage.legs || []
      const completedCount = legs.filter(l => typeof l.winnerIndex === 'number').length

      // count wins per player to determine if someone clinched majority
      const wins = {}
      for (const l of legs) {
        if (typeof l.winnerIndex === 'number') {
          wins[l.winnerIndex] = (wins[l.winnerIndex] || 0) + 1
        }
      }

      const neededToWin = Math.ceil((latestStorage.totalLegs || 1) / 2)

      setTimeout(() => {
        setWinnerModalVisible(false)

        // if any player has reached required wins, end match
        const someoneClinched = Object.values(wins).some(w => w >= neededToWin)
        if (someoneClinched || completedCount >= (latestStorage.totalLegs || 0)) {
          navigate('/stats')
        } else {
          startNextLeg()
          setGameStorage(getRawStorage()?.game || {})
        }
      }, 3000)

      return res
    }

    if (res && res.result === 'bust') {
      setGameStorage(getRawStorage()?.game || {})
      switchActivePlayer()
      setGameStorage(getRawStorage()?.game || {})
      setThrowCount(0)
      return res
    }

    const nextCount = throwCount + 1
    setGameStorage(getRawStorage()?.game || {})
    if (nextCount >= 3) {
      setThrowCount(0)
      switchActivePlayer()
      setGameStorage(getRawStorage()?.game || {})
    } else {
      setThrowCount(nextCount)
    }

    return res
  }

  function handleMiss() {
    recordMiss()
    const updated = getRawStorage()?.game || {}
    const legs = updated.legs || []
    const current = legs[legs.length - 1] || { history: [] }
    const history = current.history || []
    let consecutive = 0
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].playerIndex === updated.activePlayerIndex) consecutive++
      else break
    }
    if (consecutive >= 3) {
      switchActivePlayer()
      setGameStorage(getRawStorage()?.game || {})
      setThrowCount(0)
      return
    }
    setGameStorage(getRawStorage()?.game || {})
    setThrowCount(consecutive)
  }

  function handleUndo() {
    const res = undoLastThrow()
    setGameStorage(getRawStorage()?.game || {})
    const updated = getRawStorage()?.game || {}
    const legs = updated.legs || []
    const current = legs[legs.length - 1] || { history: [] }
    const updatedHistory = current.history || []
    let cnt = 0
    for (let i = updatedHistory.length - 1; i >= 0; i--) {
      if (updatedHistory[i].playerIndex === updated.activePlayerIndex) cnt++
      else break
    }
    setThrowCount(cnt)
    return res
  }

  return {
    gameStorage,
    throwCount,
    handleThrow,
    handleMiss,
    handleUndo,
    refreshStorage: () => setGameStorage(getRawStorage()?.game || {}),
    winnerModalVisible,
    winnerName
  }
}

export default useGame
