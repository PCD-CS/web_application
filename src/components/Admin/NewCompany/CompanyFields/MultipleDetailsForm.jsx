import React, { useState, useRef } from 'react';
import FloatingInput from './FloatingInput';
import { AddIcon, CrossIcon, UploadIcon } from '../../../UI/Icons';
import AccordionArrow from '../../../../assets/icons/AccordionArrow';

const MultipleDetailsForm = ({ title, fields, onAddField }) => {
    const [details, setDetails] = useState([{}]); // Initially, one set of details is there
    const [isOpen, setIsOpen] = useState([false]);

    const handleAddField = () => {
        setDetails([...details, {}]); // Add a new empty set of details
        setIsOpen([...isOpen, true]);
        onAddField(); // Notify the parent component about adding a field
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
                            onClick={() => handleRemoveAccordion(index)}
                        >
                            <CrossIcon />
                        </button>
                    </div>
                    <div className={`mt-2 accordion-content ${isOpen[index] ? 'open' : ' '}`}>
                        {fields.map((field, fieldIndex) => {
                            const { label, name, type } = field

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
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MultipleDetailsForm;
