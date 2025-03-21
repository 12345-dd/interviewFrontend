import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import theme from './theme';
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { Navbar } from './components/Navbar';
import { Login } from './components/Login';
import { MatchingSystem } from './components/MatchingSystem';
import { Register } from './components/Register';
import { SchedulingFeature } from './components/SchedulingFeature';
import { InterviewRoom } from './components/InterviewRoom';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [user, setuser] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setuser(storedUserId);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar user={user} setuser={setuser} />
      <Container maxWidth="md">
        <Routes>
          <Route path="/login" element={<Login setuser={setuser} />} />
          <Route path="/register" element={<Register setuser={setuser} />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/matching" element={<MatchingSystem />} />
            <Route path="/schedule" element={<SchedulingFeature />} />
            <Route path="/interview/:roomName" element={<InterviewRoom />} />
          </Route>
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;

