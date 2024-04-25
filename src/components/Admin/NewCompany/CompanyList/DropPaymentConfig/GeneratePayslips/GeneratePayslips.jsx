import React, { useState } from 'react'
import UploadMasterSheet from './UploadMasterSheet'
import { Link, useNavigate } from 'react-router-dom';

const GeneratePayslips = () => {

    const [isUploadFileShow, setIsUploadFileShow] = useState(false)

    const handleGeneratePayslips = () => {
        setIsUploadFileShow(!isUploadFileShow);
    }

    return (
        <>
            <Link
                className='flex items-center justify-center w-full bg-white border-[3px] border-[#FFC1078A] shadow-md rounded-2xl py-2 px-4 lg:p-3 my-6'
                to="/payslip/employee"
            >
                <p className='lexend font-medium text-md'>Generate Pay-slips</p>
            </Link>

            {/* <button
                type='button'
                className='flex items-center justify-center w-full bg-white border-[3px] border-[#FFC1078A] shadow-md rounded-2xl py-2 px-4 lg:p-3 my-6'
                onClick={handleGeneratePayslips}
            >
                <p className='lexend font-medium text-md'>Generate Pay-slips</p>
            </button> */}

        </>
    )
}

export default GeneratePayslips