import { Button, Card, CardContent, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Dashboard = () => {
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const userId = localStorage.getItem("userId");
        
        if (!userId) {
          console.log("User ID not found in localStorage");
          return;
        }

        const res = await axios.get(`https://interviewbackend-buhr.onrender.com/booking?userId=${userId}`);
        setInterviews(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchInterviews();
  }, []);

  const handleJoinInterview = (roomName, interviewTime) => {
    const now = new Date().getTime();
    const scheduledTime = new Date(interviewTime).getTime();

    if (now >= scheduledTime) {
      navigate(`/interview/${roomName}`);
    } else {
      alert(`You can only join at the scheduled time: ${new Date(interviewTime).toLocaleString()}`);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card sx={{ p: 2 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center">Upcoming Interviews</Typography>
          <List>
            {interviews.length > 0 ? (
              interviews.map((interview) => (
                <ListItem key={interview._id} sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                  <ListItemText primary={`Scheduled at: ${new Date(interview.dateTime).toLocaleString()}`} />
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleJoinInterview(interview.roomName, interview.dateTime)}
                  >
                    Connect
                  </Button>
                </ListItem>
              ))
            ) : (
              <Typography variant="body1" textAlign="center">No upcoming interviews.</Typography>
            )}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};




