import axiosClient from "./apiClient";

/* Employee */
export const createNewEmployee = (data) => {
    return axiosClient().post('employee', JSON.stringify(data)).then(response => response.data);
}

export const createNewEmployer = (data) => {
    return axiosClient().post('employer', JSON.stringify(data)).then(response => response.data);
}

export const updateEmployee = (id, data) => {
    return axiosClient().patch(`employee/${id}`, JSON.stringify(data)).then(response => response.data);
}

export const getEmployeeCategoryList = () => {
    return axiosClient().get('employee-category').then(response => response.data)
}

export const getEmployeeList = () => {
    return axiosClient().post('employee/get').then(response => response.data)
}

export const getCompanyEmployeeList = (data) => {
    return axiosClient().post('employee/get', JSON.stringify(data)).then(response => response.data)
}

export const getEmployeeProfile = (id) => {
    return axiosClient().get(`employee/get-profile/${id}`).then(response => response.data)
}

/* Employer */
export const getEmployerList = () => {
    return axiosClient().post('employer').then(response => response.data)
}

export const getEmployerListByCompany = (data) => {
    return axiosClient().post('employer', JSON.stringify(data)).then(response => response.data)
}

/* Company */
export const getCompanyList = () => {
    return axiosClient().get('company').then(response => response.data)
}

export const getCompanyById = (id) => {
    return axiosClient().get(`company/${id}`).then(response => response.data)
}

export const createNewCompany = (data) => {
    return axiosClient().post('company', JSON.stringify(data)).then(response => response.data);
}

export const getCompanyEmployees = (data) => {
    return axiosClient().post('company/employees', JSON.stringify(data)).then(response => response.data);
}

/* Organizations */
export const getOrganizationsList = () => {
    return axiosClient().get('organizations').then(response => response.data)
}

/* Password */
export const getPasswordRequests = () => {
    return axiosClient().get('register/password-request').then(response => response.data)
}

export const generateUserPassword = (data) => {
    return axiosClient().post('register/generate-password', JSON.stringify(data)).then(response => response.data);
}

export const generateUserPasswordById = (data) => {
    return axiosClient().post('register/generate-password', JSON.stringify(data)).then(response => response.data);
}

export const deletePasswordRequest = (id) => {
    return axiosClient().delete(`register/password-request/${id}`).then(response => response.data)
}

/* User */
export const userLogin = (data) => {
    return axiosClient().post('users/login', JSON.stringify(data)).then(response => response.data)
}

export const getUserProfile = () => {
    return axiosClient().get('users').then(response => response.data)
}

export const layoffUser = (data) => {
    return axiosClient().post('users/layoff', JSON.stringify(data)).then(response => response.data)
}

export const unlayoffUser = (data) => {
    return axiosClient().post('users/unlayoff', JSON.stringify(data)).then(response => response.data)
}

/* New Signup */
// export const getUserRegisters = () => {
//     return axiosClient().get('register').then(response => response.data)
// }

export const getUserRegisters = () => {
    return axiosClient().get('contacts/get-register').then(response => response.data)
}

export const sendRegisterStatus = (data) => {
    return axiosClient().post('register/status', JSON.stringify(data)).then(response => response.data)
}

/* Communication */
export const getCommunications = () => {
    return axiosClient().get('communicate').then(response => response.data)
}

export const getDetailMessages = (id) => {
    return axiosClient().get(`communicate/messages/${id}`).then(response => response.data)
}

export const sendMessage = (data) => {
    return axiosClient().post('communicate/send', JSON.stringify(data)).then(response => response.data)
}

export const markMessagesRead = (data) => {
    return axiosClient().post('communicate/messages/mark-read', JSON.stringify(data)).then(response => response.data)
}

/* file upload */

export const uploadFileEmployee = (data) => {
    return axiosClient().post('file/upload/Employee', data).then(response => response.data)
}

export const uploadFileEmployer = (data) => {
    return axiosClient().post('file/upload/Employer', data).then(response => response.data)
}

export const uploadFileOrganizations = (data) => {
    return axiosClient().post('file/upload/Organizations', data).then(response => response.data)
}

/* Payroll */

export const getPayroll = (data) => {
    return axiosClient().post('payroll', JSON.stringify(data)).then(response => response.data)
}

export const payrollEmployeeDetails = (data) => {
    return axiosClient().post('payroll/employees', JSON.stringify(data)).then(response => response.data)
}

export const payrollAttendanceDetails = (data) => {
    return axiosClient().post('payroll/employee_attendance', JSON.stringify(data)).then(response => response.data)
}

export const payrollDownloadCompanyDetails = () => {
    return axiosClient().get('payroll/company').then(response => response.data)
}

export const payrollDownloadMasterSheet = (data) => {
    return axiosClient().post('payroll/master', JSON.stringify(data)).then(response => response.data)
}

export const payrollUpdate = (id, data) => {
    return axiosClient().patch(`payroll/${id}`, JSON.stringify(data)).then(response => response.data)
}

export const payrollSendPayslip = (data) => {
    return axiosClient().post('payroll/payslips/send', JSON.stringify(data)).then(response => response.data)
}
export const payrollDownloadPayslip = (data) => {
    return axiosClient().post('payroll/payslips/send', JSON.stringify(data)).then(response => response.data)
}

/* Notifications */

export const getNotifications = () => {
    return axiosClient().get('notifications').then(response => response.data)
}

export const markReadNotifications = (id) => {
    return axiosClient().patch(`notifications/read/${id}`).then(response => response.data)
}

/* Attendance */

export const getCompanyAttendance = (data) => {
    return axiosClient().post('attendance/company', JSON.stringify(data)).then(response => response.data)
}

export const getDetailUserAttendance = (id) => {
    return axiosClient().get(`attendance/get/${id}`).then(response => response.data)
}

/* Tasks */
export const getUserTaskByID = (id) => {
    return axiosClient().get(`task/getTask/${id}`).then(response => response.data)
}

/* Education Details */
export const createEducation = (data) => {
    return axiosClient().post('contacts/education', JSON.stringify(data)).then(response => response.data)
}

export const updateEducation = (eduId, data) => { // pass education object id
    return axiosClient().patch(`contacts/education/${eduId}`, JSON.stringify(data)).then(response => response.data)
}

export const deleteEducation = (contactId, eduId) => {  // pass contact id & education object id
    return axiosClient().delete(`contacts/education/${contactId}/${eduId}`).then(response => response.data)
}

/* Experience Details */
export const createExperience = (data) => {
    return axiosClient().post('contacts/experience', JSON.stringify(data)).then(response => response.data)
}

export const updateExperience = (expId, data) => { // pass experience object id
    return axiosClient().patch(`contacts/experience/${expId}`, JSON.stringify(data)).then(response => response.data)
}

export const deleteExperience = (contactId, expId) => { // pass contact id & experience object id
    return axiosClient().delete(`contacts/experience/${contactId}/${expId}`).then(response => response.data)
}


/* Family Details */
export const createFamily = (data) => {
    return axiosClient().post('contacts/family-details', JSON.stringify(data)).then(response => response.data)
}

export const updateFamily = (famId, data) => { // pass family-details object id
    return axiosClient().patch(`contacts/family-details/${famId}`, JSON.stringify(data)).then(response => response.data)
}

export const deleteFamily = (contactId, famId) => { // pass contact id & family-details object id
    return axiosClient().delete(`contacts/family-details/${contactId}/${famId}`).then(response => response.data)
}

/* Other Documents Details */
export const createDocuments = (data) => {
    return axiosClient().post('contacts/documents', JSON.stringify(data)).then(response => response.data)
}

export const updateDocuments = (docId, data) => { // pass documents object id
    return axiosClient().patch(`contacts/documents/${docId}`, JSON.stringify(data)).then(response => response.data)
}

export const deleteDocuments = (contactId, docId) => { // pass contact id & documents object id
    return axiosClient().delete(`contacts/documents/${contactId}/${docId}`).then(response => response.data)
}
