import React from 'react'
import useSetupForm from '../../hooks/useSetupForm'

function SetupForm({ title, subtitle, children, onNext, prevDisabled, onPrev, submitLabel = 'Next' }) {
    const { errors, handleSubmit } = useSetupForm({ onNext })

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
