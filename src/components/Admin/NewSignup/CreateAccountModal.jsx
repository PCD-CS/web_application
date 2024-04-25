import React from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import InputField from './InputField';

const CreateAccountModal = ({ registers, openAccountModal, handleOpenAccountModal, handleStatusChange }) => {

    const handleCloseModal = () => {
        handleOpenAccountModal();
    };

    return (
        <>
            <Dialog
                open={openAccountModal}
                handler={handleCloseModal}
                className="rounded-3xl border-0 shadow-xl p-4"
            >
                <DialogHeader className="flex justify-center">
                    <span className="capitalize plusJakartaSans text-lg md:text-xl lg:text-2xl">New Account</span>
                </DialogHeader>
                <DialogBody>
                    <InputField label="Name:" value="Test Name" />
                    <InputField label="Contact No:" value="123456789" />
                    <InputField label="Email ID:" value="example12@gmail.com" />
                </DialogBody>
                <DialogFooter className='flex justify-center'>
                    <button
                        onClick={() => handleStatusChange(_id, 0)}
                        className="bg-blue-500 hover:bg-blue-400 text-sm md:text-base lg:text-base text-white inter px-3 py-1 mt-2 md:mt-0 lg:mt-0 rounded-lg shadow-lg focus:shadow-none"
                    >
                        Submit
                    </button>
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default CreateAccountModal