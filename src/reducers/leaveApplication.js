import { LEAVE_APPLICATION_CREATE_REQUEST, LEAVE_APPLICATION_CREATE_SUCCESS, LEAVE_APPLICATION_CREATE_FAIL, LEAVE_APPLICATION_CREATE_RESET,LEAVE_APPLICATION_UPDATE_EMPLOYEE_REQUEST,LEAVE_APPLICATION_UPDATE_EMPLOYEE_SUCCESS,LEAVE_APPLICATION_UPDATE_EMPLOYEE_FAIL,LEAVE_APPLICATION_UPDATE_EMPLOYEE_RESET,LEAVE_APPLICATION_DETAILS_EMPLOYEE_REQUEST,LEAVE_APPLICATION_DETAILS_EMPLOYEE_SUCCESS, LEAVE_APPLICATION_DETAILS_EMPLOYEE_FAIL,LEAVE_APPLICATION_DETAILS_EMPLOYEE_RESET,LEAVE_APPLICATION_DETAILS_REQUEST, LEAVE_APPLICATION_DETAILS_SUCCESS, LEAVE_APPLICATION_DETAILS_FAIL, LEAVE_APPLICATION_DETAILS_RESET    } from '../constants/leaveApplicationConstants'


export const createleaveApplicationReducer = (state =  {} , action) => {
    switch (action.type) {
        case LEAVE_APPLICATION_CREATE_REQUEST:
            return { loading: true }
        case LEAVE_APPLICATION_CREATE_SUCCESS:
            return { loading: false, success: true }
        case LEAVE_APPLICATION_CREATE_FAIL:
            return {  loading: false, error: action.payload }
        case LEAVE_APPLICATION_CREATE_RESET:
            return {  }
        default:
            return state
    }
}

export const getleaveApplicationDetailsReducer = (state = { data: [] } , action) => {
    switch (action.type) {
        case LEAVE_APPLICATION_DETAILS_REQUEST:
            return { ...state, loading: true }
        case LEAVE_APPLICATION_DETAILS_SUCCESS:
            return { loading: false, 
                data: action.payload.data,
                pages: action.payload.pages,
                page: action.payload.page }
        case LEAVE_APPLICATION_DETAILS_FAIL:
            return {  loading: false, error: action.payload }
        case LEAVE_APPLICATION_DETAILS_RESET:
            return {  leaveapplication: {} } 
        default:
            return state
    }
}

export const leaveApplicationDetailsEmployeeReducer = (state ={ data: [] }, action) => {
    switch (action.type) {
        case LEAVE_APPLICATION_DETAILS_EMPLOYEE_REQUEST:
            return { ...state, loading: true }
        case LEAVE_APPLICATION_DETAILS_EMPLOYEE_SUCCESS:
            return { loading: false, 
                data: action.payload.data,
                pages: action.payload.pages,
                page: action.payload.page }
        case LEAVE_APPLICATION_DETAILS_EMPLOYEE_FAIL:
            return {  loading: false, error: action.payload }
        case LEAVE_APPLICATION_DETAILS_EMPLOYEE_RESET:
            return { data: [] } 
        default:
            return state
    }
}

export const updateleaveApplicationDetailsEmployeeReducer = (state =  {} , action) => {
    switch (action.type) {
        case LEAVE_APPLICATION_UPDATE_EMPLOYEE_REQUEST:
            return { ...state, loading: true }
        case LEAVE_APPLICATION_UPDATE_EMPLOYEE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case LEAVE_APPLICATION_UPDATE_EMPLOYEE_FAIL:
            return {  loading: false, error: action.payload }
        case LEAVE_APPLICATION_UPDATE_EMPLOYEE_RESET:
            return {}
        default:
            return state
    }
}