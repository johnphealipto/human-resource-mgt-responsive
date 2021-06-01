import axios from 'axios'
import { baseUrl } from '../shared/baseUrl'
import { ADMIN_UPDATE_USER_PASSWORD_FAIL, ADMIN_UPDATE_USER_PASSWORD_REQUEST, ADMIN_UPDATE_USER_PASSWORD_SUCCESS, HOD_LIST_FAIL, HOD_LIST_REQUEST, HOD_LIST_SUCCESS, TEAMLEADS_LIST_FAIL, TEAMLEADS_LIST_REQUEST, TEAMLEADS_LIST_SUCCESS, USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_ID_FAIL, USER_DETAILS_ID_REQUEST, USER_DETAILS_ID_RESET, USER_DETAILS_ID_SUCCESS, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_FORGOT_PASSWORD_FAIL, USER_FORGOT_PASSWORD_REQUEST, USER_FORGOT_PASSWORD_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_RESET_PASSWORD_FAIL, USER_RESET_PASSWORD_REQUEST, USER_RESET_PASSWORD_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_PASSWORD_FAIL, USER_UPDATE_PASSWORD_REQUEST, USER_UPDATE_PASSWORD_RESET, USER_UPDATE_PASSWORD_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from '../constants/userConstants'
import { EDUCATION_DETAILS_EMPLOYEE_RESET, EDUCATION_DETAILS_RESET } from '../constants/educationConstants'
import { LEAVE_APPLICATION_DETAILS_EMPLOYEE_RESET, LEAVE_APPLICATION_DETAILS_ID_RESET } from '../constants/leaveApplicationConstants'
import { PROFILE_DETAILS_EMPLOYEE_RESET } from '../constants/profileConstants'


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            baseUrl + '/api/v1/employees/login', 
            { email, password },
            config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
    
}


export const resetPassword = (password, token) => async (dispatch) => {
    try {
        dispatch({
            type: USER_RESET_PASSWORD_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(
            baseUrl + `/api/v1/employees/resetpassword/${token}`, 
            { password },
            config)

        dispatch({
            type: USER_RESET_PASSWORD_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_RESET_PASSWORD_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
    
}

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({
            type: USER_FORGOT_PASSWORD_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            baseUrl + '/api/v1/employees/forgotpassword', 
            { email },
            config)

        dispatch({
            type: USER_FORGOT_PASSWORD_SUCCESS,
            payload: data
        })

        //localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_FORGOT_PASSWORD_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
    
}


export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT
    })
    dispatch({
        type: USER_DETAILS_RESET
    })
    dispatch({
        type: EDUCATION_DETAILS_RESET
    })
    dispatch({
        type: EDUCATION_DETAILS_EMPLOYEE_RESET
    })
    dispatch({
        type: LEAVE_APPLICATION_DETAILS_EMPLOYEE_RESET
    })
    dispatch({
        type: LEAVE_APPLICATION_DETAILS_ID_RESET
    })
    dispatch({
        type: PROFILE_DETAILS_EMPLOYEE_RESET
    })
    dispatch({
        type: USER_UPDATE_PROFILE_RESET
    })
    dispatch({
        type: USER_UPDATE_PASSWORD_RESET
    })
    dispatch({
        type: USER_DETAILS_ID_RESET
    })
    
}


export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            baseUrl + `/api/v1/employees/${id}`, 
            config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
    
}


export const getUserDetailsById = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_ID_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            baseUrl + `/api/v1/hrs/${id}`, 
            config)

        dispatch({
            type: USER_DETAILS_ID_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_ID_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
    
}


export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            baseUrl + `/api/v1/employees/me`, user,
            config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            success: true,
            payload: data
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
    
}


export const updateUserPassword = (password) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PASSWORD_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            baseUrl + `/api/v1/employees/updatepassword`, password,
            config)

        dispatch({
            type: USER_UPDATE_PASSWORD_SUCCESS,
            success: true,
            payload: data
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PASSWORD_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
    
}


export const adminUpdatePassword = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_UPDATE_USER_PASSWORD_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            baseUrl + `/api/v1/hrs/updatepassword/${user._id}`, user,
            config)

        dispatch({
            type: ADMIN_UPDATE_USER_PASSWORD_SUCCESS,
            success: true,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_UPDATE_USER_PASSWORD_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
    
}


export const listUsers = (keyword = '', pageNumber = '') => async (dispatch, getState) => {
    try {

        dispatch({
            type: USER_LIST_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        
        const { data } = await axios.get(
            baseUrl + `/api/v1/hrs/employees?keyword=${keyword}&pageNumber=${pageNumber}`, config)

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}


export const listHOD = () => async (dispatch, getState) => {
    try {

        dispatch({
            type: HOD_LIST_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        
        const { data } = await axios.get(
            baseUrl + '/api/v1/employees/hods', config)

        dispatch({
            type: HOD_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: HOD_LIST_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}


export const listTeamLeads = () => async (dispatch, getState) => {
    try {

        dispatch({
            type: TEAMLEADS_LIST_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        
        const { data } = await axios.get(
            baseUrl + '/api/v1/employees/teamleads', config)

        dispatch({
            type: TEAMLEADS_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: TEAMLEADS_LIST_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}


export const register = (
    firstname,
    middlename,
    lastname,
    email,
    dateOfJoining,
    department,
    employeeCode,
    role,
    leaveDays,
    password
) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        
        const { data } = await axios.post(
            baseUrl + '/api/v1/hrs/register', { 
            firstname,
            middlename,
            lastname,
            email,
            dateOfJoining,
            department,
            employeeCode,
            role,
            leaveDays,
            password
         }, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        

        // dispatch({
        //     type: USER_LOGIN_SUCCESS,
        //     payload: data
        // })

        // localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}


export const deleteUser = (id) => async (dispatch, getState) => {
    try {

        dispatch({
            type: USER_DELETE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        
        await axios.delete(
           baseUrl +  `/api/v1/hrs/${id}`, config)

        dispatch({
            type: USER_DELETE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}


export const updateUser = (user) => async (dispatch, getState) => {
    try {

        dispatch({
            type: USER_UPDATE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        
        const { data }  =  await axios.put(
            baseUrl + `/api/v1/hrs/${user._id}`, user, config)

        dispatch({
            type: USER_UPDATE_SUCCESS,
            success: true,
        })
        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}