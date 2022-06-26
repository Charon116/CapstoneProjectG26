import actionTypes from './actionTypes';
import { getTopDoctorHomeService, getAllDoctors, saveDetailDoctorService, getAllCodeService } from '../../services/userService'
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
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            console.log(res);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
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
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataAllDoctor: res.data
                })
            } else {
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
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            } else {
                console.log('err res', res)
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

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                })
            }
        } catch (error) {
            console.log('FETCH ALL DOCTOR FAILED', error)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,

            })
        }
    }
}

export const getAllRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })

            let resPrice = await getAllCodeService('PRICE');
            let resPayment = await getAllCodeService('PAYMENT');
            let resProvince = await getAllCodeService('PROVINCE');

            if (resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                }
                dispatch(fetchRequiredDoctorInforSuccess(data))
            } else {
                dispatch(fetchRequiredDoctorInforFailed());
            }
        } catch (error) {
            dispatch(fetchRequiredDoctorInforFailed());
            console.log('fetch doctor infor', error);
        }
    }
}

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})

export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS
})