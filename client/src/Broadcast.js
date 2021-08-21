import React from 'react';
import axios from 'axios';

const Broadcast = () => {
  async function init() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true , audio: true});
    document.getElementById('video').srcObject = stream;
    const peer = createPeer();
    stream.getTracks().forEach(track => peer.addTrack(track, stream));
  }
  function createPeer() {
    const peer = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.stunprotocol.org' }]
    })
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);
    return peer;
  }
  async function handleNegotiationNeededEvent(peer) {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = { sdp: peer.localDescription };
    const { data } = await axios.post('http://localhost:3001/broadcast', payload);
    const desc = new RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch(e => console.log(e))
  }
  return (
    <div className="broadcast">
      <video autoPlay id='video'></video>
      <button id='my-button' onClick={init} >Start Stream</button>
    </div>
  );
}

export default Broadcast;
