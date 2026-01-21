import React from 'react'

function OptionButton({ children, val }) {

    if (!children) {
        console.error("Please enter a label for your option button. ex.: <OptionButton val={value}> label goes here </OptionButton>")
        children = "unknown"
    }

    if (!children) {
        console.error("Please enter a value in your option button. ex.: <OptionButton val={value goes here}> label goes here </OptionButton>")
        val = 0;
    }

    return (
        <button className='option-button' value={val} >
            {children}
        </button>
    )
}

export default OptionButton