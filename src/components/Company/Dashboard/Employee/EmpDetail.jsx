import React, { useEffect, useState } from 'react';
import {
    getDetailUserAttendance,
    getEmployeeProfile,
    getUserTaskByID,
} from '../../../../network/agent';
import {
    PieChart,
    Pie,
    ResponsiveContainer,
    Cell,
    Legend,
    Tooltip,
} from 'recharts';
import TaskModal from './TaskModal';

const EmpDetail = ({ selectedUserId }) => {
    const [userTasks, setUserTasks] = useState([]);
    const [employeeId, setEmployeeId] = useState(null);
    const [employeeProfile, setEmployeeProfile] = useState({});
    const [employeeAttendance, setEmployeeAttendance] = useState({});
    const [openTask, setOpenTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleOpenTask = () => setOpenTask(!openTask);

    useEffect(() => {
        getEmployeeProfile(selectedUserId).then((response) => {
            if (response.error === false) {
                setEmployeeId(response.data._id);
                setEmployeeProfile(response.data);
            }
        });

        getUserTaskByID(employeeId).then((response) => {
            if (response.error === false) {
                setUserTasks(response.data);
            }
        });

        getDetailUserAttendance(selectedUserId).then((response) => {
            if (response.error === false) {
                setEmployeeAttendance(response.data);
            }
        });
    }, [selectedUserId, employeeId]);

    // Function to handle task click and open modal if workproof is available
    const handleTaskClick = (task) => {
        setSelectedTask(task);
        handleOpenTask(); // Open the modal
    };

    const total = employeeAttendance.working_days; // Total number of employees
    const presentCount = (employeeAttendance.Present / total) * 100; // Number of employees present
    const absentCount = (employeeAttendance.Absent / total) * 100; // Number of employees absent
    const paidLeaveCount = (employeeAttendance.Paid_leave / total) * 100; // Number of employees on paid Leave

    const chartData = [
        { value: presentCount, name: 'Present', color: '#71EB99' },
        { value: absentCount, name: 'Absent', color: '#F06262' },
        { value: paidLeaveCount, name: 'Paid Leave', color: '#24B6E9' },
    ];

    const COLORS = ['#71EB99', '#F06262', '#24B6E9'];

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        date.setMinutes(date.getMinutes() - 5.5 * 60);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = (date.getHours() % 12 || 12).toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const period = date.getHours() >= 12 ? 'PM' : 'AM';

        return `${day}/${month}/${year} - ${hours}:${minutes} ${period}`;
    };

    // Function to format date of birth
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <>
            <div className='mb-4 border shadow-lg rounded-xl p-4'>
                <p className='text-2xl font-bold plusJakartaSans capitalize'>
                    {employeeProfile.user?.user_roles}
                </p>
                <div className='border px-3 py-5 shadow-lg bg-white rounded-xl my-3 flex flex-col justify-between   md:flex md:flex-row lg:flex lg:flex-row '>
                    <div className='sm:mr-4 self-center'>
                        <img
                            src={employeeProfile.user?.profile_pic}
                            alt='profile'
                            className='w-20 h-20 sm:w-32 sm:h-32 text-xs object-contain'
                        />
                    </div>
                    <div className='text-sm flex-col flex-wrap flex-grow'>
                        <p className='inter font-semibold text-lg my-1'>
                            {employeeProfile.user?.name}
                        </p>
                        <div className='flex flex-wrap justify-between my-1'>
                            <span className='inter font-semibold'>User ID:</span>
                            <span className='text-end'>
                                {employeeProfile.user?.user_id}
                            </span>
                        </div>
                        <div className='flex justify-between my-1'>
                            <p className='inter font-semibold'>DOB:</p>
                            <p>{formatDate(employeeProfile.contact?.date_of_birth)}</p>
                        </div>
                        <div className='flex justify-between my-1'>
                            <p className='inter font-semibold'>Contact No:</p>
                            {employeeProfile.contact?.contact_no}
                        </div>
                        <div className='flex justify-between my-1'>
                            <p className='inter font-semibold'>Email ID:</p>
                            {employeeProfile.contact?.email}
                        </div>
                    </div>
                </div>
                <p className='text-2xl font-bold plusJakartaSans capitalize'>
                    Attendance
                </p>
                <div className='p-3 shadow-lg bg-white rounded-xl my-3 flex flex-wrap items-center justify-center'>
                    <ResponsiveContainer width='100%' height={200}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey='value'
                                nameKey='name'
                                outerRadius={80}
                            >
                                {chartData.map((entry, index) => (
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
                                    padding: '0 10px 0 10px',
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
                            <Legend
                                verticalAlign='middle'
                                align='right'
                                iconSize={10}
                                iconType='circle'
                                layout='vertical'
                                formatter={(value, entry) => {

                                    let count = entry.payload.value
                                    if (isNaN(count) || count === null) {
                                        count = 0;
                                    }

                                    return (
                                        <>
                                            <span className='text-gray-700 text-xs inter font-bold pr-2'>
                                                {`${count.toFixed(0)}%`}
                                            </span>
                                            <span className='text-xs inter text-black font-semibold opacity-50'>
                                                {`${value}`}
                                            </span>
                                        </>
                                    )
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <p className='text-2xl font-bold plusJakartaSans capitalize'>
                    Daily task
                </p>
                <div className='my-3'>
                    {userTasks.length === 0 && (
                        <div className='my-4 text-center'>
                            <p className='text-red-500 font-semibold capitalize poppins'>
                                No Tasks available!
                            </p>
                        </div>
                    )}
                    {userTasks.map((item, index) => {
                        const { task_name, date } = item;
                        return (
                            <div
                                key={item._id}
                                className='border border-l-4 border-[#24B6E9] rounded-xl px-4 py-2 mb-4 bg-white shadow-md hover:bg-blue-50 cursor-pointer'
                                onClick={() => handleTaskClick(item)}
                            >
                                <p className='plusJakartaSans font-semibold text-justify overflow-hidden line-clamp-2'>
                                    {task_name}
                                </p>
                                <p className='plusJakartaSans text-[0.7rem] font-medium text-end'>
                                    {formatTimestamp(date)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {selectedTask && (
                <TaskModal
                    openTask={openTask}
                    handleOpenTask={handleOpenTask}
                    task={selectedTask}
                    formatTimestamp={formatTimestamp}
                />
            )}
        </>
    );
};

export default EmpDetail;
