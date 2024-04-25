import React, { useState, useRef } from 'react';
import FloatingInput from './FloatingInput';
import { AddIcon, CrossIcon, UploadIcon } from '../../../UI/Icons';
import AccordionArrow from '../../../../assets/icons/AccordionArrow';

const MultipleDetailsForm = ({ title, fields, details, setDetails, onAddField, fieldKey, handleSelectFileOther, handleOtherInputChange, otherInputRef, fileUploaded }) => {

    const [isOpen, setIsOpen] = useState([false]);

    const handleAddField = () => {
        setDetails([...details, {}]); // Add a new empty set of details
        setIsOpen([...isOpen, true]);
        onAddField(fieldKey);// Notify the parent component about adding a field
    };

    const handleRemoveField = (index) => {
        const updatedDetails = [...details];
        updatedDetails.splice(index, 1);
        setDetails(updatedDetails);
    };

    const handleAccordionToggle = (index) => {
        const updatedIsOpen = isOpen.map((value, i) => (i === index ? !value : false)); // Close other accordions
        setIsOpen(updatedIsOpen);
    };

    const handleRemoveAccordion = (index) => {
        const updatedDetails = [...details];
        updatedDetails.splice(index, 1); // Remove the accordion details
        const updatedIsOpen = isOpen.filter((value, i) => i !== index); // Remove isOpen entry for the removed accordion
        setDetails(updatedDetails);
        setIsOpen(updatedIsOpen);
    };

    const handleFieldChange = (index, fieldName, value) => {
        const updatedDetails = [...details];
        // Ensure detail at the specified index is an object
        if (typeof updatedDetails[index] !== 'object') {
            updatedDetails[index] = {};
        }
        updatedDetails[index][fieldName] = value;
        setDetails(updatedDetails);
    };

    return (
        <div className="border border-gray-400 rounded-lg p-3 mb-4">
            <div className='flex items-center justify-between'>
                <h2 className="text-xs text-gray-700 capitalize relative">{title}</h2>
                <button
                    type="button"
                    className="flex justify-end w-4 text-sm text-blue-500 hover:text-blue-700 cursor-pointer"
                    onClick={handleAddField}
                >
                    <AddIcon />
                </button>
            </div>

            {details.map((detail, index) => (
                <div key={index} className="border-t border-gray-400 mt-4 pt-4">
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            className="flex items-center text-sm  hover:text-blue-700 cursor-pointer"
                            onClick={() => handleAccordionToggle(index)}
                        >
                            <AccordionArrow index={index} isOpen={isOpen} />
                            <span className="ml-2">{title} Detail {index + 1}</span>
                        </button>
                        <button
                            type="button"
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                            onClick={() => {
                                handleRemoveAccordion(index)
                                handleRemoveField(index)
                            }}
                        >
                            <CrossIcon />
                        </button>
                    </div>
                    <div className={`mt-2 accordion-content ${isOpen[index] ? 'open' : ' '}`}>
                        {fields.map((field, fieldIndex) => {
                            const { label, name, type } = field


                            if (name === 'path') {
                                return (
                                    <div key={fieldIndex} className="relative">
                                        <input
                                            type="file"
                                            ref={otherInputRef}
                                            accept='.jpg,.jpeg,.png'
                                            className='hidden'
                                            name='other_documents'
                                            onChange={(e) => handleOtherInputChange(e, index)}
                                        />
                                        {
                                            fileUploaded && (
                                                <p className='text-end capitalize mx-2 text-[0.7rem] italic text-green-500'>
                                                    File Uploaded Successfully!
                                                </p>
                                            )
                                        }
                                    </div>
                                );
                            } else if (name === 'filename') {
                                return (
                                    <div key={fieldIndex} className="relative">
                                        <FloatingInput
                                            label={label}
                                            name={name}
                                            value={detail[name] || ''}
                                            onChange={(e) => handleOtherInputChange(e, index)}
                                            type={type}
                                            newClass="pr-10"
                                        />
                                        <button
                                            type='button'
                                            onClick={() => handleSelectFileOther()}
                                            className='cursor-pointer focus:outline-none absolute right-2 top-1/2 transform -translate-y-1/2'
                                        >
                                            <UploadIcon />
                                        </button>
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={fieldIndex} className="relative">
                                        <FloatingInput
                                            key={fieldIndex}
                                            label={label}
                                            name={`${name}_${index}`}
                                            value={detail[name] || ''}
                                            onChange={(e) => handleFieldChange(index, name, e.target.value)}
                                            type={type}
                                            newClass="pr-3"
                                        />
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MultipleDetailsForm;
