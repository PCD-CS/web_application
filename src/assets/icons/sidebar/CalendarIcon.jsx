import React from 'react'

const CalendarIcon = ({ selected }) => {
    return (
        <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="_ionicons_svg_md-calendar">
                    <path id="Vector"
                        d="M17.2502 12.75H12.7502V17.25H17.2502V12.75ZM15.7502 3V4.5H8.25023V3H6.00023V4.5H4.87476C3.84341 4.5 2.99976 5.34366 2.99976 6.375V19.125C2.99976 20.1563 3.84341 21 4.87476 21H19.1252C20.1566 21 21.0002 20.1563 21.0002 19.125V6.375C21.0002 5.34366 20.1566 4.5 19.1252 4.5H18.0002V3H15.7502ZM19.1252 19.125H4.87476V9.1875H19.1252V19.125Z"
                        fill={`${selected ? '#2F80ED' : '#8E8E93'}`} />
                </g>
            </svg>
        </>
    )
}

export default CalendarIcon