import actionTypes from './actionTypes';
import {getTopDoctorHomeService, getAllDoctors, saveDetailDoctorService} from '../../services/userService'
export const adminLoginSuccess = (adminInfo) => ({
    type: actionTypes.ADMIN_LOGIN_SUCCESS,
    adminInfo: adminInfo
})

export const adminLoginFail = () => ({
    type: actionTypes.ADMIN_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})

export const fetchTopDoctor = () => {
    return async (dispatch,getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            console.log(res);
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
                })
            }
        } catch (error) {
            console.log('FETCH TOP DOCTOR FAILED', error)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
                
            })
        }
    } 
}

export const fetchAllDoctors = () => {
    return async (dispatch,getState) => {
        try {
            let res = await getAllDoctors();
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataAllDoctor: res.data
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
                })
            }
        } catch (error) {
            console.log('FETCH ALL DOCTOR FAILED', error)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
                
            })
        }
    } 
}

export const saveDetailDoctor = (data) => {
    return async (dispatch,getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            }else{
                console.log('err res',res)
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                })
            }
        } catch (error) {
            console.log('SAVE_DETAIL_DOCTOR_FAILED', error)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            })
        }
    } 
}