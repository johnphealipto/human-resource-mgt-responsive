import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ProfileScreen from './ProfileScreen';
import NextOfKinScreen from './NextOfKinScreen';
import EducationScreen from './EducationScreen';
import FixedNavbar from '../components/FixedNavbar';
import Header from '../components/Header';
import '../styles/ProfileScreen.css';


const UpdateProfile = ({ history }) => {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

    // ---- For the FixedNavBar
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const openSidebar = () => {
      setSidebarOpen(true);
    };
    
    const closeSidebar = () => {
      setSidebarOpen(false);
    };

  return (
    <div>
      <div className="dashboard-container ">
        <Header sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
        <FixedNavbar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        <main className='profilescreen-wrapper'>
          <div className="dashboard-body ">
            <div className='page-header'>
              <h3>User Profile</h3>
              <p>Update {userInfo.firstname}'s Profile</p>
            </div>
            <Tabs 
              justify 
              defaultActiveKey="profile" 
              id="uncontrolled-tab-example"
              className="update-profile-tab">
              <Tab 
                eventKey="profile" 
                tabClassName="active-tab"
                title={<span>Step 1 <div className="tab-title">Profile Information</div></span>}>
                <ProfileScreen history={history}/>
              </Tab>
              <Tab 
                eventKey="education"
                tabClassName="active-tab"
                title={<span>Step 2 <div className="tab-title">Education</div></span>}>
                <EducationScreen  history={history}/> 
              </Tab>
              <Tab 
                eventKey="next of Kin"
                tabClassName="active-tab"
                title={<span>Step 3 <div className="tab-title">Next of kin</div></span>}>
                <NextOfKinScreen history={history}/>
              </Tab>
            </Tabs>
          </div>
        </main>
      </div> 
    </div>
  )
}

export default UpdateProfile;
