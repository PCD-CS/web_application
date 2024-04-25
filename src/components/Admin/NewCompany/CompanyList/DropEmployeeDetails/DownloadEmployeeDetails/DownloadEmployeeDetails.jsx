import React, { useEffect, useState } from 'react'
import { payrollEmployeeDetails } from '../../../../../../network/agent';
import { Spinner } from '@material-tailwind/react';

const DownloadEmployeeDetails = ({ setError }) => {

    const companyId = localStorage.getItem('companyId')

    const [isEmployeeDetailsDownloading, setIsEmployeeDetailsDownloading] = useState(false);
    const [employeeUrl, setEmployeeUrl] = useState('');

    // Function to handle Download Employee Details
    const handleDownloadEmployeeDetails = () => {
        if (companyId) {
            setIsEmployeeDetailsDownloading(true);
            payrollEmployeeDetails({ company: companyId }).then((response) => {
                if (response.error === false) {
                    // console.log(response)
                    // window.open(response.data);
                    setEmployeeUrl(response.data);
                }
            }).catch((error) => {
                setError('Unable to download file!')
                setTimeout(() => {
                    setError('');
                }, 2000);
                // console.log(error);
            }).finally(() => {
                setIsEmployeeDetailsDownloading(false);
            });
        } else {
            console.log('No Company ID Selected!')
        }
    };

    useEffect(() => {
        if (employeeUrl) {
            const downloadLink = document.createElement('a');
            downloadLink.href = employeeUrl;
            downloadLink.download;
            downloadLink.click();

            setEmployeeUrl('');
        }
    }, [employeeUrl]);

    return (
        <>
            <button
                type='button'
                className='flex items-center justify-center w-full bg-white border-[3px] border-[#80D69C] shadow-md rounded-2xl py-2 px-4 lg:p-3 my-6'
                onClick={handleDownloadEmployeeDetails}
                id="employeeDetailsDownload"
            >
                <p className='lexend font-medium text-md flex items-center gap-3'>
                    {isEmployeeDetailsDownloading && (<Spinner color='green' className='w-5 h-5' />)}
                    Download Employee Details
                </p>
            </button>
        </>
    )
}

export default DownloadEmployeeDetails