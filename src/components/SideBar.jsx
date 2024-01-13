import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/icon.png";

import { CiVideoOn, CiChat2 } from "react-icons/ci";

export const SideBar = () => {
  const location = useLocation();

  return (
    <div className="h-screen shadow bg-[#14141fcc] flex flex-col items-center p-5">
      <img className="h-12 object-cover" src={logo} />
      <div className="mt-10 flex flex-col items-center gap-10">
        <Link to="/" className={`flex flex-col items-center gap-2 cursor-pointer ${location.pathname === '/' ? 'text-blue-500' : 'text-slate-300'}`}>
          <CiChat2 size={25} />
          <span className="text-sm font-semibold">Chat</span>
        </Link>
        <Link to="/video" className={`flex flex-col items-center gap-2 cursor-pointer ${location.pathname === '/video' ? 'text-blue-500' : 'text-slate-300'}`}>
          <CiVideoOn size={25} />
          <span className="text-sm font-semibold">Video</span>
        </Link>
      </div>
    </div>
  );
};
