import React, { useEffect, useRef, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { MessageOptions } from "../components/MessageOptions";
import { useAuth } from "../utils/AuthContext";

export const MessageItem = ({ msg, onAction }) => {
  const { user } = useAuth();
  const [showModalOptions, setShowModalOptions] = useState(false);
  const [msgType, setMsgType] = useState("recieved");
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModalOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideModal);
    console.log(msg.username, user.name);
    if (msg && msg?.username) {
      if (msg.username === user.name) {
        setMsgType("sent");
      } else {
        setMsgType("recieved");
      }
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);
  return (
    <div className="m-3 clearfix">
      <div className={msgType==='sent'?'float-right':'float-left'}>
        <p className="ml-2 text-sm">
          {msg?.username ? <span> {msg?.username}</span> : "Anonymous user"}

          <small className="message-timestamp">
            {" "}
            {new Date(msg.$createdAt).toLocaleString()}
          </small>
        </p>
      </div>
      <div className={`msg-item msg-${msgType} clearfix`} key={msg.$id}>
        <div className="msg-content">
          <span>{msg.body}</span>
          <div
            id="msg-options"
            onClick={() => setShowModalOptions(!showModalOptions)}
          >
            <MdExpandMore />
          </div>
        </div>
        <div>
          <span id="msg-time">{msg.time}</span>
        </div>
        {showModalOptions &&
          msg.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
            <MessageOptions id={msg.$id} elref={modalRef} onAction={onAction} />
          )}
      </div>
    </div>
  );
};
