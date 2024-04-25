import React, { useEffect, useState } from 'react'
import { SearchIcon2, ArrowDropdownIcon, Filter } from '../../UI/Icons'

const SearchFilter = ({ employees, setFilteredEmployees }) => {

    const [searchQuery, setSearchQuery] = useState('');

    // Function to filter employees based on search query
    useEffect(() => {
        const filtered = employees.filter((employee) => {
            const { user, category, status } = employee;
            return (
                user.user_roles.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.user_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                status.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });

        setFilteredEmployees(filtered);
    }, [searchQuery, employees]);


    return (
        <div className='flex flex-col sm:flex-row items-center justify-between bg-white px-4 py-2 rounded-xl mb-3'>

            {/* Search input */}
            <div className="flex items-center w-full sm:w-4/5 relative mb-2 sm:mb-0">
                <div className='ml-3 mr-2 absolute'>
                    <SearchIcon2 />
                </div>
                <input
                    type="search"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-black rounded-lg w-full sm:w-[69.25rem] outline-none bg-transparent focus:border-blue-500 plusJakartaSans placeholder:text-black placeholder:text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Sort and Filter buttons */}
            {/* <div className="flex flex-wrap items-center sm:space-y-0 space-x-2"> */}
            {/* <button type='button' className='flex items-center bg-[#D9D9D9] space-x-2 py-1 px-2 rounded-lg'>
                    <p className='text-sm ptSans text-[#1A2B8885] font-semibold'>Sort by</p>
                    <div className='w-4'>
                        <ArrowDropdownIcon />
                    </div>
                </button> */}

            {/* <button type='button' className='flex items-center bg-[#D9D9D9] space-x-2 py-1 px-2 rounded-lg'>
                    <p className='text-sm ptSans text-[#1A2B8885] font-semibold'>Filter</p>
                    <div className='w-4'>
                        <Filter />
                    </div>
                </button> */}
            {/* </div> */}

        </div>
    )
}

export default SearchFilter
