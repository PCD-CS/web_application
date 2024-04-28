import React, { useEffect, useState } from 'react';
import { markEmployeeEmployerAttendance } from '../../../../../network/agent';

const PresentAbsentButton = ({ attendance, attendanceData }) => {
    // console.log(attendance)
    const [isStatus, setIsStatus] = useState("Absent");
    const [hoursWorked, setHoursWorked] = useState('');
    const [isAttendance, setIsAttendance] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState();

    const handleSelectChange = (e) => {
        setIsStatus(e.target.value);
    };

    const handleHoursChange = (e) => {
        setHoursWorked(e.target.value);
    };

    const handleSubmit = () => {
        setIsSubmitting(false);
        const data = {
            user: attendanceData.user,
            date: attendanceData.date,
            status: isStatus,
            hours: isStatus === "Present" ? hoursWorked : 0
        };
        markEmployeeEmployerAttendance(data).then((response) => {
            if (response.error === false) {
                setIsSubmitting(true);
                // console.log(response);
                setIsAttendance(response.data.status);
                setMessage(response.message)
                setTimeout(() => {
                    setMessage()
                }, 2000)
            }
        });
    };

    return (
        <div>
            {attendance === null ? (
                <div className='flex items-center'>

                    {isSubmitting === true ? <>
                        <div className={`${isStatus === 'Present' ? 'text-green-500 border-green-700' : 'text-red-500 border-red-700'} w-fit py-1 px-2 rounded-lg text-sm font-medium plusJakartaSans border bg-white`}>{isStatus}</div>
                    </> :
                        <div>
                            <p htmlFor="markAttendance" className='text-xs mb-1'>Mark Attendance:</p>
                            <select name="Mark Attendance" id="markAttendance" onChange={handleSelectChange} className='p-1 mb-2 border border-gray-500 focus:border-blue-500 outline-none rounded-lg'>
                                <option value="Select Attendance" disabled>Select Attendance</option>
                                <option value="Absent">Absent</option>
                                <option value="Present">Present</option>
                            </select>
                        </div>
                    }

                    {isStatus === "Present" ? (
                        <div className='bg-white p-2 rounded-lg w-26 mx-2'>
                            {
                                isSubmitting === false && <>
                                    <p htmlFor="workingHours" className='text-xs mr-2 mb-1'>Enter Working Hours:</p>
                                    <input id="workingHours" type="number" value={hoursWorked} onChange={handleHoursChange} placeholder="E.g 9" className='w-20 placeholder:text-sm border border-gray-500 focus:border-blue-500 outline-none rounded-lg px-2 py-[0.15rem]' />
                                    <button className='mx-2 bg-green-500 text-white text-sm font-medium px-2 py-1 rounded-lg disabled:cursor-not-allowed' onClick={handleSubmit} disabled={isSubmitting || (isStatus === "Present" && hoursWorked === " ")}>Submit</button>
                                </>
                            }
                        </div>
                    ) : (
                        <>
                            {
                                isSubmitting === false &&
                                <button button className='mx-2 bg-green-500 text-white text-sm font-medium px-2 py-1 rounded-lg' onClick={handleSubmit} >Submit</button>
                            }
                        </>
                    )}
                </div>
            ) : (
                <div className={`${attendance === 'Present' ? 'text-green-500 border-green-700' : 'text-red-500 border-red-700'} w-fit plusJakartaSans border bg-white py-1 px-2 rounded-lg text-sm font-medium plusJakartaSans`}>{attendance ? attendance : isAttendance}</div>
            )
            }
            {/* {message && <div className='text-xs text-gray-700 mt-1 capitalize'>{message} !</div>} */}
        </div>
    );
};

export default PresentAbsentButton;
