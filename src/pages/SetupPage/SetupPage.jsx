import { useState, useEffect } from 'react'

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import SetupForm from '../../components/SetupForm/SetupForm'
import SetupOption from '../../components/OptionButton/SetupOption'

import { newStorage } from '../../hooks/useStorageManager'

function SetupPage() {
    const [setupStep, setSetupStep] = useState(0)

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
                        <SetupOption val={501} name="startPoints" label={501} />
                        <SetupOption val={301} name="startPoints" label={301} />
                    </SetupForm>
                }
                {setupStep === 1 &&
                    <SetupForm
                        title="Frames"
                        subtitle="Select the amount of frames you want to play"
                        onNext={() => setSetupStep(2)}
                        onPrev={() => setSetupStep(0)}
                    >
                        <SetupOption val={1} name="frames" label={1} />
                        <SetupOption val={3} name="frames" label={3} />
                        <SetupOption val={5} name="frames" label={5} />
                        <SetupOption val={7} name="frames" label={7} />
                    </SetupForm>
                }
                {setupStep === 2 &&
                    <SetupForm
                        title="Names"
                        subtitle="Enter your player names"
                        onNext={() => console.log('time to start')}
                        onPrev={() => setSetupStep(1)}
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
