import styles from './Welcome.module.css'
import Robot from '../../assets/robot.gif'

import { useState, useEffect } from 'react'

export default function Welcome({ currentUser }) {
    const [username, setUsername] = useState("");

    useEffect(() => {
        setUsername(
            JSON.parse(
                localStorage.getItem("chat-app-user")
            ).username
        );
    }, []);

    return (
        <div className={styles.container}>
            <img className={styles.gif} src={Robot} alt='Robot' />
            <h1>
                Welcome, <span>{username}!</span>
            </h1>
            <h3>Please select a chat to Start Messaging.</h3>
        </div>
    )
}