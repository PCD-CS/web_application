import React, { useState } from 'react'
import AccordionData from '../AccordionData';
import ProfileForm from '../ProfileForm';
import { createEducation, deleteEducation, updateEducation } from '../../../../../network/agent';

const fieldConfig = [
    { label: 'College Name', field: 'college_name', type: 'text' },
    { label: 'Course Name', field: 'course_name', type: 'text' },
    { label: 'Percentage', field: 'percentage', type: 'number' },
];


const EducationDetails = ({ education_details, contactID }) => {

    const [isEduEdit, setIsEduEdit] = useState(false);

    const [editedEducationDetails, setEditedEducationDetails] = useState(
        education_details.map((item) => ({ ...item, isItemEdit: false }))
    );

    const handleFieldEducation = (field, value, index) => {
        const updatedEducationDetails = [...editedEducationDetails];
        updatedEducationDetails[index][field] = value;
        setEditedEducationDetails(updatedEducationDetails);
    };

    const handleEditItem = (index) => {
        const updatedEducationDetails = [...editedEducationDetails];
        updatedEducationDetails[index].isItemEdit = true;
        setEditedEducationDetails(updatedEducationDetails);
    };

    const createEducationObject = (data) => {
        createEducation({ contact: contactID, education: data }).then((response) => {
            if (response.error === false) {
                console.log(response.message)
                // Combine the existing data and the newly created data
                const updatedEducationMember = [...editedEducationDetails, response.data];
                setEditedEducationDetails(updatedEducationMember);
            }
        }).catch((error) => {
            console.log(error)
        })
    };

    const handleSaveItem = (index) => {
        const updatedEducationMember = editedEducationDetails[index];
        const eduId = updatedEducationMember._id;
        const data = {};

        // Dynamically set the fields in the data object
        fieldConfig.map((item) => {
            data[item.field] = updatedEducationMember[item.field];
        })

        updateEducation(eduId, data).then((response) => {
            if (response.error === false) {
                console.log(response.message);
                const updatedEducationDetails = [...editedEducationDetails];
                updatedEducationDetails[index].isItemEdit = false;
                setEditedEducationDetails(updatedEducationDetails);
            }
        }).catch((error) => {
            console.log(error)
        })
    };

    const handleDeleteItem = (index) => {
        const updatedEducationMember = editedEducationDetails[index];
        const eduId = updatedEducationMember._id;

        deleteEducation(contactID, eduId).then((response) => {
            if (response.error === false) {
                console.log(response.message)
                const updatedEducationDetails = editedEducationDetails.filter((item, i) => i !== index);
                setEditedEducationDetails(updatedEducationDetails);
            }
        }).catch((error) => {
            console.log(error);
        });
    };



    return (
        <AccordionData
            title="Education Details"
            data={editedEducationDetails}
            fieldConfig={fieldConfig}
            isEditMode={isEduEdit}
            setIsEditMode={setIsEduEdit}
            handleSaveChanges={handleSaveItem}
            handleEditChanges={handleEditItem}
            handleDeleteChanges={handleDeleteItem}
            handleCreateChanges={createEducationObject}
            renderFields={(item, index) => (
                <>
                    {fieldConfig.map((obj) => (
                        <ProfileForm
                            key={obj.field}
                            label={obj.label}
                            type={obj.type}
                            value={item[obj.field]}
                            isEditMode={item.isItemEdit}
                            fieldName={item[obj.field]}
                            handleFieldChange={(e) => handleFieldEducation(obj.field, e.target.value, index)}
                        />
                    ))}
                </>
            )}
        />
    )
}

export default EducationDetails