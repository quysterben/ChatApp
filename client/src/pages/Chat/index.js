import styles from './Chat.module.css'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getDataAPI } from '../../utils/fetchData';
import Contacts from '../../components/Contacts';

export default function Chat() {
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(undefined);
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);

    useEffect(() => {
        if (!localStorage.getItem("chat-app-user")) {
            navigate("/login");
        } else {
            setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
        }
    }, [navigate])

    useEffect(() => {
        const fetchData = async () => {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    const data = await getDataAPI(`user/getAllUsers/${currentUser._id}`);
                    setContacts(data.data);
                } else {
                    navigate("/set-avatar");
                }
            }
        }

        fetchData().catch(console.error);
    }, [currentUser, navigate])

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    }

    return (
        <div className={styles.container}>
            <div className={styles.chatBox}>
                <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
            </div>
        </div>
    )
}
