import React, { useEffect, useState } from "react";
import { SideBar } from "../components/SideBar";
import Header from "../components/Header";
import "@livekit/components-styles";
import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  VideoConference,
  useTracks,
} from "@livekit/components-react";
import { Track } from "livekit-client";

const serverUrl = "wss://aakash-596mg2rt.livekit.cloud";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDUyMTM3ODMsImlzcyI6IkFQSWpqTlRaNERBQVg4dSIsIm5iZiI6MTcwNTEyNzM4Mywic3ViIjoicXVpY2tzdGFydCB1c2VyIHRxbjlwaCIsInZpZGVvIjp7ImNhblB1Ymxpc2giOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsInJvb20iOiJxdWlja3N0YXJ0IHJvb20iLCJyb29tSm9pbiI6dHJ1ZX19.zwPE_siWHb_Ri2YcMB1wpbs2dOTnylnHNJH5EhK3pwQ";

const startMeeting = () => {};

export const Video = () => {
  return (
    <div className="h-screen flex">
      <SideBar />
      <div className="_container">
        <Header />
        <div className="video_container flex h-screen w-full">
          <button className="m-auto bg-slate-800 w-80 py-3 rounded-lg font-semibold" onClick={startMeeting}>
            Start Meeting
          </button>
        </div>
      </div>
    </div>
  );
};

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );
  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
    >
      {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
      <ParticipantTile />
    </GridLayout>
  );
}
