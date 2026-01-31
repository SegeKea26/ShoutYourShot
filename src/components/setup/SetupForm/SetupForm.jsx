import './SetupForm.css'

import useSetupForm from '../../../hooks/setup/useSetupForm'

function SetupForm({ title, subtitle, children, onNext, prevDisabled, onPrev, className, submitLabel = 'Next' }) {
    const { handleSubmit } = useSetupForm({ onNext })

    return (
        <form className={`setup-form ${className || ''}`} onSubmit={handleSubmit}>
            <div className="setup-form__header">
                <h2 key={title} className="setup-form__title">{title}</h2>
                {subtitle && (
                    <p key={subtitle} className="setup-form__subtitle">{subtitle}</p>
                )}
            </div>

            <div className="setup-form__body">
                <div key={title} className="setup-form__content">
                    {children}
                </div>
            </div>

            <div className="setup-form__footer">
                <button className='setup-form__button' type='button' disabled={prevDisabled} onClick={onPrev}>prev</button>
                <button className='setup-form__button' type="submit">{submitLabel}</button>
            </div>
        </form>
    )
}

export default SetupForm
