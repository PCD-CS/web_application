import React, { useRef, useState } from 'react';
import OtherDocUpload from './ViewFields/OtherDocUpload';
import { UploadIcon } from '../../../UI/Icons';
import axios from 'axios';
import { BASE_URL } from '../../../../network/apiClient';

const InputForm = ({ label, type, value, onChange, handleUpload, onUpload }) => {

    const [selectedFile, setSelectedFile] = useState(null);

    const docInputRef = useRef(null);

    const handleFileChange = async (e) => {
        const { files } = e.target || {};

        if (files && files.length > 0) {
            const uploadedFile = files[0];
            const fileData = new FormData();
            fileData.append('file', uploadedFile);

            try {
                const response = await axios.post(
                    `${BASE_URL}file/upload/Employee`,
                    fileData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                console.log(response.data)
                const uploadedUrl = response.data.data;
                onUpload(uploadedUrl);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            console.log('Please select a file!');
        }
    };

    const handleSelectFile = () => {
        console.log("Upload Icon clicked")
        docInputRef.current.click();
    };

    return (
        <div className="relative flex flex-col-reverse w-full mb-4">
            <div className="relative">
                {
                    type === 'file' && label === 'Path' ? (
                        <div>
                            <input
                                type="file"
                                ref={docInputRef}
                                accept=".jpg,.jpeg,.png"
                                // className="hidden"
                                onChange={handleFileChange}
                            />
                            <button
                                type="button"
                                onClick={handleSelectFile}
                                className="cursor-pointer focus:outline-none"
                            >
                                <UploadIcon />
                            </button>
                        </div>
                    ) : (
                        <input
                            required
                            type={type}
                            value={value}
                            onChange={onChange}
                            // placeholder={`Enter ${label}`}
                            aria-label={label}
                            className="peer w-full pb-1 pt-6 px-4 text-base rounded-lg border bg-white border-gray-500 focus:border-blue-400 bg-transparent focus:outline-none focus:ring-0 appearance-none transition-colors duration-300 placeholder:text-sm placeholder:font-light"
                        />
                    )
                }

            </div>
            <label
                className="absolute top-0 items-center px-4 pt-2 text-xs peer-focus:font-semibold capitalize peer-focus:text-blue-400 text-gray-600 bg-transparent transition-colors duration-300"
            >
                {label}
            </label>
        </div>
    );
};

export default InputForm;
