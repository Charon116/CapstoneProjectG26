import axios from "../axios"

class AuthService {
    register(email, password, firstName, lastName, phoneNumber, address) {
        return axios.post('/api/signup', {email, password, firstName, lastName, phoneNumber, address });
    }

    getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();
