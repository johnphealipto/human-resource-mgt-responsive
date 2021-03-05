import axios from 'axios'
import { NOK_CREATE_EMPLOYEE_FAIL, NOK_CREATE_EMPLOYEE_REQUEST, NOK_CREATE_EMPLOYEE_SUCCESS, NOK_CREATE_FAIL, NOK_CREATE_REQUEST, NOK_CREATE_SUCCESS, NOK_DETAILS_EMPLOYEE_FAIL, NOK_DETAILS_EMPLOYEE_REQUEST, NOK_DETAILS_EMPLOYEE_SUCCESS, NOK_DETAILS_FAIL, NOK_DETAILS_REQUEST, NOK_DETAILS_SUCCESS, NOK_UPDATE_FAIL, NOK_UPDATE_REQUEST, NOK_UPDATE_SUCCESS } from '../constants/nextOfKinConstants'
import { baseUrl } from '../shared/baseUrl'

export const getNextOfKinDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: NOK_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            baseUrl + `/api/v1/nextofkin/${id}`, 
            config)

        dispatch({
            type: NOK_DETAILS_SUCCESS,
            
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NOK_DETAILS_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
    
}


export const getNextOfKinDetailsEmpId = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: NOK_DETAILS_EMPLOYEE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            baseUrl + `/api/v1/hrs/employee/${id}/nextofkin`, 
            config)

        dispatch({
            type: NOK_DETAILS_EMPLOYEE_SUCCESS,
            
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NOK_DETAILS_EMPLOYEE_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
    
}


export const updateNextOfKin = (nextofkin) => async (dispatch, getState) => {
    try {

        dispatch({
            type: NOK_UPDATE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        
        await axios.put(
            baseUrl + `/api/v1/nextofkin/${nextofkin._id}`, nextofkin, config)

        dispatch({
            type: NOK_UPDATE_SUCCESS,
            success: true,
        })

    } catch (error) {
        dispatch({
            type: NOK_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}


export const createNextOfKin = (nextofkin) => async (dispatch, getState) => {
    try {

        dispatch({
            type: NOK_CREATE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        
        await axios.post(
            baseUrl + `/api/v1/nextofkin`, nextofkin, config)

        dispatch({
            type: NOK_CREATE_SUCCESS,
           
        })

    } catch (error) {
        dispatch({
            type: NOK_CREATE_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}

export const createNextOfKinEmpId = (nextofkin) => async (dispatch, getState) => {
    try {

        dispatch({
            type: NOK_CREATE_EMPLOYEE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        
        await axios.post(
            baseUrl + `/api/v1/hrs/employee/${nextofkin.employee}/nextofkin`, nextofkin, config)

        dispatch({
            type: NOK_CREATE_EMPLOYEE_SUCCESS,
           
        })

    } catch (error) {
        dispatch({
            type: NOK_CREATE_EMPLOYEE_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}