import db from '../models/index';
import bcrypt from 'bcryptjs';

let handleUserLogin = (email,password) => {
    return new Promise(async (resolve,reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if(isExist){
                let user = await db.User.findOne({
                    attributes: ['email','roleId','password'],                    
                    where: {email: email},
                    raw: true
                });
                if(user){
                    let check = await bcrypt.compare(password,user.password)
                    if(check){
                        userData.errCode=0,
                        userData.errMessage= "OK",

                        delete user.password;
                        userData.user = user
                    }else{
                        userData.errCode=3,
                        userData.errMessage= "Password is incorrect";
                    }
                }else{
                    userData.errCode = 2;
                    userData.errMessage = "User not found";
                }
            }else{
                userData.errCode = 1;
                userData.errMessage = `Your email isn't exist in our system`;
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async(resolve,reject) => {
        try {
            let user = await db.User.findOne({
                where: {email: userEmail}
            })
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

const salt = bcrypt.genSaltSync(10);

const signUpUser = async (data) => {
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
            })
            resolve('Sign up success');
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
module.exports = {
    handleUserLogin: handleUserLogin,
    signUpUser: signUpUser
}