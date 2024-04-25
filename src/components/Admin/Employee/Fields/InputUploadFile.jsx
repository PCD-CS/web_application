import React, { useState, useRef } from 'react';
import axios from 'axios';
import { UploadIcon } from '../../../UI/Icons';
import { BASE_URL } from '../../../../network/apiClient';

const InputUploadFile = ({ newClass, selectedAccount }) => {
    const fileInputRef = useRef(null);
    const [fileUrl, setFileUrl] = useState('')

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            await handleUploadFile(selectedFile);
        }
    };


    const handleUploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${BASE_URL}file/upload/${selectedAccount}`,
                formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setFileUrl(response.data.data)
            console.log(response.data);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const handleSelectFile = () => {
        fileInputRef.current.click();
    };

    return (
        <div className={`${newClass}`}>
            <input type="file" ref={fileInputRef} accept=".jpg,.jpeg,.png" className="hidden" name="file" id="file" onChange={handleFileChange} />
            <button
                onClick={handleSelectFile}
                className="cursor-pointer focus:outline-none"
            >
                <UploadIcon />
            </button>
        </div>
    )
}

export default InputUploadFile