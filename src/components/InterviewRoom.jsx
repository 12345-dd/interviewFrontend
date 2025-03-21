import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Container } from "@mui/material";
import {JitsiMeeting} from "./jitsiMeeting"; 

export const InterviewRoom = () => {
  const { roomName } = useParams(); 

  return (
    <Container maxWidth="md" sx={{ mt: 4, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card sx={{ p: 2, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h4" sx={{ mb: 2 }}>Interview Room</Typography>
          <JitsiMeeting roomName={roomName} />
        </CardContent>
      </Card>
    </Container>
  );
};


