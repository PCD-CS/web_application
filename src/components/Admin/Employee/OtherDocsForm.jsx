import React, { useRef, useState } from 'react'
import MultipleDetailsForm from './Fields/MultipleDetailsForm';
import axios from 'axios';
import { BASE_URL } from '../../../network/apiClient';

const OtherDocsForm = ({ selectedAccount, otherDocumentsDetails, setOtherDocumentsDetails }) => {

    const otherDocumentsFields = [
        { label: 'Filename', name: 'filename', type: 'text' },
        { label: 'Filepath', name: 'path', type: 'file' },
    ];

    const otherInputRef = useRef(null);

    const [fileUploaded, setFileUploaded] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [fileName, setFileName] = useState('')

    // Function to add a new otherDocuments detail
    const handleAddOtherDocuments = () => {
        setOtherDocumentsDetails([...otherDocumentsDetails, {}]);
    };

    const handleOtherFileUpload = async (file, index) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${BASE_URL}file/upload/${selectedAccount}`,
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data.message)

            setFileUploaded(true)

            const url = response.data.data;

            // Update the selected other document with the filename and file URL
            const updatedDetails = [...otherDocumentsDetails];
            if (typeof updatedDetails[index] !== 'object') {
                updatedDetails[index] = {};
            }
            updatedDetails[index] = {
                ...updatedDetails[index], // Preserve existing details
                filename: fileName, // Use the input filename
                path: url, // Use the file URL from the response
            };
            setOtherDocumentsDetails(updatedDetails);

            setTimeout(() => {
                setFileUploaded(false);
            }, [2000])

        } catch (error) {
            console.error('Error uploading bank proof file:', error);
        }

    };

    const handleSelectFileOther = () => {
        otherInputRef.current.click();
    };

    const handleOtherInputChange = async (e, index) => {
        const { name, value, files } = e.target || {};
        if (name === 'other_documents') {
            if (files && files.length > 0) {
                setSelectedFile(files[0]);
                setFileName(value)
                await handleOtherFileUpload(files[0], index)
            }
        }
        else {
            const updatedDetails = [...otherDocumentsDetails];
            updatedDetails[index] = {
                ...updatedDetails[index], // Preserve existing details
                [name]: value,
            };
            setOtherDocumentsDetails(updatedDetails);
        }
    };

    return (
        <div>
            <MultipleDetailsForm
                title='Other Documents'
                fieldKey="other_documents"
                fields={otherDocumentsFields}
                details={otherDocumentsDetails}
                setDetails={setOtherDocumentsDetails}
                onAddField={handleAddOtherDocuments}
                handleOtherInputChange={handleOtherInputChange}
                handleSelectFileOther={handleSelectFileOther}
                otherInputRef={otherInputRef}
                fileUploaded={fileUploaded}
            />

        </div>
    )
}

export default OtherDocsForm