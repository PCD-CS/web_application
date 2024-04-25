import React, { useState, useEffect } from 'react';
import { Select, Option } from '@material-tailwind/react';
import user_image from '../../../assets/images/user_image.png'
import NewEmployee from './NewEmployee';
import { getEmployeeCategoryList, getCompanyList, getEmployerList, getEmployerListByCompany } from '../../../network/agent';
import SelectAccontForm from './SelectAccontForm';

const SelectAccount = () => {
    const accountTypes = [
        { name: 'Employee' },
        { name: 'Employer' },
    ];

    const [selectedAccount, setSelectedAccount] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedEmployer, setSelectedEmployer] = useState(null);

    const [employers, setEmployers] = useState([]);
    const [employersByCompany, setEmployersByCompany] = useState([]);
    const [employeeCategory, setEmployeeCategory] = useState([]);
    const [company, setCompany] = useState([]);

    const handleItemClick = (index) => {
        setSelectedAccount(index);
    };

    const handleCompanyChange = (companyId) => {
        setSelectedCompany(companyId);
    };

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleEmployerChange = (employerId) => {
        setSelectedEmployer(employerId);
    };

    useEffect(() => {
        getEmployeeCategoryList()
            .then((response) => {
                if (response.error === false) {
                    // console.log('EmployeeCategoryList: ', response.data)
                    setEmployeeCategory(response.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching employee category:', error);
            });

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

        getEmployerList()
            .then((response) => {
                if (response.error === false) {
                    // console.log('1 EmployerList: ', response.data)
                    setEmployers(response.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching companies:', error);
            });
    }, []);

    useEffect(() => {
        if (selectedCompany) {
            getEmployerListByCompany({ company: selectedCompany })
                .then((response) => {
                    if (response.error === false) {
                        // console.log('2 EmployerList: ', response.data);
                        setEmployersByCompany(response.data);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching employers:', error);
                });
        }
    }, [selectedCompany]);

    // Filter employers based on the selected company
    const filteredEmployers = employersByCompany.filter((employer) => {
        return employer.company._id === selectedCompany;
    });


    const title = selectedAccount ? `New ${selectedAccount === 'Employer' ? 'Supervisor' : selectedAccount}` : 'Select Account Type';

    return (
        <div>
            <h1 className='text-center uppercase font-semibold text-2xl pb-4 poppins'>{title}</h1>

            {selectedAccount === null ? (
                <SelectAccontForm selectedAccount={selectedAccount} accountTypes={accountTypes} handleItemClick={handleItemClick} />
            ) : (
                <div>
                    {selectedAccount === 'Employee' && (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4'>

                            <div>
                                <Select
                                    color='blue'
                                    size='lg'
                                    label='Select Employee Category'
                                    onChange={(e) => handleCategoryChange(e)}
                                    // value={selectedCategory || ''}
                                >
                                    {employeeCategory.length === 0 ? (
                                        <p className='text-center font-medium italic capitalize text-red-500/70'>No Employee Category Found!</p>
                                    ) : (
                                        employeeCategory.map((item) => {
                                            const { _id, category_name } = item;
                                            return (
                                                <Option key={_id} value={_id} className='mb-1'>
                                                    {category_name}
                                                </Option>
                                            );
                                        })
                                    )}
                                </Select>
                            </div>

                            <div>
                                <Select
                                    color='blue'
                                    size='lg'
                                    label='Select Company'
                                    onChange={(e) => handleCompanyChange(e)}
                                    // value={selectedCompany || ''}
                                >
                                    {company.length === 0 ? (
                                        <p className='text-center font-medium italic capitalize text-red-500/70'>No Company Found!</p>
                                    ) : (
                                        company.map((item) => {
                                            const { _id, ceo } = item;
                                            return (
                                                <Option key={_id} value={_id} className='mb-1'>
                                                    {ceo.name}
                                                </Option>
                                            );
                                        })
                                    )}
                                </Select>
                            </div>
                            {
                                selectedCompany ? (
                                    <div>
                                        <Select
                                            color='blue'
                                            size='lg'
                                            label='Select Supervisor'
                                            onChange={(e) => handleEmployerChange(e)}
                                            // value={selectedEmployer || ''}
                                        >
                                            {filteredEmployers.length === 0 ? (
                                                <p className='text-center font-medium italic capitalize text-red-500/70'>Supervisor Not Found for this company!</p>
                                            ) : (
                                                filteredEmployers.map((item) => {
                                                    const { _id, user } = item;
                                                    return (
                                                        <Option key={_id} value={_id} className='mb-1'>
                                                            {user.name}
                                                        </Option>
                                                    );
                                                })
                                            )}
                                        </Select>
                                    </div>
                                ) : (
                                    <div>
                                        <Select
                                            color='blue'
                                            size='lg'
                                            label='Select Supervisor'
                                            onChange={(e) => handleEmployerChange(e)}
                                            // value={selectedEmployer || ''}
                                        >
                                            {employers.length === 0 ? (
                                                <p className='text-center font-medium italic capitalize text-red-500/70'>No Supervisor Found!</p>
                                            ) : (
                                                employers.map((item) => {
                                                    const { _id, user } = item;
                                                    return (
                                                        <Option key={_id} value={_id} className='mb-1'>
                                                            {user.name}
                                                        </Option>
                                                    );
                                                })
                                            )}
                                        </Select>
                                    </div>
                                )
                            }
                        </div>

                    )}

                    {selectedAccount === 'Employer' && (
                        <div className='grid grid-cols-3 gap-x-8 gap-y-4'>
                            {/* <div className='col-span-12 md:col-span-4  sm:col-span-12'> */}
                            <Select
                                color='blue'
                                size='lg'
                                label='Select Company'
                                onChange={(e) => handleCompanyChange(e)}
                                // value={selectedCompany || ''}
                            >
                                {company.length === 0 ? (
                                    <p className='text-center font-medium italic capitalize text-red-500/70'>No Company Found!</p>
                                ) : (
                                    company.map((item) => {
                                        const { _id, ceo } = item;
                                        return (
                                            <Option key={_id} value={_id} className='mb-1'>
                                                {ceo.name}
                                            </Option>
                                        );
                                    })
                                )}
                            </Select>
                            {/* </div> */}
                        </div>
                    )}
                </div>
            )
            }

            {
                selectedAccount !== null && (
                    <NewEmployee selectedAccount={selectedAccount} selectedCategory={selectedCategory} selectedCompany={selectedCompany} selectedEmployer={selectedEmployer} />
                )
            }
        </div>
    );
};

export default SelectAccount;
