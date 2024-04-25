import React, { useEffect, useState } from 'react'
import { DownloadIcon } from '../../../UI/Icons'

const ProfileForm = ({ label, fieldName, newClass, downloadPath, isEditMode, handleFieldChange }) => {

    const isEditable = isEditMode && (fieldName !== undefined);
    const isDownloadable = fieldName && downloadPath;

    // const handleDownload = () => {
    //     if (isDownloadable) {
    //         window.open(downloadPath);
    //     }
    // };

    const handleDownload = () => {
        if (isDownloadable) {
            const downloadLink = document.createElement('a');
            downloadLink.href = downloadPath;
            downloadLink.download;
            downloadLink.click();
        }
    }

    return (
        <div className={`relative border border-gray-500 bg-white rounded-lg px-4 pb-1 mb-4 ${newClass}`}>
            <label className='text-xs text-gray-600'>{label}</label>

            {
                isEditable ? (
                    <input
                        type='text'
                        className={`w-full border-b border-gray-400 bg-transparent outline-none ${newClass}`}
                        value={fieldName}
                        onChange={handleFieldChange}
                    />
                ) : (
                    <div className={`${newClass}`}>{fieldName}</div>
                )
            }

            {
                isDownloadable && (
                    <div className='absolute right-3 top-[1.20rem] cursor-pointer'>
                        <div className='relative group' onClick={handleDownload}>
                            <DownloadIcon className='hover:cursor-pointer' />
                            <div className='opacity-0 group-hover:opacity-100 absolute bg-gray-500 text-center text-white text-[0.6rem] rounded-md py-1 px-2 -top-6 left-3 transform -translate-x-1/2 transition duration-300 ease-in-out'>
                                Download
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ProfileForm