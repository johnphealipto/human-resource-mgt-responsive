import { AGENT_LEAVE_APPLICATIONS_FAIL, AGENT_LEAVE_APPLICATIONS_REQUEST, AGENT_LEAVE_APPLICATIONS_RESET, AGENT_LEAVE_APPLICATIONS_SUCCESS, AGENT_LEAVE_APPLICATION_CREATE_FAIL, AGENT_LEAVE_APPLICATION_CREATE_REQUEST, AGENT_LEAVE_APPLICATION_CREATE_RESET, AGENT_LEAVE_APPLICATION_CREATE_SUCCESS, AGENT_LEAVE_APPLICATION_DETAILS_FAIL, AGENT_LEAVE_APPLICATION_DETAILS_ID_FAIL, AGENT_LEAVE_APPLICATION_DETAILS_ID_REQUEST, AGENT_LEAVE_APPLICATION_DETAILS_ID_RESET, AGENT_LEAVE_APPLICATION_DETAILS_ID_SUCCESS, AGENT_LEAVE_APPLICATION_DETAILS_REQUEST, AGENT_LEAVE_APPLICATION_DETAILS_RESET, AGENT_LEAVE_APPLICATION_DETAILS_SUCCESS, LEAVE_APPLICATION_DETAILS_AGENT_FAIL, LEAVE_APPLICATION_DETAILS_AGENT_REQUEST, LEAVE_APPLICATION_DETAILS_AGENT_RESET, LEAVE_APPLICATION_DETAILS_AGENT_SUCCESS, LEAVE_APPLICATION_UPDATE_AGENT_FAIL, LEAVE_APPLICATION_UPDATE_AGENT_REQUEST, LEAVE_APPLICATION_UPDATE_AGENT_RESET, LEAVE_APPLICATION_UPDATE_AGENT_SUCCESS } from "../constants/agentLeaveContants"


export const createAgentleaveReducer = (state =  {} , action) => {
    switch (action.type) {
        case AGENT_LEAVE_APPLICATION_CREATE_REQUEST:
            return { loading: true }
        case AGENT_LEAVE_APPLICATION_CREATE_SUCCESS:
            return { loading: false, success: true }
        case AGENT_LEAVE_APPLICATION_CREATE_FAIL:
            return {  loading: false, error: action.payload }
        case AGENT_LEAVE_APPLICATION_CREATE_RESET:
            return {  }
        default:
            return state
    }
}

export const leaveApplicationDetailsAgentReducer = (state ={ data: [] }, action) => {
    switch (action.type) {
        case LEAVE_APPLICATION_DETAILS_AGENT_REQUEST:
            return { ...state, loading: true }
        case LEAVE_APPLICATION_DETAILS_AGENT_SUCCESS:
            return { loading: false, 
                data: action.payload.data,
                pages: action.payload.pages,
                page: action.payload.page }
        case LEAVE_APPLICATION_DETAILS_AGENT_FAIL:
            return {  loading: false, error: action.payload }
        case LEAVE_APPLICATION_DETAILS_AGENT_RESET:
            return { data: [] } 
        default:
            return state
    }
}

export const getTeamLeaveApplicationsReducer = (state = { data: [] } , action) => {
    switch (action.type) {
        case AGENT_LEAVE_APPLICATION_DETAILS_REQUEST:
            return { ...state, loading: true }
        case AGENT_LEAVE_APPLICATION_DETAILS_SUCCESS:
            return { loading: false, 
                data: action.payload.data,
                pages: action.payload.pages,
                page: action.payload.page }
        case AGENT_LEAVE_APPLICATION_DETAILS_FAIL:
            return {  loading: false, error: action.payload }
        case AGENT_LEAVE_APPLICATION_DETAILS_RESET:
            return {  leaveapplication: {} } 
        default:
            return state
    }
}

export const getAgentLeaveApplicationsReducer = (state = { data: [] } , action) => {
    switch (action.type) {
        case AGENT_LEAVE_APPLICATIONS_REQUEST:
            return { ...state, loading: true }
        case AGENT_LEAVE_APPLICATIONS_SUCCESS:
            return { loading: false, 
                data: action.payload.data,
                pages: action.payload.pages,
                page: action.payload.page }
        case AGENT_LEAVE_APPLICATIONS_FAIL:
            return {  loading: false, error: action.payload }
        case AGENT_LEAVE_APPLICATIONS_RESET:
            return {  data: [] } 
        default:
            return state
    }
}

export const agentLeaveApplicationByIdReducer = (state = { agentLeaveapplication: {} } , action) => {
    switch (action.type) {
        case AGENT_LEAVE_APPLICATION_DETAILS_ID_REQUEST:
            return { ...state, loading: true }
        case AGENT_LEAVE_APPLICATION_DETAILS_ID_SUCCESS:
            return { loading: false, leaveapplication: action.payload.data }
        case AGENT_LEAVE_APPLICATION_DETAILS_ID_FAIL:
            return {  loading: false, error: action.payload }
        case AGENT_LEAVE_APPLICATION_DETAILS_ID_RESET:
            return {  leaveapplication: {} } 
        default:
            return state
    }
}

export const updateleaveApplicationDetailsAgentReducer = (state =  { } , action) => {
    switch (action.type) {
        case LEAVE_APPLICATION_UPDATE_AGENT_REQUEST:
            return { loading: true }
        case LEAVE_APPLICATION_UPDATE_AGENT_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case LEAVE_APPLICATION_UPDATE_AGENT_FAIL:
            return {  loading: false, error: action.payload }
        case LEAVE_APPLICATION_UPDATE_AGENT_RESET:
            return {  }
        default:
            return state
    }
}