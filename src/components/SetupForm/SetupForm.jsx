import React from 'react'
import { addSetupToStorage } from '../../hooks/useStorageManager'

function SetupForm({ title, subtitle, children, onNext, prevDisabled, onPrev }) {

    if (!title) {
        console.error("please, enter the title for your form")
        title = "unknown";
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        for (const [name, value] of formData.entries()) {
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
                {children}
            </div>

            <div>
                <button type='button' disabled={prevDisabled} onClick={onPrev}>prev</button>
                <button type="submit">Next</button>
            </div>
        </form>
    )
}

export default SetupForm
