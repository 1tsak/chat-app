import React, { useEffect, useState } from 'react'
import { databases, DATABASE_ID, COLLECTION_ID_MESSAGES } from '../appWriteConfig'
import moment from "moment"
import "moment-timezone"
import { AiOutlineSend } from "react-icons/ai"

export const Room = () => {

    const [messages, setMessages] = useState([]);

    // useEffect(() => { getMessages() }, [])

    const getMessages = async () => {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_MESSAGES)
        console.log(response);
        setMessages(response.documents.map(msg => {
            const ot = moment(msg.$createdAt);
            msg.time = ot.tz('Asia/Kolkata').format('HH:mm');

            return msg;
        }));
    }
    return (
        <div className='container'>
            <div className='msg-section'>

                {messages.map((msg) => (
                    <div className='msg-item-recieved clearfix' key={msg.$id}>
                        <div>
                            <span>{msg.body}</span>
                        </div>
                        <div><span id='msg-time'>
                            {
                                msg.time
                            }
                        </span></div>
                    </div>
                ))}

            </div>
            <div className="msg-input-section">
                <input placeholder='Enter your message...' m className='msg-input' type="text" />
                <div className='send-btn'>
                    <AiOutlineSend size={30} />
                </div>
            </div>
        </div>
    )
}
