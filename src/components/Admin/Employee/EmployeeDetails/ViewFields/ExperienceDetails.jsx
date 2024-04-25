import React, { useState } from 'react'
import AccordionData from '../AccordionData'
import ProfileForm from '../ProfileForm'
import { createExperience, deleteExperience, updateExperience } from '../../../../../network/agent';

const fieldConfig = [
    { label: 'Organization Name', field: 'organization_name', type: 'text' },
    { label: 'Job Title', field: 'job_title', type: 'text' },
    { label: 'Start Date', field: 'start_date', type: 'date' },
    { label: 'End Date', field: 'end_date', type: 'date' },
];

const ExperienceDetails = ({ experience, formatDate, contactID }) => {

    const [isExpEdit, setIsExpEdit] = useState(false);

    const [editedExperience, setEditedExperience] = useState(
        experience.map((item) => ({ ...item, isItemEdit: false }))
    );

    const handleFieldExperience = (field, value, index) => {
        const updatedExperience = [...editedExperience];
        updatedExperience[index][field] = value;
        setEditedExperience(updatedExperience);
    };

    const handleEditItem = (index) => {
        setIsExpEdit(true)
        const updatedExperience = [...editedExperience];
        updatedExperience[index].isItemEdit = true;
        setEditedExperience(updatedExperience);
    };

    const createExperienceObject = (data) => {
        createExperience({ contact: contactID, experience: data }).then((response) => {
            if (response.error === false) {
                console.log(response.message)
                // Combine the existing data and the newly created data
                const updatedExperience = [...editedExperience, response.data];
                setEditedExperience(updatedExperience);
            }
        }).catch((error) => {
            console.log(error)
        })
    };

    const handleSaveItem = (index) => {
        setIsExpEdit(false)
        const updatedExperienceMember = editedExperience[index];
        const expId = updatedExperienceMember._id;
        const data = {};

        // Dynamically set the fields in the data object
        fieldConfig.map((item) => {
            data[item.field] = updatedExperienceMember[item.field];
        })

        updateExperience(expId, data).then((response) => {
            if (response.error === false) {
                console.log(response.message);
            }
        }).catch((error) => {
            console.log(error)
        })
        const updatedExperience = [...editedExperience];
        updatedExperience[index].isItemEdit = false;
        setEditedExperience(updatedExperience);
    };

    const handleDeleteItem = (index) => {
        const updatedExperienceMember = editedExperience[index];
        console.log(updatedExperienceMember._id)
        const expId = updatedExperienceMember._id;

        deleteExperience(contactID, expId).then((response) => {
            if (response.error === false) {
                console.log(response.message)
                const updatedExperience = editedExperience.filter((item, i) => i !== index);
                setEditedExperience(updatedExperience);
            }
        }).catch((error) => {
            console.log(error);
        });

    };

    return (
        <AccordionData
            title="Experience Details"
            data={editedExperience}
            fieldConfig={fieldConfig}
            isEditMode={isExpEdit}
            setIsEditMode={setIsExpEdit}
            handleSaveChanges={handleSaveItem}
            handleEditChanges={handleEditItem}
            handleDeleteChanges={handleDeleteItem}
            handleCreateChanges={createExperienceObject}
            renderFields={(item, index) => (
                <>
                    {fieldConfig.map((obj) => (
                        <div key={obj.field}>
                            {obj.field === 'start_date' || obj.field === 'end_date' ? (
                                <div className="border border-gray-500 bg-white rounded-lg px-4 py-1 mb-4">
                                    <p className="text-xs pt-1 text-gray-600">{obj.label}</p>
                                    {isExpEdit ? (
                                        <input
                                            type='date'
                                            value={formatDate(item[obj.field])}
                                            onChange={(e) => handleFieldExperience(obj.field, e.target.value, index)}
                                            disabled={!item.isItemEdit}
                                            className="w-full outline-none"
                                        />
                                    ) : (
                                        <div className="w-full">
                                            {formatDate(item[obj.field])}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <ProfileForm
                                    label={obj.label}
                                    type={obj.type}
                                    fieldName={item[obj.field]}
                                    isEditMode={item.isItemEdit}
                                    handleFieldChange={(e) => handleFieldExperience(obj.field, e.target.value, index)}
                                />
                            )}
                        </div>
                    ))}
                </>
            )}
        />
    )
}

export default ExperienceDetails