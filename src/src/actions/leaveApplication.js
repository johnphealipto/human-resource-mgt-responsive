import axios from 'axios'
import {LEAVE_APPLICATION_DETAILS_REQUEST, LEAVE_APPLICATION_DETAILS_SUCCESS,LEAVE_APPLICATION_DETAILS_FAIL, LEAVE_APPLICATION_CREATE_REQUEST, LEAVE_APPLICATION_CREATE_SUCCESS, LEAVE_APPLICATION_CREATE_FAIL,LEAVE_APPLICATION_UPDATE_EMPLOYEE_REQUEST,LEAVE_APPLICATION_UPDATE_EMPLOYEE_SUCCESS,LEAVE_APPLICATION_UPDATE_EMPLOYEE_FAIL,LEAVE_APPLICATION_DETAILS_EMPLOYEE_REQUEST,LEAVE_APPLICATION_DETAILS_EMPLOYEE_SUCCESS, LEAVE_APPLICATION_DETAILS_EMPLOYEE_FAIL } from '../constants/leaveApplicationConstants'
import { baseUrl } from '../shared/baseUrl';




export const createLeaveApplication = (
    leaveType,
    fromDate,
    toDate,
    reasonForLeave,
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
                reasonForLeave,
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
                : error.message,
        })
    }
    
}


export const getMyLeaveApplication = () => async (dispatch, getState) =>  {
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
            baseUrl + '/api/v1/empleave', 
            config)

        dispatch({
            type: LEAVE_APPLICATION_DETAILS_SUCCESS,
            
            payload: data
        })

    } catch (error) {
        dispatch({
            type: LEAVE_APPLICATION_DETAILS_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
    
}


export const getAllEmployeeLeaveApplicationId = (keyword = '', pageNumber = '') => async (dispatch, getState) => {
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






// export const updateEmployeeLeaveApplicationId = (id) => async (dispatch, getState) => {
//     try {

//         dispatch({
//             type: LEAVE_APPLICATION_UPDATE_EMPLOYEE_REQUEST
//         })
//         const { userLogin: { userInfo } } = getState()
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }

        
//         await axios.get(
//             baseUrl + `/api/v1/hrs/leaveapplications'${id}/employee`, config)

//         dispatch({
//             type: LEAVE_APPLICATION_UPDATE_EMPLOYEE_SUCCESS,
           
//         })

//     } catch (error) {
//         dispatch({
//             type: LEAVE_APPLICATION_UPDATE_EMPLOYEE_FAIL,
//             payload: error.response && error.response.data.message ? 
//             error.response.data.message : error.message,
//         })
//     }
// }