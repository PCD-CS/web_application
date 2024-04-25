import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Camera, UploadIcon } from '../../../UI/Icons';
import { BASE_URL } from '../../../../network/apiClient';

const UploadProfile = ({ imageUrl, name, setFileUrl }) => {
    const fileInputRef = useRef(null);

    // function to handle select file and upload file
    const handleFileChange = async (e) => {

        const { name } = e.target || {};

        const selectedFile = e.target.files[0];

        if (selectedFile) {
            await handleUploadFile(selectedFile, name);
        }
    };

    // function to upload files
    const handleUploadFile = async (file, name) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${BASE_URL}file/upload/Company`,
                formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setFileUrl(response.data.data)
            // console.log(response.data);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const handleSelectFile = () => {
        fileInputRef.current.click();
    };

    return (
        <div className='flex flex-col items-center mb-4'>
            {/* ViewProfilePic */}
            <div>
                <img
                    src={imageUrl}
                    alt='profile'
                    name='profilePhoto'
                    className='w-28 h-28 object-cover rounded-full shadow-gray-400 shadow-md'
                />
            </div>

            {/* UpdateProfilePic */}
            <input type='file' ref={fileInputRef} accept='.jpg,.jpeg,.png' className='hidden' name={name} onChange={handleFileChange} />
            <button
                type='button'
                onClick={handleSelectFile}
                className='mt-2 w-20 cursor-pointer focus:outline-none flex items-center justify-center space-x-1 bg-gray-300 px-2 py-1 rounded-xl'
            >
                <div className='w-4 h-4 opacity-70'>
                    <Camera />
                </div>
                <p className='ptSans text-xs'>Update</p>
            </button>
        </div>
    )
}

export default UploadProfile