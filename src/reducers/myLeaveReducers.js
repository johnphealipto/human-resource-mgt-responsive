import { MYLEAVE_CREATE_EMPLOYEE_FAIL, MYLEAVE_CREATE_EMPLOYEE_REQUEST, MYLEAVE_CREATE_EMPLOYEE_RESET, MYLEAVE_CREATE_EMPLOYEE_SUCCESS, MYLEAVE_CREATE_FAIL, MYLEAVE_CREATE_REQUEST, MYLEAVE_CREATE_RESET, MYLEAVE_CREATE_SUCCESS, MYLEAVE_DETAILS_EMPLOYEE_FAIL, MYLEAVE_DETAILS_EMPLOYEE_REQUEST, MYLEAVE_DETAILS_EMPLOYEE_RESET, MYLEAVE_DETAILS_EMPLOYEE_SUCCESS, MYLEAVE_DETAILS_FAIL, MYLEAVE_DETAILS_REQUEST, MYLEAVE_DETAILS_RESET, MYLEAVE_DETAILS_SUCCESS, MYLEAVE_UPDATE_FAIL, MYLEAVE_UPDATE_REQUEST, MYLEAVE_UPDATE_RESET, MYLEAVE_UPDATE_SUCCESS } from "../constants/myLeaveConstants"

export const myLeaveDetailsReducer = (state = { myleave: {} }, action) => {
    switch (action.type) {
        case MYLEAVE_DETAILS_REQUEST:
            return { ...state, loading: true }
        case MYLEAVE_DETAILS_SUCCESS:
            return { loading: false, myleave: action.payload }
        case MYLEAVE_DETAILS_FAIL:
            return {  loading: false, error: action.payload }
        case MYLEAVE_DETAILS_RESET:
            return {  myleave: {} } 
        default:
            return state
    }
}


export const myLeaveDetailsEmployeeReducer = (state = { myleave: {} }, action) => {
    switch (action.type) {
        case MYLEAVE_DETAILS_EMPLOYEE_REQUEST:
            return { ...state, loading: true }
        case MYLEAVE_DETAILS_EMPLOYEE_SUCCESS:
            return { loading: false, myleave: action.payload }
        case MYLEAVE_DETAILS_EMPLOYEE_FAIL:
            return {  loading: false, error: action.payload }
        case MYLEAVE_DETAILS_EMPLOYEE_RESET:
            return {  myleave: {} } 
        default:
            return state
    }
}


export const updateMyLeaveReducer = (state = {  }, action) => {
    switch (action.type) {
        case MYLEAVE_UPDATE_REQUEST:
            return { loading: true }
        case MYLEAVE_UPDATE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case MYLEAVE_UPDATE_FAIL:
            return {  loading: false, error: action.payload }
        case MYLEAVE_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

export const createMyLeaveReducer = (state = {  }, action) => {
    switch (action.type) {
        case MYLEAVE_CREATE_REQUEST:
            return { loading: true }
        case MYLEAVE_CREATE_SUCCESS:
            return { loading: false, success: true }
        case MYLEAVE_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case MYLEAVE_CREATE_RESET:
                return {  }
        default:
            return state
    }
}

export const createMyLeaveEmpIdReducer = (state = {  }, action) => {
    switch (action.type) {
        case MYLEAVE_CREATE_EMPLOYEE_REQUEST:
            return { loading: true }
        case MYLEAVE_CREATE_EMPLOYEE_SUCCESS:
            return { loading: false, success: true }
        case MYLEAVE_CREATE_EMPLOYEE_FAIL:
            return { loading: false, error: action.payload }
        case MYLEAVE_CREATE_EMPLOYEE_RESET:
                return {  }
        default:
            return state
    }
}