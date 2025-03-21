import React, { useEffect } from "react";

export const JitsiMeeting = ({ roomName }) => {
  useEffect(() => {
    const domain = "meet.jit.si"; 
    const options = {
      roomName: roomName, 
      width: "100%",
      height: 500,
      parentNode: document.getElementById("jitsi-container"),
      userInfo: {
        displayName: "Participant",
      },
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);
    
    api.executeCommand("toggleVideo"); 
    api.executeCommand("toggleAudio"); 

    return () => api.dispose(); 
  }, [roomName]);

  return <div id="jitsi-container" style={{ width: "100%", height: "500px" }}></div>;
};





