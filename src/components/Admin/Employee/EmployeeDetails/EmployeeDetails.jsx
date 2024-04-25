import React, { useEffect, useState } from 'react'
import { getCompanyById, getEmployeeList, getEmployeeProfile, getEmployerList } from '../../../../network/agent'
import { Filter, SearchIcon2 } from '../../../UI/Icons'
import Profile from './Profile'
import default_image from '../../../../assets/images/default_image.svg'

const EmployeeDetails = () => {

  const [employees, setEmployees] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [companyDetails, setCompanyDetails] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filteredSupervisors, setFilteredSupervisors] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchEmployeeData = () => {
    getEmployeeList().then((response) => {
      if (response.error === false) {
        // console.log(response.data)
        setEmployees(response.data);
      }
    });
  };

  const fetchEmployerData = () => {
    getEmployerList().then((response) => {
      if (response.error === false) {
        // console.log(response.data)
        setEmployers(response.data);
      }
    });
  }

  useEffect(() => {
    fetchEmployeeData();
    fetchEmployerData()
  }, []);

  // Function to filter employees based on search query
  useEffect(() => {
    const filtered = employees.filter((employee) => {
      const { user, contact, category, company } = employee;

      // Check if any field matches the search query
      return (
        user.user_roles.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.user_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.category_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.ceo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.contact_no.includes(searchQuery) ||
        contact.date_of_birth.includes(searchQuery)
      );
    });

    setFilteredEmployees(filtered);
  }, [searchQuery, employees]);

  // Function to filter employers/supervisors based on search query
  useEffect(() => {
    const filtered = employers.filter((employer) => {
      const { user, contact, company } = employer;

      // Check if any field matches the search query
      return (
        user.user_roles.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.user_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.ceo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.contact_no.includes(searchQuery) ||
        contact.date_of_birth.includes(searchQuery)
      );
    });

    setFilteredSupervisors(filtered);
  }, [searchQuery, employers]);


  // Function to handle user card click and set the selected user
  const handleUserCardClick = (user) => {
    const userId = user.user._id

    getEmployeeProfile(userId).then((response) => {
      if (response.error === false) {
        // console.log(response.data)
        setSelectedUser(response.data);

        // Fetch company details
        const companyId = response.data?.company;
        if (companyId) {
          getCompanyById(companyId).then((companyResponse) => {
            if (companyResponse.error === false) {
              // console.log(companyResponse.data)
              setCompanyDetails(companyResponse.data);
            }
          });
        }
      }
    }).catch((error) => {
      console.log(error)
    })

    // setSelectedUser(user);
  };

  // Close employee details
  const handleBackToEmployeeList = () => {
    setSelectedUser(null);
  };

  // Function to format date of birth
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() - 5.5 * 60);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return dateString ? `${day}/${month}/${year}` : '-';
  };

  useEffect(() => {
    if (selectedUser === null) {
      // Update employees when going back to the employee list
      fetchEmployeeData();
      fetchEmployerData()
    }
  }, [selectedUser]);

  return (
    <div>
      {selectedUser ? (
        <Profile user={selectedUser} companyDetails={companyDetails} onBack={handleBackToEmployeeList} formatDate={formatDate} />
      ) : (
        <>

          <h1 className='text-center uppercase font-semibold text-2xl pb-4 poppins'>Employee Details</h1>

          <div className='flex justify-between'>

            {/* Search input */}
            <div className="flex items-center w-full relative">
              <div className='ml-3 mr-2 absolute'>
                <SearchIcon2 />
              </div>
              <input
                type="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-black rounded-lg  w-[69.25rem] outline-none bg-transparent focus:border-blue-500 plusJakartaSans placeholder:text-black placeholder:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

          </div>

          <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1'>
            <p className='text-2xl font-bold plusJakartaSans capitalize mt-4'>
              Employees
            </p>

            {filteredEmployees.length === 0 && (
              <div className='flex justify-center my-4'>
                <p className='text-red-500 font-semibold capitalize poppins'>Employee Not Found!</p>
              </div>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 my-8 gap-x-8 gap-y-4 place-items-center'>

              {
                filteredEmployees.map((item, index) => {
                  {/* console.log(item) */ }
                  const { _id, user, contact, company, category } = item
                  const { name, profile_pic, user_id, user_roles } = user
                  {/* const { contact_no, current_address, date_of_birth, email } = contact */ }
                  const profilePic = profile_pic ? profile_pic : default_image;

                  return (
                    <div
                      key={_id}
                      className='border border-[#2F80EF] rounded-[2.5rem] px-6 py-4 mb-4 w-full h-full text-xs bg-white shadow-lg cursor-pointer'
                      onClick={() => handleUserCardClick(item)}
                    >

                      <div className='flex justify-between items-center pb-2'>
                        <p className='mr-2'>
                          <span className='text-lg uppercase font-bold plusJakartaSans'>{name}</span>{" "}
                          <span className='font-medium plusJakartaSans'>({user_roles})</span>
                        </p>
                        <img src={profilePic} alt="profile" className='rounded-[3.75rem] ring-1 ring-[#2F80EF] ring-offset-2 w-14 h-14 object-cover drop-shadow-md text-xs' />
                      </div>
                      <div className='leading-relaxed'>
                        <p className='inter'> <span className='font-bold inter'>User ID - </span> {user_id}</p>
                        <p className='inter'> <span className='font-bold inter'>DOB - </span>
                          {formatDate(contact?.date_of_birth) || '-'}
                        </p>
                        <p className='inter'> <span className='font-bold inter'>Contact No - </span>
                          {contact?.contact_no || '-'}
                        </p>
                        <p className='inter'> <span className='font-bold inter'>Email ID - </span>
                          <span className='lowercase '>{contact?.email || '-'}</span>
                        </p>
                        <p className='inter'> <span className='font-bold inter'>Company - </span>
                          <span className='capitalize'>{company?.ceo?.name || '-'}</span>
                        </p>
                        <p className='inter'> <span className='font-bold inter'>Category - </span>
                          <span className='capitalize'>{category?.category_name || '-'}</span>
                        </p>
                        <p className='inter'> <span className='font-bold inter'>Current Address - </span>
                          {contact?.current_address || '-'}
                        </p>
                      </div>
                    </div>
                  )
                })
              }
            </div>

            <p className='text-2xl font-bold plusJakartaSans capitalize'>
              Supervisors
            </p>

            {filteredSupervisors.length === 0 && (
              <div className='flex justify-center my-4'>
                <p className='text-red-500 font-semibold capitalize poppins'>Supervisor Not Found!</p>
              </div>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 my-8 gap-x-8 gap-y-4 place-items-center'>

              {
                filteredSupervisors.map((item, index) => {
                  {/* console.log(item) */ }
                  const { _id, user, contact, company } = item
                  const { name, profile_pic, user_id, user_roles } = user
                  {/* const { contact_no, current_address, date_of_birth, email } = contact */ }
                  const profilePic = profile_pic ? profile_pic : default_image;

                  return (
                    <div
                      key={_id}
                      className='border border-[#2F80EF] rounded-[2.5rem] px-6 py-4 mb-4 w-full h-full text-xs bg-white shadow-lg cursor-pointer'
                      onClick={() => handleUserCardClick(item)}
                    >

                      <div className='flex justify-between items-center pb-2 space-x-4'>
                        <p>
                          <span className='text-lg uppercase font-bold plusJakartaSans'>{name}</span>{" "}
                         <span className='font-medium plusJakartaSans'>({user_roles === 'Employer' ? 'Supervisor' : user_roles})</span>
                        </p>
                        <img src={profilePic} alt="profile" className='rounded-[3.75rem] ring-1 ring-[#2F80EF] ring-offset-2 w-14 h-14 object-cover drop-shadow-md text-xs' />
                      </div>
                      <div className='leading-relaxed'>
                        <p className='inter'> <span className='font-bold inter'>User ID - </span> {user_id}</p>
                        <p className='inter'> <span className='font-bold inter'>DOB - </span>{formatDate(contact?.date_of_birth) || '-'}</p>
                        <p className='inter'> <span className='font-bold inter'>Contact No - </span> {contact?.contact_no || '-'}</p>
                        <p className='inter'> <span className='font-bold inter'>Email ID - </span><span className='lowercase '>{contact?.email || '-'}</span> </p>
                        <p className='inter'> <span className='font-bold inter'>Company - </span><span className='capitalize'>{company?.ceo?.name || '-'}</span> </p>
                        <p className='inter'> <span className='font-bold inter'>Current Address - </span> {contact?.current_address || '-'}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>

          </div>
        </>
      )}

    </div>
  )
}

export default EmployeeDetails
