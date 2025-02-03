import React from 'react';
import Sidebar from './sidebar';
import './home.css';
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <div className="d-flex flex-column-reverse flex-md-row">
            <Sidebar />
            <div className="home-content">
                <Outlet />
            </div>
        </div>
    );
}

export default Home;
