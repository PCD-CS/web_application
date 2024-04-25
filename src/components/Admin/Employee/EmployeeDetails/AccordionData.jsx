import React, { useState } from 'react';
import AccordionArrow2 from '../../../../assets/icons/AccordionArrow2';
import { Create, CrossIcon, Delete, Edit, Save } from '../../../UI/Icons';
import InputForm from './InputForm';

const AccordionData = ({ title, data, fieldConfig, renderFields, handleFieldChange, handleCreateChanges, handleSaveChanges, handleEditChanges, handleDeleteChanges }) => {
    // console.log(fieldConfig)
    const [isOpen, setIsOpen] = useState(false);
    const [editedData, setEditedData] = useState(data);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [isCreating, setIsCreating] = useState(false);
    const [newData, setNewData] = useState({});

    const startCreating = () => {
        setIsCreating(true);
        // Initialize the new data object with empty values based on fieldConfig
        const initialNewData = {};
        fieldConfig.map((item) => {
            initialNewData[item.field] = ""
        })
        setNewData(initialNewData);
    };

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const handleSaveClick = (index) => {
        // Call the save function and reset the editingIndex
        handleSaveChanges(index);
        setEditingIndex(-1);
    };

    const handleCloseClick = (index) => {
        // Remove the object from the UI by creating a new array without it
        handleDeleteChanges(index);
        const updatedData = editedData.filter((_, i) => i !== index);
        setEditedData(updatedData);
    };

    const handleNewItemClose = () => {
        // Remove the newly created object from the state
        setIsCreating(false);
        // Reset the new data object
        const resetNewData = {};

        fieldConfig.map((item) => {
            resetNewData[item.field] = ""
        })
        setNewData(resetNewData);
    };

    const handleCreateClick = () => {
        // Check if all required fields are filled
        const requiredFields = fieldConfig;
        const hasEmptyFields = requiredFields.some((item) => !newData[item.field]);

        if (hasEmptyFields) {
            console.log('Please fill in all required fields before creating a new item.');
        } else {
            // Update your state with the newly created data
            const updatedData = [...editedData, newData];
            setEditedData(updatedData);

            // Reset the creation state
            setIsCreating(false);

            // Reset the new data object
            const resetNewData = {};

            fieldConfig.map((item) => {
                resetNewData[item.field] = ""
            })
            setNewData(resetNewData);

            handleCreateChanges(newData);
        }
    };

    const handleNewFieldChange = (field, value) => {
        const updatedNewData = { ...newData };
        updatedNewData[field] = value;
        setNewData(updatedNewData);
    };

    return (
        <div className="border border-gray-500 rounded-lg px-4 py-[0.6rem] relative bg-white mb-4">
            <div
                className="flex justify-between items-center my-3 cursor-pointer"
                onClick={toggleAccordion}
            >
                <p className="text-xs">{title}</p>
                <AccordionArrow2 isOpen={isOpen} />
            </div>
            <div
                className={`overflow-hidden transition-max-height ease-in-out duration-300 no-scrollbar overflow-y-scroll ${isOpen ? 'max-h-96' : 'max-h-0'
                    }`}
            >
                <div className='text-end space-x-2 mb-2'>
                    <button
                        className='px-2 py-1 rounded-lg font-medium plusJakartaSans  border-blue-200 bg-blue-100  shadow-md hover-bg-blue-300'
                        onClick={startCreating}
                    >
                        <div className='flex items-center space-x-1'>
                            <p className='text-xs'>Add</p>
                            <div className='w-4 h-4'>
                                <Create />
                            </div>
                        </div>
                    </button>

                </div>

                {isCreating ? (
                    <div className="w-full pt-3 px-4 pb-1 mb-3 rounded-xl drop-shadow-sm bg-gray-200/50">
                        <div className="mb-3">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs  font-medium inter">New {title}</p>
                                <div className='space-x-2'>
                                    <button onClick={handleCreateClick}>
                                        <div className='w-4 h-4'>
                                            <Save />
                                        </div>
                                    </button>
                                    <button onClick={handleNewItemClose}>
                                        <div className='w-4 h-4'>
                                            <CrossIcon />
                                        </div>
                                    </button>
                                </div>
                            </div>
                            {
                                fieldConfig.map((item) => {
                                    return (
                                        <InputForm
                                            key={item.field}
                                            fieldConfig={fieldConfig}
                                            label={item.label}
                                            type={item.type}
                                            value={newData[item.field]}
                                            onChange={(e) => handleNewFieldChange(item.field, e.target.value)}
                                            required
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                ) : null}

                {editedData && editedData.length > 0 ? (
                    <ul>
                        {editedData.map((item, index) => {
                            return (
                                <div key={index} className="w-full pt-3 px-4 pb-1 mb-3 rounded-xl drop-shadow-sm bg-gray-200/50">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-xs  font-medium inter">{title} {index + 1}</p>
                                        <div className='space-x-2'>

                                            {editingIndex === index ? (
                                                <button
                                                    onClick={() => { handleSaveClick(index) }}
                                                >
                                                    <div className='w-4 h-4'>
                                                        <Save />
                                                    </div>
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => {
                                                        setEditingIndex(index);
                                                        handleEditChanges(index);
                                                    }}
                                                >
                                                    <div className='w-4 h-4'>
                                                        <Edit />
                                                    </div>
                                                </button>
                                            )}

                                            <button onClick={() => { handleCloseClick(index) }}>
                                                <div className='w-4 h-4'>
                                                    <Delete />
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    {
                                        editingIndex === index ? ( // Render editable fields
                                            renderFields(item, index, handleFieldChange)
                                        ) : (
                                            // Render non-editable fields
                                            <div>
                                                {renderFields(item, index, handleFieldChange)}
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        })}

                    </ul>
                ) : (
                    <p className="text-sm border-t pt-3 text-center font-medium italic text-red-400">
                        No Data Available!
                    </p>
                )}
            </div>
        </div>
    );
};

export default AccordionData;
