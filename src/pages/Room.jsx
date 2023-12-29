import React, { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { getMessages, createMessage, deleteMessage } from "../functions";
import moment from "moment";
import "moment-timezone";
import { MessageItem } from "../components/MessageItem";
import { useAuth } from "../utils/AuthContext";
import client, { COLLECTION_ID_MESSAGES, DATABASE_ID } from "../appWriteConfig";
import Header from "../components/Header";
import { SideBar } from "../components/SideBar";

import { LuPlusCircle  } from "react-icons/lu";


export const Room = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState();
  const { user } = useAuth();
  useEffect(() => {
    fetchMessages();
    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          console.log("A MESSAGE WAS CREATED");
          setMessages((prevState) => [...prevState, response.payload]);
        }
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          console.log("A MESSAGE WAS DELETED");
          setMessages((prevMessages) =>
            prevMessages.filter((msg) => msg.$id != response.payload.$id)
          );
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);
  const handleDelete = async (id) => {
    deleteMessage(id);
  };
  const handleAction = (action, id) => {
    switch (action) {
      case "delete":
        handleDelete(id);
        break;
    }
  };

  const fetchMessages = async () => {
    const messages = await getMessages();
    setMessages(
      messages.map((msg) => {
        const ot = moment(msg.$createdAt);
        msg.time = ot.tz("Asia/Kolkata").format("HH:mm");
        return msg;
      })
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      user_id: user.$id,
      username: user.name,
      body: inputMessage,
    };
    await createMessage(payload);
    setInputMessage("");
  };

  return (
    <div className="h-screen flex">
      <SideBar/>
      <div className="_container">
        <Header />
        <div className="msg-section flex-1">
          {messages.map((msg) => (
            <MessageItem id={msg.$id} msg={msg} onAction={handleAction} />
          ))}
        </div>
        <div className="msg-input-section ">
        <LuPlusCircle size={30} />
          <textarea
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit(e);
            }}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Enter your message..."
            maxLength={"1000"}
            className="msg-input"
            type="text"
          />
          <div className="send-btn">
            <AiOutlineSend size={30} />
          </div>
        </div>
      </div>
    </div>
  );
};
