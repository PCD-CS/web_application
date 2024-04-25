import React, { useState } from 'react'
import { SearchIcon2 } from '../../../UI/Icons'

const Search = ({ setFilteredCompanies, companies }) => {

    const [searchQuery, setSearchQuery] = useState('');

    // Function to handle search input change and filter companies
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Filter companies based on the search query
        const filtered = companies.filter((company) =>
            company.ceo.name.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredCompanies(filtered);
    };

    return (
        <div className='flex items-center w-full relative'>
            <div className='ml-3 mr-2 absolute'>
                <SearchIcon2 />
            </div>
            <input
                type='search'
                placeholder='Search...'
                className='pl-10 pr-4 py-2 border border-black rounded-lg  w-[69.25rem] outline-none bg-transparent focus:border-blue-500 plusJakartaSans placeholder:text-black placeholder:text-sm'
                value={searchQuery}
                onChange={handleSearchChange}
            />
        </div>
    )
}

export default Search