import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import PasswordScreen from "./screens/PasswordScreen";
import StaffListScreen from "./screens/StaffListScreen";
import StaffCreateScreen from "./screens/StaffCreateScreen";
import StaffEditScreen from "./screens/StaffEditScreen";
import HomeScreen from "./screens/HomeScreen";
import RoleEditScreen from "./screens/RoleEditScreen";
import ProfileScreen from "./screens/ProfileScreen";
import NextOfKinScreen from "./screens/NextOfKinScreen";
import EducationScreen from "./screens/EducationScreen";
import HrHomeScreen from "./screens/HrHomeScreen";
import AdminProfileScreen from "./screens/AdminProfileScreen";
import AdminNextOfKinScreen from "./screens/AdminNextOfKinScreen";
import AdminEducationScreen from "./screens/AdminEducationScreen";
import MyLeaveApplicationScreen from "./screens/MyLeaveApplicationScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import AllLeaveApplications from "./screens/AllLeaveApplications";
import UpdateMyLeave from "./screens/UpdateMyLeave";
import AgentLeaveApplicationScreen from "./screens/AgentLeaveApplicationScreen";
import TeamLeaveApplicationsScreen from "./screens/TeamLeaveApplicationsScreen";
import UpdateTeamApplicationScreen from "./screens/UpdateTeamApplicationScreen";
import AllAgentLeaveApplicationsScreen from "./screens/AllAgentLeaveApplicationsScreen";
import ViewProfile from "./screens/ViewProfile";
import UpdateProfile from "./screens/UpdateProfileScreen";
import ChangePassword from "./screens/ChangePassword";
import SupportService from "./screens/SupportService";
import AllSupportService from "./screens/AllSupportService";
import DepartmentLeavesScreen from "./screens/DepartmentLeavesScreen";
import ApproveLeaveScreen from "./screens/ApproveLeaveScreen";
import EmployeeUpdateLeaveScreen from "./screens/EmployeeUpdateLeaveScreen";
import SupportMessaging from "./screens/SupportMessaging";
import UserKPIAssessment from "./screens/KPIUserAssessment";
import TeamKPIAssessments from "./screens/KPITeamAssessments";
import HODReviewEmpKPI from "./screens/KPIHODReview";
import AllKPIAssessment from "./screens/KPIAllAssessment";
import HRreviewEmpKPI from "./screens/KPIHRreview";
import UserKPIOverview from "./screens/KPIuserOverview";
import UserKPIDetails from "./screens/KPIuserDetails";
import JobApplication from "./screens/JobApplication";
import AllJobApplications from "./screens/AllJobApplications";

function App() {
  return (
    <Router>
      <main className="">
        <Route path="/home" component={HomeScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/viewprofile" component={ViewProfile} />
        <Route path="/nextofkin" component={NextOfKinScreen} />
        <Route path="/education" component={EducationScreen} />
        <Route path="/dashboard" component={DashboardScreen} />

        <Route path="/myleave" component={MyLeaveApplicationScreen} exact />
        <Route path="/myleave/page/:pageNumber" component={MyLeaveApplicationScreen} />
        <Route path="/myleave/search/:keyword/page/:pageNumber" component={MyLeaveApplicationScreen} />
        <Route path="/employeeupdateleave/:id/update" component={EmployeeUpdateLeaveScreen}/>

        <Route path="/agentleave" component={AgentLeaveApplicationScreen} exact />
        <Route path="/agentleave/page/:pageNumber" component={AgentLeaveApplicationScreen} />
        <Route path="/agentleave/search/:keyword/page/:pageNumber" component={AgentLeaveApplicationScreen} />

        <Route path="/myteamapplications" component={TeamLeaveApplicationsScreen} exact />
        <Route path="/myteamapplications/page/:pageNumber" component={TeamLeaveApplicationsScreen} />

        <Route path="/myteamleaveapplications/:id/update" component={UpdateTeamApplicationScreen} />
        <Route path="/mydepartmentapplications" component={DepartmentLeavesScreen} exact />
        <Route path="/mydepartmentapplications/page/:pageNumber" component={DepartmentLeavesScreen} />

        <Route path="/mydepartmentapplications/:id/update" component={ApproveLeaveScreen} />

        {/* --- UpdateMyLeave */}
        <Route path="/myleave/:id/update" component={UpdateMyLeave} />
        <Route path="/leaveapplications" component={AllLeaveApplications} exact />
        <Route path="/leaveapplications/search/:keyword" component={AllLeaveApplications} />
        <Route path="/leaveapplications/page/:pageNumber" component={AllLeaveApplications}  />
        <Route path="/leaveapplications/search/:keyword/page/:pageNumber" component={AllLeaveApplications} />
        <Route path="/allagentleaveapplications" component={AllAgentLeaveApplicationsScreen} exact />
        <Route path="/allagentleaveapplications/page/:pageNumber" component={AllAgentLeaveApplicationsScreen} />

        <Route path="/admin/password/:id/edit" component={PasswordScreen} />
        <Route path="/admin/userlist" component={StaffListScreen} exact />
        <Route path="/admin/userlist/search/:keyword" component={StaffListScreen} />
        <Route path="/admin/userlist/page/:pageNumber" component={StaffListScreen} />
        <Route path="/admin/userlist/search/:keyword/page/:pageNumber" component={StaffListScreen} />
        <Route path="/admin/register" component={StaffCreateScreen} />
        <Route path="/admin/home/:id" component={HrHomeScreen} />
        <Route path="/admin/profile/:id/edit" component={AdminProfileScreen} />
        <Route path="/admin/nextofkin/:id/edit" component={AdminNextOfKinScreen} />
        <Route path="/admin/education/:id/edit" component={AdminEducationScreen} />
        <Route path="/admin/user/:id/edit" component={StaffEditScreen} exact />
        <Route path="/admin/user/:id/role" component={RoleEditScreen} />
        <Route path="/resetpassword/:id" component={ResetPasswordScreen} />
        <Route path="/" component={LoginScreen} exact />

        {/* Tabs section */}
        <Route path="/updateprofile" component={UpdateProfile} exact />
        <Route path="/changepassword" component={ChangePassword} />

        {/* --- Support Service --- */}
        <Route path="/supportservice" component={SupportService} exact />
        <Route path="/supportservice/search/:keyword" component={SupportService} />
        <Route path="/supportservice/page/:pageNumber" component={SupportService} />
        <Route path="/supportservice/search/:keyword/page/:pageNumber" component={SupportService} />

        <Route path="/allsupportservice" component={AllSupportService} exact />
        <Route path="/allsupportservice/search/:keyword" component={AllSupportService} />
        <Route path="/allsupportservice/page/:pageNumber" component={AllSupportService} />
        <Route path="/allsupportservice/search/:keyword/page/:pageNumber" component={AllSupportService} />
        <Route path="/support/:id/messaging" component={SupportMessaging} />

        {/* --- KPI --- */}
        <Route path="/kpi/user" component={UserKPIAssessment} />
        <Route path="/kpi/teamassessments" component={TeamKPIAssessments} />
        <Route path="/kpi/:id/review" component={HODReviewEmpKPI} />
        <Route path="/kpi/allassessments" component={AllKPIAssessment} />
        <Route path="/kpi/:id/finalreview" component={HRreviewEmpKPI} />
        <Route path="/kpi/overview" component={UserKPIOverview} />
        <Route path="/kpi/details" component={UserKPIDetails} />

        {/* Job Application */}
        <Route path="/jobapplication" component={JobApplication} />
        <Route path="/alljobapplication" component={AllJobApplications} exact />
        <Route path="/alljobapplication/search/:keyword" component={AllJobApplications} />
        <Route path="/alljobapplication/page/:pageNumber" component={AllJobApplications} />
        <Route path="/alljobapplication/search/:keyword/page/:pageNumber" component={AllJobApplications} />
      </main>
    </Router>
  );
}

export default App;
