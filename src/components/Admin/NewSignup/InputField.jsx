import React from 'react'

const InputField = ({ label, value }) => {
    return (
        <>
            <div className="md:flex md:items-center md:justify-between md:space-x-4 lg:flex lg:items-center lg:justify-between lg:space-x-4 my-2">
                <p className="capitalize plusJakartaSans font-semibold text-black opacity-60 text-sm sm:text-base md:text-md lg:text-md">{label}</p>
                <div className="border border-gray-500 rounded-lg px-2 lg:px-4 py-1 lg:py-2 w-auto md:w-52 lg:w-80">
                    <p className="plusJakartaSans text-black text-sm sm:text-base md:text-md lg:text-md">{value}</p>
                </div>
            </div>
        </>
    )
}

export default InputField