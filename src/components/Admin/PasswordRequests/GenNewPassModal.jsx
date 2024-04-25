import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { Copy, CopyDone } from "../../UI/Icons";
import { generateUserPasswordById } from "../../../network/agent";

const GenNewPassModal = ({ openGenNewPassModal, handleOpenGenNewPassModal }) => {

    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const [passwordGenerated, setPasswordGenerated] = useState(false);
    const [loading, setLoading] = useState(false);

    const resetModal = () => {
        setCopied(false);
        setError('');
        setUserId('');
        setPassword('');
        setPasswordGenerated(false);
        setLoading(false);
    };

    const handleCopy = () => {
        const textToCopy = `${password}`;
        navigator.clipboard.writeText(textToCopy);

        // Set copied state to true
        setCopied(true);
    };

    const handleGeneratePassword = () => {
        if (!userId) {
            setError('User ID is required!');
            return;
        }

        setLoading(true);

        generateUserPasswordById({ user_id: userId })
            .then((response) => {
                if (response.error === false) {
                    const newPassword = response.data.password;
                    setPassword(newPassword);
                    setPasswordGenerated(true);
                    setError('');
                } else {
                    setPasswordGenerated(false);
                    setError('Password generation failed! Please Check User ID.');
                }
            }).catch((error) => {
                setPasswordGenerated(false);
                setError('Password generation failed! Please Check User ID.');
                console.error('Password generation failed:', error);
            }).finally(() => {
                setLoading(false);
            });
    };

    const handleCloseModal = () => {
        resetModal();
        handleOpenGenNewPassModal();
    };

    return (
        <>

            <Dialog
                open={openGenNewPassModal}
                handler={handleCloseModal}
                className="rounded-3xl border-0 shadow-xl py-4"
            >
                <DialogHeader className="flex justify-center">
                    <span className="capitalize plusJakartaSans text-lg md:text-xl lg:text-2xl">Generate New Password</span>
                </DialogHeader>
                <DialogBody>
                    <div className="sm:flex sm:items-center sm:justify-between md:flex md:items-center md:justify-between lg:flex lg:items-center lg:justify-between px-3 md:px-6 lg:px-6 py-4">
                        <p className="inter font-medium text-sm md:text-base lg:text-base mb-1 sm:mb-0 md:mb-0 lg:mb-0">User ID:</p>
                        <input
                            type="text"
                            placeholder="Enter User ID"
                            className="border border-gray-500 focus:border-blue-500 text-black text-sm sm:text-sm md:text-base lg:text-base rounded-lg px-2 lg:px-4 py-1 lg:py-2 w-full sm:w-52 md:w-52 lg:w-64 outline-none"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                        <div className="text-center">
                            <button
                                onClick={handleGeneratePassword}
                                className="bg-blue-500 hover:bg-blue-400 text-sm md:text-base lg:text-base text-white inter px-3 py-1 mt-2 md:mt-0 lg:mt-0 rounded-lg shadow-lg focus:shadow-none"
                                disabled={loading}
                            >
                                {loading ? 'Generating...' : 'Generate Password'}
                            </button>
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter className="flex justify-center">
                    {passwordGenerated && (
                        <div>
                            <p className="plusJakartaSans mb-4 font-semibold text-green-500 text-sm md:text-lg lg:text-lg opacity-80">New Password Generated Successfully!</p>
                            <div>
                                <div className="flex items-center justify-between border border-gray-500 rounded-lg px-2 lg:px-4 py-1 lg:py-2 w-full">
                                    <p className="plusJakartaSans select-all text-black text-sm sm:text-sm md:text-sm lg:text-base font-medium">
                                        {password}
                                    </p>

                                    <button
                                        type="button"
                                        className="bg-gray-200 flex items-center py-1 px-2 rounded-md text-gray-900"
                                        onClick={handleCopy}
                                    >
                                        <span className="text-xs font-light spaceMono hidden md:block">{copied ? 'Copied!' : 'Copy'} </span> <span className="text-right w-4"> {copied ? <CopyDone /> : <Copy />}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {error && (
                        <div className="mt-2">
                            <p className="text-red-500 text-sm font-medium poppins capitalize">{error}</p>
                        </div>
                    )}
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default GenNewPassModal