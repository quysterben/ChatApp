import styles from './ChatContainer.module.css'

import Logout from '../Logout'
import ChatInput from '../ChatInput'

export default function ChatContainer({ currentChat }) {
    const handleSendMsg = async (msg) => {
        console.log(msg);
        alert(msg);
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
                        <div className={styles.chatMessages}></div>
                        <ChatInput handleSendMsg={handleSendMsg} />
                    </div>
                )
            }
        </>
    )
}