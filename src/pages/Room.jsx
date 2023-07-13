import React, { useEffect, useState } from 'react'
import { AiOutlineSend } from "react-icons/ai"
import { getMessages, createMessage } from '../functions';
import moment from "moment"
import "moment-timezone"
import { MessageItem } from '../components/MessageItem';

export const Room = () => {

    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState();

    useEffect(() => { fetchMessages() }, [])

    const fetchMessages = async () => {
        const messages = await getMessages();
        setMessages(messages.map(msg => {
            const ot = moment(msg.$createdAt);
            msg.time = ot.tz('Asia/Kolkata').format('HH:mm');
            return msg;
        }));
    }
    const handleSubmit = async () => {
        let payload = {
            body: inputMessage
        }
        await createMessage(payload);
        setInputMessage("");
        fetchMessages();

    }

    return (
        <div className='container'>
            <div className='msg-section'>
                {messages.map((msg) => (
                    <MessageItem msg={msg} />
                ))}
            </div>
            <div className="msg-input-section">
                <textarea onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }} value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder='Enter your message...' maxLength={"1000"} className='msg-input' type="text" />
                <div className='send-btn'>
                    <AiOutlineSend size={30} />
                </div>
            </div>
        </div>
    )
}
