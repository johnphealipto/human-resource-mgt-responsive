import { EDUCATION_CREATE_EMPLOYEE_FAIL, EDUCATION_CREATE_EMPLOYEE_REQUEST, EDUCATION_CREATE_EMPLOYEE_RESET, EDUCATION_CREATE_EMPLOYEE_SUCCESS, EDUCATION_CREATE_FAIL, EDUCATION_CREATE_REQUEST, EDUCATION_CREATE_RESET, EDUCATION_CREATE_SUCCESS, EDUCATION_DETAILS_EMPLOYEE_FAIL, EDUCATION_DETAILS_EMPLOYEE_REQUEST, EDUCATION_DETAILS_EMPLOYEE_RESET, EDUCATION_DETAILS_EMPLOYEE_SUCCESS, EDUCATION_DETAILS_FAIL, EDUCATION_DETAILS_REQUEST, EDUCATION_DETAILS_RESET, EDUCATION_DETAILS_SUCCESS, EDUCATION_UPDATE_FAIL, EDUCATION_UPDATE_REQUEST, EDUCATION_UPDATE_RESET, EDUCATION_UPDATE_SUCCESS } from "../constants/educationConstants"



export const educationDetailsReducer = (state = { education: {} }, action) => {
    switch (action.type) {
        case EDUCATION_DETAILS_REQUEST:
            return { ...state, loading: true }
        case EDUCATION_DETAILS_SUCCESS:
            return { loading: false, education: action.payload }
        case EDUCATION_DETAILS_FAIL:
            return {  loading: false, error: action.payload }
        case EDUCATION_DETAILS_RESET:
            return {  education: {} } 
        default:
            return state
    }
}


export const educationDetailsEmployeeReducer = (state = { education: {} }, action) => {
    switch (action.type) {
        case EDUCATION_DETAILS_EMPLOYEE_REQUEST:
            return { ...state, loading: true }
        case EDUCATION_DETAILS_EMPLOYEE_SUCCESS:
            return { loading: false, education: action.payload }
        case EDUCATION_DETAILS_EMPLOYEE_FAIL:
            return {  loading: false, error: action.payload }
        case EDUCATION_DETAILS_EMPLOYEE_RESET:
            return {  education: {} } 
        default:
            return state
    }
}


export const updateEducationReducer = (state = {  }, action) => {
    switch (action.type) {
        case EDUCATION_UPDATE_REQUEST:
            return { loading: true }
        case EDUCATION_UPDATE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case EDUCATION_UPDATE_FAIL:
            return {  loading: false, error: action.payload }
        case EDUCATION_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

export const createEducationReducer = (state = {  }, action) => {
    switch (action.type) {
        case EDUCATION_CREATE_REQUEST:
            return { loading: true }
        case EDUCATION_CREATE_SUCCESS:
            return { loading: false, success: true }
        case EDUCATION_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case EDUCATION_CREATE_RESET:
                return {  }
        default:
            return state
    }
}

export const createEducationEmpIdReducer = (state = {  }, action) => {
    switch (action.type) {
        case EDUCATION_CREATE_EMPLOYEE_REQUEST:
            return { loading: true }
        case EDUCATION_CREATE_EMPLOYEE_SUCCESS:
            return { loading: false, success: true }
        case EDUCATION_CREATE_EMPLOYEE_FAIL:
            return { loading: false, error: action.payload }
        case EDUCATION_CREATE_EMPLOYEE_RESET:
                return {  }
        default:
            return state
    }
}