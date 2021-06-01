import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions';
import "../styles/Main.css";
import '../styles/ProfileScreen.css';
import Header from '../components/Header';
import FixedNavbar from '../components/FixedNavbar';
import hello from "../img/hello.svg";
import Footer from '../components/Footer';

const HomeScreen = ({ history }) => {
   

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {

        if(!userInfo) {
            history.push('/')
        } 
    }, [history, userInfo])


    // ---- For the FixedNavBar
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const openSidebar = () => {
      setSidebarOpen(true);
    };
    
    const closeSidebar = () => {
      setSidebarOpen(false);
    };


  return (
    <div className="dashboard-container">
        <Header sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
        <FixedNavbar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        
        <main>
            <div className="dashboard-body">
                <div className="dashboard-title">
                <img src={hello} alt="hello" />
                <div className="dashboard-greeting">
                    <h1>Hello {userInfo.firstname}</h1>
                    <p>Welcome to your admin dashboard</p>
                </div>
                </div>
                <div className="dashboard-cards">
                <div className="card">
                    <i className="fas fa-user-check fa-2x"></i>
                    <div className="card-inner">
                    <p>Attendance</p>
                    <span className="font-bold text-title"></span>
                    </div>
                </div>

                <div className="card">
                    <i className="fa fa-calendar fa-2x"></i>
                    <div className="card-inner">
                    <p>Conversions</p>
                    <span className="font-bold text-title"></span>
                    </div>
                </div>

                <div className="card">
                    <i className="fas fa-chart-line fa-2x"></i>
                    <div className="card-inner">
                    <p>Average Perfomance</p>
                    <span className="font-bold text-title"></span>
                    </div>
                </div>

                <div className="card">
                    <i className="fa fa-thumbs-up fa-2x"></i>
                    <div className="card-inner">
                    <p>Number of recommendations</p>
                    <span className="font-bold text-title"></span>
                    </div>
                </div>
                </div>

                <div className="charts">
                <div className="charts-left">
                    <div className="charts-left-title">
                    <div>
                        <h1>daily Reports</h1>
                        <p>Opebi, Lagos, Nigeria</p>
                    </div>
                    <i className="fa fa-usd"></i>
                    </div>
                </div>
                <div className="charts-right">
                    <div className="charts-right-title">
                    <div>
                        <h1>daily Reports</h1>
                        <p>Opebi, Lagos, Nigeria</p>
                    </div>
                    <i className="fa fa-usd"></i>
                    </div>

                    <div className="charts-right-cards">
                    <div className="card1">
                        <h1>Income</h1>
                        <p></p>
                    </div>
                    <div className="card2">
                        <h1>Sales</h1>
                        <p></p>
                    </div>
                    <div className="card3">
                        <h1>Users</h1>
                        <p></p>
                    </div>
                    <div className="card4">
                        <h1>Plans</h1>
                        <p></p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <Footer />
        </main>
      
    </div>
  )
}

export default HomeScreen;