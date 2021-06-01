import axios from 'axios'
import {LEAVE_APPLICATION_DETAILS_REQUEST, LEAVE_APPLICATION_DETAILS_SUCCESS,LEAVE_APPLICATION_DETAILS_FAIL, LEAVE_APPLICATION_CREATE_REQUEST, LEAVE_APPLICATION_CREATE_SUCCESS, LEAVE_APPLICATION_CREATE_FAIL,LEAVE_APPLICATION_UPDATE_EMPLOYEE_REQUEST,LEAVE_APPLICATION_UPDATE_EMPLOYEE_SUCCESS,LEAVE_APPLICATION_UPDATE_EMPLOYEE_FAIL,LEAVE_APPLICATION_DETAILS_EMPLOYEE_REQUEST,LEAVE_APPLICATION_DETAILS_EMPLOYEE_SUCCESS, LEAVE_APPLICATION_DETAILS_EMPLOYEE_FAIL, LEAVE_APPLICATION_DETAILS_ID_REQUEST, LEAVE_APPLICATION_DETAILS_ID_SUCCESS, LEAVE_APPLICATION_DETAILS_ID_FAIL, DEPARTMENT_LEAVE_APPLICATIONS_REQUEST, DEPARTMENT_LEAVE_APPLICATIONS_SUCCESS, DEPARTMENT_LEAVE_APPLICATIONS_FAIL, LEAVE_APPLICATION_DETAILS_ID_HOD_FAIL, LEAVE_APPLICATION_DETAILS_ID_HOD_SUCCESS, LEAVE_APPLICATION_DETAILS_ID_HOD_REQUEST, HOD_LEAVE_APPLICATION_UPDATE_EMPLOYEE_REQUEST, HOD_LEAVE_APPLICATION_UPDATE_EMPLOYEE_SUCCESS, HOD_LEAVE_APPLICATION_UPDATE_EMPLOYEE_FAIL, LEAVE_APPLICATION_REJECT_REQUEST, LEAVE_APPLICATION_REJECT_SUCCESS, LEAVE_APPLICATION_REJECT_FAIL, EMPLOYEE_UPDATE_LEAVE_APPLICATION_REQUEST, EMPLOYEE_UPDATE_LEAVE_APPLICATION_SUCCESS, EMPLOYEE_UPDATE_LEAVE_APPLICATION_FAIL } from '../constants/leaveApplicationConstants'
import { baseUrl } from '../shared/baseUrl';




export const createLeaveApplication = (
    leaveType,
    fromDate,
    toDate,
    noOfDays,
    reportsTo,
    reasonForLeave,
    leaveStatus
) => async (dispatch, getState) =>  {
    try {
        dispatch({
            type: LEAVE_APPLICATION_CREATE_REQUEST
        })

        
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            baseUrl + '/api/v1/empleave', {
                leaveType,
                fromDate,
                toDate,
                noOfDays,
                reportsTo,
                reasonForLeave,
                leaveStatus
            },
            config)
            

        dispatch({
            type: LEAVE_APPLICATION_CREATE_SUCCESS,
            
            payload: data
        })

    } catch (error) {
        dispatch({
            type: LEAVE_APPLICATION_CREATE_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })
    }
    
}


export const getAllDeptLeaveApplications = (pageNumber = '') => async (dispatch, getState) => {
    try {

        dispatch({
            type: DEPARTMENT_LEAVE_APPLICATIONS_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(
            baseUrl + `/api/v1/hods/leaves?pageNumber=${pageNumber}`, config)

        dispatch({
            type: DEPARTMENT_LEAVE_APPLICATIONS_SUCCESS,
            payload: data
           
        })

    } catch (error) {
        dispatch({
            type: DEPARTMENT_LEAVE_APPLICATIONS_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}


export const getMyLeaveApplication = (pageNumber = '') => async (dispatch, getState) =>  {
    try {
        dispatch({
            type: LEAVE_APPLICATION_DETAILS_EMPLOYEE_REQUEST
        })

        
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            baseUrl + `/api/v1/empleave?pageNumber=${pageNumber}`, 
            config)

        dispatch({
            type: LEAVE_APPLICATION_DETAILS_EMPLOYEE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: LEAVE_APPLICATION_DETAILS_EMPLOYEE_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
    
}


export const getAllEmployeeLeaveApplicationById = (id) => async (dispatch, getState) => {
    try {

        dispatch({
            type: LEAVE_APPLICATION_DETAILS_ID_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(
            baseUrl + `/api/v1/empleave/${id}`, config)

        dispatch({
            type: LEAVE_APPLICATION_DETAILS_ID_SUCCESS,
            payload: data
           
        })

    } catch (error) {
        dispatch({
            type: LEAVE_APPLICATION_DETAILS_ID_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}


export const hodGetAllEmployeeLeaveApplicationById = (id) => async (dispatch, getState) => {
    try {

        dispatch({
            type: LEAVE_APPLICATION_DETAILS_ID_HOD_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(
            baseUrl + `/api/v1/hods/leaveapplications/${id}/employee`, config)

        dispatch({
            type: LEAVE_APPLICATION_DETAILS_ID_HOD_SUCCESS,
            payload: data
           
        })

    } catch (error) {
        dispatch({
            type: LEAVE_APPLICATION_DETAILS_ID_HOD_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}



export const getAllEmployeeLeaveApplications = (keyword = '', pageNumber = '') => async (dispatch, getState) => {
    try {

        dispatch({
            type: LEAVE_APPLICATION_DETAILS_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(
            baseUrl + `/api/v1/hrs/leaveapplications?keyword=${keyword}&pageNumber=${pageNumber}`, config)

        dispatch({
            type: LEAVE_APPLICATION_DETAILS_SUCCESS,
            payload: data
           
        })

    } catch (error) {
        dispatch({
            type: LEAVE_APPLICATION_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}






export const updateEmployeeLeaveApplicationId = (leaveApplication) => async (dispatch, getState) => {
    try {

        dispatch({
            type: LEAVE_APPLICATION_UPDATE_EMPLOYEE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.put(
            baseUrl + `/api/v1/hrs/leaveapplications/${leaveApplication._id}/employee`, leaveApplication, config)

        dispatch({
            type: LEAVE_APPLICATION_UPDATE_EMPLOYEE_SUCCESS,
            success: true,
        })

    } catch (error) {
        dispatch({
            type: LEAVE_APPLICATION_UPDATE_EMPLOYEE_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}


export const approveEmployeeLeaveApplicationId = (leaveApplication) => async (dispatch, getState) => {
    try {

        dispatch({
            type: HOD_LEAVE_APPLICATION_UPDATE_EMPLOYEE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.put(
            baseUrl + `/api/v1/hods/leave/${leaveApplication._id}`, leaveApplication, config)

        dispatch({
            type: HOD_LEAVE_APPLICATION_UPDATE_EMPLOYEE_SUCCESS,
            success: true,
        })

    } catch (error) {
        dispatch({
            type: HOD_LEAVE_APPLICATION_UPDATE_EMPLOYEE_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}

export const rejectEmployeeLeaveApplicationId = (leaveApplication) => async (dispatch, getState) => {
    try {

        dispatch({
            type: LEAVE_APPLICATION_REJECT_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.put(
            baseUrl + `/api/v1/empleave/${leaveApplication._id}/reject`, leaveApplication, config)

        dispatch({
            type: LEAVE_APPLICATION_REJECT_SUCCESS,
            success: true,
        })

    } catch (error) {
        dispatch({
            type: LEAVE_APPLICATION_REJECT_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}

export const employeeUpdateApplication = (leaveApplication) => async (dispatch, getState) => {
    try {

        dispatch({
            type: EMPLOYEE_UPDATE_LEAVE_APPLICATION_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.put(
            baseUrl + `/api/v1/empleave/${leaveApplication._id}`, leaveApplication, config)

        dispatch({
            type: EMPLOYEE_UPDATE_LEAVE_APPLICATION_SUCCESS,
            success: true,
        })

    } catch (error) {
        dispatch({
            type: EMPLOYEE_UPDATE_LEAVE_APPLICATION_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}