import axios from "../axios"

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
}

// const handleSignUpApi = (email, password, firstName, lastName, phoneNumber, address) => {
//     return axios.post('/api/signup', {email, password, firstName, lastName, phoneNumber, address });
// }

const getAllUsers = (inputId) =>{
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allCode?type=${inputType}`);
}

const getTopDoctorHomeService= (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors= () => {
    return axios.get(`/api/get-all-doctor`)
}

const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-infor-doctor', data);
}

const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
}

const getScheduleDoctorByDate = (doctorId,date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}

export {handleLoginApi, getAllUsers, deleteUserService, editUserService, getAllCodeService, getTopDoctorHomeService, getAllDoctors, saveDetailDoctorService,getDetailInforDoctor,saveBulkScheduleDoctor, getScheduleDoctorByDate, getExtraInforDoctorById}