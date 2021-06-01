import { MESSAGE_RESPONSE_DETAILS_REQUEST, MESSAGE_RESPONSE_DETAILS_SUCCESS, MESSAGE_RESPONSE_DETAILS_FAIL, MESSAGE_RESPONSE_DETAILS_RESET, CREATE_RESPONSE_REQUEST, CREATE_RESPONSE_SUCCESS, CREATE_RESPONSE_FAIL, CREATE_RESPONSE_RESET, SINGLE_MESSAGE_REQUEST, SINGLE_MESSAGE_SUCCESS, SINGLE_MESSAGE_FAIL, SINGLE_MESSAGE_RESET, MESSAGE_CREATE_REQUEST, MESSAGE_CREATE_SUCCESS, MESSAGE_CREATE_FAIL, MESSAGE_CREATE_RESET, MESSAGE_DETAILS_REQUEST, MESSAGE_DETAILS_FAIL, MESSAGE_DETAILS_RESET, MESSAGE_DETAILS_SUCCESS, EMPLOYEE_MESSAGE_REQUEST, EMPLOYEE_MESSAGE_SUCCESS, EMPLOYEE_MESSAGE_FAIL, EMPLOYEE_MESSAGE_RESET, MESSAGE_RESPONSE_REQUEST , MESSAGE_RESPONSE_SUCCESS , MESSAGE_RESPONSE_FAIL,  MESSAGE_RESPONSE_RESET, ALL_MESSAGE_DETAILS_REQUEST, ALL_MESSAGE_DETAILS_SUCCESS, ALL_MESSAGE_DETAILS_FAIL, ALL_MESSAGE_DETAILS_RESET } from '../constants/messageConstants';

export const createMessageReducer = (state =  {} , action) => {
    switch (action.type) {
        case MESSAGE_CREATE_REQUEST:
            return { loading: true }
        case MESSAGE_CREATE_SUCCESS:
            return { loading: false, success: true }
        case MESSAGE_CREATE_FAIL:
            return {  loading: false, error: action.payload }
        case MESSAGE_CREATE_RESET:
            return {  }
        default:
            return state
    }
}

export const getMessageDetailsReducer = (state ={ data: [] }, action) => {
    switch (action.type) {
        case MESSAGE_DETAILS_REQUEST:
            return { ...state, loading: true }
        case MESSAGE_DETAILS_SUCCESS:
            return { loading: false, 
                data: action.payload.data,
                pages: action.payload.pages,
                page: action.payload.page }
        case MESSAGE_DETAILS_FAIL:
            return {  loading: false, error: action.payload }
        case MESSAGE_DETAILS_RESET:
            return { data: [] } 
        default:
            return state
    }
}

export const getEmployeeMessageReducer = (state ={ data: [] }, action) => {
    switch (action.type) {
        case EMPLOYEE_MESSAGE_REQUEST:
            return { ...state, loading: true }
        case EMPLOYEE_MESSAGE_SUCCESS:
            return { loading: false, 
                data: action.payload.data,
                pages: action.payload.pages,
                page: action.payload.page }
        case EMPLOYEE_MESSAGE_FAIL:
            return {  loading: false, error: action.payload }
        case EMPLOYEE_MESSAGE_RESET:
            return { data: [] } 
        default:
            return state
    }
}

export const getMessageResponseReducer = (state ={ data: [] }, action) => {
    switch (action.type) {
        case MESSAGE_RESPONSE_REQUEST:
            return { ...state, loading: true }
        case MESSAGE_RESPONSE_SUCCESS:
            return { loading: false, 
                data: action.payload.data }
        case MESSAGE_RESPONSE_FAIL:
            return {  loading: false, error: action.payload }
        case MESSAGE_RESPONSE_RESET:
            return { data: [] } 
        default:
            return state
    }
}

export const  getAllMessageDetailsReducer = (state = { data: [] } , action) => {
    switch (action.type) {
        case ALL_MESSAGE_DETAILS_REQUEST:
            return { ...state, loading: true }
        case ALL_MESSAGE_DETAILS_SUCCESS:
            return { loading: false, 
                data: action.payload.data,
                pages: action.payload.pages,
                page: action.payload.page }
        case ALL_MESSAGE_DETAILS_FAIL:
            return {  loading: false, error: action.payload }
        case ALL_MESSAGE_DETAILS_RESET:
            return {  data: [] } 
        default:
            return state
    }
}

export const getSingleMessageReducer = (state = { responses: {} } , action) => {
    switch (action.type) {
        case SINGLE_MESSAGE_REQUEST:
            return { ...state, loading: true }
        case SINGLE_MESSAGE_SUCCESS:
            return { loading: false, responses: action.payload.data }
        case SINGLE_MESSAGE_FAIL:
            return {  loading: false, error: action.payload }
        case SINGLE_MESSAGE_RESET:
            return { responses: {} } 
        default:
            return state
    }
}

export const createResponseReducer = (state = { }, action) => {
    switch (action.type) {
        case CREATE_RESPONSE_REQUEST:
            return { loading: true }
        case CREATE_RESPONSE_SUCCESS:
            return { loading: false, success: true }
        case CREATE_RESPONSE_FAIL:
            return {  loading: false, error: action.payload }
        case CREATE_RESPONSE_RESET:
            return {  }
        default:
            return state
    }
}

export const  getResponseDetailsReducer = (state = { data: [] } , action) => {
    switch (action.type) {
        case MESSAGE_RESPONSE_DETAILS_REQUEST:
            return { ...state, loading: true }
        case MESSAGE_RESPONSE_DETAILS_SUCCESS:
            return { loading: false, 
                data: action.payload.data,
                pages: action.payload.pages,
                page: action.payload.page }
        case MESSAGE_RESPONSE_DETAILS_FAIL:
            return {  loading: false, error: action.payload }
        case MESSAGE_RESPONSE_DETAILS_RESET:
            return {  data: [] } 
        default:
            return state
    }
}