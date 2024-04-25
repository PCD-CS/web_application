import React from 'react'

const DashboardIcon = ({ selected }) => {
    // #2F80ED
    return (
        <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="icon/action/dashboard">
                    <path id="Vector" d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" fill={`${selected ? '#2F80ED' : '#8E8E93'}`} />
                </g>
            </svg>
        </>
    )
}

export default DashboardIcon