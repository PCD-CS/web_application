import React from 'react'
import { Spinner } from "@material-tailwind/react";

const Loader = () => {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <Spinner color="blue" size="lg" />
        </div>
    )
}

export default Loader