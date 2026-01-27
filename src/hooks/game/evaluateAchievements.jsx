import saveRawStorage from '../storage/saveRawStorage'

const ACHIEVEMENTS = {
  double_lover: 'Double Lover',
  pressure_cooker: 'Pressure Cooker',
  the_comeback: 'The Comeback',
  clean_leg: 'Clean Leg',
  clutch_finish: 'Clutch Finish',
  triple_trouble: 'Triple Trouble',
  ton_machine: 'Ton Machine',
  shanghai: 'Shanghai',
  maximum_damage: 'Maximum Damage',
  board_what_board: 'Board? What Board?',
  hat_trick: 'Hat-Trick'
}

function addAchievement(raw, key, owner, details) {
  raw.game = raw.game || {}
  // place achievement into the latest leg's player entry
  raw.game.legs = raw.game.legs || []
  const legIndex = raw.game.legs.length - 1
  if (legIndex < 0) return false
  const leg = raw.game.legs[legIndex]
  leg.players = leg.players || []
  leg.players[owner] = leg.players[owner] || {}
  const player = leg.players[owner]
  player.achievements = player.achievements || []
  if (player.achievements.find(a => a.key === key)) return false
  const entry = { key, name: ACHIEVEMENTS[key] || key, details: details || {} }
  player.achievements.push(entry)
  saveRawStorage(raw)
  return true
}

function addGameAchievement(raw, key, details) {
  raw.game = raw.game || {}
  raw.game.achievements = raw.game.achievements || []
  if (raw.game.achievements.find(a => a.key === key)) return false
  const entry = { key, name: ACHIEVEMENTS[key] || key, details: details || {} }
  raw.game.achievements.push(entry)
  saveRawStorage(raw)
  return true
}

// helpers to group visits (turns) within a leg
function visitsFromHistory(leg) {
  const visits = []
  let current = null
  for (const e of leg.history || []) {
    if (!current || current.playerIndex !== e.playerIndex || current.entries.length >= 3) {
      current = { playerIndex: e.playerIndex, entries: [] }
      visits.push(current)
    }
    current.entries.push(e)
  }
  return visits
}

export function evaluateAchievements(raw, entry) {
  raw.game = raw.game || {}
  const game = raw.game

  // operate on the current leg
  const legs = game.legs || []
  const currentLeg = legs[legs.length - 1]
  if (!currentLeg) return

  const history = currentLeg.history || []
  const visits = visitsFromHistory(currentLeg)

  // Triple Trouble: three consecutive darts of triple 20 by same player within a visit
  for (let i = visits.length - 1; i >= 0; i--) {
    const v = visits[i]
    if (v.entries.length >= 3) {
      const lastThree = v.entries.slice(-3)
      // history stores scored points in `value` (points = base * multiplier)
      const baseOf = e => {
        const mv = Number(e.multiplier) || 1
        const pts = Number(e.value) || 0
        return mv ? pts / mv : pts
      }
      if (lastThree.every(e => Number(e.multiplier) === 3 && baseOf(e) === 20)) {
        addAchievement(raw, 'triple_trouble', v.playerIndex, {})
      }
    }
  }

  // Ton Machine / Maximum Damage / Hat-Trick / Shanghai: examine last few visits
  // Ton Machine: three consecutive turns (visits) of 100+ points by same player
  for (let i = visits.length - 3; i >= 0; i--) {
    const v1 = visits[i], v2 = visits[i+1], v3 = visits[i+2]
    if (v1 && v2 && v3 && v1.playerIndex === v2.playerIndex && v2.playerIndex === v3.playerIndex) {
      const sumPoints = arr => arr.reduce((s, e) => s + (Number(e.value) || 0), 0)
      if (sumPoints(v1.entries) >= 100 && sumPoints(v2.entries) >= 100 && sumPoints(v3.entries) >= 100) {
        addAchievement(raw, 'ton_machine', v1.playerIndex, {})
      }
    }
  }

  // Maximum Damage: any visit sum === 180
  for (let i = visits.length - 1; i >= 0; i--) {
    const s = visits[i].entries.reduce((S, e) => S + (Number(e.value) || 0), 0)
    if (s === 180) addAchievement(raw, 'maximum_damage', visits[i].playerIndex, {})
  }

  // Hat-Trick: three triples in a single visit
  for (let i = visits.length - 1; i >= 0; i--) {
    const v = visits[i]
    if (v.entries.length >= 3 && v.entries.slice(-3).every(e => Number(e.multiplier) === 3)) addAchievement(raw, 'hat_trick', v.playerIndex, {})
  }

  // Board? What Board?: miss three throws in one visit (all zeros)
  for (let i = visits.length - 1; i >= 0; i--) {
    const v = visits[i]
    if (v.entries.length >= 3 && v.entries.slice(-3).every(e => Number(e.value) === 0)) {
      addAchievement(raw, 'board_what_board', v.playerIndex, {})
    }
  }

  // Shanghai: within a visit, single,double,triple of same number
  for (let i = visits.length - 1; i >= 0; i--) {
    const v = visits[i]
    const map = {}
    for (const e of v.entries) {
      const base = Number(e.multiplier) ? (Number(e.value) / Number(e.multiplier)) : Number(e.value)
      const val = String(base)
      map[val] = map[val] || new Set()
      map[val].add(Number(e.multiplier) || 1)
      if (map[val].has(1) && map[val].has(2) && map[val].has(3)) addAchievement(raw, 'shanghai', v.playerIndex, { number: val })
    }
  }

  // Pressure Cooker: hit a double after three missed doubles in same leg
  // missed doubles interpreted as bust entries with multiplier === 2
  for (let p = 0; p < (game.players||[]).length; p++) {
    const playerEntries = history.filter(e => e.playerIndex === p)
    // check for three busts with multiplier 2 somewhere, then later a double hit (multiplier 2 and not bust)
    const threeMissIndex = playerEntries.findIndex((e, idx) => {
      return e.result === 'bust' && e.multiplier === 2 && playerEntries[idx+1] && playerEntries[idx+1].result === 'bust' && playerEntries[idx+1].multiplier === 2 && playerEntries[idx+2] && playerEntries[idx+2].result === 'bust' && playerEntries[idx+2].multiplier === 2
    })
    if (threeMissIndex !== -1) {
      // find any later successful double
      const later = playerEntries.slice(threeMissIndex+3).find(e => e.multiplier === 2 && e.result !== 'bust')
      if (later) addAchievement(raw, 'pressure_cooker', p, {})
    }
  }

  // Other achievements relate to leg finish — handle when leg has winner
  if (typeof currentLeg.winnerIndex === 'number') {
    const winner = currentLeg.winnerIndex

    // Clean Leg: win a leg without busting once
    const busted = (currentLeg.history || []).some(e => e.playerIndex === winner && e.result === 'bust')
    if (!busted) addAchievement(raw, 'clean_leg', winner, {})

    // The Comeback: Win a leg after trailing by 100+ points. We'll approximate by comparing opponent points just before final throw
    const lastEntry = (currentLeg.history || []).slice(-1)[0]
    if (lastEntry && lastEntry.playerIndex === winner) {
      const scored = Number(lastEntry.value || 0) * (Number(lastEntry.multiplier)||1)
      const prevPoints = (Number(lastEntry.remaining) || 0) + scored
      const oppIdx = (winner === 0 ? 1 : 0)
      // find opponent's most recent remaining before the final throw
      const oppPrior = (currentLeg.history || []).slice(0, -1).reverse().find(e => e.playerIndex === oppIdx && typeof e.remaining === 'number')
      const oppPoints = oppPrior ? Number(oppPrior.remaining) : (currentLeg.players && currentLeg.players[oppIdx] && typeof currentLeg.players[oppIdx].points === 'number' ? Number(currentLeg.players[oppIdx].points) : null)
      if (oppPoints !== null && (oppPoints - prevPoints) >= 100) addAchievement(raw, 'the_comeback', winner, {})
    }

    // Clutch Finish: Checkout a leg while your opponent is also on a finish (we'll say opponent <= 60 before finish)
    if (lastEntry && lastEntry.playerIndex === winner) {
      const scored = Number(lastEntry.value || 0) * (Number(lastEntry.multiplier)||1)
      const prevPoints = (Number(lastEntry.remaining) || 0) + scored
      const oppIdx = (winner === 0 ? 1 : 0)
      const oppPrior = (currentLeg.history || []).slice(0, -1).reverse().find(e => e.playerIndex === oppIdx && typeof e.remaining === 'number')
      const oppPoints = oppPrior ? Number(oppPrior.remaining) : (currentLeg.players && currentLeg.players[oppIdx] && typeof currentLeg.players[oppIdx].points === 'number' ? Number(currentLeg.players[oppIdx].points) : null)
      if (oppPoints !== null && oppPoints <= 60) addAchievement(raw, 'clutch_finish', winner, {})
    }

    // Double Lover: finish three legs on the same double
    if (currentLeg.finish && Number(currentLeg.finish.multiplier) === 2) {
      const playerLegs = (game.legs || []).filter(l => l.winnerIndex === currentLeg.winnerIndex && l.finish && Number(l.finish.multiplier) === 2 && Number(l.finish.value) === Number(currentLeg.finish.value))
      if (playerLegs.length >= 3) addAchievement(raw, 'double_lover', currentLeg.winnerIndex, { value: Number(currentLeg.finish.value) })
    }

    // Game-level achievements (persist across legs)
    // Marathon: a single leg lasts 30+ darts per player (each player has >=30 darts)
    const playersCount = (currentLeg.players || []).length || (game.players || []).length
    const dartsPerPlayer = (pIndex) => (currentLeg.history || []).filter(e => e.playerIndex === pIndex).length
    const allHave30 = Array.from({ length: playersCount }).every((_, i) => dartsPerPlayer(i) >= 30)
    if (allHave30) addGameAchievement(raw, 'marathon', { leg: legs.length })

    // Blink and You Missed It: winner finished in under 15 darts (winner's darts < 15)
    if (typeof currentLeg.winnerIndex === 'number') {
      const winner = currentLeg.winnerIndex
      const winnerDarts = dartsPerPlayer(winner)
      if (winnerDarts < 15) addGameAchievement(raw, 'blink_and_you_missed_it', { leg: legs.length, darts: winnerDarts })
    }

    // Deadlock: both players reach a checkout in the same turn for three consecutive turns
    // Build rounds from visits: pair consecutive visits into rounds
    const rounds = []
    for (let i = 0; i < visits.length; i += 2) {
      const a = visits[i]
      const b = visits[i+1]
      if (!a || !b) break
      rounds.push([a, b])
    }
    let deadlockCount = 0
    for (let r = Math.max(0, rounds.length - 3); r < rounds.length; r++) {
      const [a,b] = rounds[r]
      const aCheckout = (a.entries || []).some(e => typeof e.remaining === 'number' && e.remaining <= 60)
      const bCheckout = (b && b.entries || []).some(e => typeof e.remaining === 'number' && e.remaining <= 60)
      if (aCheckout && bCheckout) deadlockCount++
    }
    if (deadlockCount >= 3) addGameAchievement(raw, 'deadlock', { legs: legs.length })

    // Double Hell: a leg with 10+ missed combined (misses or zero-value throws)
    const missedCount = (currentLeg.history || []).filter(e => Number(e.value) === 0 || e.result === 'bust').length
    if (missedCount >= 10) addGameAchievement(raw, 'double_hell', { leg: legs.length, misses: missedCount })

    // Chaos Mode: three or more busts by each player in one leg
    const bustsPerPlayer = Array.from({ length: playersCount }).map((_, i) => (currentLeg.history || []).filter(e => e.playerIndex === i && e.result === 'bust').length)
    const everyoneHas3Busts = bustsPerPlayer.every(c => c >= 3)
    if (everyoneHas3Busts) addGameAchievement(raw, 'chaos_mode', { leg: legs.length, busts: bustsPerPlayer })
  }
}

export default evaluateAchievements
