import styles from './Chat.module.css'

import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'

import { getDataAPI, BASEURL } from '../../utils/fetchData'
import Contacts from '../../components/Contacts'
import Welcome from '../../components/Welcome'
import ChatContainer from '../../components/ChatContainer'

export default function Chat() {
    const navigate = useNavigate();
    const socket = useRef();

    const [currentUser, setCurrentUser] = useState(undefined);
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            if (!localStorage.getItem("chat-app-user")) {
                navigate("/login");
            } else {
                setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
                setIsLoading(false)
            }
        }

        fetchData().catch(console.error);
    }, [navigate])

    useEffect(() => {
        if (currentUser) {
            socket.current = io(BASEURL);
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser])

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
                {!isLoading && currentChat === undefined ? (
                    <Welcome />
                ) : (
                    <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
                )}
            </div>
        </div>
    )
}
