import {  USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESS,  USER_UPDATE_PASSWORD_REQUEST, USER_UPDATE_PASSWORD_FAIL, USER_UPDATE_PASSWORD_RESET, USER_UPDATE_PASSWORD_SUCCESS, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_LIST_RESET, USER_REGISTER_REQUEST, USER_REGISTER_RESET, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_RESET, USER_DETAILS_ID_REQUEST, USER_DETAILS_ID_SUCCESS, USER_DETAILS_ID_FAIL, USER_DETAILS_ID_RESET, USER_FORGOT_PASSWORD_REQUEST, USER_FORGOT_PASSWORD_SUCCESS, USER_FORGOT_PASSWORD_FAIL, USER_FORGOT_PASSWORD_RESET, USER_RESET_PASSWORD_RESET, USER_RESET_PASSWORD_REQUEST, USER_RESET_PASSWORD_SUCCESS, USER_RESET_PASSWORD_FAIL, HOD_LIST_REQUEST, HOD_LIST_SUCCESS, HOD_LIST_FAIL, HOD_LIST_RESET, TEAMLEADS_LIST_REQUEST, TEAMLEADS_LIST_SUCCESS, TEAMLEADS_LIST_FAIL, TEAMLEADS_LIST_RESET, ADMIN_UPDATE_USER_PASSWORD_REQUEST, ADMIN_UPDATE_USER_PASSWORD_SUCCESS, ADMIN_UPDATE_USER_PASSWORD_FAIL, ADMIN_UPDATE_USER_PASSWORD_RESET } from '../constants/userConstants'

export const userLoginReducer = (state = {  }, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return {  loading: false, error: action.payload }
        case USER_LOGOUT:
            return { }
        default:
            return state
    }
}

export const userResetPasswordReducer = (state = {  }, action) => {
    switch (action.type) {
        case USER_RESET_PASSWORD_REQUEST:
            return { loading: true }
        case USER_RESET_PASSWORD_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_RESET_PASSWORD_FAIL:
            return {  loading: false, error: action.payload }
        case USER_RESET_PASSWORD_RESET:
            return { }
        default:
            return state
    }
}


export const userForgotPasswordReducer = (state = {  }, action) => {
    switch (action.type) {
        case USER_FORGOT_PASSWORD_REQUEST:
            return { loading: true }
        case USER_FORGOT_PASSWORD_SUCCESS:
            return { loading: false, success: true, user: action.payload }
        case USER_FORGOT_PASSWORD_FAIL:
            return {  loading: false,  error: action.payload }
        case USER_FORGOT_PASSWORD_RESET:
            return {  }
        default:
            return state
    }
}


export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_DETAILS_FAIL:
            return {  loading: false, error: action.payload }
        case USER_DETAILS_RESET:
            return {  user: {} } 
        default:
            return state
    }
}

export const userDetailsByIdReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_ID_REQUEST:
            return { ...state, loading: true }
        case USER_DETAILS_ID_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_DETAILS_ID_FAIL:
            return {  loading: false, error: action.payload }
        case USER_DETAILS_ID_RESET:
            return {  user: {} } 
        default:
            return state
    }
}


export const userUpdateProfileReducer = (state = {  }, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_UPDATE_PROFILE_FAIL:
            return {  loading: false, error: action.payload }
        case USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state
    }
}


export const userUpdatePasswordReducer = (state = {  }, action) => {
    switch (action.type) {
        case USER_UPDATE_PASSWORD_REQUEST:
            return { loading: true }
        case USER_UPDATE_PASSWORD_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_UPDATE_PASSWORD_FAIL:
            return {  loading: false, error: action.payload }
        case USER_UPDATE_PASSWORD_RESET:
            return {}
        default:
            return state
    }
}


export const adminUpdateUserPasswordReducer = (state = {  }, action) => {
    switch (action.type) {
        case ADMIN_UPDATE_USER_PASSWORD_REQUEST:
            return { loading: true }
        case ADMIN_UPDATE_USER_PASSWORD_SUCCESS:
            return { loading: false, success: true }
        case ADMIN_UPDATE_USER_PASSWORD_FAIL:
            return {  loading: false, error: action.payload }
        case ADMIN_UPDATE_USER_PASSWORD_RESET:
            return {}
        default:
            return state
    }
}


export const userListReducer = (state = { data: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true }
        case USER_LIST_SUCCESS:
            return { loading: false, 
                data: action.payload.data,
                pages: action.payload.pages,
                page: action.payload.page }
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }
        case USER_LIST_RESET:
            return { data: [] }
        default:
            return state
    }
}

export const hodListReducer = (state = { hods: [] }, action) => {
    switch (action.type) {
        case HOD_LIST_REQUEST:
            return { loading: true }
        case HOD_LIST_SUCCESS:
            return { loading: false, 
                hods: action.payload.data }
        case HOD_LIST_FAIL:
            return { loading: false, error: action.payload }
        case HOD_LIST_RESET:
            return { data: [] }
        default:
            return state
    }
}


export const teamLeadsListReducer = (state = { teamLeads: [] }, action) => {
    switch (action.type) {
        case TEAMLEADS_LIST_REQUEST:
            return { loading: true }
        case TEAMLEADS_LIST_SUCCESS:
            return { loading: false, 
                teamLeads: action.payload.data }
        case TEAMLEADS_LIST_FAIL:
            return { loading: false, error: action.payload }
        case TEAMLEADS_LIST_RESET:
            return { data: [] }
        default:
            return state
    }
}


export const userRegisterReducer = (state = {  }, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        case USER_REGISTER_RESET:
                return {  }
        default:
            return state
    }
}

export const userDeleteReducer = (state = {  }, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true }
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true }
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userUpdateReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true }
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true }
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case USER_UPDATE_RESET:
            return {
                user: {}
            }
        default:
            return state
    }
}