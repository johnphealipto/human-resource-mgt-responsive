import axios from 'axios'
import { MESSAGE_RESPONSE_DETAILS_REQUEST, MESSAGE_RESPONSE_DETAILS_SUCCESS, MESSAGE_RESPONSE_DETAILS_FAIL, CREATE_RESPONSE_REQUEST, CREATE_RESPONSE_SUCCESS, CREATE_RESPONSE_FAIL, SINGLE_MESSAGE_REQUEST, SINGLE_MESSAGE_SUCCESS, SINGLE_MESSAGE_FAIL, MESSAGE_DETAILS_REQUEST,  MESSAGE_DETAILS_SUCCESS, MESSAGE_DETAILS_FAIL,  MESSAGE_CREATE_FAIL, MESSAGE_CREATE_REQUEST, MESSAGE_CREATE_SUCCESS, EMPLOYEE_MESSAGE_REQUEST, EMPLOYEE_MESSAGE_SUCCESS , EMPLOYEE_MESSAGE_FAIL, ALL_MESSAGE_DETAILS_REQUEST, ALL_MESSAGE_DETAILS_SUCCESS, ALL_MESSAGE_DETAILS_FAIL,  } from "../constants/messageConstants"
import { baseUrl } from '../shared/baseUrl'



export const createMessages = (
    title,
    body
) => async (dispatch, getState) =>  {
    try {
        dispatch({
            type: MESSAGE_CREATE_REQUEST
        })

        
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            baseUrl + '/api/v1/messages', {
                title,
                body
            },
            config)
            

        dispatch({
            type: MESSAGE_CREATE_SUCCESS,
            
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MESSAGE_CREATE_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
    
}


export const messageDetails = (pageNumber = '') => async (dispatch, getState) =>  {
    try {
        dispatch({
            type: MESSAGE_DETAILS_REQUEST
        })

        
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            baseUrl + `/api/v1/message?pageNumber=${pageNumber}`, 
            config)

        dispatch({
            type: MESSAGE_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MESSAGE_DETAILS_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
    
}

export const employeeMessage = (pageNumber = '') => async (dispatch, getState) =>  {
    try {
        dispatch({
            type: EMPLOYEE_MESSAGE_REQUEST, 
        })

        
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            baseUrl + `/api/v1/messages/employee?pageNumber=${pageNumber}`, 
            config)

        dispatch({
            type: EMPLOYEE_MESSAGE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: EMPLOYEE_MESSAGE_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
    
}


export const getAllChatMessages = (pageNumber = '') => async (dispatch, getState) => {
    try {

        dispatch({
            type: ALL_MESSAGE_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(
            baseUrl + `/api/v1/messages?pageNumber=${pageNumber}`, config)

        dispatch({
            type: ALL_MESSAGE_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_MESSAGE_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}


export const getSingleMessageAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SINGLE_MESSAGE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(
            baseUrl + `/api/v1/messages/${id}`, config)

        dispatch({
            type: SINGLE_MESSAGE_SUCCESS,
            payload: data
           
        })

    } catch (error) {
        dispatch({
            type: SINGLE_MESSAGE_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}

export const createResponseAction = (response) => async (dispatch, getState) =>  {
    try {
        dispatch({
            type: CREATE_RESPONSE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(
            baseUrl + `/api/v1/messages/${response.message}/response`, response, config)
            

        dispatch({
            type: CREATE_RESPONSE_SUCCESS,
            payload: data,
            
        })

    } catch (error) {
        dispatch({
            type: CREATE_RESPONSE_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
}


export const getResponseDetailsAction = (id) => async (dispatch, getState) =>  {
    try {
        dispatch({
            type: MESSAGE_RESPONSE_DETAILS_REQUEST
        })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(
            baseUrl + `/api/v1/messages/${id}/response`, config)
            

        dispatch({
            type: MESSAGE_RESPONSE_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MESSAGE_RESPONSE_DETAILS_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
}