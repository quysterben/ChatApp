import styles from './ChatContainer.module.css'

import { useState, useEffect } from 'react'

import Logout from '../Logout'
import ChatInput from '../ChatInput'

import { postDataAPI } from '../../utils/fetchData';

export default function ChatContainer({ currentChat, currentUser }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const currentUserData = await JSON.parse(
                localStorage.getItem("chat-app-user")
            );
            const data = {
                from: currentUserData._id,
                to: currentChat._id
            }
            const res = await postDataAPI('message/getMsg', { data })
            setMessages(res.data);
        }

        fetchData().catch(console.error);
    }, [currentChat])

    const handleSendMsg = async (msg) => {
        try {
            const data = {
                from: currentUser._id,
                to: currentChat._id,
                message: msg,
            }
            await postDataAPI('message/addMsg', { data })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            {
                currentChat &&
                (
                    <div className={styles.container}>
                        <div className={styles.chatHeader}>
                            <div className={styles.userDetail}>
                                <div className={styles.avatar}>
                                    <img
                                        src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                                        alt=""
                                    />
                                </div>
                                <div className={styles.username}>
                                    <h3>{currentChat.username}</h3>
                                </div>
                            </div>
                            <Logout />
                        </div>
                        <div className={styles.chatMessages}>
                            {
                                messages.map(message => {
                                    return (
                                        <div className={message.fromSelf ? styles.sender : styles.received}>
                                            <div className={styles.content}>
                                                <p>{message.message}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <ChatInput handleSendMsg={handleSendMsg} />
                    </div>
                )
            }
        </>
    )
}