import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: green,
  },
});

interface ForgotPasswordProps {
  changeRoute: (route: string) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ changeRoute }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState<'request' | 'verify' | 'reset'>('request');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRequestOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('https://localhost:7259/api/user/request-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setStep('verify');
        setMessage('OTP has been sent to your email.');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred');
    }
  };

  const handleVerifyOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('https://localhost:7259/api/user/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, otp })
      });

      if (response.ok) {
        setStep('reset');
        setMessage('OTP verified. Please set a new password.');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to verify OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred');
    }
  };

  const handleResetPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('https://localhost:7259/api/user/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, newPassword })
      });

      if (response.ok) {
        setMessage('Password reset successfully.');
        changeRoute('login'); // Redirect to login or other page
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        height="80vh"
        alignItems="center"
        onSubmit={step === 'request' ? handleRequestOtp : step === 'verify' ? handleVerifyOtp : handleResetPassword}
      >
        <h2>{step === 'request' ? 'Forgot Password' : step === 'verify' ? 'Verify OTP' : 'Reset Password'}</h2>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {step === 'request' && (
          <>
            <TextField
              variant="outlined"
              margin="normal"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button variant="contained" type="submit" color="primary" size="large">
              Request OTP
            </Button>
          </>
        )}
        {step === 'verify' && (
          <>
            <TextField
              variant="outlined"
              margin="normal"
              label="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button variant="contained" type="submit" color="primary" size="large">
              Verify OTP
            </Button>
          </>
        )}
        {step === 'reset' && (
          <>
            <TextField
              variant="outlined"
              margin="normal"
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button variant="contained" type="submit" color="primary" size="large">
              Reset Password
            </Button>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default ForgotPassword;
