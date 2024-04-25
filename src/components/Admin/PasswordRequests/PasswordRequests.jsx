import React, { useEffect, useState } from 'react';
import { getPasswordRequests, generateUserPassword, deletePasswordRequest } from '../../../network/agent';
import GenPassModal from './GenPassModal';
import GenNewPassModal from './GenNewPassModal';

const ChangePasswordRequests = () => {

    const [reqPasswords, setReqPasswords] = useState([]);
    const [generatedData, setGeneratedData] = useState({ user_id: '', password: '' });
    const [open, setOpen] = useState(false);
    const [openGenNewPassModal, setOpenGenNewPassModal] = useState(false);
    const [error, setError] = useState('');

    const handleOpen = () => setOpen(!open);
    const handleOpenGenNewPassModal = () => setOpenGenNewPassModal(!openGenNewPassModal);

    useEffect(() => {
        getPasswordRequests().then((response) => {
            if (response.error === false) {
                // console.log(response.data);
                setReqPasswords(response.data);
            }
        });
    }, []);

    // Call the generateUserPassword API with the contactNo
    const handleGeneratePassword = (contactNo) => {
        generateUserPassword({ contact: contactNo }).then((response) => {
            if (response.error === false) {
                const { user_id, password } = response.data;
                // console.log(response.data)
                setGeneratedData({ user_id, password });
                handleOpen()
            } else {
                console.log('No Password Generated!')
            }
        }).catch((error) => {
            setError('Invalid Contact Number!')
            console.log('No Password Generated! Check Contact Number!', error)
        })
    };

    // Call the deletePasswordRequest API with the userId
    const handleDone = (userId) => {
        deletePasswordRequest(userId).then((response) => {
            if (response.error === false) {
                setReqPasswords((prevState) =>
                    prevState.filter((item) => item._id !== userId)
                );
            }
        }).catch((error) => {
            setError('Unable to delete!')
            console.log('Unable to delete!', error)
        })
    };

    return (
        <div>

            <h1 className='text-center uppercase font-semibold text-2xl pb-4 poppins'>
                Password Requests
            </h1>

            <div className='text-right'>
                <button
                    type='button'
                    className='rounded-lg border border-[#F06262] hover:bg-[#F06262] hover:text-white text-sm font-medium py-1 px-2'
                    onClick={handleOpenGenNewPassModal}
                >
                    Generate New Password
                </button>
            </div>


            {reqPasswords.length === 0 && (
                <div className='text-red-500 text-center font-semibold mb-4 capitalize poppins'>No passwords to generate!</div>
            )}

            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-10 my-4 place-items-center'>
                {reqPasswords.map((item) => {
                    const { _id, contact_no } = item;
                    return (

                        <div
                            className='border border-[#2F80EF] shadow-lg bg-white w-60  mb-4 rounded-xl'
                            key={_id}
                        >
                            <div className='my-3'>
                                <p className='text-sm my-2 flex justify-evenly'>
                                    <span className='font-normal plusJakartaSans'>Contact No:</span>{' '}
                                    <span className='plusJakartaSans font-semibold'>{contact_no}</span>
                                </p>
                                <div className='flex my-2 justify-around'>
                                    <button
                                        className='rounded-lg border border-[#F06262] hover:bg-[#F06262] hover:text-white text-sm font-medium py-1 px-2'
                                        onClick={() => handleGeneratePassword(contact_no)}
                                    >
                                        Generate Password
                                    </button>
                                    <button
                                        className='rounded-lg bg-[#61C26B] text-white text-sm font-medium py-1 px-2'
                                        onClick={() => handleDone(_id)}
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                            {error &&
                                <p className='py-1 px-2 border-t border-[#2F80EF] font-semibold text-xs text-center bg-gray-100 rounded-b-xl text-red-500 italic'>
                                    {error}
                                </p>
                            }
                        </div>

                    );
                })}
            </div>
            <GenPassModal open={open} handleOpen={handleOpen} {...generatedData} />
            <GenNewPassModal openGenNewPassModal={openGenNewPassModal} handleOpenGenNewPassModal={handleOpenGenNewPassModal} />
        </div>
    );
};

export default ChangePasswordRequests;
