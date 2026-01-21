import React from 'react'

function SetupForm({ title, subtitle, children }) {

    if (!title) {
        console.error("please, enter the title for your form")
        title = "unknown";
    }

    return (
        <div className="setup-form">
            <div className="setup-form__header">
                <h2 className="setup-form__title">{title}</h2>
                {subtitle &&
                    <p className="setup-form__subtitle">{subtitle}</p>
                }
            </div>

            <div className="setup-form__body">
                {children}
            </div>
        </div>
    )
}

export default SetupForm