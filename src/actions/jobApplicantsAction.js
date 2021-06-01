import axios from 'axios'
import {JOB_APPLICANTS_CREATE_REQUEST, JOB_APPLICANTS_CREATE_SUCCESS,JOB_APPLICANTS_CREATE_FAIL,JOB_APPLICANTS_DETAILS_REQUEST, JOB_APPLICANTS_DETAILS_SUCCESS, JOB_APPLICANTS_DETAILS_FAIL } from '../constants/jobApplicantsConstants'
import { baseUrl } from '../shared/baseUrl';

export const createJobApplication = (
          fullname,
          email,
          gender, 
          age,
          phoneNumber, 
          address,
          jobLocation, 
          educationalQualification, 
          nyscStatus,
          operatingWindow,
          yearsOfExperience,
          igboLanguage,
          hausaLanguage,
          yorubaLanguage,
          englishLanguage,
          frenchLanguage,

) => async (dispatch, getState) =>  {
    try {
        dispatch({
            type: JOB_APPLICANTS_CREATE_REQUEST
        })

        
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        await axios.post(
            baseUrl + '/api/v1/jobapplications', {
                fullname,
                email,
                gender, 
                age,
                phoneNumber, 
                address,
                jobLocation, 
                educationalQualification, 
                nyscStatus,
                operatingWindow,
                yearsOfExperience,
                igboLanguage,
                hausaLanguage,
                yorubaLanguage,
                englishLanguage,
                frenchLanguage,
            },
            config)
            

        dispatch({
            type: JOB_APPLICANTS_CREATE_SUCCESS,
            success: true,
        })

    } catch (error) {
        dispatch({
            type: JOB_APPLICANTS_CREATE_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
    
}

export const getAllApplicantsForm = () => async (dispatch, getState) => {
    try {

        dispatch({
            type: JOB_APPLICANTS_DETAILS_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(
            baseUrl + `/api/v1/jobapplications`, config)

        dispatch({
            type: JOB_APPLICANTS_DETAILS_SUCCESS,
            payload: data
           
        })

    } catch (error) {
        dispatch({
            type: JOB_APPLICANTS_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message,
        })
    }
}