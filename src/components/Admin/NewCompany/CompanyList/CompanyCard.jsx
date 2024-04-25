import React from 'react'
import { DoubleOverlappingRightArrow } from '../../../UI/Icons'
import default_image from '../../../../assets/images/default_image.svg'

const CompanyCard = ({ filteredCompanies, handleCompanyCardClick }) => {

    return (
        <div>
            {
                filteredCompanies.map((item, index) => {
                    {/* console.log(item.ceo.user_id) */}
                    const { _id, ceo, totalEmployees } = item
                    const { name, profile_pic, user_id } = ceo

                    return (
                        <div
                            key={_id}
                            className="flex justify-between items-center border border-[#24B6E959] shadow-lg shadow-blue-gray-900/5 mb-5 rounded-[1.25rem] bg-white py-2 px-4 lg:p-4 relative cursor-pointer "
                            onClick={() => handleCompanyCardClick(_id, user_id, name)}
                        >

                            {/* Left Section */}
                            <div className='mr-3 sm:hidden md:hidden lg:block'>
                                <img src={profile_pic ? profile_pic : default_image} alt='' className='object-cover text-xs w-9 h-9 rounded-full border' />
                            </div>

                            {/* Center Section */}
                            <div className='flex-grow space-y-1'>
                                <p className='font-medium'>{name}</p>
                                <p className='font-medium justify-end'>
                                    {totalEmployees}/<span className='text-xs font-normal'>Employees</span>
                                </p>
                            </div>

                            {/* Right Section */}
                            <div className='absolute right-4 ml-2 sm:hidden md:hidden lg:block'>
                                <DoubleOverlappingRightArrow />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CompanyCard