import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { adminUpdateUserPasswordReducer, hodListReducer, teamLeadsListReducer, userDeleteReducer, userDetailsByIdReducer, userDetailsReducer, userForgotPasswordReducer, userListReducer, userLoginReducer, userRegisterReducer, userResetPasswordReducer, userUpdatePasswordReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducers'
import { profileDetailsReducer, createProfileReducer, profileEmployeeIDDetailsReducer, profileUpdateReducer, createProfileEmpIdReducer } from './reducers/profileReducers'
import { createNextOfKinEmpIdReducer, createNextOfKinReducer, nextOfKinDetailsEmployeeReducer, nextOfKinDetailsReducer, updateNextOfKinReducer } from './reducers/nextOfKinReducer'
import { createEducationEmpIdReducer, createEducationReducer, educationDetailsEmployeeReducer, educationDetailsReducer, updateEducationReducer } from './reducers/educationReducers'
import { updateleaveApplicationDetailsEmployeeReducer, leaveApplicationDetailsEmployeeReducer, getleaveApplicationDetailsReducer, createleaveApplicationReducer, leaveApplicationDetailsByIdReducer, getDepartmentLeaveApplicationsReducer, leaveApplicationDetailsByIdHODReducer, approveleaveApplicationDetailsEmployeeReducer, rejectleaveApplicationDetailsEmployeeReducer, employeeUpdateLeaveApplication } from './reducers/leaveApplication'
import { agentLeaveApplicationByIdReducer, createAgentleaveReducer, getAgentLeaveApplicationsReducer, getTeamLeaveApplicationsReducer, leaveApplicationDetailsAgentReducer, updateleaveApplicationDetailsAgentReducer } from './reducers/agentLeaveReducer'
import { getResponseDetailsReducer, createResponseReducer, createMessageReducer, getMessageDetailsReducer, getEmployeeMessageReducer, getMessageResponseReducer, getAllMessageDetailsReducer, getSingleMessageReducer} from './reducers/messageReducer'
import { getAllApplicantsDetails,createJobApplicationReducer } from './reducers/jobApplicantsReducer';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    userDetailsById: userDetailsByIdReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userUpdatePassword: userUpdatePasswordReducer,

    adminPasswordUpdate: adminUpdateUserPasswordReducer,
    userList: userListReducer,

    hodList: hodListReducer,
    teamLeadList: teamLeadsListReducer,

    userRegister: userRegisterReducer,
    userForgotPassword: userForgotPasswordReducer,
    userResetPassword: userResetPasswordReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    profileDetails: profileDetailsReducer,
    profileUpdate: profileUpdateReducer,
    profileCreate: createProfileReducer,
    nextOfKinDetails: nextOfKinDetailsReducer,
    nextOfKinUpdate: updateNextOfKinReducer,
    nextOfKinCreate: createNextOfKinReducer,
    educationDetails: educationDetailsReducer,
    educationUpdate: updateEducationReducer,
    educationCreate: createEducationReducer,
    profileDetailsEmpId: profileEmployeeIDDetailsReducer,
    nextOfKinDetailsEmpId: nextOfKinDetailsEmployeeReducer,
    educationDetailsEmpId: educationDetailsEmployeeReducer,
    educationCreateEmpId: createEducationEmpIdReducer,
    nextOfKinCreateEmpId: createNextOfKinEmpIdReducer,
    profileCreateEmpId: createProfileEmpIdReducer,
    
    updateLeaveApp: updateleaveApplicationDetailsEmployeeReducer,
    rejectLeave: rejectleaveApplicationDetailsEmployeeReducer,
    leaveAppDetails: leaveApplicationDetailsEmployeeReducer,
    getLeaveAppDetails: getleaveApplicationDetailsReducer,
    createLeaveApp: createleaveApplicationReducer,
    leaveApplicationDetailsById: leaveApplicationDetailsByIdReducer,
    employeeUpdateLeave: employeeUpdateLeaveApplication,

    departmentLeavesApps: getDepartmentLeaveApplicationsReducer,
    hodGetLeaveApplicationsByID: leaveApplicationDetailsByIdHODReducer,
    approveLeaveApp: approveleaveApplicationDetailsEmployeeReducer,

    createAgentLeave: createAgentleaveReducer,
    agentLeaveApp: leaveApplicationDetailsAgentReducer,
    teamLeaveApplications: getTeamLeaveApplicationsReducer,
    agentLeaveApplicationById: agentLeaveApplicationByIdReducer,
    updateAgentLeave: updateleaveApplicationDetailsAgentReducer,
    allAgentLeaveApplications: getAgentLeaveApplicationsReducer,

    

    createMessage: createMessageReducer,
    messageDetails: getMessageDetailsReducer,
    employeeMessages: getEmployeeMessageReducer,
    messageResponse: getMessageResponseReducer,
    getMyMessage: getAllMessageDetailsReducer,
    getAllMessages: getMessageDetailsReducer,
    singleMessage: getSingleMessageReducer,
    createResponse: createResponseReducer,
    responseDetails: getResponseDetailsReducer,
    getAllJobApplication: getAllApplicantsDetails,
    createJobApp: createJobApplicationReducer
 
})

const userInfoFromStorage = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo'))
: null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store