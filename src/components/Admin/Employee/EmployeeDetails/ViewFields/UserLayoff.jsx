import React, { useEffect, useState } from 'react'
import Toggle from 'react-toggle'
import { layoffUser, unlayoffUser, getCompanyList } from '../../../../../network/agent';

const UserLayoff = ({ active, userID, user_roles, setMessage }) => {

    const [isUserActive, setIsUserActive] = useState(active);
    const [company, setCompany] = useState([]);
    const [companyId, setCompanyId] = useState(null);
    const [selectCompany, setSelectCompany] = useState(false)

    const handleCompanyChange = (companyId) => {
        setCompanyId(companyId);
    };

    useEffect(() => {
        getCompanyList()
            .then((response) => {
                if (response.error === false) {
                    // console.log('CompanyList: ', response.data)
                    setCompany(response.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching companies:', error);
            });
    }, [])

    // function to Toggle Layoff
    const handleUserLayoff = () => {
        if (isUserActive) {
            setSelectCompany(false)
            // Layoff the user
            layoffUser({ id: userID }).then((response) => {
                if (response.error === false) {
                    // console.log(response.data);
                    setMessage('Layoff Successfully!')
                    setIsUserActive(false);
                    setSelectCompany(false)

                    setTimeout(() => {
                        setMessage('')
                    }, [2000])
                }
            }).catch((error) => {
                console.log(error);
                setMessage('Something Went Wrong!')
            });
        } else {
            setSelectCompany(!selectCompany)
        }
    }

    const handleActivate = () => {

        unlayoffUser({ user_id: userID, company_id: companyId }).then((response) => {
            if (response.error === false) {
                // console.log(response.data);
                setMessage('Activated Successfully!')
                setIsUserActive(true);
                setSelectCompany(false)

                setTimeout(() => {
                    setMessage('')
                }, [2000])
            }
        }).catch((error) => {
            console.log(error);
            setMessage('Something Went Wrong!')
        });
    }

    return (
        <>
            <div>
                <div className={`relative flex space-x-5 items-center justify-center border p-5 ${isUserActive ? 'bg-green-100/50' : 'bg-red-100/50'}  shadow-md rounded-lg`}>
                    {/* <span
                        id='layoff-label'
                        className='absolute top-1 left-3 text-xs'>
                        Layoff
                    </span> */}
                    <span
                        className={`text-sm text-center font-bold uppercase plusJakartaSans ${isUserActive ? 'text-green-500' : 'text-red-500'}`}
                    >
                        {isUserActive ? `${user_roles === 'Employer' ? 'Supervisor' : 'Employee'} Active` : `${user_roles === 'Employer' ? 'Supervisor' : 'Employee'} Inactive`}
                    </span>
                    <Toggle
                        id='layoff'
                        aria-labelledby='layoff-label'
                        onChange={handleUserLayoff}
                        defaultChecked={isUserActive}
                    // disabled={!isUserActive}
                    />
                    {/* {
                        !isUserActive && (
                            <button onClick={handleUserUnlayoff} className='text-xs bg-white rounded-xl p-1 font-medium shadow-md focus:shadow-none'>Activate Again</button>
                        )
                    } */}
                </div>
            </div>

            {
                !isUserActive && selectCompany && (
                    <div className='bg-white py-3 px-5 m-2 rounded-lg shadow-md'>
                        <p className='text-sm text-center font-semibold'>Select Company</p>
                        <div className='my-3'>
                            <select
                                className='text-sm p-2 ring-1 ring-gray-400 rounded-lg w-full outline-none'
                                onChange={(e) => handleCompanyChange(e.target.value)}
                            >
                                {company.length === 0 ? (
                                    <p className='text-center font-medium italic capitalize text-red-500/70'>No Company Found!</p>
                                ) : (
                                    company.map((item) => {
                                        const { _id, ceo } = item;
                                        return (
                                            <option key={_id} value={_id}>
                                                {ceo.name}
                                            </option>
                                        );
                                    })
                                )}
                            </select>
                        </div>
                        <div className='text-center'>
                            <button
                                className='bg-green-500 text-white text-sm px-3 py-1 rounded-lg'
                                onClick={handleActivate}
                            >
                                Activate
                            </button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default UserLayoff