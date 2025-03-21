import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

export const Login = ({ setuser }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const submitHandler = async (data) => {
        try {
            const res = await axios.post("https://interviewbackend-buhr.onrender.com/login", data);
            
            if (res.status === 200) {
                alert("Login Successful");
                
                const userId = res.data.data._id;
                console.log(userId) 
                localStorage.setItem("userId", userId); 
                setuser(userId);
                navigate("/");
            }
        } catch (err) {
            alert("Invalid Credentials", err.message);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Card sx={{ width: "100%", p: 3, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4" align="center" sx={{ mb: 2, fontWeight: "bold" }}>Login</Typography>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <TextField
                            fullWidth
                            label="Email"
                            {...register("email", { required: "Email is required" })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            sx={{ mb: 2 }}
                        />
                        <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5 }}>Login</Button>
                    </form>
                    <Box textAlign="center" sx={{ mt: 2 }}>
                        <Typography variant="body2">
                            Don't have an account? <Link to="/register">Sign Up</Link>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

