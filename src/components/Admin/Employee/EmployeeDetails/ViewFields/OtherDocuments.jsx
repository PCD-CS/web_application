import React, { useState } from 'react'
import AccordionData from '../AccordionData';
import ProfileForm from '../ProfileForm';
import { createDocuments, deleteDocuments, updateDocuments } from '../../../../../network/agent';
import OtherDocUpload from './OtherDocUpload';
import { DownloadIcon } from '../../../../UI/Icons';

const fieldConfig = [
    { label: 'Filename', field: 'filename', type: 'text' },
    // { label: 'Path', field: 'path', type: 'file' },
];

const OtherDocuments = ({ other_documents, contactID }) => {

    const defaultURL = 'https://maprals3.s3.ap-south-1.amazonaws.com/Employee/NoImage_18-10-2023.jpg'

    const [isDocEdit, setIsDocEdit] = useState(false);
    const [error, setError] = useState('');

    const [editedOtherDocuments, setEditedOtherDocuments] = useState(
        other_documents.map((item) => ({ ...item, isItemEdit: false }))
    );

    const handleFieldOtherDocuments = (field, value, index) => {
        const updatedDocs = [...editedOtherDocuments];
        updatedDocs[index][field] = value;
        setEditedOtherDocuments(updatedDocs);
    };

    const handleEditItem = (index) => {
        setIsDocEdit(true);
        const updatedDocs = [...editedOtherDocuments];
        updatedDocs[index].isItemEdit = true;
        setEditedOtherDocuments(updatedDocs);
    };

    const createOtherDocumentsObject = (data) => {
        const updatedData = { ...data, path: defaultURL }

        createDocuments({ contact: contactID, documents: updatedData }).then((response) => {
            if (response.error === false) {
                console.log(response.message);
                const updatedDocsMember = [...editedOtherDocuments, response.data];
                setEditedOtherDocuments(updatedDocsMember);
                setError('')
            } else {
                setError('Something went wrong. Please try again!');
            }
        }).catch((error) => {
            console.log("ERROR: ", error);
            setError('Something went wrong. Please try again!');
        });
    };

    const handleSaveItem = (index) => {
        setIsDocEdit(false);
        const updatedDocsMember = editedOtherDocuments[index];
        const docId = updatedDocsMember._id;
        const data = {
            filename: updatedDocsMember.filename,
            path: updatedDocsMember.path
        };

        updateDocuments(docId, data).then((response) => {
            if (response.error === false) {
                console.log(response.message);
            }
        }).catch((error) => {
            console.log(error)
        })
        const updatedDocs = [...editedOtherDocuments];
        updatedDocs[index].isItemEdit = false;
        setEditedOtherDocuments(updatedDocs);
    };

    const handleDeleteItem = (index) => {
        const updatedDocsMember = editedOtherDocuments[index];
        const docId = updatedDocsMember._id;

        deleteDocuments(contactID, docId).then((response) => {
            if (response.error === false) {
                console.log(response.message)
                const updatedDocs = editedOtherDocuments.filter((item, i) => i !== index);
                setEditedOtherDocuments(updatedDocs);
                setError('')
            } else {
                setError('Something went wrong. Please try again!');
            }
        }).catch((error) => {
            console.log(error);
            setError('Something went wrong. Please try again!');
        });

    };

    const handleUpload = (uploadedUrl, index) => {
        const updatedDocs = [...editedOtherDocuments];
        updatedDocs[index].path = uploadedUrl;
        setEditedOtherDocuments(updatedDocs);
    };

    return (
        <>
            {error && <div className="text-red-600 text-xs text-center italic font-medium">{error}</div>}
            <AccordionData
                title="Other Details"
                data={editedOtherDocuments}
                fieldConfig={fieldConfig}
                isEditMode={isDocEdit}
                setIsEditMode={setIsDocEdit}
                handleSaveChanges={handleSaveItem}
                handleEditChanges={handleEditItem}
                handleDeleteChanges={handleDeleteItem}
                handleCreateChanges={createOtherDocumentsObject}
                renderFields={(item, index) => (
                    <>
                        {fieldConfig.map((obj) => (
                            <div className='relative' key={obj.field}>
                                <ProfileForm
                                    key={obj.field}
                                    label={obj.label}
                                    type={obj.type}
                                    value={item[obj.field]}
                                    isEditMode={item.isItemEdit}
                                    fieldName={item[obj.field]}
                                    handleFieldChange={(e) => handleFieldOtherDocuments(obj.field, e.target.value, index)}
                                />
                                <div className='absolute right-3 top-4'>
                                    {item.isItemEdit ? (
                                        <OtherDocUpload onUpload={(uploadedUrl) => handleUpload(uploadedUrl, index)} />
                                    ) : (
                                        <a href={item.path} rel="noopener noreferrer">
                                            {item.path && <DownloadIcon />}
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </>
                )}
            />
        </>

    )
}

export default OtherDocuments