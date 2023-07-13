import React, { useEffect, useRef, useState } from 'react'
import { MdExpandMore } from "react-icons/md"
import { MessageOptions } from '../components/MessageOptions';


export const MessageItem = ({ msg, onAction }) => {
    const [showModalOptions, setShowModalOptions] = useState(false);
    const modalRef = useRef(null);


    useEffect(() => {
        const handleClickOutsideModal = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowModalOptions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutsideModal);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideModal);
        };
    }, []);
    return (
        <div className='msg-item msg-recieved clearfix' key={msg.$id}>
            <div className='msg-content'>
                <span>{msg.body}</span>
                <div id='msg-options' onClick={() => setShowModalOptions(!showModalOptions)}>
                    <MdExpandMore />
                </div>
            </div>
            <div>
                <span id='msg-time'>
                    {msg.time}
                </span>
            </div>
            {showModalOptions && <MessageOptions id={msg.$id} elref={modalRef} onAction={onAction} />}
        </div>
    )
}
