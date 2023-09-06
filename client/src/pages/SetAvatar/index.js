import styles from './SetAvatar.module.css'

import loader from '../../assets/loader.gif'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Buffer } from 'buffer'
import { ToastContainer, toast } from 'react-toastify'

export default function SetAvatar() {
    const api = "https://api.multiavatar.com/45678945";

    const navigate = useNavigate();

    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    };

    const setProfileAvatar = async () => {
        if (selectedAvatar === undefined) {
            toast.error(
                "Please select an avatar.",
                toastOptions
            );
        } else {
            const user = await JSON.parse(localStorage.getItem('chat-app-user'));
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                const buffer = new Buffer(image.data);
                data.push(buffer.toString('base64'));
            }

            setAvatars(data);
            setIsLoading(false);
        }

        fetchData().catch(console.error);
    }, []);

    return (
        <>
            {
                isLoading ? <div className={styles.container}>
                    <div className={styles.form}>
                        <img src={loader} alt='loader' className={styles.loader} />
                    </div>
                </div>
                    :
                    <div className={styles.container}>
                        <ToastContainer />
                        <div className={styles.form}>
                            <h2>Pick an avatar as your profile picture</h2>
                            <div className={styles.avatarsContainer}>
                                {
                                    avatars.map((param, index) => (
                                        <div key={index} className={index === selectedAvatar ? styles.selected : styles.avatar}>
                                            <img
                                                onClick={() => setSelectedAvatar(index)}
                                                src={`data:image/svg+xml;base64,${param}`} alt='avatar'
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={styles.btnContainer}>
                                <button onClick={() => setProfileAvatar()}>Set as profile avatar</button>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}