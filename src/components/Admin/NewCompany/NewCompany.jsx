import React, { useState, useEffect } from 'react'
import FloatingInput from './CompanyFields/FloatingInput'
import FloatingTextarea from './CompanyFields/FloatingTextarea'
import default_image from '../../../assets/images/default_image.svg'
import UploadProfile from './CompanyFields/UploadProfile'
import { Select, Option } from '@material-tailwind/react'
import { createNewCompany, getOrganizationsList } from '../../../network/agent'

const NewCompany = () => {

  let [profileUrl, setProfileUrl] = useState('')
  const [organization, setOrganization] = useState([])
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [messageState, setMessageState] = useState(false)
  const [message, setMessage] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Create state variables to store form data
  const [formData, setFormData] = useState({
    name: '',
    profile: '',
    email: '',
    telephoneNo: '',
    faxNo: '',
    location: '',
    address: '',
    city: '',
    pincode: '',
    leave: 21,
    monthLeave: 4,
    overtime: 8,
    nationalHolidays: 3
  });

  profileUrl = profileUrl ? profileUrl : default_image

  useEffect(() => {
    getOrganizationsList()
      .then((response) => {
        if (response.error === false) {
          // console.log(response.data)
          setOrganization(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching companies:', error);
      });
  }, [])


  const handleOrganizationChange = (organizationId) => {
    setSelectedOrganization(organizationId);
  };



  // Function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target || {};

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true)

    const commonData = () => ({
      name: formData.name || '',
      profile_pic: profileUrl || '',
      company: {
        organization: selectedOrganization || '',
        address: formData.address || '',
        telephone_no: formData.telephoneNo || '',
        fax_no: formData.faxNo || '',
        email: formData.email || '',
        city: formData.city || '',
        pincode: formData.pincode || '',
        location: formData.location || '',
      },
      details: {
        leave: formData.leave || 21,
        month_leave: formData.monthLeave || 4,
        overtime: formData.overtime || 8,
        national_holidays: formData.nationalHolidays || 3
      }
    })

    let formattedData = {
      ...commonData()
    };

    // console.log(formattedData)

    createNewCompany(formattedData).then((response) => {
      if (response.error === false) {
        // console.log(response.data)
        setMessageState(true)
        setMessage('New company account created succesfully!')

        // reset form
        setFormData({
          name: '',
          profile: '',
          email: '',
          telephoneNo: '',
          faxNo: '',
          location: '',
          address: '',
          city: '',
          pincode: '',
        })
        setProfileUrl(default_image)
        setSelectedOrganization(null)

        setTimeout(() => {
          setMessageState(false)
          setMessage('')
        }, [3000])
      }
    }).catch((error) => {
      console.log(error)
      setMessageState(false)
      setMessage('Something went wrong!')

      setTimeout(() => {
        setMessage('')
      }, [2000])
    }).finally(() => {
      setIsSubmitting(false)
    })
  }

  return (
    <div>
      <h1 className='text-center uppercase font-semibold text-2xl pb-4 poppins'>New Company</h1>

      <div className='my-5'>
        <form onSubmit={handleSubmit}>
          <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-x-8 rounded-md'>

            <div>
              <UploadProfile name='profile' imageUrl={profileUrl} setFileUrl={setProfileUrl} />

              <FloatingInput name='faxNo' label='Fax Number' type='text' value={formData.faxNo} onChange={handleInputChange} />
              <FloatingInput name='location' label='Location' type='text' value={formData.location} onChange={handleInputChange} />

              <Select
                color='blue'
                size='lg'
                label='Select Organization'
                onChange={(e) => handleOrganizationChange(e)}
              >
                {organization.length === 0 ? (
                  <p className='text-center font-medium italic capitalize text-red-500/70'>No Organization Found!</p>
                ) : (
                  organization.map((item) => {
                    const { _id, name } = item;
                    return (
                      <Option key={_id} value={_id} className='mb-1'>
                        {name}
                      </Option>
                    );
                  })
                )}
              </Select>
            </div>

            <div>
              <FloatingInput name='name' label='Name' type='text' value={formData.name} onChange={handleInputChange} />
              <FloatingInput name='email' label='Email ID' type='email' value={formData.email} onChange={handleInputChange} />
              <FloatingInput name='city' label='City' type='text' value={formData.city} onChange={handleInputChange} />
              <FloatingInput name='leave' label='Annual Leave' type='number' value={formData.leave} onChange={handleInputChange} />
              <FloatingInput name='overtime' label='Overtime' type='number' value={formData.overtime} onChange={handleInputChange} />
            </div>

            <div>
              <FloatingInput name='telephoneNo' label='Telephone Number' type='number' value={formData.telephoneNo} onChange={handleInputChange} />
              <FloatingTextarea name='address' label='Address' rows='1' value={formData.address} onChange={handleInputChange} />
              <FloatingInput name='pincode' label='Pincode' type='number' value={formData.pincode} onChange={handleInputChange} />
              <FloatingInput name='monthLeave' label='Month Leave' type='number' value={formData.monthLeave} onChange={handleInputChange} />
              <FloatingInput name='nationalHolidays' label='National Holidays' type='number' value={formData.nationalHolidays} onChange={handleInputChange} />
            </div>

          </div>
          <div className='text-center mt-6 mb-3'>
            <button
              type='submit'
              className='rounded-3xl plusJakartaSans drop-shadow-lg text-white bg-[#23B0E2] font-normal text-xl px-6 py-1 w-80'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>

        {
          message && (
            <div className='text-center mt-8 mb-4'>
              <p className={`capitalize text-xl poppins ${messageState ? 'text-green-500' : 'text-red-500'} font-semibold`}>{message}</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default NewCompany