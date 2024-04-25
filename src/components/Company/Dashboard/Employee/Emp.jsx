import React, { useState, useEffect } from 'react'
import EmpTable from './EmpTable'
import EmpDetail from './EmpDetail'
import { getCompanyEmployees } from "../../../../network/agent";
import { useGlobalContext } from "../../../../context/Context";
import SearchFilter from '../SearchFilter';

const Emp = () => {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    const { userCred } = useGlobalContext();
    const companyId = userCred.company._id;

    const handleUserClick = (userId) => {
        setSelectedUserId(userId);
    };

    useEffect(() => {
        getCompanyEmployees({ company: companyId })
            .then((response) => {
                if (response.error === false) {
                    setEmployees(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1'>

            <div className='col-span-1 sm:col-span-1 lg:col-span-2'>
                <SearchFilter employees={employees} setFilteredEmployees={setFilteredEmployees} />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                <div className='col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-3'>
                    <EmpTable handleUserClick={handleUserClick} employees={filteredEmployees} setEmployees={setEmployees} />
                </div>
                <div className='col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2'>
                    {selectedUserId && <EmpDetail selectedUserId={selectedUserId} />}
                </div>
            </div>
        </div>
    )
}

export default Emp