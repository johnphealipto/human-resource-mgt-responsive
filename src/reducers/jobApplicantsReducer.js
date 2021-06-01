import {JOB_APPLICANTS_CREATE_REQUEST,JOB_APPLICANTS_CREATE_SUCCESS,JOB_APPLICANTS_CREATE_FAIL,JOB_APPLICANTS_CREATE_RESET,JOB_APPLICANTS_DETAILS_REQUEST,JOB_APPLICANTS_DETAILS_SUCCESS,JOB_APPLICANTS_DETAILS_FAIL,JOB_APPLICANTS_DETAILS_RESET} from '../constants/jobApplicantsConstants'


export const createJobApplicationReducer = (state =  {} , action) => {
    switch (action.type) {
        case JOB_APPLICANTS_CREATE_REQUEST:
            return { loading: true }
        case JOB_APPLICANTS_CREATE_SUCCESS:
            return { loading: false, success: true }
        case JOB_APPLICANTS_CREATE_FAIL:
            return {  loading: false, error: action.payload }
        case JOB_APPLICANTS_CREATE_RESET:
            return {  }
        default:
            return state
    }
}
export const getAllApplicantsDetails = (state = { data: [] } , action) => {
    switch (action.type) {
        case JOB_APPLICANTS_DETAILS_REQUEST:
            return { ...state, loading: true }
        case JOB_APPLICANTS_DETAILS_SUCCESS:
            return { loading: false, 
                data: action.payload.data,
                pages: action.payload.pages,
                page: action.payload.page }
        case JOB_APPLICANTS_DETAILS_FAIL:
            return {  loading: false, error: action.payload }
        case JOB_APPLICANTS_DETAILS_RESET:
            return {  leaveapplication: {} } 
        default:
            return state
    }
}