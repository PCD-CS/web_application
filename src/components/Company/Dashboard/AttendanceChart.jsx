import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../context/Context';
import { getCompanyAttendance } from '../../../network/agent';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const AttendanceChart = () => {
    const { userCred } = useGlobalContext();
    const companyId = userCred.company._id;

    const [attendance, setAttendance] = useState({});

    useEffect(() => {
        getCompanyAttendance({ company: companyId })
            .then((response) => {
                if (response.error === false) {
                    setAttendance(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Calculate percentages
    const total = attendance.total; // Total number of employees
    let presentCount = (attendance.Present / total) * 100; // Number of employees present
    if (isNaN(presentCount) || presentCount === null) {
        presentCount = 0;
    }
    let absentCount = (attendance.Absent / total) * 100; // Number of employees absent
    if (isNaN(absentCount) || absentCount === null) {
        absentCount = 0;
    }

    let paidLeaveCount = (attendance.Paid_leave / total) * 100; // Number of employees on paid Leave
    if (isNaN(paidLeaveCount) || paidLeaveCount === null) {
        paidLeaveCount = 0;
    }

    const data = [
        { name: 'Present', value: presentCount, color: '#1B59F8' },
        { name: 'Absent', value: absentCount, color: '#1B59F875' },
        { name: 'Paid Leave', value: paidLeaveCount, color: '#00000033' }
    ];

    const COLORS = ['#1B59F8', '#1B59F875', '#00000033'];

    return (
        <div>
            <div className="border rounded-3xl p-4 shadow-md shadow-gray-500 bg-white">
                <div className='px-2'>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={45}
                                outerRadius={85}
                                paddingAngle={3}
                                cornerRadius={5}
                                startAngle={0}
                                endAngle={360}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    background: '#fff',
                                    border: '1px solid #ccc',
                                    borderRadius: '10px',
                                    fontSize: '11px',
                                    padding: '0 10px 0 10px'
                                }}
                                formatter={(value, entry) => {
                                    return (
                                        <>
                                            <span className='text-gray-700 text-xs inter font-semibold'>
                                                {`${value.toFixed(0)}%`}
                                            </span>
                                        </>
                                    )
                                }}
                            />
                            {/* <Legend
                                verticalAlign='bottom'
                                align='center'
                                iconSize={10}
                                formatter={(value, entry) => (  
                                    <>
                                        <span className='text-gray-700 text-xs inter font-bold pr-2'>{`${entry.payload.value}%`}</span>
                                        <span className='text-xs inter text-black font-semibold opacity-50'>{`${value}`}</span>
                                    </>
                                )}
                            /> */}
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className='px-4 py-2'>
                    <p className="text-[#4D4D4D] text-sm inter font-semibold">Today's Attendance</p>
                    <p className="inter font-bold text-2xl">{attendance.total}  <span className='text-xs inter font-medium text-gray-600'>Total Days</span></p>

                    <div>
                        <div className="flex items-center space-x-2 my-1">
                            <div className="bg-[#1B59F8] w-3 h-2 p-1 rounded-full"></div>
                            <p className="text-gray-700 text-xs inter font-bold w-10">{presentCount.toFixed(0)}%</p>
                            <p className="text-[#4DE57FCC] text-xs inter font-semibold">Present</p>
                        </div>
                        <div className="flex items-center space-x-2 my-1">
                            <div className="bg-[#1B59F875] w-3 h-2 p-1 rounded-full"></div>
                            <p className="text-gray-700 text-xs inter font-semibold w-10">{absentCount.toFixed(0)}%</p>
                            <p className="text-[#EE4C4CE0] text-xs inter font-semibold">Absent</p>
                        </div>
                        <div className="flex items-center space-x-2 my-1">
                            <div className="bg-[#00000033] w-3 h-2 p-1 rounded-full"></div>
                            <p className="text-gray-700 text-xs inter font-semibold w-10">{paidLeaveCount.toFixed(0)}%</p>
                            <p className="text-[#5250B2CC] text-xs inter font-semibold">Paid Leave</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceChart;
