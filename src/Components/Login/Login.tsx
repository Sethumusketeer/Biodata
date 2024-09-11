import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';

interface UserData {
  empId: number;
  password: string;
}

interface LoginProps {
  setUser: (user: UserData) => void;
  changeRoute: (route: string) => void;
}

const theme = createTheme({
  palette: {
    primary: green,
  },
});

const Login: React.FC<LoginProps> = ({ setUser, changeRoute }) => {
  const [empId, setEmpId] = useState<number | "">("");
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://localhost:7259/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          empId: empId,
          password
        })
      });

      if (response.ok) {
        const userData: UserData = await response.json();
        setUser({ empId: userData.empId, password: userData.password });
        changeRoute('profile');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred');
    }
  };

  const handleForgotPassword = () => {
    changeRoute('forgot-password');
  };

  const onIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmpId(parseInt(event.target.value));
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin();
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
        onSubmit={onSubmit}
      >
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <TextField
          variant="outlined"
          margin="normal"
          label="EmpId"
          value={empId}
          onChange={onIdChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          label="Password"
          type="password"
          value={password}
          onChange={onPasswordChange}
        />
        <Button variant="contained" type="submit" color="primary" size="large">
          Login
        </Button>
        <Button
          variant="text"
          style={{ marginTop: '1rem' }}
          onClick={() => changeRoute('register')}
        >
          Register
        </Button>
        <Button
          variant="text"
          style={{ marginTop: '1rem' }}
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
