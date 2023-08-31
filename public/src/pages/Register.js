import React, { useRef } from 'react'

import { Link } from 'react-router-dom'

import styles from './Register.module.css'

import { BsChatHeart } from "react-icons/bs";

export default function Register() {
    const usernameData = useRef();
    const emailData = useRef();
    const passwordData = useRef();
    const rePasswordData = useRef();

    const handleSignupBtn = (e) => {
        e.preventDefault();
        const data = {
            username: usernameData.current.value,
            email: emailData.current.value,
            password: passwordData.current.value,
            repassword: rePasswordData.current.value
        }
    }

    return (
        <div className={styles.container}>
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
