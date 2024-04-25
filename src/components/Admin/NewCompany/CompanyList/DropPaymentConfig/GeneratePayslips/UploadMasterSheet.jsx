import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { UploadIcon } from '../../../../../UI/Icons';
import EmployeePayslipCard from './EmployeePayslipCard';
import { BASE_URL } from '../../../../../../network/apiClient';

const UploadMasterSheet = () => {

    const companyId = localStorage.getItem('companyId')

    const masterSheetRef = useRef(null);

    const [masterSheetData, setMasterSheetData] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null)
    const [generating, setGenerating] = useState(false)
    const [message, setMessage] = useState(false)
    const [dataPresent, setDataPresent] = useState(false);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    };

    // function to upload files
    const handleUploadFile = async () => {

        if (selectedFile) {
            try {
                setGenerating(true)
                const formData = new FormData();
                formData.append("file", selectedFile);
                formData.append("company", companyId);

                const token = localStorage.getItem('token');
                const headers = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`,
                };
                const response = await axios.post(`${BASE_URL}payroll/payslips`,
                    formData,
                    { headers }
                )

                if (response.data.error === false) {
                    // console.log(response.data.data);
                    setMasterSheetData(response.data.data);
                    setMessage(true)
                    setDataPresent(true)
                }

                setSelectedFile(null);
                if (masterSheetRef.current) {
                    masterSheetRef.current.value = ''; // Reset the file input value
                }

                setTimeout(() => {
                    setMessage(false);
                }, 1000);

            } catch (error) {
                console.error("Error uploading file:", error);
            } finally {
                setGenerating(false);
            }
        };
    }

    // function to select files
    const handleSelectFileMasterSheet = () => {
        masterSheetRef.current.click();
    };

    return (
        <div className='bg-gray-100 p-5 min-h-screen'>
            <div className='text-center my-5'>
                <p className='plusJakartaSans text-2xl font-bold'>Generate Pay-slips</p>
            </div>
            <div className='flex justify-center items-center'>
                <div className='p-4 border bg-white shadow-lg rounded-xl space-y-3'>
                    <div className='w-80 relative border p-6 rounded-lg overflow-auto'>
                        <p
                            className="absolute top-[0.85rem] left-4 pb-2 text-sm right-10 cursor-pointer"
                            onClick={handleSelectFileMasterSheet}
                        >
                            {selectedFile ? selectedFile.name : 'Upload Master Sheet'}
                        </p>
                        <input
                            type="file"
                            ref={masterSheetRef}
                            accept=".xlsx"
                            name="masterSheet"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <button
                            onClick={handleSelectFileMasterSheet}
                            className="absolute top-4 right-4 cursor-pointer focus:outline-none"
                        >
                            <UploadIcon />
                        </button>
                    </div>

                    <div className='text-center'>
                        <button
                            className="bg-blue-300 text-white px-3 py-1 rounded-lg shadow-md focus:shadow-none"
                            onClick={generating ? null : handleUploadFile}
                        >
                            {generating ? 'Generating...' : 'Generate'}
                        </button>
                    </div>

                    {message && (
                        <p className='mx-2 text-center font-medium text-xs italic text-green-500'>
                            Payslip Generated!
                        </p>
                    )}
                </div>
            </div>

            {
                dataPresent && (
                    <EmployeePayslipCard masterSheetData={masterSheetData} dataPresent={dataPresent} />
                )
            }


        </div>
    )
}

export default UploadMasterSheet