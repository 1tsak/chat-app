import React, { useEffect, useState } from 'react'
import { databases, DATABASE_ID, COLLECTION_ID_MESSAGES } from '../appWriteConfig'

export const Room = () => {

    const [messages, setMessages] = useState([]);

    useEffect(() => { getMessages() }, [])

    const getMessages = async () => {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_MESSAGES)
        console.log(response);
        setMessages(response.documents);
    }
    return (
        <div className='container'>
            <div className='msg-section'>

                {messages.map((msg) => (
                    <div className='msg-item' key={msg.$id}>
                        <div>
                            <span>{msg.body}</span>
                        </div>
                        <div><span id='msg-time'>{msg.$createdAt}</span></div>
                    </div>
                ))}

            </div>
        </div>
    )
}
