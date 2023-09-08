import styles from './ChatContainer.module.css'

import { useState, useEffect, useRef } from 'react'

import Logout from '../Logout'
import ChatInput from '../ChatInput'

import { postDataAPI } from '../../utils/fetchData';

export default function ChatContainer({ currentChat, currentUser, socket }) {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            const currentUserData = await JSON.parse(
                localStorage.getItem("chat-app-user")
            );
            const data = {
                from: currentUserData._id,
                to: currentChat?._id
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
            socket.current.emit('send-msg', {
                to: currentChat._id,
                from: currentUser._id,
                message: msg,
            });
            const msgs = [...messages];
            msgs.push({ fromSelf: true, message: msg });
            setMessages(msgs);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-receive", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg })
            });
        }
    }, [socket]);

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

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
                                messages.map((message, index) => {
                                    return (
                                        <div
                                            ref={scrollRef}
                                            key={index}
                                            className={message.fromSelf ? styles.sender : styles.received}
                                        >
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