import styles from './Logout.module.css'

import { useNavigate } from 'react-router-dom';

import { BiPowerOff } from "react-icons/bi";

export default function Logout() {
    const navigate = useNavigate();

    const handleLogoutBtn = () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <div onClick={() => handleLogoutBtn()} className={styles.btn}>
            <BiPowerOff />
        </div>
    )
}