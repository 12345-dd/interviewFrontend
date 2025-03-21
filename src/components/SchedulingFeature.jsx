import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Card, CardContent, Typography, Container } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

export const SchedulingFeature = () => {
  const [dateTime, setDateTime] = useState("");
  const [searchParams] = useSearchParams();
  const peerId = searchParams.get("peerId");
  const navigate = useNavigate();

  const handleBooking = async () => {
    const userId = localStorage.getItem("userId"); 

    if (!dateTime || !peerId || !userId) {
      alert("Please select a date & time.");
      return;
    }

    try {
      await axios.post("https://interviewbackend-buhr.onrender.com/booking", { userId, peerId, dateTime });

      alert("Interview scheduled! You can join at the scheduled time.");
      navigate("/");
    } catch (err) {
      console.log("Error booking interview:", err.response?.data || err.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card sx={{ p: 2 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center">Schedule an Interview</Typography>
          <TextField type="datetime-local" fullWidth sx={{ my: 2 }} onChange={(e) => setDateTime(e.target.value)} />
          <Button variant="contained" fullWidth onClick={handleBooking}>Book Slot</Button>
        </CardContent>
      </Card>
    </Container>
  );
};



