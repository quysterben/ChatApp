import { useRef } from 'react'

import { Link } from 'react-router-dom'

import styles from './Register.module.css'

import { BsChatHeart } from "react-icons/bs";

export default function Login() {
    const usernameData = useRef('');
    const passwordData = useRef('');

    const handleLoginBtn = (e) => {
        e.preventDefault();
        const data = {
            username: usernameData.current.value,
            password: passwordData.current.value
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
                        <input ref={passwordData} type='password' placeholder='Password' name='password' />
                        <button onClick={(e) => handleLoginBtn(e)} className={styles.formButton}>JOIN IN</button>
                    </form>
                </div>
                <div className={styles.text}>
                    <p>
                        DON'T HAVE AN ACCOUNT ?
                        <Link style={{ textDecoration: 'inherit', fontSize: 'medium', fontWeight: 'bolder' }} to='/register'> REGISTER</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
