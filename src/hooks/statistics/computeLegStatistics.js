export function computeLegStatistics(leg, game) {
  const history = (leg && leg.history) || []
  const players = (leg && leg.players) || (game && game.players) || []

  const busts = history.filter(e => e.result === 'bust').length

  const visits = groupVisits(history)
  const leg180s = visits.filter(v => v.entries.reduce((S,e)=>S+(Number(e.value)||0),0) === 180).length

  const playerStatistics = (players || []).map((p, idx) => {
    const entries = history.filter(e => e.playerIndex === idx)
    const pBusts = entries.filter(e => e.result === 'bust').length
    const darts = entries.length
    const scoreTotal = entries.reduce((s,e)=>s + (Number(e.value)||0), 0)
    const pVisits = groupVisits(history).filter(v => v.playerIndex === idx)
    const visit180s = pVisits.filter(v => v.entries.reduce((S,e)=>S+(Number(e.value)||0),0) === 180).length
    return { index: idx, name: p.name, busts: pBusts, darts, scoreTotal, visit180s }
  })

  return {
    legId: leg && leg.legId,
    winnerIndex: typeof leg.winnerIndex === 'number' ? leg.winnerIndex : null,
    busts,
    leg180s,
    playerStatistics
  }
}

function groupVisits(history) {
  const visits = []
  let current = null
  for (const e of history || []) {
    if (!current || current.playerIndex !== e.playerIndex || current.entries.length >= 3) {
      current = { playerIndex: e.playerIndex, entries: [] }
      visits.push(current)
    }
    current.entries.push(e)
  }
  return visits
}

export default computeLegStatistics
