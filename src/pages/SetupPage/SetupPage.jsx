import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import Header from '../../components/general/Header/Header'
import Footer from '../../components/general/Footer/Footer'
import SetupForm from '../../components/setup/SetupForm/SetupForm'
import SetupOption from '../../components/setup/SetupOption/SetupOption'

import { newStorage } from '../../hooks/storage/useStorageManager'
import * as GameManager from '../../hooks/game/useGameManager'


function StartingPointsStep() {
    return (
        <>
            <SetupOption val={501} name="startPoints" label={501} def />
            <SetupOption val={301} name="startPoints" label={301} />
        </>
    )
}

function LegsStep() {
    return (
        <>
            <div className="setup-form__group">
                <SetupOption val={1} name="legs" sublabel="Best of" label="1 leg" />
                <SetupOption val={3} name="legs" sublabel="Best of" label="3 legs" def />
            </div>
            <div className="setup-form__group">
                <SetupOption val={5} name="legs" sublabel="Best of" label="5 legs" />
                <SetupOption val={7} name="legs" sublabel="Best of" label="7 legs" />
            </div>
            <SetupOption val="custom" name="legs" label="Custom" hasTextField />
        </>
    )
}

function OutshotStep() {
    return (
        <>
            <SetupOption val="double" name="outshot" label="Double Out" def />
            <SetupOption val="triple" name="outshot" label="Triple Out" />
            <SetupOption val="single" name="outshot" label="Single Out" />
        </>
    )
}

function NamesStep() {
    return (
        <div className='setup-form__input-container'>
            <input className='setup-form__input' type="text" name="player1" placeholder="Player 1 Name" />
            <p className='setup-form__text'>VS</p>
            <input className='setup-form__input' type="text" name="player2" placeholder="Player 2 Name" />
        </div>
    )
}


function useSetupSteps(onStartGame) {
    const [currentStep, setCurrentStep] = useState(0)

    const goTo = (step) => setCurrentStep(step)
    const goNext = () => setCurrentStep(prev => prev + 1)
    const goPrev = () => setCurrentStep(prev => prev - 1)

    const steps = [
        {
            title: "Starting points",
            subtitle: "Select the points you want to start with.",
            onNext: goNext,
            onPrev: () => { },
            prevDisabled: true,
            Component: StartingPointsStep
        },
        {
            title: "Legs",
            subtitle: "Select the best of legs you want to play.",
            className: "setup-form--grouped",
            onNext: goNext,
            onPrev: goPrev,
            Component: LegsStep
        },
        {
            title: "Outshot",
            subtitle: "Select the outshot rule you want to use.",
            onNext: goNext,
            onPrev: goPrev,
            Component: OutshotStep
        },
        {
            title: "Names",
            subtitle: "Enter your player names",
            onNext: onStartGame,
            onPrev: goPrev,
            submitLabel: "Start Game",
            Component: NamesStep
        }
    ]

    return { currentStep, steps }
}


function SetupPage() {
    const navigate = useNavigate()
    const { startIfReady } = GameManager.initializeGame(navigate)
    const { currentStep, steps } = useSetupSteps(startIfReady)

    useEffect(() => {
        newStorage()
    }, [])

    const step = steps[currentStep]
    if (!step) return null

    const { Component, ...formProps } = step

    return (
        <>
            <Header />
            <main className="main">
                <SetupForm {...formProps}>
                    <Component />
                </SetupForm>
            </main>
            <Footer />
        </>
    )
}

export default SetupPage
