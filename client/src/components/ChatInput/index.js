import styles from './ChatInput.module.css'

import { useRef, useState } from 'react';

import Picker from 'emoji-picker-react'
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

export default function ChatInput({ handleSendMsg }) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const msg = useRef('');

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (emojiObject, event) => {
        let message = msg.current.value;
        message += emojiObject.emoji;
        msg.current.value = message;
    };

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.current.value.length > 0) {
            handleSendMsg(msg.current.value);
            msg.current.value = '';
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.btnContainer}>
                <div className={styles.emoji}>
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                    {
                        showEmojiPicker
                        &&
                        (
                            <div className={styles.emojiPickerReact}>
                                <Picker height={400} width={320} onEmojiClick={handleEmojiClick} />
                            </div>
                        )
                    }
                </div>
            </div>
            <form className={styles.inputContainer}>
                <input ref={msg} type='text' placeholder='type your message here' />
                <button onClick={(e) => sendChat(e)} type='submit'>
                    <IoMdSend />
                </button>
            </form>
        </div>
    )
}
