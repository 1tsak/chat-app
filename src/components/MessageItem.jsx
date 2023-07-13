import React from 'react'
import { MdExpandMore } from "react-icons/md"
import { MessageOptions } from '../components/MessageOptions';


export const MessageItem = ({ msg }) => {
    return (
        <div className='msg-item msg-recieved clearfix' key={msg.$id}>
            <div className='msg-content'>
                <span>{msg.body}</span>
                <div id='msg-options'>
                    <MdExpandMore />
                </div>
            </div>
            <div>
                <span id='msg-time'>
                    {msg.time}
                </span>
            </div>
            <MessageOptions />
        </div>
    )
}
