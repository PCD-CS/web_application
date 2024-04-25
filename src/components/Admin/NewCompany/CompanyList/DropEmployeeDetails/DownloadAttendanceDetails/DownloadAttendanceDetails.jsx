import React, { useEffect, useState } from 'react'
import { payrollAttendanceDetails } from '../../../../../../network/agent';
import SelectDate from '../../SelectDate';

const DownloadAttendanceDetails = ({ setError }) => {

    const companyId = localStorage.getItem('companyId')

    const [isAttendanceDetailsDownloading, setIsAttendanceDetailsDownloading] = useState(false);
    const [attendanceUrl, setAttendanceUrl] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [isMonthYearModalOpen, setIsMonthYearModalOpen] = useState(false);

    // Function to handle Download Attendance Details
    const handleDownloadAttendanceDetails = () => {
        if (companyId) {
            if (selectedDate) {
                // console.log(selectedDate)
                setIsAttendanceDetailsDownloading(true);
                const params = {
                    company: companyId,
                    month: selectedDate,
                };
                payrollAttendanceDetails(params).then((response) => {
                    if (response.error === false) {
                        // console.log(response)
                        // window.open(response.data);
                        setAttendanceUrl(response.data)
                    }
                }).catch((error) => {
                    setError('Unable to download file!')
                    setTimeout(() => {
                        setError('');
                    }, 2000);
                    console.log(error);
                }).finally(() => {
                    setIsAttendanceDetailsDownloading(false);
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
        if (attendanceUrl) {
            const downloadLink = document.createElement('a');
            downloadLink.href = attendanceUrl;
            downloadLink.download;
            downloadLink.click();

            setAttendanceUrl('');
            setSelectedDate('')
        }
    }, [attendanceUrl]);

    return (
        <>
            <button
                type='button'
                className="flex items-center justify-center w-full bg-white border-[3px] border-[#80D69C] shadow-md rounded-2xl py-2 px-4 lg:p-3"
                onClick={handleSelectDate}
            >
                <p className='lexend font-medium text-md flex items-center gap-2'>
                    Download Attendance Details
                </p>
            </button>

            {/* Modal for selecting month and year */}
            {isMonthYearModalOpen && (
                <div className='my-3'>
                    <SelectDate
                        valueInput={selectedDate}
                        onChangeInput={handleDateChange}
                        onclickCancel={handleSelectDate}
                        onclickDownload={handleDownloadAttendanceDetails}
                        isDownloading={isAttendanceDetailsDownloading}
                    />
                </div>
            )}
        </>
    )
}

export default DownloadAttendanceDetails