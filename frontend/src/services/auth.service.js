import axios from "../axios"

class AuthService {
    register(email, password, firstName, lastName, phoneNumber, address,gender) {
        return axios.post('/api/signup', {email, password, firstName, lastName, phoneNumber, address, gender });
    }

    getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();
