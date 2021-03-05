import axios from 'axios'
import { PROFILE_CREATE_EMPLOYEE_FAIL, PROFILE_CREATE_EMPLOYEE_REQUEST, PROFILE_CREATE_EMPLOYEE_SUCCESS, PROFILE_CREATE_FAIL, PROFILE_CREATE_REQUEST, PROFILE_CREATE_SUCCESS, PROFILE_DETAILS_EMPLOYEE_FAIL, PROFILE_DETAILS_EMPLOYEE_REQUEST, PROFILE_DETAILS_EMPLOYEE_SUCCESS, PROFILE_DETAILS_FAIL, PROFILE_DETAILS_REQUEST, PROFILE_DETAILS_SUCCESS, PROFILE_UPDATE_FAIL, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS } from '../constants/profileConstants'
import { baseUrl } from '../shared/baseUrl'


export const getProfileDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PROFILE_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            baseUrl + `/api/v1/profile/${id}`, 
            config)

        dispatch({
            type: PROFILE_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PROFILE_DETAILS_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
    
}


export const getProfileDetailsEmpId = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PROFILE_DETAILS_EMPLOYEE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            baseUrl + `/api/v1/hrs/employee/${id}/profile`, 
            config)

        dispatch({
            type: PROFILE_DETAILS_EMPLOYEE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PROFILE_DETAILS_EMPLOYEE_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
    
}


export const updateProfile = (profile) => async (dispatch, getState) => {
    try {

        dispatch({
            type: PROFILE_UPDATE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        
        await axios.put(
            baseUrl + `/api/v1/profile/${profile._id}`, profile, config)

        dispatch({
            type: PROFILE_UPDATE_SUCCESS,
            success: true,
        })

    } catch (error) {
        dispatch({
            type: PROFILE_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}

export const createProfileEmpId = (profile) => async (dispatch, getState) => {
    try {

        dispatch({
            type: PROFILE_CREATE_EMPLOYEE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        
        await axios.post(
            baseUrl + `/api/v1/hrs/employee/${profile.employee}/profile`, profile, config)

        dispatch({
            type: PROFILE_CREATE_EMPLOYEE_SUCCESS,
           success: true
        })

    } catch (error) {
        dispatch({
            type: PROFILE_CREATE_EMPLOYEE_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}


export const createProfile = (profile) => async (dispatch, getState) => {
    try {

        dispatch({
            type: PROFILE_CREATE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        
        await axios.post(
            baseUrl + `/api/v1/profile`, profile, config)

        dispatch({
            type: PROFILE_CREATE_SUCCESS,
           success: true
        })

    } catch (error) {
        dispatch({
            type: PROFILE_CREATE_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}