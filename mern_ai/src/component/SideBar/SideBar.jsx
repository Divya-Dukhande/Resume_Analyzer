

import React from 'react'
import styles from './SideBar.module.css'
import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SideBar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn"); // ✅ KEY PART
        navigate("/");
    };

    return (
        <div className={styles.sideBar}>
            <div className={styles.sideBarIcon}>
                <ArticleIcon sx={{ fontSize: 54 }} />
                <div>Resume Screening</div>
            </div>

            <div className={styles.sideBarOptionsBlock}>
                <Link to="/dashboard" className={location.pathname === '/dashboard' ? styles.selectedOption : styles.sideBarOption}>
                    <DashboardIcon /> Dashboard
                </Link>

                <Link to="/history" className={location.pathname === '/history' ? styles.selectedOption : styles.sideBarOption}>
                    <ManageSearchIcon /> History
                </Link>

                <div className={styles.sideBarOption} onClick={handleLogout}>
                    <LogoutIcon /> LogOut
                </div>
            </div>
        </div>
    );
};

export default SideBar;
