import React, { useState } from 'react'
import { getSetupFromStorage } from '../../managers/useStorageManager';

function previouslyChecked(name, val, def = false) {
    const setup = getSetupFromStorage();

    if (!setup || !(name in setup)) return def;

    return String(setup[name]) === String(val);
}

function SetupOption({ label, name, val, def = false, hasTextField = false }) {
    const setup = getSetupFromStorage();

    const initialVal = setup && (name in setup) ? String(setup[name]) : '1';
    
    const [currentVal, setCurrentVal] = useState(initialVal);

    if (hasTextField) {
        return (
            <label className="setup-option">
                <span className="setup-option__text">{label}</span>
                <input
                    className="setup-option__input"
                    type="radio"
                    name={name}
                    value={currentVal}
                    defaultChecked={previouslyChecked(name, currentVal, def)}
                />
                <input
                    type="number"
                    defaultValue={initialVal}
                    min="1"
                    step="2"
                    onChange={(e) => setCurrentVal(String(e.target.value))}
                />
            </label>
        );
    }

    return (
        <label className="setup-option">
            <span className="setup-option__text">{label}</span>
            <input
                className="setup-option__input"
                type="radio"
                name={name}
                value={val}
                defaultChecked={previouslyChecked(name, val, def)}
            />
        </label>
    );
}

export default SetupOption;
