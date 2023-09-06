import styles from './Contacts.module.css'

import { useState, useEffect } from 'react'
import { BsChatHeart } from "react-icons/bs";

export default function Contacts({ contacts, currentUser, changeChat }) {
    const [currentUsername, setCurrentUsername] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    }

    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUsername(currentUser.username);
        }
    }, [currentUser])

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <BsChatHeart size={34} className={styles.icon} />
                <h2>Chat App</h2>
            </div>
            <div className={styles.contacts}>
                {
                    contacts.map((contact, index) => {
                        return (
                            <div
                                key={contact._id}
                                className={index === currentSelected ? styles.selectedContact : styles.contact}
                                onClick={() => { changeCurrentChat(index, contact) }}
                            >
                                <div className={styles.avatar}>
                                    <img
                                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                        alt=""
                                    />
                                </div>
                                <div className={styles.username}>
                                    <h3>{contact.username}</h3>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles.currentUser}>
                <div className={styles.avatar}>
                    <img
                        src={`data:image/svg+xml;base64,${currentUserImage}`}
                        alt="avatar"
                    />
                </div>
                <div className={styles.username}>
                    <h2>{currentUsername}</h2>
                </div>
            </div>
        </div>
    )
}