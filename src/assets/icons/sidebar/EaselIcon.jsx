import React from 'react'

const EaselIcon = ({ selected }) => {
    return (
        <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="_ionicons_svg_md-easel">
                    <path id="Vector" d="M6 8.25H18V14.25H6V8.25Z" fill={`${selected ? '#2F80ED' : '#8E8E93'}`} />
                    <path id="Vector_2"
                        d="M21 4.5H3C2.5875 4.5 2.25 4.8375 2.25 5.25V17.25C2.25 17.6625 2.57344 18 2.99062 18H21C21.4125 18 21.75 17.6625 21.75 17.25V5.25C21.75 4.8375 21.4125 4.5 21 4.5ZM19.5 15.75H4.5V6.75H19.5V15.75ZM3.75 21.75H6.42188L7.47656 18.75H4.83281L3.75 21.75ZM13.0969 2.25H10.9031L10.3641 3.75H13.6359L13.0969 2.25ZM17.5781 21.75H20.25L19.1719 18.75H16.5234L17.5781 21.75ZM10.875 18.75H13.125V20.25H10.875V18.75Z"
                        fill={`${selected ? '#2F80ED' : '#8E8E93'}`} />
                </g>
            </svg>
        </>
    )
}

export default EaselIcon