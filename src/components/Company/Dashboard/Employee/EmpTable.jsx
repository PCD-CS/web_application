import React, { useState, useEffect } from 'react';
import {
    Typography,
    Avatar,
} from "@material-tailwind/react";
import { Next, Previous } from '../../../UI/Icons';

const TABLE_HEAD = ["Profile", "ID", "Working Ratio", "Department"];
const EMPLOYEES_PER_PAGE = 10;

const EmpTable = ({ handleUserClick, employees }) => {

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1); // Reset to the first page when employees change.
    }, [employees]);

    // Calculate the total number of pages based on the number of employees.
    const totalPages = Math.ceil(employees.length / EMPLOYEES_PER_PAGE);

    // previous button
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // next button
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // page number
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate the range of employees to display on the current page.
    const startIndex = (currentPage - 1) * EMPLOYEES_PER_PAGE;
    const endIndex = startIndex + EMPLOYEES_PER_PAGE;
    const currentEmployees = employees.slice(startIndex, endIndex);

    return (
        <div className="overflow-x-scroll lg:overflow-auto shadow-lg rounded-xl">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head, index) => {
                            return (

                                <th
                                    key={head}
                                    className="border-b border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center justify-between gap-1 font-medium leading-none"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            )

                        })}
                    </tr>
                </thead>
                <tbody>

                    {currentEmployees.length === 0 && (
                        <tr className=''>
                            <td colSpan={TABLE_HEAD.length}>
                                <p className='text-red-500 py-4 px-4 md:text-center lg:text-center font-semibold capitalize poppins'>No Employees available!</p>
                            </td>
                        </tr>
                    )}

                    {currentEmployees.map((item, index) => {
                        const isLast = index === employees.length - 1;
                        const classes = isLast
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-50";

                        const { attendance, user, category, status } = item
                        const { Absent, Paid_leave, Present, Weekly_leave, working_days } = attendance
                        const { name, profile_pic, user_id, user_roles, _id } = user

                        const total = working_days; // Total number of employees
                        let presentCount = (Present / total) * 100; // Number of employees present
                        if (isNaN(presentCount) || presentCount === null) {
                            presentCount = 0;
                        }
                        let absentCount = (Absent / total) * 100; // Number of employees absent
                        if (isNaN(absentCount) || absentCount === null) {
                            absentCount = 0;
                        }

                        let paidLeaveCount = (Paid_leave / total) * 100; // Number of employees on paid Leave
                        if (isNaN(paidLeaveCount) || paidLeaveCount === null) {
                            paidLeaveCount = 0;
                        }

                        let statusColor = "";
                        if (status === "Absent") {
                            statusColor = "red";
                        } else {
                            statusColor = "green";
                        }

                        return (
                            <tr
                                key={_id}
                                className="cursor-pointer bg-white"
                                onClick={() => handleUserClick(_id)}
                            >
                                {/* Profile */}
                                <td className={classes}>
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <Avatar src={profile_pic} alt="profile" size="sm" />
                                            <div className={`bg-${statusColor}-500 absolute right-0 bottom-0 ring-2 ring-white w-3 h-3 rounded-full`}></div>
                                        </div>
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                <span className='inter font-normal'>{name}</span>
                                            </Typography>
                                        </div>
                                    </div>
                                </td>

                                {/* ID */}
                                <td className={classes}>
                                    <div className="flex flex-col">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                        >
                                            <span className='inter font-normal'>{user_id}</span>
                                        </Typography>
                                    </div>
                                </td>

                                {/* Working Ratio */}
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                    >
                                        <p className='inter font-normal'>
                                            {`${presentCount.toFixed(0)}%`} <span className='text-xs text-[#4DE57FCC]'>Present</span>
                                        </p>
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                    >
                                        <p className='inter font-normal'>
                                            {`${absentCount.toFixed(0)}%`} <span className='text-xs text-[#EE4C4CE0]'>Absent</span>
                                        </p>
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                    >
                                        <p className='inter font-normal'>
                                            {`${paidLeaveCount.toFixed(0)}%`} <span className='text-xs text-[#5250B2CC]'>Paid Leave</span>
                                        </p>
                                    </Typography>
                                </td>

                                {/* Department */}
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                    >
                                        <span className="inter font-normal bg-yellow-700 w-full px-3 py-2 shadow-md plusJakartaSans rounded-3xl">{category}</span>
                                    </Typography>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="w-full">
                <div className="flex items-center justify-between border-t border-blue-gray-100 bg-blue-gray-50/50 p-3 transition-colors">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        <Previous />
                    </button>

                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageClick(index + 1)}
                                className={`${currentPage === index + 1 ? 'bg-white shadow-md' : ''} border px-2 rounded-full`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        <Next />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EmpTable
