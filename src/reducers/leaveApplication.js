import { LEAVE_APPLICATION_CREATE_REQUEST, LEAVE_APPLICATION_CREATE_SUCCESS, LEAVE_APPLICATION_CREATE_FAIL, LEAVE_APPLICATION_CREATE_RESET,LEAVE_APPLICATION_UPDATE_EMPLOYEE_REQUEST,LEAVE_APPLICATION_UPDATE_EMPLOYEE_SUCCESS,LEAVE_APPLICATION_UPDATE_EMPLOYEE_FAIL,LEAVE_APPLICATION_UPDATE_EMPLOYEE_RESET,LEAVE_APPLICATION_DETAILS_EMPLOYEE_REQUEST,LEAVE_APPLICATION_DETAILS_EMPLOYEE_SUCCESS, LEAVE_APPLICATION_DETAILS_EMPLOYEE_FAIL,LEAVE_APPLICATION_DETAILS_EMPLOYEE_RESET,LEAVE_APPLICATION_DETAILS_REQUEST, LEAVE_APPLICATION_DETAILS_SUCCESS, LEAVE_APPLICATION_DETAILS_FAIL, LEAVE_APPLICATION_DETAILS_RESET, LEAVE_APPLICATION_DETAILS_ID_REQUEST, LEAVE_APPLICATION_DETAILS_ID_SUCCESS, LEAVE_APPLICATION_DETAILS_ID_FAIL, LEAVE_APPLICATION_DETAILS_ID_RESET, LEAVE_APPLICATION_DETAILS_ID_HOD_REQUEST, LEAVE_APPLICATION_DETAILS_ID_HOD_SUCCESS, LEAVE_APPLICATION_DETAILS_ID_HOD_FAIL, LEAVE_APPLICATION_DETAILS_ID_HOD_RESET, HOD_LEAVE_APPLICATION_UPDATE_EMPLOYEE_REQUEST, HOD_LEAVE_APPLICATION_UPDATE_EMPLOYEE_SUCCESS, HOD_LEAVE_APPLICATION_UPDATE_EMPLOYEE_FAIL, HOD_LEAVE_APPLICATION_UPDATE_EMPLOYEE_RESET, LEAVE_APPLICATION_REJECT_REQUEST, LEAVE_APPLICATION_REJECT_SUCCESS, LEAVE_APPLICATION_REJECT_FAIL, LEAVE_APPLICATION_REJECT_RESET, EMPLOYEE_UPDATE_LEAVE_APPLICATION_REQUEST, EMPLOYEE_UPDATE_LEAVE_APPLICATION_SUCCESS, EMPLOYEE_UPDATE_LEAVE_APPLICATION_FAIL, EMPLOYEE_UPDATE_LEAVE_APPLICATION_RESET } from '../constants/leaveApplicationConstants'
import { DEPARTMENT_LEAVE_APPLICATIONS_REQUEST, DEPARTMENT_LEAVE_APPLICATIONS_SUCCESS, DEPARTMENT_LEAVE_APPLICATIONS_FAIL, DEPARTMENT_LEAVE_APPLICATIONS_RESET } from '../constants/leaveApplicationConstants'

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


export const getDepartmentLeaveApplicationsReducer = (state = { data: [] } , action) => {
    switch (action.type) {
        case DEPARTMENT_LEAVE_APPLICATIONS_REQUEST:
            return { ...state, loading: true }
        case DEPARTMENT_LEAVE_APPLICATIONS_SUCCESS:
            return { loading: false, 
                data: action.payload.data,
                pages: action.payload.pages,
                page: action.payload.page }
        case DEPARTMENT_LEAVE_APPLICATIONS_FAIL:
            return {  loading: false, error: action.payload }
        case DEPARTMENT_LEAVE_APPLICATIONS_RESET:
            return {  leaveapplication: {} } 
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


export const leaveApplicationDetailsByIdReducer = (state = { leaveapplication: {} } , action) => {
    switch (action.type) {
        case LEAVE_APPLICATION_DETAILS_ID_REQUEST:
            return { ...state, loading: true }
        case LEAVE_APPLICATION_DETAILS_ID_SUCCESS:
            return { loading: false, leaveapplication: action.payload.data }
        case LEAVE_APPLICATION_DETAILS_ID_FAIL:
            return {  loading: false, error: action.payload }
        case LEAVE_APPLICATION_DETAILS_ID_RESET:
            return {  leaveapplication: {} } 
        default:
            return state
    }
}


export const leaveApplicationDetailsByIdHODReducer = (state = { leaveapplication: {} } , action) => {
    switch (action.type) {
        case LEAVE_APPLICATION_DETAILS_ID_HOD_REQUEST:
            return { ...state, loading: true }
        case LEAVE_APPLICATION_DETAILS_ID_HOD_SUCCESS:
            return { loading: false, leaveapplication: action.payload.data }
        case LEAVE_APPLICATION_DETAILS_ID_HOD_FAIL:
            return {  loading: false, error: action.payload }
        case LEAVE_APPLICATION_DETAILS_ID_HOD_RESET:
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

export const updateleaveApplicationDetailsEmployeeReducer = (state =  { } , action) => {
    switch (action.type) {
        case LEAVE_APPLICATION_UPDATE_EMPLOYEE_REQUEST:
            return { loading: true }
        case LEAVE_APPLICATION_UPDATE_EMPLOYEE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case LEAVE_APPLICATION_UPDATE_EMPLOYEE_FAIL:
            return {  loading: false, error: action.payload }
        case LEAVE_APPLICATION_UPDATE_EMPLOYEE_RESET:
            return {  }
        default:
            return state
    }
}


export const approveleaveApplicationDetailsEmployeeReducer = (state =  { } , action) => {
    switch (action.type) {
        case HOD_LEAVE_APPLICATION_UPDATE_EMPLOYEE_REQUEST:
            return { loading: true }
        case HOD_LEAVE_APPLICATION_UPDATE_EMPLOYEE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case HOD_LEAVE_APPLICATION_UPDATE_EMPLOYEE_FAIL:
            return {  loading: false, error: action.payload }
        case HOD_LEAVE_APPLICATION_UPDATE_EMPLOYEE_RESET:
            return {  }
        default:
            return state
    }
}


export const employeeUpdateLeaveApplication = (state =  { } , action) => {
    switch (action.type) {
        case EMPLOYEE_UPDATE_LEAVE_APPLICATION_REQUEST:
            return { loading: true }
        case EMPLOYEE_UPDATE_LEAVE_APPLICATION_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case EMPLOYEE_UPDATE_LEAVE_APPLICATION_FAIL:
            return {  loading: false, error: action.payload }
        case EMPLOYEE_UPDATE_LEAVE_APPLICATION_RESET:
            return {  }
        default:
            return state
    }
}

export const rejectleaveApplicationDetailsEmployeeReducer = (state =  { } , action) => {
    switch (action.type) {
        case LEAVE_APPLICATION_REJECT_REQUEST:
            return { loading: true }
        case LEAVE_APPLICATION_REJECT_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case LEAVE_APPLICATION_REJECT_FAIL:
            return {  loading: false, error: action.payload }
        case LEAVE_APPLICATION_REJECT_RESET:
            return {  }
        default:
            return state
    }
}