import React, { useEffect, useState } from 'react';
import { CrossIcon, DownloadIcon } from '../../../UI/Icons';
import ProfileForm from './ProfileForm';
import { getCompanyById, getTodayEmployeeAttendance, updateEmployee } from '../../../../network/agent';
import BankDetails from './ViewFields/BankDetails';
import FamilyDetails from './ViewFields/FamilyDetails';
import ExperienceDetails from './ViewFields/ExperienceDetails';
import EducationDetails from './ViewFields/EducationDetails';
import OtherDocuments from './ViewFields/OtherDocuments';
import UpdateProfilePhoto from './ViewFields/UpdateProfilePhoto';
import UserLayoff from './ViewFields/UserLayoff';
import UpdateFileUpload from './ViewFields/UpdateFileUpload';
import PresentAbsentButton from './ViewFields/PresentAbsentButton';

const Profile = ({ user, companyDetails, onBack, formatDate }) => {
    // console.log(user)
    const companyName = companyDetails?.company?.ceo?.name
    // user
    const { _id: employeeID, basic_salary, user: userData, contact, category, employer, company, overtime_payment, date_of_joining } = user

    // userData
    const { _id: userID, active, name, profile_pic, user_id, user_roles } = userData

    // contact
    const { _id: contactID, contact_no, date_of_birth, current_address, permanent_address, aadhar, pancard, bank_details, education_details, electricity_bill, pf, esic, experience, family_details, other_documents, un_no, email: contactEmail, gender } = contact

    // company

    // category
    // const { _id: categoryID, category_name, logo } = category
    let categoryData = null;
    if (user_roles === 'Employee') {
        categoryData = category;
    }

    const [message, setMessage] = useState('')
    const [isEditMode, setIsEditMode] = useState(false);
    const [attendance, setAttendance] = useState(null)

    const renderGender = (gender) => {
        switch (gender) {
            case "M":
                return "Male";
            case "F":
                return "Female";
            default:
                return "Other";
        }
    };

    const [editedName, setEditedName] = useState(name);
    const [editedDateOfBirth, setEditedDateOfBirth] = useState(date_of_birth);
    const [editedEmail, setEditedEmail] = useState(contactEmail);
    const [editedPhoneNumber, setEditedPhoneNumber] = useState(contact_no);
    const [editedGender, setEditedGender] = useState(gender);
    const [editedPermanentAddress, setEditedPermanentAddress] = useState(permanent_address);
    const [editedCurrentAddress, setEditedCurrentAddress] = useState(current_address);
    const [editedBasicSalary, setEditedBasicSalary] = useState(basic_salary);
    const [editedDateOfJoining, setEditedDateOfJoining] = useState(date_of_joining);
    const [editedOvertimePayment, setEditedOvertimePayment] = useState(overtime_payment);
    const [editedUnNo, setEditedUnNo] = useState(un_no);

    const [editedAadharNo, setEditedAadharNo] = useState(aadhar?.aadhar_no);
    const [editedAadharPhoto, setEditedAadharPhoto] = useState(aadhar?.aadhar_photo);

    const [editedPancardNo, setEditedPancardNo] = useState(pancard?.pancard_no);
    const [editedPancardPhoto, setEditedPancardPhoto] = useState(pancard?.pancard_photo);

    const [editedPfNo, setEditedPfNo] = useState(pf?.pf_no);
    const [editedPfPhoto, setEditedPfPhoto] = useState(pf?.pf_photo);

    const [editedEsicNo, setEditedEsicNo] = useState(esic?.esic_no);
    const [editedEsicPhoto, setEditedEsicPhoto] = useState(esic?.esic_photo);

    const [editedElectricityBillNo, setEditedElectricityBillNo] = useState(electricity_bill?.bill_no);
    const [editedElectricityBillPhoto, setEditedElectricityBillPhoto] = useState(electricity_bill?.bill_photo);

    // Bank Details
    const [editedAccountHolderName, setEditedAccountHolderName] = useState(bank_details?.accountHolderName);
    const [editedAccountNumber, setEditedAccountNumber] = useState(bank_details?.accountNumber);
    const [editedBankName, setEditedBankName] = useState(bank_details?.bankName);
    const [editedBranchName, setEditedBranchName] = useState(bank_details?.branchName);
    const [editedIfscCode, setEditedIfscCode] = useState(bank_details?.ifscCode);
    const [editedBankProof, setEditedBankProof] = useState(bank_details?.bank_proof);

    const [profileFileUrl, setProfileFileUrl] = useState(profile_pic)

    const handleFieldChange = (fieldName, value) => {
        switch (fieldName) {
            case "accountHolderName":
                setEditedAccountHolderName(value);
                break;
            case "accountNumber":
                setEditedAccountNumber(value);
                break;
            case "bankName":
                setEditedBankName(value);
                break;
            case "branchName":
                setEditedBranchName(value);
                break;
            case "ifscCode":
                setEditedIfscCode(value);
                break;
            case "aadharNo":
                setEditedAadharNo(value);
                break;
            case "pancardNo":
                setEditedPancardNo(value);
                break;
            case "pfNo":
                setEditedPfNo(value);
                break;
            case "esicNo":
                setEditedEsicNo(value);
                break;
            case "electricityBillNo":
                setEditedElectricityBillNo(value);
                break;
            case "unNo":
                setEditedUnNo(value);
                break;
            case "overtimePayment":
                setEditedOvertimePayment(value);
                break;
            case "dateOfJoining":
                setEditedDateOfJoining(value);
                break;
            case "basicSalary":
                setEditedBasicSalary(value);
                break;
            case "currentAddress":
                setEditedCurrentAddress(value);
                break;
            case "permanentAddress":
                setEditedPermanentAddress(value);
                break;
            case "genderValue":
                setEditedGender(value);
                break;
            case "name":
                setEditedName(value);
                break;
            case "dateOfBirth":
                setEditedDateOfBirth(value);
                break;
            case "email":
                setEditedEmail(value);
                break;
            case "phoneNumber":
                setEditedPhoneNumber(value);
                break;
            default:
                break;
        }
    };

    const handleAadharPhotoUpload = (uploadedUrl) => {
        setEditedAadharPhoto(uploadedUrl);
    };

    const handlePancardPhotoUpload = (uploadedUrl) => {
        setEditedPancardPhoto(uploadedUrl);
    };

    const handlePfPhotoUpload = (uploadedUrl) => {
        setEditedPfPhoto(uploadedUrl);
    };

    const handleEsicPhotoUpload = (uploadedUrl) => {
        setEditedEsicPhoto(uploadedUrl);
    };

    const handleElectricityBillPhotoUpload = (uploadedUrl) => {
        setEditedElectricityBillPhoto(uploadedUrl);
    };

    const handleBankProofUpload = (uploadedUrl) => {
        setEditedBankProof(uploadedUrl);
    };

    // function to save updated changes
    const handleSaveChanges = () => {
        const updatedData = {
            user: {
                _id: userID,
                name: editedName,
                profile_pic: profileFileUrl
            },
            contact: {
                _id: contactID,
                date_of_birth: editedDateOfBirth,
                email: editedEmail,
                contact_no: editedPhoneNumber,
                gender: editedGender,
                current_address: editedCurrentAddress,
                permanent_address: editedPermanentAddress,
                un_no: editedUnNo,
                bank_details: {
                    accountHolderName: editedAccountHolderName,
                    accountNumber: editedAccountNumber,
                    bankName: editedBankName,
                    branchName: editedBranchName,
                    ifscCode: editedIfscCode,
                    bank_proof: editedBankProof
                },
                aadhar: {
                    aadhar_no: editedAadharNo,
                    aadhar_photo: editedAadharPhoto,
                },
                pancard: {
                    pancard_no: editedPancardNo,
                    pancard_photo: editedPancardPhoto,
                },
                pf: {
                    pf_no: editedPfNo,
                    pf_photo: editedPfPhoto,
                },
                esic: {
                    esic_no: editedEsicNo,
                    esic_photo: editedEsicPhoto,
                },
                electricity_bill: {
                    bill_no: editedElectricityBillNo,
                    bill_photo: editedElectricityBillPhoto,
                },
            },
            overtime_payment: editedOvertimePayment,
            basic_salary: editedBasicSalary,
            date_of_joining: editedDateOfJoining
        };

        updateEmployee(employeeID, updatedData).then((response) => {
            if (response.error === false) {
                console.log(response.message)

                setIsEditMode(false);
                // setMessage('User data updated successfully!');

                setTimeout(() => {
                    setMessage('')
                }, [2000])
            }
        }).catch((error) => {
            console.log(error);
            setMessage('Failed to update user data!');
        });
    };

    // Get the current date and time
    const currentDate = new Date();

    // Adjust the time zone offset to GMT+5.5
    const gmtOffset = 5.5 * 60; // Offset in minutes
    const gmtDate = new Date(currentDate.getTime() + gmtOffset * 60 * 1000); // Add the offset in milliseconds

    // Construct the formatted date string
    const formattedDate = gmtDate.toISOString()

    const attendanceData = {
        user: userID,
        date: formattedDate
        // date: "2024-05-10T09:30:15.159Z"
    }

    useEffect(() => {
        getTodayEmployeeAttendance(attendanceData).then((response) => {
            if (response.error === false) {
                // console.log(response.data.status);
                setAttendance(response.data.status);
            }
        });
    }, []);

    return (
        <div>

            {/* close button */}
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={onBack}
                    className=" p-3 hover:shadow-md hover:rounded-full hover:bg-white"
                >
                    <CrossIcon />
                </button>
            </div>

            <div className="flex justify-evenly items-center mb-4">
                {/* name */}
                <h1 className="text-center uppercase font-semibold text-2xl pb-4 poppins">
                    {name}
                </h1>

                {/* profile Pic */}
                <UpdateProfilePhoto
                    isEditMode={isEditMode}
                    profileFileUrl={profileFileUrl}
                    setProfileFileUrl={setProfileFileUrl}
                />

                {/* Presenty Toggle */}
                <PresentAbsentButton attendance={attendance} attendanceData={attendanceData} />

                <div>
                    {/* save / edit button */}
                    {isEditMode ? (
                        <button
                            onClick={() => {
                                handleSaveChanges()
                                setIsEditMode(false)
                            }}
                            className="py-1 px-2 rounded-lg text-sm font-medium plusJakartaSans border border-green-400 bg-green-500 text-white shadow-md hover:bg-green-700"
                        >
                            Save Profile
                        </button>
                    ) : (

                        <button
                            onClick={() => setIsEditMode(true)}
                            className="py-1 px-2 rounded-lg text-sm font-medium plusJakartaSans border border-red-400 outline-none text-red-400 shadow-md hover:bg-red-400 hover:text-white"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>

            {/* COLUMN 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 rounded-md">
                <div>
                    {/* user_id */}
                    <ProfileForm
                        label="User ID"
                        fieldName={user_id ? user_id : "-"}
                    />

                    {/* date_of_birth */}
                    {
                        isEditMode ? (
                            <div className='border border-gray-500 bg-white rounded-lg px-4 pt-1 pb-2 mb-4 '>
                                <p className='text-xs pt-1'>Update Date of Birth</p>
                                <input
                                    type="date"
                                    value={editedDateOfBirth}
                                    onChange={(e) => handleFieldChange("dateOfBirth", e.target.value)}
                                    disabled={!isEditMode}
                                    className="w-full outline-none"
                                />
                            </div>
                        ) : (
                            <ProfileForm
                                label="Date of Birth"
                                isEditMode={isEditMode}
                                fieldName={formatDate(editedDateOfBirth)}
                                handleFieldChange={(e) => handleFieldChange("dateOfBirth", e.target.value)}
                            />
                        )
                    }

                    {/* city */}
                    {/* <ProfileForm
                        label="Company"
                        fieldName={city ? city : "-"}
                    /> */}

                    {/* aadhar */}
                    <div className='relative' >
                        <ProfileForm
                            label="Aadhar Card Number"
                            isEditMode={isEditMode}
                            fieldName={editedAadharNo}
                            handleFieldChange={(e) => handleFieldChange("aadharNo", e.target.value)}
                        />
                        <div className='absolute right-3 top-4'>
                            {isEditMode ? (
                                <UpdateFileUpload onUpload={handleAadharPhotoUpload} message={message} setMessage={setMessage} />
                            ) : (
                                <a href={editedAadharPhoto} rel="noopener noreferrer">
                                    {editedAadharPhoto && <DownloadIcon />}
                                </a>
                            )}
                        </div>
                    </div>

                    {/* pf */}
                    <div className='relative' >
                        <ProfileForm
                            label="PF Registration Number"
                            isEditMode={isEditMode}
                            fieldName={editedPfNo}
                            handleFieldChange={(e) => handleFieldChange("pfNo", e.target.value)}
                        />
                        <div className='absolute right-3 top-4'>
                            {isEditMode ? (
                                <UpdateFileUpload onUpload={handlePfPhotoUpload} message={message} setMessage={setMessage} />
                            ) : (
                                <a href={editedPfPhoto} rel="noopener noreferrer">
                                    {editedPfPhoto && <DownloadIcon />}
                                </a>
                            )}
                        </div>
                    </div>

                    {/* un_no */}
                    <ProfileForm
                        label="UN Number"
                        isEditMode={isEditMode}
                        fieldName={editedUnNo}
                        handleFieldChange={(e) => handleFieldChange("unNo", e.target.value)}
                    />

                    {/* date_of_joining */}
                    {
                        isEditMode ? (
                            <div className='border border-gray-500 bg-white rounded-lg px-4 pt-1 pb-2 mb-4 '>
                                <p className='text-xs pt-1'>Update Date of Joining</p>
                                <input
                                    type="date"
                                    value={editedDateOfJoining}
                                    onChange={(e) => handleFieldChange("dateOfJoining", e.target.value)}
                                    disabled={!isEditMode}
                                    className="w-full outline-none"
                                />
                            </div>
                        ) : (
                            <ProfileForm
                                label="Date of Joining"
                                isEditMode={isEditMode}
                                fieldName={formatDate(editedDateOfJoining)}
                                handleFieldChange={(e) => handleFieldChange("dateOfJoining", e.target.value)}
                            />
                        )
                    }

                    {/* bank_details */}
                    <BankDetails
                        bank_details={bank_details}
                        isEditMode={isEditMode}
                        setIsEditMode={setIsEditMode}
                        handleSaveChanges={handleSaveChanges}
                        editedAccountHolderName={editedAccountHolderName}
                        editedAccountNumber={editedAccountNumber}
                        editedBankName={editedBankName}
                        editedBranchName={editedBranchName}
                        editedIfscCode={editedIfscCode}
                        editedBankProof={editedBankProof}
                        handleBankProofUpload={handleBankProofUpload}
                        handleAccountHolderNameChange={(e) => handleFieldChange("accountHolderName", e.target.value)}
                        handleAccountNumberChange={(e) => handleFieldChange("accountNumber", e.target.value)}
                        handleBankNameChange={(e) => handleFieldChange("bankName", e.target.value)}
                        handleBranchNameChange={(e) => handleFieldChange("branchName", e.target.value)}
                        handleIfscCodeChange={(e) => handleFieldChange("ifscCode", e.target.value)}
                    />

                    {/* family_details */}
                    <FamilyDetails
                        family_details={family_details}
                        contactID={contactID}
                        isEditMode={isEditMode}
                        setIsEditMode={setIsEditMode}
                    />

                    {/* experience */}
                    <ExperienceDetails
                        experience={experience}
                        contactID={contactID}
                        formatDate={formatDate}
                        isEditMode={isEditMode}
                        setIsEditMode={setIsEditMode}
                    />

                </div>

                {/* COLUMN 2 */}
                <div>

                    {/* name */}
                    <ProfileForm
                        label="Full Name"
                        fieldName={editedName}
                        isEditMode={isEditMode}
                        handleFieldChange={(e) => handleFieldChange("name", e.target.value)}
                    />

                    {/* contact_no */}
                    <ProfileForm
                        label="Phone Number"
                        fieldName={editedPhoneNumber}
                        isEditMode={isEditMode}
                        handleFieldChange={(e) => handleFieldChange("phoneNumber", e.target.value)}
                    />

                    {/* pancard */}
                    <div className='relative'>
                        <ProfileForm
                            label="Pan Card Number"
                            isEditMode={isEditMode}
                            fieldName={editedPancardNo}
                            handleFieldChange={(e) => handleFieldChange("pancardNo", e.target.value)}
                        />
                        <div className='absolute right-3 top-4'>
                            {isEditMode ? (
                                <UpdateFileUpload onUpload={handlePancardPhotoUpload} message={message} setMessage={setMessage} />
                            ) : (
                                <a href={editedPancardPhoto} rel="noopener noreferrer">
                                    {editedPancardPhoto && <DownloadIcon />}
                                </a>
                            )}
                        </div>
                    </div>


                    {/* esic */}
                    <div className='relative'>
                        <ProfileForm
                            label="ESIC Registration Number"
                            isEditMode={isEditMode}
                            fieldName={editedEsicNo}
                            handleFieldChange={(e) => handleFieldChange("esicNo", e.target.value)}
                        />
                        <div className='absolute right-3 top-4'>
                            {isEditMode ? (
                                <UpdateFileUpload onUpload={handleEsicPhotoUpload} message={message} setMessage={setMessage} />
                            ) : (
                                <a href={editedEsicPhoto} rel="noopener noreferrer">
                                    {editedEsicPhoto && <DownloadIcon />}
                                </a>
                            )}
                        </div>
                    </div>


                    {/* current_address */}
                    <ProfileForm
                        label="Current Address"
                        isEditMode={isEditMode}
                        fieldName={editedCurrentAddress}
                        handleFieldChange={(e) => handleFieldChange("currentAddress", e.target.value)}
                    />

                    {/* overtime_payment */}
                    {user_roles !== 'Employer' && (
                        <ProfileForm
                            label="Overtime Payment"
                            isEditMode={isEditMode}
                            fieldName={editedOvertimePayment}
                            handleFieldChange={(e) => handleFieldChange("overtimePayment", e.target.value)}
                        />
                    )}

                    {/* education_details */}
                    <EducationDetails
                        education_details={education_details}
                        contactID={contactID}
                        isEditMode={isEditMode}
                        setIsEditMode={setIsEditMode}
                    />

                    {/* other_documents */}
                    <OtherDocuments
                        other_documents={other_documents}
                        contactID={contactID}
                        isEditMode={isEditMode}
                        setIsEditMode={setIsEditMode}
                    />

                </div>

                {/* COLUMN 3 */}
                <div>
                    {/* user_roles */}
                    <ProfileForm
                        label="User Role"
                        fieldName={user_roles ? user_roles === 'Employer' ? 'Supervisor' : user_roles : "-"}
                    />

                    {/* contactEmail */}
                    <ProfileForm
                        label="Email ID"
                        newClass="lowercase"
                        fieldName={editedEmail}
                        isEditMode={isEditMode}
                        handleFieldChange={(e) => handleFieldChange("email", e.target.value)}
                    />

                    {/* electricity_bill */}
                    <div className='relative'>
                        <ProfileForm
                            label="Electricity Bill Number"
                            isEditMode={isEditMode}
                            fieldName={editedElectricityBillNo}
                            handleFieldChange={(e) => handleFieldChange("electricityBillNo", e.target.value)}
                        // downloadPath={electricity_bill?.bill_photo}
                        />
                        <div className='absolute right-3 top-4'>
                            {isEditMode ? (
                                <UpdateFileUpload onUpload={handleElectricityBillPhotoUpload} message={message} setMessage={setMessage} />
                            ) : (
                                <a href={editedElectricityBillPhoto} rel="noopener noreferrer">
                                    {editedElectricityBillPhoto && <DownloadIcon />}
                                </a>
                            )}
                        </div>
                    </div>

                    {/* company_name */}
                    <ProfileForm
                        label="Company Name"
                        fieldName={companyName ? companyName : "-"}
                    />

                    {/* category_name */}
                    {user_roles !== 'Employer' && (
                        // category_name
                        <ProfileForm
                            label="Category Name"
                            fieldName={categoryData ? categoryData?.category_name : "-"}
                        />
                    )}

                    {/* gender */}
                    <div className='border border-gray-500 bg-white rounded-lg px-4 pt-1 pb-2 mb-4'>
                        <label className='text-xs'>Gender</label>
                        <select
                            value={editedGender}
                            onChange={(e) => handleFieldChange("genderValue", e.target.value)}
                            disabled={!isEditMode}
                            className="w-full outline-none"
                        >
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other</option>
                        </select>
                    </div>


                    {/* permanent_address */}
                    <ProfileForm
                        label="Permanent Address"
                        isEditMode={isEditMode}
                        fieldName={editedPermanentAddress}
                        handleFieldChange={(e) => handleFieldChange("permanentAddress", e.target.value)}
                    />

                    {/* basic_salary */}
                    <ProfileForm
                        label="Basic Salary"
                        isEditMode={isEditMode}
                        fieldName={editedBasicSalary}
                        handleFieldChange={(e) => handleFieldChange("basicSalary", e.target.value)}
                    />

                    {/* Layoff Toggle */}
                    <UserLayoff
                        active={active}
                        userID={userID}
                        setMessage={setMessage}
                        user_roles={user_roles}
                    />

                </div>

            </div>

            {/* Message */}
            {
                message && (
                    <p className='text-center capitalize m-2 inter text-lg font-semibold text-black '>
                        {message}
                    </p>
                )
            }
        </div>
    );
};

export default Profile;
