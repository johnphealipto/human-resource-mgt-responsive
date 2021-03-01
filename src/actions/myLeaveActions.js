import axios from 'axios';
import { MYLEAVE_CREATE_EMPLOYEE_FAIL, MYLEAVE_CREATE_EMPLOYEE_REQUEST, MYLEAVE_CREATE_EMPLOYEE_SUCCESS, MYLEAVE_CREATE_FAIL, MYLEAVE_CREATE_REQUEST, MYLEAVE_CREATE_SUCCESS, MYLEAVE_DETAILS_EMPLOYEE_FAIL, MYLEAVE_DETAILS_EMPLOYEE_REQUEST, MYLEAVE_DETAILS_EMPLOYEE_SUCCESS, MYLEAVE_DETAILS_FAIL, MYLEAVE_DETAILS_REQUEST, MYLEAVE_DETAILS_SUCCESS, MYLEAVE_UPDATE_FAIL, MYLEAVE_UPDATE_REQUEST, MYLEAVE_UPDATE_SUCCESS } from '../constants/myLeaveConstants';
import { baseUrl } from '../shared/baseUrl';

export const createMyLeave = (
    leaveType,
    fromDate,
    toDate,
    reasonForLeave
    ) => async (dispatch, getState) => {
    try {

        dispatch({
            type: MYLEAVE_CREATE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        
        await axios.post(
            baseUrl + '/api/v1/empleave',{
                leaveType,
                fromDate,
                toDate,
                reasonForLeave
            }, config)

        dispatch({
            type: MYLEAVE_CREATE_SUCCESS,
           success: true
        })

    } catch (error) {
        dispatch({
            type: MYLEAVE_CREATE_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}


export const getMyLeaveDetails = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: MYLEAVE_DETAILS_EMPLOYEE_REQUEST
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
            type: MYLEAVE_DETAILS_EMPLOYEE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MYLEAVE_DETAILS_EMPLOYEE_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
    
}

// export const getMyLeaveDetails = () => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: MYLEAVE_DETAILS_REQUEST
//         })

//         const { userLogin: { userInfo } } = getState()

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }

//         const { data } = await axios.get(
//             baseUrl + `/api/v1/hrs/leaveapplications`, 
//             config)

//         dispatch({
//             type: MYLEAVE_DETAILS_SUCCESS,
//             payload: data
//         })

//     } catch (error) {
//         dispatch({
//             type: MYLEAVE_DETAILS_FAIL,
//             payload: error.response && error.response.data.message 
//                 ? error.response.data.message
//                 : error.message,
//         })
//     }
    
// }



// export const updateMyLeave = (myleave) => async (dispatch, getState) => {
//     try {

//         dispatch({
//             type: MYLEAVE_UPDATE_REQUEST
//         })
//         const { userLogin: { userInfo } } = getState()
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }

        
//         await axios.put(
//             baseUrl + `/api/v1/hrs/leaveapplications/${myleave._id}/employee`, myleave, config)

//         dispatch({
//             type: MYLEAVE_UPDATE_SUCCESS,
//             success: true,
//         })

//     } catch (error) {
//         dispatch({
//             type: MYLEAVE_UPDATE_FAIL,
//             payload: error.response && error.response.data.message ? 
//             error.response.data.message : error.message,
//         })
//     }
// }


// export const createMyLeaveEmpId = (myleave) => async (dispatch, getState) => {
//     try {

//         dispatch({
//             type: MYLEAVE_CREATE_EMPLOYEE_REQUEST
//         })
//         const { userLogin: { userInfo } } = getState()
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }

        
//         await axios.post(
//             baseUrl + `/api/v1/empleave`, myleave, config)

//         dispatch({
//             type: MYLEAVE_CREATE_EMPLOYEE_SUCCESS,
//            success: true
//         })

//     } catch (error) {
//         dispatch({
//             type: MYLEAVE_CREATE_EMPLOYEE_FAIL,
//             payload: error.response && error.response.data.message ? 
//             error.response.data.message : error.message,
//         })
//     }
// }