import React from 'react'

const SelectAccontForm = ({ selectedAccount, accountTypes, handleItemClick }) => {
    return (
        <div className='grid grid-cols-1 place-items-center'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 bg-white rounded-xl px-3 py-2 my-3 shadow-lg shadow-blue-gray-900/5">
                {accountTypes.map((item) => (
                    <div
                        key={item.name}
                        className={`rounded-lg px-7 py-2 bg-gray-100 hover:bg-gray-200 hover:shadow-md hover:font-medium cursor-pointer`}
                        onClick={() => handleItemClick(item.name)}
                    >
                        {/* <input
                            type="radio"
                            name="accountType"
                            id={`accountType-${item.name}`}
                            className="cursor-pointer"
                            checked={selectedAccount === item.name}
                            onChange={() => handleItemClick(item.name)}
                        /> */}
                        <label
                            htmlFor={`accountType-${item.name}`}
                            className="capitalize text-sm cursor-pointer"
                            onClick={() => handleItemClick(item.name)}
                        >
                            {item.name === 'Employer' ? 'Supervisor' : item.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default SelectAccontForm