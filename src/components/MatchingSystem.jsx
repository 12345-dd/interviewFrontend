import { Button, Card, CardContent, Container, List, ListItem, ListItemText, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export const MatchingSystem = () => {
    const [peers, setpeers] = useState([])
    const id = localStorage.getItem("userId");

    useEffect(() => {
        const fetchUserAndPeers = async () => {
            try {
                const res = await axios.get("https://interviewbackend-buhr.onrender.com/peers");
                console.log(res.data.data)
                setpeers(res.data.data.filter((peer) => peer._id !== id));
            } catch (err) {
                console.log("Error fetching user or peers:", err.message);
            }
        };
    
        fetchUserAndPeers();
    }, []);
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
        <Card sx={{ p: 2 }}>
            <CardContent>
                <Typography variant="h5" textAlign="center">Find a Peer</Typography>
                <List>
                    {peers.map((peer) => (
                        <ListItem key={peer._id} sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
                            <ListItemText primary={peer.name} secondary={peer.email} />
                            <Button variant="contained" size="small" component={Link} to={`/schedule?peerId=${peer._id}`}>Connect</Button>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    </Container>
  )
}
