import React from 'react';
import axios from 'axios';

const Viewer = () => {
    let video;
    async function init() {
        const peer = createPeer();
        peer.addTransceiver('video', { direction: 'recvonly' })
    }
    function createPeer() {
        const peer = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.stunprotocol.org' }]
        })
        peer.ontrack = handleTrackEvent;
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);

        return peer;
    }
    async function handleNegotiationNeededEvent(peer) {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        const payload = {
            sdp: peer.localDescription
        };

        const { data } = await axios.post('http://localhost:3001/consumer', payload);
        const desc = new RTCSessionDescription(data.sdp);
        peer.setRemoteDescription(desc).catch(e => console.log(e));
    }
    function handleTrackEvent(e) {
        document.getElementById('video').srcObject = e.streams[0];
    };
    return (
        <div>
            <video autoPlay id='video'></video>
            <button onClick={init} id='my-button'>View Stream</button>
        </div>
    )
}

export default Viewer
