import React from "react";
import logo from "../assets/icon.png";

import { CiVideoOn, CiChat2 } from "react-icons/ci";
export const SideBar = () => {
  return (
    <div className="h-screen shadow bg-[#14141fcc] flex flex-col items-center p-5">
      <img className="h-12 object-cover" src={logo} />
      <div className="mt-10 flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <CiChat2 size={25} />
          <span className="text-sm text-slate-300 font-semibold">Chat</span>
        </div>
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <CiVideoOn size={25} />
          <span className="text-sm font-semibold text-slate-300 ">Video</span>
        </div>
      </div>
    </div>
  );
};
