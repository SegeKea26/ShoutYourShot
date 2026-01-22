import { validateSetup } from './useValidationManager'

export function initializeGame(navigate) {
  function startIfReady() {
    const res = validateSetup()
    if (res.ok && navigate) navigate('/game')
    return res
  }

  return { validateSetup, startIfReady }
}

