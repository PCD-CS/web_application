import axios from 'axios';
import React, { useRef } from 'react'
import { BASE_URL } from '../../../../../network/apiClient';
import { Camera } from '../../../../UI/Icons';
import default_image from '../../../../../assets/images/default_image.svg';

const UpdateProfilePhoto = ({ profileFileUrl, setProfileFileUrl, isEditMode }) => {

    const profileInputRef = useRef(null);

    // function to handle select file and upload file
    const handleFileChange = async (e) => {

        const { name, files } = e.target || {};

        if (files && files.length > 0) {
            await handleUploadFile(files[0], name);
        } else {
            console.log("Please Select a File!")
        }
    };

    // function to upload files
    const handleUploadFile = async (file, name) => {

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${BASE_URL}file/upload/Employee`,
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.message)
            setProfileFileUrl(response.data.data)


        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleSelectFileProfile = () => {
        profileInputRef.current.click();
    };

    return (
        <>
            {
                isEditMode ? (
                    <div className='flex flex-col justify-center'>
                        {/* ViewProfilePic */}
                        <div>
                            <img src={profileFileUrl ? profileFileUrl : default_image} alt='image' name='profilePhoto' className='w-20 h-20 text-xs rounded-full object-cover' />
                        </div>

                        {/* UpdateProfilePic */}
                        <input type='file' ref={profileInputRef} accept='.jpg,.jpeg,.png' className='hidden' name='profilePhoto' onChange={handleFileChange} />
                        <button
                            type='button'
                            onClick={handleSelectFileProfile}
                            className='my-1 cursor-pointer focus:outline-none flex items-center justify-center space-x-1 bg-gray-300 px-2 py-1 rounded-xl'
                        >
                            <div className='w-4 h-4 opacity-70'>
                                <Camera />
                            </div>
                            <p className='ptSans text-xs'>Update</p>
                        </button>
                    </div>
                ) : (
                    <img src={profileFileUrl ? profileFileUrl : default_image} alt="profile" className="w-20 h-20 text-xs rounded-full object-cover" />
                )
            }
        </>
    )
}

export default UpdateProfilePhoto