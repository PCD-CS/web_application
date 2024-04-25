import React, { useState } from 'react'
import ProfileForm from '../ProfileForm'
import AccordionArrow2 from '../../../../../assets/icons/AccordionArrow2'
import UpdateFileUpload from './UpdateFileUpload';
import { DownloadIcon } from '../../../../UI/Icons';

const BankDetails = ({ bank_details, isEditMode, setIsEditMode, handleSaveChanges, editedAccountHolderName, editedAccountNumber, editedBankName, editedBranchName, editedIfscCode, editedBankProof, handleAccountHolderNameChange, handleAccountNumberChange, handleBankNameChange, handleBranchNameChange, handleIfscCodeChange, handleBankProofUpload }) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border border-gray-500 rounded-lg px-4 py-[0.6rem] relative bg-white mb-4">
            <div
                className="flex justify-between items-center my-3 cursor-pointer"
                onClick={toggleAccordion}
            >
                <p className="text-xs">Bank Details</p>
                <AccordionArrow2 isOpen={isOpen} />
            </div>
            <div
                className={`overflow-hidden transition-max-height ease-in-out duration-300 no-scrollbar overflow-y-scroll ${isOpen ? 'max-h-96' : 'max-h-0'
                    }`}
            >
                <div className='text-end space-x-2 mb-2'>
                    {isEditMode ? (
                        <button
                            className='px-2 rounded-lg text-sm font-medium plusJakartaSans border border-green-400 bg-green-500 text-white shadow-md hover:bg-green-700'
                            onClick={() => {
                                handleSaveChanges()
                                setIsEditMode(false)
                            }}
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            className='px-2 rounded-lg text-sm font-medium plusJakartaSans border border-red-400 outline-none text-red-400 shadow-md hover:bg-red-400 hover:text-white'
                            onClick={() => setIsEditMode(true)}
                        >
                            Edit
                        </button>
                    )}
                </div>

                {bank_details ? (
                    <ul>
                        <div className="w-full border border-gray-200 pt-3 px-2 mb-2 rounded-xl bg-gray-200">
                            <ProfileForm
                                label="Account Holder Name"
                                fieldName={editedAccountHolderName}
                                isEditMode={isEditMode}
                                handleFieldChange={handleAccountHolderNameChange}
                            />
                            <div className='relative' >
                                <ProfileForm
                                    label="Account Number"
                                    fieldName={editedAccountNumber}
                                    isEditMode={isEditMode}
                                    handleFieldChange={handleAccountNumberChange}
                                />
                                <div className='absolute right-3 top-4'>
                                    {isEditMode ? (
                                        <UpdateFileUpload onUpload={handleBankProofUpload} />
                                    ) : (
                                        <a href={editedBankProof} rel="noopener noreferrer">
                                            {editedBankProof && <DownloadIcon />}
                                        </a>
                                    )}
                                </div>
                            </div>

                            <ProfileForm
                                label="Bank Name"
                                fieldName={editedBankName}
                                isEditMode={isEditMode}
                                handleFieldChange={handleBankNameChange}
                            />
                            <ProfileForm
                                label="Branch Name"
                                fieldName={editedBranchName}
                                isEditMode={isEditMode}
                                handleFieldChange={handleBranchNameChange}
                            />
                            <ProfileForm
                                label="IFSC Code"
                                fieldName={editedIfscCode}
                                isEditMode={isEditMode}
                                handleFieldChange={handleIfscCodeChange}
                            />
                        </div>
                    </ul>
                ) : (
                    <p className='text-sm border-t pt-3 text-center font-medium italic text-red-400'>
                        No Data Available!
                    </p>
                )}
            </div>
        </div>
    )
}

export default BankDetails