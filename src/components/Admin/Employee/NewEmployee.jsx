import React, { useState, useRef } from 'react'
import axios from 'axios';
import FloatingInput from './Fields/FloatingInput';
import FloatingTextarea from './Fields/FloatingTextarea';
import MultipleDetailsForm from './Fields/MultipleDetailsForm';
import { UploadIcon, Camera } from '../../UI/Icons'
import { Select, Option } from '@material-tailwind/react';
import default_image from '../../../assets/images/default_image.svg'
import BankDetailsForm from './BankDetailsForm';
import OtherDocsForm from './OtherDocsForm';
import { createNewEmployee } from '../../../network/agent';
import { BASE_URL } from '../../../network/apiClient';

const NewEmployee = ({ selectedAccount, selectedCategory, selectedCompany, selectedEmployer }) => {

  const educationFields = [
    { label: 'College Name', name: 'college_name', type: 'text' },
    { label: 'Course Name', name: 'course_name', type: 'text' },
    { label: 'Percentage', name: 'percentage', type: 'text' },
  ];

  const experienceFields = [
    { label: 'Organization Name', name: 'organization_name', type: 'text' },
    { label: 'Job Title', name: 'job_title', type: 'text' },
    { label: 'Start Date', name: 'start_date', type: 'date' },
    { label: 'End Date', name: 'end_date', type: 'date' },
  ];

  const familyFields = [
    { label: 'Name', name: 'name', type: 'text' },
    { label: 'Relation', name: 'relation', type: 'text' },
    { label: 'Age', name: 'age', type: 'number' },
  ];

  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const [messageState, setMessageState] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false);

  const [educationDetails, setEducationDetails] = useState([]);
  const [experienceDetails, setExperienceDetails] = useState([]);
  const [familyDetails, setFamilyDetails] = useState([]);
  const [otherDocumentsDetails, setOtherDocumentsDetails] = useState([]);
  const [bankDetails, setBankDetails] = useState([])

  const aadharInputRef = useRef(null);
  const panInputRef = useRef(null);
  const pfInputRef = useRef(null);
  const esicInputRef = useRef(null);
  const etcInputRef = useRef(null);
  const profileInputRef = useRef(null);

  const [aadharFileUrl, setAadharFileUrl] = useState('')
  const [panFileUrl, setPanFileUrl] = useState('')
  const [pfFileUrl, setPfFileUrl] = useState('')
  const [esicFileUrl, setEsicFileUrl] = useState('')
  const [etcFileUrl, setEtcFileUrl] = useState('')
  const [profileFileUrl, setProfileFileUrl] = useState('')

  const [genderValue, setGenderValue] = useState('')

  // Function to add a new education detail
  const handleAddEducation = () => {
    setEducationDetails([...educationDetails, {}]);
  };

  // Function to add a new experience detail
  const handleAddExperience = () => {
    setExperienceDetails([...experienceDetails, {}]);
  };

  // Function to add a new Family detail
  const handleAddFamily = () => {
    setFamilyDetails([...familyDetails, {}]);
  };



  // function to handle select file and upload file
  const handleFileChange = async (e) => {

    const { name, files } = e.target || {};

    if (files && files.length > 0) {
      await handleUploadFile(files[0], name);
    } else {
      console.log("Please Select a File!")
    }
  };

  // function to upload files
  const handleUploadFile = async (file, name) => {

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${BASE_URL}file/upload/${selectedAccount}`,
        formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data.message)

      if (name === 'aadharCardPhoto') {
        setAadharFileUrl(response.data.data)
      } else if (name === 'panCardPhoto') {
        setPanFileUrl(response.data.data)
      } else if (name === 'pfRegistrationPhoto') {
        setPfFileUrl(response.data.data)
      } else if (name === 'esicRegistrationPhoto') {
        setEsicFileUrl(response.data.data)
      } else if (name === 'electricityBillPhoto') {
        setEtcFileUrl(response.data.data)
      } else if (name === 'profilePhoto') {
        setProfileFileUrl(response.data.data)
      } else {
        console.log('No file url found!')
      }

    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // function to select files
  const handleSelectFileAadhar = () => {
    aadharInputRef.current.click();
  };

  const handleSelectFilePan = () => {
    panInputRef.current.click();
  };

  const handleSelectFilePf = () => {
    pfInputRef.current.click();
  };

  const handleSelectFileEsic = () => {
    esicInputRef.current.click();
  };

  const handleSelectFileEtc = () => {
    etcInputRef.current.click();
  };

  const handleSelectFileProfile = () => {
    profileInputRef.current.click();
  };

  // Create state variables to store form data
  const [formData, setFormData] = useState({
    email: '',
    profilePic: '',
    gender: '',
    dateOfJoining: '',
    basicSalary: '',
    dateOfBirth: '',
    fullName: '',
    currentAdd: '',
    permanentAddress: '',
    aadharCardNumber: '',
    aadharCardPhoto: '',
    panCardNumber: '',
    panCardPhoto: '',
    pfRegistrationNumber: '',
    pfRegistrationPhoto: '',
    esicRegistrationNumber: '',
    esicRegistrationPhoto: '',
    electricityBillNumber: '',
    electricityBillPhoto: '',
    phoneNumber: '',
    unNumber: '',
    overtimePayment: '',
  });

  const [fieldErrors, setFieldErrors] = useState({
    phoneNumber: '',
    pfRegistrationNumber: '',
    unNumber: '',
    esicRegistrationNumber: '',
    aadharCardNumber: '',
    panCardNumber: '',
  });

  const handleGenderChange = (gen) => {
    setGenderValue(gen);
  };

  // Function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target || {};

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target || {};

    // Validation checks
    let isValid = true;
    let errorMessage = '';

    switch (name) {
      case 'phoneNumber':
        isValid = /^\d{10}$/.test(value);
        errorMessage = 'Phone number must be 10 digits';
        break;
      case 'pfRegistrationNumber':
        isValid = /^[A-Za-z]{5}\d{17}$/.test(value);
        errorMessage = 'PF number must have 5 letters followed by 17 digits!';
        break;
      case 'unNumber':
        isValid = /^\d{12}$/.test(value);
        errorMessage = 'UN number must be 12 digits!';
        break;
      case 'esicRegistrationNumber':
        isValid = /^\d{10}$/.test(value);
        errorMessage = 'ESIC number must be 10 digits!';
        break;
      case 'aadharCardNumber':
        isValid = /^\d{12}$/.test(value);
        errorMessage = 'Aadhar card number must be 12 digits!';
        break;
      case 'panCardNumber':
        isValid = /^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/.test(value);
        errorMessage = 'Pan card number must be 10 chars! E.g: ABCDE1234F';
        break;
      default:
        break;
    }

    setErrorMessage(isValid ? '' : errorMessage);
    setIsFormValid(isValid);

    setFieldErrors({
      ...fieldErrors,
      [name]: isValid ? '' : errorMessage,
    });
  };

  const resetForm = () => {
    setFormData({
      email: '',
      profilePic: '',
      gender: '',
      dateOfJoining: '',
      basicSalary: '',
      dateOfBirth: '',
      fullName: '',
      currentAdd: '',
      permanentAddress: '',
      aadharCardNumber: '',
      aadharCardPhoto: '',
      panCardNumber: '',
      panCardPhoto: '',
      pfRegistrationNumber: '',
      pfRegistrationPhoto: '',
      esicRegistrationNumber: '',
      esicRegistrationPhoto: '',
      electricityBillNumber: '',
      electricityBillPhoto: '',
      phoneNumber: '',
      unNumber: '',
      overtimePayment: '',
    });

    setAadharFileUrl('')
    setPanFileUrl('')
    setPfFileUrl('')
    setEsicFileUrl('')
    setEtcFileUrl('')
    setProfileFileUrl('')
    setGenderValue(''); // Reset the gender selection

    // Reset all other form state variables, e.g., educationDetails, experienceDetails, etc.
    setEducationDetails([]);
    setExperienceDetails([]);
    setFamilyDetails([]);
    setOtherDocumentsDetails([]);
    setBankDetails([]);

  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errorMessage) {
      // If there are errors, don't submit the form
      return;
    }

    setIsSubmitting(true)

    // Create a function to format the common data
    const commonData = () => ({
      name: formData.fullName || '',
      profile_pic: profileFileUrl || '',
      date_of_joining: formData.dateOfJoining || '',
      basic_salary: formData.basicSalary || '',
      contact: {
        email: formData.email || '',
        gender: genderValue || '',
        aadhar: {
          aadhar_no: formData.aadharCardNumber || '',
          aadhar_photo: aadharFileUrl || '',
        },
        pancard: {
          pancard_no: formData.panCardNumber || '',
          pancard_photo: panFileUrl || '',
        },
        pf: {
          pf_no: formData.pfRegistrationNumber || '',
          pf_photo: pfFileUrl || '',
        },
        esic: {
          esic_no: formData.esicRegistrationNumber || '',
          esic_photo: esicFileUrl || '',
        },
        electricity_bill: {
          bill_no: formData.electricityBillNumber || '',
          bill_photo: etcFileUrl || '',
        },
        contact_no: formData.phoneNumber || '',
        date_of_birth: formData.dateOfBirth || '',
        current_address: formData.currentAdd || '',
        permanent_address: formData.permanentAddress || '',
        un_no: formData.unNumber || '',
        family_details: familyDetails,
        education_details: educationDetails,
        experience: experienceDetails,
        bank_details: bankDetails,
        other_documents: otherDocumentsDetails
      }
    });

    // Create an empty data object
    let formattedData = {};

    if (selectedAccount === 'Employee') {
      // Employee-specific data
      formattedData = {
        user_role: selectedAccount || '',
        company: selectedCompany || '',
        category: selectedCategory || '',
        employer: selectedEmployer || '',
        overtime_payment: formData.overtimePayment || '',
        ...commonData(),
      };
    } else if (selectedAccount === 'Employer') {
      // Employer-specific data
      formattedData = {
        user_role: selectedAccount,
        company: selectedCompany,
        ...commonData()
      };
    }

    // const formattedData = formatFormData(formData);
    // console.log(formattedData)

    createNewEmployee(formattedData).then((response) => {
      if (response.error === false) {
        console.log(response.message)

        setMessageState(true)
        setMessage('New account created succesfully!')
        resetForm();

        setTimeout(() => {
          setMessageState(false)
          setMessage('')
        }, [2000])
      }
    }).catch((error) => {
      // console.log(error)
      setMessageState(false)
      setMessage('Something went wrong! Please fill required fields!')

      setTimeout(() => {
        setMessage('')
      }, [2000])

    }).finally(() => {
      setIsSubmitting(false)
    })

  };

  return (

    <>
      <div className='my-5'>
        <form onSubmit={handleSubmit}>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-x-8 rounded-md'>

            {/* COLUMN 1 */}
            <div>

              {/* fullName */}
              <FloatingInput name='fullName' label='Full Name' type='text' value={formData.fullName} onChange={handleInputChange} />

              {/* phoneNumber */}
              <FloatingInput name='phoneNumber' label='Phone Number' type='number' value={formData.phoneNumber} onChange={handleInputChange} handleBlur={handleBlur} errorMessage={fieldErrors.phoneNumber} />

              {/* aadharCard */}
              <div className='relative'>

                {/* aadharCardNumber */}
                <FloatingInput name='aadharCardNumber' label='Aadhar Card Number' type='number' value={formData.aadharCardNumber} onChange={handleInputChange} handleBlur={handleBlur} errorMessage={fieldErrors.aadharCardNumber} />

                {/* aadharCardPhoto */}
                <div className='absolute top-4 right-4'>
                  <input type='file' ref={aadharInputRef} accept='.jpg,.jpeg,.png' className='hidden' name='aadharCardPhoto' onChange={handleFileChange} />
                  <button
                    type='button'
                    onClick={handleSelectFileAadhar}
                    className='cursor-pointer focus:outline-none'
                  >
                    <UploadIcon />
                  </button>
                </div>

                {aadharFileUrl &&
                  (
                    <p className='absolute capitalize -bottom-4 right-0 mx-2 text-[0.7rem] italic text-green-500'>
                      File Uploaded Successfully!
                    </p>
                  )
                }

              </div>

              {/* pfRegistration */}
              <div className='relative'>
                {/* pfRegistrationNumber */}
                <FloatingInput name='pfRegistrationNumber' label='PF Registration Number' type='text' value={formData.pfRegistrationNumber} onChange={handleInputChange} handleBlur={handleBlur} errorMessage={fieldErrors.pfRegistrationNumber} />

                {/* pfRegistrationPhoto */}
                <div className='absolute top-4 right-4'>
                  <input type='file' ref={pfInputRef} accept='.jpg,.jpeg,.png' className='hidden' name='pfRegistrationPhoto' onChange={handleFileChange} />
                  <button
                    type='button'
                    onClick={handleSelectFilePf}
                    className='cursor-pointer focus:outline-none'
                  >
                    <UploadIcon />
                  </button>
                </div>

                {pfFileUrl &&
                  (
                    <p className='absolute capitalize -bottom-4 right-0 mx-2 text-[0.7rem] italic text-green-500'>
                      File Uploaded Successfully!
                    </p>
                  )
                }
              </div>

              {/* electricityBill */}
              <div className='relative'>
                {/* electricityBillNumber */}
                <FloatingInput name='electricityBillNumber' label='Electricity Bill' type='text' value={formData.electricityBillNumber} onChange={handleInputChange} />

                {/* electricityBillPhoto */}
                <div className='absolute top-4 right-4'>
                  <input type='file' ref={etcInputRef} accept='.jpg,.jpeg,.png' className='hidden' name='electricityBillPhoto' onChange={handleFileChange} />
                  <button
                    type='button'
                    onClick={handleSelectFileEtc}
                    className='cursor-pointer focus:outline-none'
                  >
                    <UploadIcon />
                  </button>
                </div>

                {etcFileUrl &&
                  (
                    <p className='absolute capitalize -bottom-4 right-0 mx-2 text-[0.7rem] italic text-green-500'>
                      File Uploaded Successfully!
                    </p>
                  )
                }
              </div>

              {/* currentAdd */}
              <FloatingTextarea name='currentAdd' label='Current address' rows='1' value={formData.currentAdd} onChange={handleInputChange} />

              {/* basicSalary */}
              <FloatingInput name='basicSalary' label='Basic Salary' type='number' value={formData.basicSalary} onChange={handleInputChange} />

              {/* Work Experience */}
              <MultipleDetailsForm
                title='Work Experience'
                fieldKey="experience"
                fields={experienceFields}
                details={experienceDetails}
                setDetails={setExperienceDetails}
                onAddField={handleAddExperience}
              />

            </div>

            {/* COLUMN 2 */}
            <div>

              {/* email */}
              <FloatingInput name='email' label='email' type='email' value={formData.email} onChange={handleInputChange} />

              {/* dateOfBirth */}
              <FloatingInput name='dateOfBirth' label='Date of Birth' type='date' value={formData.dateOfBirth} onChange={handleInputChange} />

              {/* panCard */}
              <div className='relative'>
                {/* panCardNumber */}
                <FloatingInput name='panCardNumber' label='Pan Card Number' type='text' value={formData.panCardNumber} onChange={handleInputChange} handleBlur={handleBlur} errorMessage={fieldErrors.panCardNumber} />

                {/* panCardPhoto */}
                <div className='absolute top-4 right-4'>
                  <input type='file' ref={panInputRef} accept='.jpg,.jpeg,.png' className='hidden' name='panCardPhoto' onChange={handleFileChange} />
                  <button
                    type='button'
                    onClick={handleSelectFilePan}
                    className='cursor-pointer focus:outline-none'
                  >
                    <UploadIcon />
                  </button>
                </div>

                {panFileUrl &&
                  (
                    <p className='absolute capitalize -bottom-4 right-0 mx-2 text-[0.7rem] italic text-green-500'>
                      File Uploaded Successfully!
                    </p>
                  )
                }
              </div>

              {/* esicRegistration */}
              <div className='relative'>
                {/* esicRegistrationNumber */}
                <FloatingInput name='esicRegistrationNumber' label='ESIC Registration Number' type='number' value={formData.esicRegistrationNumber} onChange={handleInputChange} handleBlur={handleBlur} errorMessage={fieldErrors.esicRegistrationNumber} />

                {/* esicRegistrationPhoto */}
                <div className='absolute top-4 right-4'>
                  <input type='file' ref={esicInputRef} accept='.jpg,.jpeg,.png' className='hidden' name='esicRegistrationPhoto' onChange={handleFileChange} />
                  <button
                    type='button'
                    onClick={handleSelectFileEsic}
                    className='cursor-pointer focus:outline-none'
                  >
                    <UploadIcon />
                  </button>
                </div>

                {esicFileUrl &&
                  (
                    <p className='absolute capitalize -bottom-4 right-0 mx-2 text-[0.7rem] italic text-green-500'>
                      File Uploaded Successfully!
                    </p>
                  )
                }
              </div>

              {/* unNumber */}
              <FloatingInput name='unNumber' label='UN Number' type='number' value={formData.unNumber} onChange={handleInputChange} handleBlur={handleBlur} errorMessage={fieldErrors.unNumber} />

              {/* permanentAddress */}
              <FloatingTextarea name='permanentAddress' label='Permanent Address' rows='1' value={formData.permanentAddress} onChange={handleInputChange} />

              {/* dateOfJoining */}
              <FloatingInput name='dateOfJoining' label='Date of Joining' type='date' value={formData.dateOfJoining} onChange={handleInputChange} />

              {/* Family */}
              <MultipleDetailsForm
                title="Family"
                fieldKey="family_details"
                fields={familyFields}
                details={familyDetails}
                setDetails={setFamilyDetails}
                onAddField={handleAddFamily}
              />

            </div>

            {/* COLUMN 3 */}
            <div>
              {/* profilePic */}
              <div className='flex flex-wrap items-center justify-evenly mb-4'>
                {/* ViewProfilePic */}
                <div>
                  <img src={profileFileUrl ? profileFileUrl : default_image} alt='default_image' name='profile' className='w-28 h-28 object-cover rounded-full shadow-gray-400 shadow-md' />
                </div>

                {/* UpdateProfilePic */}
                <input type='file' ref={profileInputRef} accept='.jpg,.jpeg,.png' className='hidden' name='profilePhoto' onChange={handleFileChange} />
                <button
                  type='button'
                  onClick={handleSelectFileProfile}
                  className='cursor-pointer focus:outline-none flex items-center space-x-1 bg-gray-300 px-2 py-1 rounded-xl'
                >
                  <div className='w-4 h-4 opacity-70'>
                    <Camera />
                  </div>
                  <p className='ptSans text-xs'>Update</p>
                </button>
              </div>


              {/* gender */}
              <div className='mb-4'>
                <Select
                  name='gender'
                  color='blue'
                  size='lg'
                  label='Select Gender'
                  value={genderValue}
                  onChange={(e) => handleGenderChange(e)}
                >
                  <Option value='M' className='mb-1'>Male</Option>
                  <Option value='F' className='mb-1'>Female</Option>
                  <Option value='O' className='mb-1'>Other</Option>
                </Select>
              </div>

              {/* overtimePayment */}
              {selectedAccount === 'Employee' && (
                <FloatingInput name='overtimePayment' label='Overtime Payment (hourly)' type='number' value={formData.overtimePayment} onChange={handleInputChange} />
              )}

              {/* Education */}
              <MultipleDetailsForm
                title='Education'
                fieldKey="education_details"
                fields={educationFields}
                details={educationDetails}
                setDetails={setEducationDetails}
                onAddField={handleAddEducation}
              />

              {/* Bank */}
              <BankDetailsForm
                selectedAccount={selectedAccount}
                details={bankDetails}
                setDetails={setBankDetails}
              />

              {/* Other Documents */}
              <OtherDocsForm
                selectedAccount={selectedAccount}
                otherDocumentsDetails={otherDocumentsDetails}
                setOtherDocumentsDetails={setOtherDocumentsDetails}
              />

            </div>

          </div>
          <div className='text-center mt-6 mb-3'>
            <button
              type='submit'
              className='rounded-3xl plusJakartaSans drop-shadow-lg text-white bg-[#23B0E2] font-normal text-xl px-6 py-1 w-80 disabled:bg-[#23B0E2]/50 disabled:cursor-not-allowed'
              disabled={!isFormValid || isSubmitting}
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
    </>

  )
}

export default NewEmployee
