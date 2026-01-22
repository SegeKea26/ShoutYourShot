import React, { useState, useRef } from 'react'

import { addSetupToStorage } from '../../managers/useStorageManager'
import { validateName } from '../../managers/useValidationManager'

function SetupForm({ title, subtitle, children, onNext, prevDisabled, onPrev, submitLabel = 'Next' }) {

    const [errors, setErrors] = useState({});
    const firstErrorRef = useRef(null);

    if (!title) {
        console.error("please, enter the title for your form")
        title = "unknown";
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const entries = Array.from(formData.entries());
        const newErrors = {};

        for (const [name, value] of entries) {
            if (/^player/i.test(name)) {
                const err = validateName(value);
                if (err) newErrors[name] = err;
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            firstErrorRef.current = Object.keys(newErrors)[0];
            return;
        }

        setErrors({});

        for (const [name, value] of entries) {
            addSetupToStorage(name, value);
        }

        if (onNext) {
            onNext();
        }
    }

    return (
        <form className="setup-form" onSubmit={handleSubmit}>
            <div className="setup-form__header">
                <h2 className="setup-form__title">{title}</h2>
                {subtitle &&
                    <p className="setup-form__subtitle">{subtitle}</p>
                }
            </div>

            <div className="setup-form__body">
                {Object.keys(errors).length > 0 && (
                    <div className="setup-form__errors">
                        {Object.entries(errors).map(([k, msg]) => (
                            <div key={k} className="setup-form__error">{msg}</div>
                        ))}
                    </div>
                )}

                {children}
            </div>

            <div>
                <button type='button' disabled={prevDisabled} onClick={onPrev}>prev</button>
                <button type="submit">{submitLabel}</button>
            </div>
        </form>
    )
}

export default SetupForm
