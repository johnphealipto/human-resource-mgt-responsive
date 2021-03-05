import axios from 'axios'
import { EDUCATION_CREATE_EMPLOYEE_FAIL, EDUCATION_CREATE_EMPLOYEE_REQUEST, EDUCATION_CREATE_EMPLOYEE_SUCCESS, EDUCATION_CREATE_FAIL, EDUCATION_CREATE_REQUEST, EDUCATION_CREATE_SUCCESS, EDUCATION_DETAILS_EMPLOYEE_FAIL, EDUCATION_DETAILS_EMPLOYEE_REQUEST, EDUCATION_DETAILS_EMPLOYEE_SUCCESS, EDUCATION_DETAILS_FAIL, EDUCATION_DETAILS_REQUEST, EDUCATION_DETAILS_SUCCESS, EDUCATION_UPDATE_FAIL, EDUCATION_UPDATE_REQUEST, EDUCATION_UPDATE_SUCCESS } from '../constants/educationConstants'
import { baseUrl } from '../shared/baseUrl'

export const getEducationDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: EDUCATION_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            baseUrl + `/api/v1/education/${id}`, 
            config)

        dispatch({
            type: EDUCATION_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: EDUCATION_DETAILS_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
    
}


export const getEducationDetailsEmpId = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: EDUCATION_DETAILS_EMPLOYEE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            baseUrl + `/api/v1/hrs/employee/${id}/education`, 
            config)

        dispatch({
            type: EDUCATION_DETAILS_EMPLOYEE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: EDUCATION_DETAILS_EMPLOYEE_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
    
}


export const updateEducation = (education) => async (dispatch, getState) => {
    try {

        dispatch({
            type: EDUCATION_UPDATE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        
        await axios.put(
            baseUrl + `/api/v1/education/${education._id}`, education, config)

        dispatch({
            type: EDUCATION_UPDATE_SUCCESS,
            success: true,
        })

    } catch (error) {
        dispatch({
            type: EDUCATION_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}


export const createEducationEmpId = (education) => async (dispatch, getState) => {
    try {

        dispatch({
            type: EDUCATION_CREATE_EMPLOYEE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        
        await axios.post(
            baseUrl + `/api/v1/hrs/employee/${education.employee}/education`, education, config)

        dispatch({
            type: EDUCATION_CREATE_EMPLOYEE_SUCCESS,
           success: true
        })

    } catch (error) {
        dispatch({
            type: EDUCATION_CREATE_EMPLOYEE_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}

export const createEducation = (education) => async (dispatch, getState) => {
    try {

        dispatch({
            type: EDUCATION_CREATE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        
        await axios.post(
            baseUrl + `/api/v1/education`, education, config)

        dispatch({
            type: EDUCATION_CREATE_SUCCESS,
           success: true
        })

    } catch (error) {
        dispatch({
            type: EDUCATION_CREATE_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}