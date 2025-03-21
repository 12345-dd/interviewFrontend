import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

export const Register = ({setuser}) => {
    const {register,handleSubmit,formState:{errors}} = useForm();
    const navigate = useNavigate();

    const submitHandler = async(data) => {
        try {
            await axios.post("https://interviewbackend-buhr.onrender.com/register", data);
            alert("Registration Successful! Please log in.");
            navigate("/login");
        } catch (err) {
            alert("Registration Failed",err.message);
        }
    }

  return (
    <Container maxWidth="xs" sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <Card sx={{ width: "100%", p: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h4" align="center" sx={{ mb: 2, fontWeight: "bold" }}>Sign Up</Typography>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <TextField
                        fullWidth
                        label="Name"
                        {...register("name", { required: "Name is required" })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        sx={{ mb: 2 }}
                    />
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
                        {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        sx={{ mb: 2 }}
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5 }}>Sign Up</Button>
                </form>
                <Box textAlign="center" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                        Already have an account? <Link to="/login">Login</Link>
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    </Container>
  )
}
