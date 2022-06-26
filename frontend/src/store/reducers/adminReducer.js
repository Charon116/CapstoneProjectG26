import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    adminInfo: null,
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],
    allRequiredDoctorInfor: [],
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                adminInfo: action.adminInfo
            }
        case actionTypes.ADMIN_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                adminInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                adminInfo: null
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.dataDoctors;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            state.topDoctors = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.dataAllDoctor;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            state.allDoctors = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            state.allRequiredDoctorInfor = [];
            return {
                ...state
            }
        default:
            return state;
    }
}

export default appReducer;