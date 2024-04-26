import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import NewSignup from '../NewSignup/NewSignup';
import Communication from '../Communication/Communication';
import Help from '../Help/Help';
import EmployeeDetails from '../Employee/EmployeeDetails/EmployeeDetails';
import NewCompany from '../NewCompany/NewCompany';
import CompanyList from '../NewCompany/CompanyList/CompanyList';
import SelectAccount from '../Employee/SelectAccount';
import ChangePasswordRequests from '../PasswordRequests/PasswordRequests';
import mapralLogo from '../../../assets/images/mapral_logo_1.jpg'

const Homepage = () => {

    const [selectedPage, setSelectedPage] = useState(null);

    const renderPage = () => {

        switch (selectedPage) {
            case 'NewEmployee':
                return <SelectAccount />;
            case 'NewCompany':
                return <NewCompany />;
            case 'CompanyList':
                return <CompanyList />;
            case 'EmployeeDetails':
                return <EmployeeDetails />;
            // case 'NewSignup':
                // return <NewSignup />;
            case 'PasswordRequests':
                return <ChangePasswordRequests />;
            // case 'Communication':
            //     return <Communication />;
            // case 'Help':
            //     return <Help />;
            default:
                return <div className='flex justify-center items-center'>
                    {/* <img src={mapralLogo} alt="" className='h-96 opacity-25' style={{ mixBlendMode: 'multiply' }} /> */}
                </div>

        }

    }


    return (
        <>
            <div className='grid grid-cols-12 gap-4 px-5 py-5'>

                <div className='col-span-2 mt-16 hidden md:block'>
                    <Sidebar setSelectedPage={setSelectedPage} />
                </div>

                <div className={`col-span-10 mx-auto my-16 w-5/6`}>
                    {renderPage()}
                </div>
            </div>
        </>
    );
};

export default Homepage;
