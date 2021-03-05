import { PROFILE_CREATE_EMPLOYEE_FAIL, PROFILE_CREATE_EMPLOYEE_REQUEST, PROFILE_CREATE_EMPLOYEE_RESET, PROFILE_CREATE_EMPLOYEE_SUCCESS, PROFILE_CREATE_FAIL, PROFILE_CREATE_REQUEST, PROFILE_CREATE_RESET, PROFILE_CREATE_SUCCESS, PROFILE_DETAILS_EMPLOYEE_FAIL, PROFILE_DETAILS_EMPLOYEE_REQUEST, PROFILE_DETAILS_EMPLOYEE_RESET, PROFILE_DETAILS_EMPLOYEE_SUCCESS, PROFILE_DETAILS_FAIL, PROFILE_DETAILS_REQUEST, PROFILE_DETAILS_RESET, PROFILE_DETAILS_SUCCESS, PROFILE_UPDATE_FAIL, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_RESET, PROFILE_UPDATE_SUCCESS } from "../constants/profileConstants"


export const profileDetailsReducer = (state = { profile: {} }, action) => {
    switch (action.type) {
        case PROFILE_DETAILS_REQUEST:
            return { ...state, loading: true }
        case PROFILE_DETAILS_SUCCESS:
            return { loading: false, profile: action.payload }
        case PROFILE_DETAILS_FAIL:
            return {  loading: false, error: action.payload }
        case PROFILE_DETAILS_RESET:
            return {  profile: {} } 
        default:
            return state
    }
}


export const profileEmployeeIDDetailsReducer = (state = { profile: {} }, action) => {
    switch (action.type) {
        case PROFILE_DETAILS_EMPLOYEE_REQUEST:
            return { ...state, loading: true }
        case PROFILE_DETAILS_EMPLOYEE_SUCCESS:
            return { loading: false, profile: action.payload }
        case PROFILE_DETAILS_EMPLOYEE_FAIL:
            return {  loading: false, error: action.payload }
        case PROFILE_DETAILS_EMPLOYEE_RESET:
            return {  profile: {} } 
        default:
            return state
    }
}


export const createProfileReducer = (state = {  }, action) => {
    switch (action.type) {
        case PROFILE_CREATE_REQUEST:
            return { loading: true }
        case PROFILE_CREATE_SUCCESS:
            return { loading: false, success: true }
        case PROFILE_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case PROFILE_CREATE_RESET:
                return {  }
        default:
            return state
    }
}


export const createProfileEmpIdReducer = (state = {  }, action) => {
    switch (action.type) {
        case PROFILE_CREATE_EMPLOYEE_REQUEST:
            return { loading: true }
        case PROFILE_CREATE_EMPLOYEE_SUCCESS:
            return { loading: false, success: true }
        case PROFILE_CREATE_EMPLOYEE_FAIL:
            return { loading: false, error: action.payload }
        case PROFILE_CREATE_EMPLOYEE_RESET:
                return {  }
        default:
            return state
    }
}


export const profileUpdateReducer = (state = {  }, action) => {
    switch (action.type) {
        case PROFILE_UPDATE_REQUEST:
            return { loading: true }
        case PROFILE_UPDATE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case PROFILE_UPDATE_FAIL:
            return {  loading: false, error: action.payload }
        case PROFILE_UPDATE_RESET:
            return {}
        default:
            return state
    }
}