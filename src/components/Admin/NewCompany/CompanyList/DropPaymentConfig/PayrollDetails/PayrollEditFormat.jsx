import React from 'react'

const PayrollEditFormat = ({ name, onClickSave, itemDataValue, onChangeValue, itemDataOperation, onChangeOperation }) => {

    const operationOptions = [
        { value: 0, label: "+" },
        { value: -1, label: "-" },
        { value: 1, label: "x" },
        { value: 2, label: "/" },
        { value: 3, label: "%" },
    ];

    return (
        <>
            <div className="flex justify-between">
                <p className="text-gray-500 font-normal text-sm  plusJakartaSans mb-1">
                    {name}
                </p>
                <button
                    className="text-xs px-2 mb-1 rounded-lg font-medium plusJakartaSans shadow-md bg-green-500 hover:bg-green-700 text-white"
                    onClick={onClickSave}
                >
                    Save
                </button>
            </div>
            <div className="flex items-center px-4 justify-between border rounded-lg w-[20.4375rem] h-11 bg-gray-200 shadow-gray-400 shadow-md">
                <input
                    type="number"
                    className="text-gray-700 font-medium plusJakartaSans w-24 outline-none border-b border-black bg-gray-200"
                    value={itemDataValue}
                    onChange={onChangeValue}
                />

                <select
                    value={itemDataOperation}
                    onChange={onChangeOperation}
                    className="text-gray-700 text-center font-medium plusJakartaSans w-10 outline-none border-b border-black bg-gray-200"
                >
                    {operationOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default PayrollEditFormat