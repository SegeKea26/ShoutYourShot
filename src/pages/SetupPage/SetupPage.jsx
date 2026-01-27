import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import SetupForm from '../../components/SetupForm/SetupForm'
import SetupOption from '../../components/OptionButton/SetupOption'

import { newStorage } from '../../hooks/storage/useStorageManager'
import * as GameManager from '../../hooks/game/useGameManager'

function SetupPage() {
    const [setupStep, setSetupStep] = useState(0)
    const navigate = useNavigate()
    const { startIfReady } = GameManager.initializeGame(navigate)

    useEffect(() => {
        newStorage();
    }, [])

    return (
        <>
            <Header />
            <main>
                {setupStep === 0 &&
                    <SetupForm
                        title="Starting points"
                        subtitle="Select the amount of points you want to begin with"
                        onNext={() => setSetupStep(1)}
                        prevDisabled={true}
                        onPrev={() => setSetupStep(0)}
                    >
                        <SetupOption val={501} name="startPoints" label={501} def />
                        <SetupOption val={301} name="startPoints" label={301} />
                    </SetupForm>
                }
                {setupStep === 1 &&
                    <SetupForm
                        title="Legs"
                        subtitle="Select the amount of legs you want to play"
                        onNext={() => setSetupStep(2)}
                        onPrev={() => setSetupStep(0)}
                    >
                        <SetupOption val={1} name="legs" label={'Best of 1 leg'} />
                        <SetupOption val={3} name="legs" label={'Best of 3 legs'} def />
                        <SetupOption val={5} name="legs" label={'Best of 5 legs'} />
                        <SetupOption val={7} name="legs" label={'Best of 7 legs'} />
                        <SetupOption val={'custom'} name="legs" label={'Custom'} hasTextField />
                    </SetupForm>
                }
                {setupStep === 2 &&
                    <SetupForm
                        title="Outshot"
                        subtitle="Select the outshot rule you want to use"
                        onNext={() => setSetupStep(3)}
                        onPrev={() => setSetupStep(1)}
                    >
                        <SetupOption val={'double'} name="outshot" label={'Double Out'} def />
                        <SetupOption val={'triple'} name="outshot" label={'Triple Out'} />
                        <SetupOption val={'single'} name="outshot" label={'Single Out'} />
                    </SetupForm>
                }

                {setupStep === 3 &&
                    <SetupForm
                        title="Names"
                        subtitle="Enter your player names"
                        onNext={() => startIfReady()}
                        onPrev={() => setSetupStep(2)}
                        submitLabel={'Start Game'}
                    >
                        <input type='text' name='player1' placeholder='player1' />
                        <input type='text' name='player2' placeholder='player2' />
                    </SetupForm>
                }
            </main>
            <Footer />
        </>
    )
}

export default SetupPage
