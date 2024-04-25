import React, { useState, useEffect } from "react";
import { Alert } from "@material-tailwind/react";
import { useGlobalContext } from '../../context/Context';

const Message = () => {
    const [open, setOpen] = useState(true);

    const { error } = useGlobalContext();
    const { isError, message } = error;

    useEffect(() => {
        if (isError) {
            // Automatically close the alert after 3 seconds
            const timer = setTimeout(() => {
                setOpen(false);
            }, 1500);
            
            return () => clearTimeout(timer);
        }
    }, [isError]);

    return (
        <div className="flex justify-end relative">
            {isError &&
                <Alert open={open} onClose={() => setOpen(false)} variant="ghost" className="absolute shadow-lg w-96 top-20 right-5">
                    {message}
                </Alert>
            }
        </div>
    );
}

export default Message