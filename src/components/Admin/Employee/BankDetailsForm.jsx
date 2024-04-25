import axios from 'axios';
import React, { useRef, useState } from 'react'
import { SingleArrowDown, SingleArrowUp, UploadIcon } from '../../UI/Icons';
import FloatingInput from './Fields/FloatingInput';
import { BASE_URL } from '../../../network/apiClient';

const BankDetailsForm = ({ selectedAccount, details, setDetails }) => {

    const bankFields = [
        { label: 'Account Holder Name', name: 'accountHolderName', type: 'text' },
        { label: 'Account Number', name: 'accountNumber', type: 'number' },
        { label: 'Bank Name', name: 'bankName', type: 'text' },
        { label: 'Branch Name', name: 'branchName', type: 'text' },
        { label: 'IFSC Code', name: 'ifscCode', type: 'text' },
        { label: 'Bank Proof File', name: 'bank_proof', type: 'file' },
    ];

    const bankInputRef = useRef(null);

    const [fileUploaded, setFileUploaded] = useState(false)
    const [isBankDetailsOpen, setBankDetailsOpen] = useState(false);
    const [bankProofFileUrl, setBankProofFileUrl] = useState('')

    const [selectedBankFile, setSelectedBankFile] = useState('')

    const handleBankProofFileUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${BASE_URL}file/upload/${selectedAccount}`,
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // if (response.data.error === false) {
            console.log(response.data.message)

            setFileUploaded(true)
            const url = response.data.data;

            setDetails({
                ...details,
                bank_proof: url, // Set the URL in the details object
            });
            // }

        } catch (error) {
            console.error('Error uploading bank proof file:', error);
        }

    };

    const handleSelectFileBank = () => {
        bankInputRef.current.click();
    };

    const handleBankInputChange = async (e) => {
        const { name, value, files } = e.target || {};
        if (name === 'bank_proof') {
            if (files && files.length > 0) {
                setSelectedBankFile(files[0].name)
                await handleBankProofFileUpload(files[0], name);
            }
        } else {
            setDetails({
                ...details,
                [name]: value,
            });
        }
    };

    return (
        <div className="border border-gray-400 rounded-lg p-3 mb-4">
            <div
                className="flex items-center justify-between  cursor-pointer"
                onClick={() => setBankDetailsOpen(!isBankDetailsOpen)}
            >
                <h2 className="text-xs text-gray-700 capitalize relative">Bank Details</h2>
                <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700"
                >
                    {isBankDetailsOpen ? <SingleArrowUp /> : <SingleArrowDown />}
                </button>
            </div>
            {isBankDetailsOpen && (
                <div className="mt-4">
                    {bankFields.map((field, index) => (
                        <div key={index} className="relative">
                            {field.type === 'file' ? (
                                <>
                                    <div className='relative w-full p-6 text-base rounded-lg border border-gray-400 focus:border-blue-400 text-gray-600 bg-transparent focus:outline-none focus:ring-0 appearance-none transition-colors duration-300'>
                                        <p
                                            className="absolute top-4 text-xs left-3 pb-2 right-10 cursor-pointer"
                                            onClick={handleSelectFileBank}
                                        >
                                            {selectedBankFile ? selectedBankFile : 'Upload Bank Proof File'}
                                        </p>
                                        <input
                                            type="file"
                                            ref={bankInputRef}
                                            accept='.jpg,.jpeg,.png'
                                            name={field.name}
                                            onChange={handleBankInputChange}
                                            className="hidden "
                                        />
                                        <button
                                            type='button'
                                            onClick={handleSelectFileBank}
                                            className="absolute top-4 right-4 cursor-pointer focus:outline-none"
                                        >
                                            <UploadIcon />
                                        </button>
                                    </div>
                                    {fileUploaded &&
                                        (
                                            <p className='text-end capitalize mx-2 text-[0.7rem] italic text-green-500'>
                                                File Uploaded Successfully!
                                            </p>
                                        )
                                    }
                                </>
                            ) : (
                                <FloatingInput
                                    label={field.label}
                                    name={field.name}
                                    value={details[field.name] || ''}
                                    onChange={handleBankInputChange}
                                    type={field.type}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>

    )
}

export default BankDetailsForm