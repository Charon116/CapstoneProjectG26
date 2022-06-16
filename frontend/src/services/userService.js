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



export {handleLoginApi, getAllUsers, deleteUserService, editUserService}