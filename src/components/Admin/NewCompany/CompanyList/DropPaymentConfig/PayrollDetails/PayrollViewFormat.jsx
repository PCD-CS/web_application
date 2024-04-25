import React from 'react'

const PayrollFormat = ({ name, onClickEdit, itemDataValue, symbol }) => {
    return (
        <>
            <div className="flex justify-between">
                <p className="text-gray-500 font-normal text-sm plusJakartaSans mb-1">
                    {name}
                </p>
                <button
                    className="text-xs px-2 mb-1 rounded-lg font-medium plusJakartaSans shadow-md hover:bg-red-300 hover:text-white"
                    onClick={onClickEdit}
                >
                    Edit
                </button>
            </div>
            <div className="flex items-center px-4 justify-between border rounded-lg w-[20.4375rem] h-11 bg-gray-200 shadow-gray-400 shadow-md">
                <p className="text-gray-700 font-medium plusJakartaSans">
                    {itemDataValue}
                </p>
                <p className="text-gray-700 font-medium plusJakartaSans">
                    {symbol}
                </p>
            </div>
        </>
    )
}

export default PayrollFormat