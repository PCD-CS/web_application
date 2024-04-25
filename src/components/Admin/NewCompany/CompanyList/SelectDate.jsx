import React from 'react'

const SelectDate = ({ valueInput, onChangeInput, onclickCancel, onclickDownload, isDownloading }) => {
    return (
        <div className='p-4 border bg-white shadow-lg rounded-xl space-y-3'>
            <div>
                <p className='font-semibold text-center mb-1'>Select a Month and Year</p>
                <div className='text-center'>
                    <input
                        type="month"
                        value={valueInput}
                        onChange={onChangeInput}
                        className='text-center border rounded-lg px-3'
                    />
                </div>
            </div>
            <div className='flex justify-around'>
                <button
                    className='bg-red-400 px-2 text-sm rounded-lg text-white shadow-md focus:shadow-none'
                    onClick={onclickCancel}
                >
                    Cancel
                </button>
                <button
                    onClick={onclickDownload}
                    className='bg-green-400 px-2 text-sm rounded-lg text-white shadow-md focus:shadow-none'
                >
                    {isDownloading ? 'Downloading...' : 'Download'}
                </button>
            </div>
        </div>
    )
}

export default SelectDate