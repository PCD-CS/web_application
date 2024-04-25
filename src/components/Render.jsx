import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/Context';
import Homepage from './Admin/Homepage/Homepage';
import Dashboard from './Company/Dashboard/Dashboard';
import Header from './Admin/Homepage/Header/Header';

const Render = () => {

    const { isLoggedIn, logoutUser, userCred } = useGlobalContext();

    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         navigate('/auth/login');
    //     }
    // }, []);

    const userLogoutHandler = () => {
        logoutUser();
        navigate('/auth/login');
    }

    const userRole = userCred?.user?.user_roles

    return (
        <div className='bg-gray-100 min-h-screen'>

            {(userRole === 'Admin' || userRole === 'CEO') && <Header />}

            {userRole === 'Admin' && <Homepage />}
            {userRole === 'CEO' && <Dashboard />}

            {/* {userRole === 'Employer' && <Homepage />}
            {userRole === 'Employee' && <Homepage />} */}

            {/* {userRole !== 'Admin' && userRole !== 'CEO' && (
                <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-5">
                    <p className='poppins text-xl capitalize text-red-500 font-semibold '>
                        You do not have authorization to access this page!
                    </p>
                    <button onClick={userLogoutHandler} className='plusJakartaSans underline underline-offset-2 text-gray-500'>
                        Go back to Login
                    </button>
                </div>
            )} */}
        </div>
    )
}

export default Render