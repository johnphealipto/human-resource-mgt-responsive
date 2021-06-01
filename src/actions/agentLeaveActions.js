import axios from 'axios'
import { AGENT_LEAVE_APPLICATIONS_FAIL, AGENT_LEAVE_APPLICATIONS_REQUEST, AGENT_LEAVE_APPLICATIONS_SUCCESS, AGENT_LEAVE_APPLICATION_CREATE_FAIL, AGENT_LEAVE_APPLICATION_CREATE_REQUEST, AGENT_LEAVE_APPLICATION_CREATE_SUCCESS, AGENT_LEAVE_APPLICATION_DETAILS_FAIL, AGENT_LEAVE_APPLICATION_DETAILS_ID_FAIL, AGENT_LEAVE_APPLICATION_DETAILS_ID_REQUEST, AGENT_LEAVE_APPLICATION_DETAILS_ID_SUCCESS, AGENT_LEAVE_APPLICATION_DETAILS_REQUEST, AGENT_LEAVE_APPLICATION_DETAILS_SUCCESS, LEAVE_APPLICATION_DETAILS_AGENT_FAIL, LEAVE_APPLICATION_DETAILS_AGENT_REQUEST, LEAVE_APPLICATION_DETAILS_AGENT_SUCCESS, LEAVE_APPLICATION_UPDATE_AGENT_FAIL, LEAVE_APPLICATION_UPDATE_AGENT_REQUEST, LEAVE_APPLICATION_UPDATE_AGENT_SUCCESS } from '../constants/agentLeaveContants';
import { baseUrl } from '../shared/baseUrl';

export const createAgentLeaveApplication = (
    leaveType,
    fromDate,
    toDate,
    noOfDays,
    supervisor,
    reasonForLeave,
    leaveStatus
) => async (dispatch, getState) =>  {
    try {
        dispatch({
            type: AGENT_LEAVE_APPLICATION_CREATE_REQUEST
        })

        
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            baseUrl + '/api/v1/agentleave', {
                leaveType,
                fromDate,
                toDate,
                noOfDays,
                supervisor,
                reasonForLeave,
                leaveStatus
            },
            config)
            

        dispatch({
            type: AGENT_LEAVE_APPLICATION_CREATE_SUCCESS,
            
            payload: data
        })

    } catch (error) {
        dispatch({
            type: AGENT_LEAVE_APPLICATION_CREATE_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
    
}



export const getAgentApplication = (pageNumber = '') => async (dispatch, getState) =>  {
    try {
        dispatch({
            type: LEAVE_APPLICATION_DETAILS_AGENT_REQUEST
        })

        
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            baseUrl + `/api/v1/agentleave?pageNumber=${pageNumber}`, 
            config)

        dispatch({
            type: LEAVE_APPLICATION_DETAILS_AGENT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: LEAVE_APPLICATION_DETAILS_AGENT_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
    
}

export const getAllAgentApplication = (pageNumber = '') => async (dispatch, getState) =>  {
    try {
        dispatch({
            type: AGENT_LEAVE_APPLICATIONS_REQUEST
        })

        
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            baseUrl + `/api/v1/hrs/agentleaveapplications?pageNumber=${pageNumber}`, 
            config)

        dispatch({
            type: AGENT_LEAVE_APPLICATIONS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: AGENT_LEAVE_APPLICATIONS_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
    
}

export const getAllTeamLeaveApplications = (pageNumber = '') => async (dispatch, getState) => {
    try {

        dispatch({
            type: AGENT_LEAVE_APPLICATION_DETAILS_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(
            baseUrl + `/api/v1/teamleads?pageNumber=${pageNumber}`, config)

        dispatch({
            type: AGENT_LEAVE_APPLICATION_DETAILS_SUCCESS,
            payload: data
           
        })

    } catch (error) {
        dispatch({
            type: AGENT_LEAVE_APPLICATION_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}

export const getAgentLeaveApplicationById = (id) => async (dispatch, getState) => {
    try {

        dispatch({
            type: AGENT_LEAVE_APPLICATION_DETAILS_ID_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(
            baseUrl + `/api/v1/teamleads/${id}`, config)

        dispatch({
            type: AGENT_LEAVE_APPLICATION_DETAILS_ID_SUCCESS,
            payload: data
           
        })

    } catch (error) {
        dispatch({
            type: AGENT_LEAVE_APPLICATION_DETAILS_ID_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}

export const updateAgentLeaveApplicationId = (leaveApplication) => async (dispatch, getState) => {
    try {

        dispatch({
            type: LEAVE_APPLICATION_UPDATE_AGENT_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.put(
            baseUrl + `/api/v1/teamleads/${leaveApplication._id}`, leaveApplication, config)

        dispatch({
            type: LEAVE_APPLICATION_UPDATE_AGENT_SUCCESS,
            success: true,
        })

    } catch (error) {
        dispatch({
            type: LEAVE_APPLICATION_UPDATE_AGENT_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}