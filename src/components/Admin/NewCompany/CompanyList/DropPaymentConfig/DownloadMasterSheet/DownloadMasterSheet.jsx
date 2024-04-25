import React, { useState, useEffect } from 'react'
import { payrollDownloadMasterSheet } from '../../../../../../network/agent';
import SelectDate from '../../SelectDate';

const DownloadMasterSheet = ({ setError }) => {

    const companyId = localStorage.getItem('companyId')

    const [mastersheetUrl, setMastersheetUrl] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [isMonthYearModalOpen, setIsMonthYearModalOpen] = useState(false);
    const [isMasterSheetDownloading, setIsMasterSheetDownloading] = useState(false);

    // Function to handle Download Attendance Details
    const handleDownloadMasterSheet = () => {
        if (companyId) {
            if (selectedDate) {
                // console.log(selectedDate)
                setIsMasterSheetDownloading(true);
                const params = {
                    company: companyId,
                    month: selectedDate,
                };
                payrollDownloadMasterSheet(params).then((response) => {
                    if (response.error === false) {
                        // console.log(response)
                        // window.open(response.data);
                        setMastersheetUrl(response.data)
                    }
                }).catch((error) => {
                    setError('Unable to download file!')
                    setTimeout(() => {
                        setError('');
                    }, 2000);
                    console.log(error);
                }).finally(() => {
                    setIsMasterSheetDownloading(false);
                })
            } else {
                setIsMonthYearModalOpen(true);
            }
        } else {
            console.log('No Company ID Selected!')
        }
    }

    const handleSelectDate = () => {
        setIsMonthYearModalOpen(!isMonthYearModalOpen);
    }

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    }


    useEffect(() => {
        if (mastersheetUrl) {
            const downloadLink = document.createElement('a');
            downloadLink.href = mastersheetUrl;
            downloadLink.download;
            downloadLink.click();

            setMastersheetUrl('');
            setSelectedDate('')
        }
    }, [mastersheetUrl]);

    return (
        <>
            <button
                type='button'
                className='flex items-center justify-center w-full bg-white border-[3px] border-[#80D69C] shadow-md rounded-2xl py-2 px-4 lg:p-3 mt-6'
                onClick={handleSelectDate}
            >
                <p className='lexend font-medium text-md'>Download Master Sheet</p>
            </button>

            {isMonthYearModalOpen && (
                <div className='my-3'>
                    <SelectDate
                        valueInput={selectedDate}
                        onChangeInput={handleDateChange}
                        onclickCancel={handleSelectDate}
                        onclickDownload={handleDownloadMasterSheet}
                        isDownloading={isMasterSheetDownloading}
                    />
                </div>
            )}
        </>
    )
}

export default DownloadMasterSheet