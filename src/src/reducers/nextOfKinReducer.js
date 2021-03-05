import { NOK_CREATE_EMPLOYEE_FAIL, NOK_CREATE_EMPLOYEE_REQUEST, NOK_CREATE_EMPLOYEE_RESET, NOK_CREATE_EMPLOYEE_SUCCESS, NOK_CREATE_FAIL, NOK_CREATE_REQUEST, NOK_CREATE_RESET, NOK_CREATE_SUCCESS, NOK_DETAILS_EMPLOYEE_FAIL, NOK_DETAILS_EMPLOYEE_REQUEST, NOK_DETAILS_EMPLOYEE_RESET, NOK_DETAILS_EMPLOYEE_SUCCESS, NOK_DETAILS_FAIL, NOK_DETAILS_REQUEST, NOK_DETAILS_RESET, NOK_DETAILS_SUCCESS, NOK_UPDATE_FAIL, NOK_UPDATE_REQUEST, NOK_UPDATE_RESET, NOK_UPDATE_SUCCESS } from "../constants/nextOfKinConstants"



export const nextOfKinDetailsReducer = (state = { nextOfKin: {} }, action) => {
    switch (action.type) {
        case NOK_DETAILS_REQUEST:
            return { ...state, loading: true }
        case NOK_DETAILS_SUCCESS:
            return { loading: false, nextOfKin: action.payload }
        case NOK_DETAILS_FAIL:
            return {  loading: false, error: action.payload }
        case NOK_DETAILS_RESET:
            return {  nextOfKin: {} } 
        default:
            return state
    }
}


export const nextOfKinDetailsEmployeeReducer = (state = { nextOfKin: {} }, action) => {
    switch (action.type) {
        case NOK_DETAILS_EMPLOYEE_REQUEST:
            return { ...state, loading: true }
        case NOK_DETAILS_EMPLOYEE_SUCCESS:
            return { loading: false, nextOfKin: action.payload }
        case NOK_DETAILS_EMPLOYEE_FAIL:
            return {  loading: false, error: action.payload }
        case NOK_DETAILS_EMPLOYEE_RESET:
            return {  nextOfKin: {} } 
        default:
            return state
    }
}



export const updateNextOfKinReducer = (state = {  }, action) => {
    switch (action.type) {
        case NOK_UPDATE_REQUEST:
            return { loading: true }
        case NOK_UPDATE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case NOK_UPDATE_FAIL:
            return {  loading: false, error: action.payload }
        case NOK_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

export const createNextOfKinReducer = (state = {  }, action) => {
    switch (action.type) {
        case NOK_CREATE_REQUEST:
            return { loading: true }
        case NOK_CREATE_SUCCESS:
            return { loading: false, success: true }
        case NOK_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case NOK_CREATE_RESET:
                return {  }
        default:
            return state
    }
}


export const createNextOfKinEmpIdReducer = (state = {  }, action) => {
    switch (action.type) {
        case NOK_CREATE_EMPLOYEE_REQUEST:
            return { loading: true }
        case NOK_CREATE_EMPLOYEE_SUCCESS:
            return { loading: false, success: true }
        case NOK_CREATE_EMPLOYEE_FAIL:
            return { loading: false, error: action.payload }
        case NOK_CREATE_EMPLOYEE_RESET:
                return {  }
        default:
            return state
    }
}