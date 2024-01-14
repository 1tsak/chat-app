import React, { useEffect, useState } from "react";
import { SideBar } from "../components/SideBar";
import Header from "../components/Header";
import "@livekit/components-styles";
import { BsPersonVideo } from "react-icons/bs";
const serverUrl = "wss://aakash-596mg2rt.livekit.cloud";
import { generateRoomId } from "../functions";
import { useNavigate } from "react-router-dom";

export const Video = () => {
  const navigate = useNavigate();
  const startMeeting = async () => {
    navigate(`/room/${generateRoomId()}`);
  };
  return (
    <div className="h-screen flex">
      <SideBar />
      <div className="_container">
        <Header />
        <div className="video_container flex h-screen w-full">
          <div className="m-auto flex flex-col items-center gap-5 ">
            <BsPersonVideo color="#434f63" size={60} />
            <h1 className="text-lg font-thin">
              Organize Meetings in Just Few Clicks
            </h1>
            <button
              className=" bg-slate-800 w-80 py-3 rounded-lg font-semibold"
              onClick={startMeeting}
            >
              Start Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

