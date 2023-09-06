import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import styles from './Register.module.css'
import { BsChatHeart } from "react-icons/bs";

import { postDataAPI } from '../../utils/fetchData';

export default function Register() {
    const navigate = useNavigate();

    const usernameData = useRef();
    const emailData = useRef();
    const passwordData = useRef();
    const rePasswordData = useRef();

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    const handleSignupBtn = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            try {
                const data = {
                    username: usernameData.current.value,
                    email: emailData.current.value,
                    password: passwordData.current.value,
                }
                const res = await postDataAPI('auth/signup', { data });
                localStorage.setItem('chat-app-user', JSON.stringify(res.result));
                navigate('/set-avatar');
            } catch (err) {
                toast.error(
                    err.response.data.message,
                    toastOptions
                );
            }
        }
    }

    const handleValidation = () => {
        if (usernameData.current.value.length < 3) {
            toast.error(
                "Username should be greater than 3 characters.",
                toastOptions
            );
            return false;
        } else if (emailData.current.value === '') {
            toast.error(
                "Email is required.",
                toastOptions
            );
            return false;
        } else if (passwordData.current.value.length < 8) {
            toast.error(
                "Password should be greater than 8 characters.",
                toastOptions
            );
            return false;
        } else if (passwordData.current.value !== rePasswordData.current.value) {
            toast.error(
                "Confirm password does not match.",
                toastOptions
            );
            return false;
        }

        return true;
    };

    return (
        <div className={styles.container}>
            <ToastContainer />
            <div className={styles.form}>
                <div className={styles.title}>
                    <BsChatHeart size={34} className={styles.icon} />
                    <h2>Chat App</h2>
                </div>
                <div className={styles.formContainer}>
                    <form>
                        <input ref={usernameData} type='text' placeholder='Username' name='username' />
                        <input ref={emailData} type='email' placeholder='Email' name='email' />
                        <input ref={passwordData} type='password' placeholder='Password' name='password' />
                        <input ref={rePasswordData} type='password' placeholder='Re-password' name='repassword' />
                        <button onClick={(e) => handleSignupBtn(e)} className={styles.formButton}>Sign up</button>
                    </form>
                </div>
                <div className={styles.text}>
                    <p>
                        ALREADY HAVE AN ACCOUNT ? <Link style={{ textDecoration: 'inherit', fontSize: 'medium', fontWeight: 'bolder' }} to='/login'>LOGIN</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
