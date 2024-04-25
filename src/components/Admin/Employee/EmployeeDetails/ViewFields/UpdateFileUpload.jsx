import axios from 'axios';
import React, { useRef } from 'react'
import { BASE_URL } from '../../../../../network/apiClient';
import { UploadIcon } from '../../../../UI/Icons';

const UpdateFileUpload = ({ onUpload, message, setMessage }) => {
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
                setMessage('File Uploaded Successfully!')

                setTimeout(() => {
                    setMessage('')
                }, 2000);

                console.log(response.data.message)
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
        docInputRef.current.click();
    };

    return (
        <div>
            <input
                type="file"
                ref={docInputRef}
                accept=".jpg,.jpeg,.png"
                className="hidden"
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
    )
}

export default UpdateFileUpload