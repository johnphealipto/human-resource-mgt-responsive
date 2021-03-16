import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import Particles from 'react-par/ticles-js';
import './App.css';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import PasswordScreen from './screens/PasswordScreen';
import StaffListScreen from './screens/StaffListScreen';
import StaffCreateScreen from './screens/StaffCreateScreen';
import StaffEditScreen from './screens/StaffEditScreen';
import HomeScreen from './screens/HomeScreen';
import RoleEditScreen from './screens/RoleEditScreen';
import ProfileScreen from './screens/ProfileScreen';
import NextOfKinScreen from './screens/NextOfKinScreen';
import EducationScreen from './screens/EducationScreen';
import HrHomeScreen from './screens/HrHomeScreen';
import AdminProfileScreen from './screens/AdminProfileScreen';
import AdminNextOfKinScreen from './screens/AdminNextOfKinScreen';
import AdminEducationScreen from './screens/AdminEducationScreen';
import MyLeaveApplicationScreen from './screens/MyLeaveApplicationScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import AllLeaveApplications from './screens/AllLeaveApplications';
import UpdateMyLeave from './screens/UpdateMyLeave';


const particlesOptions = {
          
  "particles": {
    "number": {
      "value": 100,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#000000"
    },
    "shape": {
      "type": "edge",
      "stroke": {
        "width": 0,
        "color": "#f25833"
      },
      "polygon": {
        "nb_sides": 6
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.6894671861721748,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#f25833",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 10,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}
  

function App() {
  return (
    <Router>
    <main className="">
       {/* <Particles className="particles"
          params={particlesOptions}
          /> */}
      <Route path='/home' component={HomeScreen} />
      <Route path='/profile' component={ProfileScreen} />
      <Route path='/nextofkin' component={NextOfKinScreen} />
      <Route path='/education' component={EducationScreen} />
      <Route path='/dashboard' component={DashboardScreen} />
      <Route path='/myleave' component={MyLeaveApplicationScreen} exact/>
      <Route path='/myleave/page/:pageNumber' component={MyLeaveApplicationScreen} />
      <Route path='/myleave/search/:keyword/page/:pageNumber' component={MyLeaveApplicationScreen} />

      {/* --- UpdateMyLeave */}
      <Route path='/myleave/:id/update' component={UpdateMyLeave} />

      <Route path='/leaveapplications' component={AllLeaveApplications} exact/>
      <Route path='/leaveapplications/search/:keyword' component={AllLeaveApplications} />
      <Route path='/leaveapplications/page/:pageNumber' component={AllLeaveApplications} />
      <Route path='/leaveapplications/search/:keyword/page/:pageNumber' component={AllLeaveApplications} />

      <Route path='/updatepassword' component={PasswordScreen} />
      <Route path='/admin/userlist' component={StaffListScreen} exact/>
      <Route path='/admin/userlist/search/:keyword' component={StaffListScreen} />
      <Route path='/admin/userlist/page/:pageNumber' component={StaffListScreen} />
      <Route path='/admin/userlist/search/:keyword/page/:pageNumber' component={StaffListScreen} />
      <Route path='/admin/register' component={StaffCreateScreen} />
      <Route path='/admin/home/:id' component={HrHomeScreen} />
      <Route path='/admin/profile/:id/edit' component={AdminProfileScreen} />
      <Route path='/admin/nextofkin/:id/edit' component={AdminNextOfKinScreen} />
      <Route path='/admin/education/:id/edit' component={AdminEducationScreen} />
      <Route path='/admin/user/:id/edit' component={StaffEditScreen} exact/>
      <Route path='/admin/user/:id/role' component={RoleEditScreen} />
      <Route path='/forgotpassword' component={ForgotPasswordScreen} />
      <Route path='/resetpassword/:id' component={ResetPasswordScreen} />
      <Route path='/' component={LoginScreen} exact />
    </main>
    </Router>
  );
}

export default App;
