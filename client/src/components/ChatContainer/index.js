import styles from './ChatContainer.module.css'

import Logout from '../Logout'
import ChatInput from '../ChatInput'
import Messages from '../Messages'

import { postDataAPI } from '../../utils/fetchData';

export default function ChatContainer({ currentChat, currentUser }) {
    const handleSendMsg = async (msg) => {
        try {
            const data = {
                from: currentUser._id,
                to: currentChat._id,
                message: msg,
            }
            postDataAPI('message/addMsg', { data })
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
                        <Messages />
                        <ChatInput handleSendMsg={handleSendMsg} />
                    </div>
                )
            }
        </>
    )
}