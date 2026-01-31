import './SetupOption.css'

import { useState, useRef, useEffect } from 'react'
import { useGame } from '../../../hooks/context/useGameContext'
import DartAnimator from '../DartAnimator/DartAnimator'


function useOptionSelection(radioRef) {
    const [isSelected, setIsSelected] = useState(false)

    useEffect(() => {
        const updateSelection = () => {
            if (radioRef.current) {
                setIsSelected(radioRef.current.checked)
            }
        }

        updateSelection()
        document.addEventListener('change', updateSelection)
        return () => document.removeEventListener('change', updateSelection)
    }, [radioRef])

    return isSelected
}

function usePreviousValue(name, defaultValue) {
    const { getSetupFromStorage } = useGame()
    const setup = getSetupFromStorage()

    if (!setup || !(name in setup)) {
        return defaultValue
    }

    return String(setup[name])
}

function isCheckedByDefault(name, value, isDefault, getSetup) {
    const setup = getSetup()

    if (!setup || !(name in setup)) {
        return isDefault
    }

    return String(setup[name]) === String(value)
}


function OptionLabel({ sublabel, label }) {
    return (
        <>
            {sublabel && <span className="setup-option__sublabel">{sublabel}</span>}
            <p className="setup-option__text">{label}</p>
        </>
    )
}

function OptionRadio({ radioRef, name, value, isDefault, getSetup }) {
    return (
        <input
            ref={radioRef}
            className="setup-option__radio"
            type="radio"
            name={name}
            value={value}
            defaultChecked={isCheckedByDefault(name, value, isDefault, getSetup)}
        />
    )
}

function CustomNumberInput({ defaultValue, onChange }) {
    return (
        <div className="setup-option__number-wrapper">
            <input
                className="setup-option__number"
                type="number"
                defaultValue={defaultValue}
                min="1"
                step="2"
                max={99}
                onChange={onChange}
            />
            <span className="setup-option__number-label">leg(s)</span>
        </div>
    )
}


function SetupOption({ sublabel, label, name, val, def = false, hasTextField = false }) {
    const { getSetupFromStorage } = useGame()
    const radioRef = useRef(null)

    const isSelected = useOptionSelection(radioRef)
    const previousValue = usePreviousValue(name, '1')
    const [customValue, setCustomValue] = useState(previousValue)

    const handleCustomValueChange = (e) => {
        setCustomValue(String(e.target.value))
    }

    const optionValue = hasTextField ? customValue : val

    return (
        <label className={`setup-option ${hasTextField ? 'setup-option--has-number' : ''}`}>
            <OptionLabel sublabel={sublabel} label={label} />

            <OptionRadio
                radioRef={radioRef}
                name={name}
                value={optionValue}
                isDefault={def}
                getSetup={getSetupFromStorage}
            />

            {hasTextField && (
                <CustomNumberInput
                    defaultValue={previousValue}
                    onChange={handleCustomValueChange}
                />
            )}

            <DartAnimator show={isSelected} />
        </label>
    )
}

export default SetupOption
