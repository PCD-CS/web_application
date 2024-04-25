import React from 'react'

const AccordionArrow = ({ isOpen, index }) => {
    return (
        <span className={`w-5 transform ${isOpen[index] ? 'rotate-180' : 'rotate-0'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </span>
    )
}

export default AccordionArrow