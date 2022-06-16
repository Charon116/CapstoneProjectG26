import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

const createNewUser = async (data) => {
    return new Promise(async(resolve,reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? 'true' : 'false',
                roleId: data.roleId
            })
            
            resolve('ok create new user')
        } catch (error) {
            reject(error)
        }
    })

}

let hashUserPassword = (password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id){
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id},
                raw: false
            })
            if (user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
            }
        }catch{
            reject(error)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    updateUserData: updateUserData
}

