import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const socket = io('http://localhost:5000');
const VedioChat=()=> {
  const [stream, setStream] = useState(null);
  const [peer, setPeer] = useState(null);
  const myVideo = useRef();
  const userVideo = useRef();
  const roomId = 'room1'; // static for now

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
      if (myVideo.current) {
        myVideo.current.srcObject = stream;
      }

      socket.emit('join-room', roomId, socket.id);

      socket.on('user-connected', (userId) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });
        peer.on('signal', signal => {
          socket.emit('signal', { to: userId, signal });
        });
        peer.on('stream', userStream => {
          userVideo.current.srcObject = userStream;
        });
        socket.on('signal', data => {
          if (data.from === userId) {
            peer.signal(data.signal);
          }
        });
        setPeer(peer);
      });

      socket.on('signal', data => {
        const peer = new Peer({ initiator: false, trickle: false, stream });
        peer.on('signal', signal => {
          socket.emit('signal', { to: data.from, signal });
        });
        peer.on('stream', userStream => {
          userVideo.current.srcObject = userStream;
        });
        peer.signal(data.signal);
        setPeer(peer);
      });
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Video Call</h1>
      <div className="flex gap-4">
        <video className="w-64 h-48 bg-black" ref={myVideo} autoPlay muted />
        <video className="w-64 h-48 bg-black" ref={userVideo} autoPlay />
      </div>
    </div>
  );
}

export default VedioChat;