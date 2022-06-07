import axios from "../axios"

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
}

const handleSignUpApi = (email, password, firstName, lastName, phoneNumber, address) => {
    return axios.post('/api/signup', {email, password, firstName, lastName, phoneNumber, address });
}



export {handleLoginApi, handleSignUpApi}