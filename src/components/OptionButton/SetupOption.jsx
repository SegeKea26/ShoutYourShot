import React from 'react'

function SetupOption({ label, name, val }) {

    return (
        <label className='setup-option'>
            <span className='setup-option__text'>{label}</span>
            <input className='setup-option__input' type='radio' name={name} value={val} />
        </label>
    )
}

export default SetupOption