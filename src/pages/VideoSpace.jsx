import React, { useEffect, useState } from 'react'

import {
  LiveKitRoom,
  VideoConference,
  formatChatMessageLinks,
  useToken,
  PreJoin
} from '@livekit/components-react';
import {
  LogLevel,
  Room,
  VideoPresets,
} from 'livekit-client';
import { useNavigate, useParams } from 'react-router-dom';

export const VideoSpace = () => {
    const navigate = useNavigate();
    const { roomName } = useParams();
    console.log(roomName);
    
    const [preJoinChoices, setPreJoinChoices] = React.useState(
        undefined
        );
        
        function handlePreJoinSubmit(values) {
            setPreJoinChoices(values);
    console.log(roomName);

        }
        return (
            <>

      <main className='h-screen' data-lk-theme="default" >
        {roomName && !Array.isArray(roomName) && preJoinChoices ? (
          <ActiveRoom
            roomName={roomName}
            userChoices={preJoinChoices}
            onLeave={() => {
              navigate('/');
            }}
          ></ActiveRoom>
        ) : (
          <div style={{ display: 'grid', placeItems: 'center', height: '100%' }}>
            <PreJoin
              onError={(err) => console.log('error while setting up prejoin', err)}
              defaults={{
                username: '',
                videoEnabled: true,
                audioEnabled: false,
              }}
              onSubmit={handlePreJoinSubmit}
            ></PreJoin>
          </div>
        )}
      </main>
    </>
  )
}

const ActiveRoom = ({ roomName, userChoices, onLeave }) => {
    const liveKitToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDUyNDA1NDAsImlzcyI6IkFQSWpqTlRaNERBQVg4dSIsIm5iZiI6MTcwNTIzOTY0MCwic3ViIjoiYWFrYXNoIiwidmlkZW8iOnsiY2FuUHVibGlzaCI6dHJ1ZSwiY2FuUHVibGlzaERhdGEiOnRydWUsImNhblN1YnNjcmliZSI6dHJ1ZSwicm9vbSI6Ik1lZXRpbmcgUm9vbSIsInJvb21Kb2luIjp0cnVlfX0.qGoxr_1BRVeG8hNsqt1l4rrxEZfc1v7nn1AYjdvm5CA"
//   const token = useToken(liveKitToken, roomName, {
//     userInfo: {
//       identity: userChoices.username,
//       name: userChoices.username,
//     },
//   });
  const [token,setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(`https://live-token-vld5.onrender.com/createToken?roomName=${roomName}&identity=${userChoices.username}&name=${userChoices.username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch token');
        }

        const data = await response.json();
        setToken(data.accessToken);
      } catch (error) {
        console.error('Error fetching token:', error.message);
        // Handle the error accordingly, e.g., show an error message to the user
      }
    };

    fetchToken();
  }, [roomName, userChoices.username]);
  const navigate = useNavigate();
  const { region, hq, codec } = useParams();
  console.log({"region":region});


  const liveKitUrl = "wss://aakash-596mg2rt.livekit.cloud"


  const roomOptions = React.useMemo(() => {
    let videoCodec = (
      Array.isArray(codec) ? codec[0] : codec ?? 'vp9'
    );
    // if (e2eeEnabled && (videoCodec === 'av1' || videoCodec === 'vp9')) {
    //   videoCodec = undefined;
    // }
    return {
      videoCaptureDefaults: {
        deviceId: userChoices.videoDeviceId ?? undefined,
        resolution: hq === 'true' ? VideoPresets.h2160 : VideoPresets.h720,
      },
      publishDefaults: {
        dtx: false,
        videoSimulcastLayers:
          hq === 'true'
            ? [VideoPresets.h1080, VideoPresets.h720]
            : [VideoPresets.h540, VideoPresets.h216],
        red: true,
        videoCodec,
      },
      audioCaptureDefaults: {
        deviceId: userChoices.audioDeviceId ?? undefined,
      },
      adaptiveStream: { pixelDensity: 'screen' },
      dynacast: true,
      e2ee: undefined,
    };
  }, [userChoices, hq, codec]);

  const room = React.useMemo(() => new Room(roomOptions), []);

  const connectOptions = React.useMemo(() => {
    return {
      autoSubscribe: true,
    };
  }, []);

  return (
    <>
      {liveKitUrl && token && (
        <LiveKitRoom
          room={room}
          token={token}
          serverUrl={liveKitUrl}
          connectOptions={connectOptions}
          video={userChoices.videoEnabled}
          audio={userChoices.audioEnabled}
          onDisconnected={onLeave}
        >
          <VideoConference chatMessageFormatter={formatChatMessageLinks} />
          {/* <DebugMode logLevel={LogLevel.info} /> */}
        </LiveKitRoom>
      )}
    </>
  );
};
