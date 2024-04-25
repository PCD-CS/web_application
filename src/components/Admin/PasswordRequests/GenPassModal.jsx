import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { Copy, CopyDone } from "../../UI/Icons";

const GenPassModal = ({ open, handleOpen, user_id, password }) => {

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        // Copy the userId and password to the clipboard
        const textToCopy = `User ID: ${user_id}, Password: ${password}`;
        navigator.clipboard.writeText(textToCopy);

        // Set copied state to true
        setCopied(true);
    };

    return (
        <>
            <Dialog
                open={open}
                handler={handleOpen}
                className="rounded-3xl border-0 shadow-xl py-4"
            >
                <DialogHeader className="flex justify-between">
                    <span className="capitalize plusJakartaSans">Password Generated.</span>
                    <div className="">
                        <button
                            type="button"
                            className="bg-gray-200 flex items-center py-1 px-2 rounded-md"
                            onClick={handleCopy}
                        >
                            <span className="text-xs font-light spaceMono">{copied ? "Copied!" : "Copy"} </span>{" "}
                            <span className="text-right w-4"> {copied ? <CopyDone /> : <Copy />}</span>
                        </button>
                    </div>
                </DialogHeader>
                <DialogBody>
                    <p>
                        <span className="text-sm font-medium">User ID:</span>{" "}
                        <span className="plusJakartaSans text-black font-semibold select-all">{user_id}</span>
                    </p>
                    <p>
                        <span className="text-sm font-medium">Password:</span>{" "}
                        <span className="plusJakartaSans text-black font-semibold select-all">{password}</span>
                    </p>
                </DialogBody>
            </Dialog>
        </>
    );
}

export default GenPassModal