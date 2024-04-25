import React, { useState } from 'react'
import AccordionData from '../AccordionData';
import ProfileForm from '../ProfileForm';
import { createFamily, deleteFamily, updateFamily } from '../../../../../network/agent';

const fieldConfig = [
    { label: 'Name', field: 'name', type: 'text' },
    { label: 'Relation', field: 'relation', type: 'text' },
    { label: 'Age', field: 'age', type: 'number' },
];

const FamilyDetails = ({ family_details, contactID }) => {

    const [isFamEdit, setIsFamEdit] = useState(false);

    const [editedFamilyDetails, setEditedFamilyDetails] = useState(
        family_details.map((item) => ({ ...item, isItemEdit: false }))
    );

    const handleFieldFamily = (field, value, index) => {
        const updatedFamilyDetails = [...editedFamilyDetails];
        updatedFamilyDetails[index][field] = value;
        setEditedFamilyDetails(updatedFamilyDetails);
    };

    const handleEditItem = (index) => {
        const updatedFamilyDetails = [...editedFamilyDetails];
        updatedFamilyDetails[index].isItemEdit = true;
        setEditedFamilyDetails(updatedFamilyDetails);
    };

    const createFamilyObject = (data) => {
        createFamily({ contact: contactID, details: data }).then((response) => {
            if (response.error === false) {
                console.log(response.message)
                // Combine the existing data and the newly created data
                const updatedFamilyMember = [...editedFamilyDetails, response.data];
                setEditedFamilyDetails(updatedFamilyMember);
            }
        }).catch((error) => {
            console.log(error)
        })
    };

    const handleSaveItem = (index) => {
        const updatedFamilyMember = editedFamilyDetails[index];
        const famId = updatedFamilyMember._id;
        const data = {};

        // Dynamically set the fields in the data object
        fieldConfig.map((item) => {
            data[item.field] = updatedFamilyMember[item.field];
        })

        updateFamily(famId, data).then((response) => {
            if (response.error === false) {
                console.log(response.message);
                const updatedFamilyDetails = [...editedFamilyDetails];
                updatedFamilyDetails[index].isItemEdit = false;
                setEditedFamilyDetails(updatedFamilyDetails);
            }
        }).catch((error) => {
            console.log(error)
        })
    };

    const handleDeleteItem = (index) => {
        const updatedFamilyMember = editedFamilyDetails[index];
        const famId = updatedFamilyMember._id;

        deleteFamily(contactID, famId).then((response) => {
            if (response.error === false) {
                console.log(response.message)
                // Handle the response, e.g., remove the deleted item from the state
                const updatedFamilyDetails = editedFamilyDetails.filter((item, i) => i !== index);
                setEditedFamilyDetails(updatedFamilyDetails);
            }
        }).catch((error) => {
            console.log(error);
        });
    };


    return (
        <AccordionData
            title="Family Details"
            data={editedFamilyDetails}
            fieldConfig={fieldConfig}
            isEditMode={isFamEdit}
            setIsEditMode={setIsFamEdit}
            handleSaveChanges={handleSaveItem}
            handleEditChanges={handleEditItem}
            handleDeleteChanges={handleDeleteItem}
            handleCreateChanges={createFamilyObject}
            renderFields={(item, index) => (
                <div key={index}>
                    {fieldConfig.map((obj) => (
                        <>
                            <ProfileForm
                                key={obj.field}
                                label={obj.label}
                                type={obj.type}
                                value={item[obj.field]}
                                isEditMode={item.isItemEdit}
                                fieldName={item[obj.field]}
                                handleFieldChange={(e) => handleFieldFamily(obj.field, e.target.value, index)}
                            />
                        </>
                    ))}
                </div>
            )}
        />
    )
}

export default FamilyDetails