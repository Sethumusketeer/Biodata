import React, { ChangeEvent, useState, FormEvent } from 'react';
import { TextField, Button, Box } from '@material-ui/core';

interface RegisterProps {
  changeRoute: (route: string) => void;
}

const Register: React.FC<RegisterProps> = ({ changeRoute }) => {
  const [name, setName] = useState('');
  const [personalEmail, setPersonalEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault(); 
    try {
      const response = await fetch('https://localhost:7259/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          personalEmail,
          dateOfBirth,
          age,
          address,
          gender,
          password
        })
      });

      if (response.ok) {
        const responseData = await response.json();
        alert(`Registration Successful. Your Employee ID is ${responseData.empId}`);
        changeRoute('login');
      } else {
        const responseData = await response.json();
        console.error(responseData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      onSubmit={handleRegister}
    >
      <h2>Register</h2>
      <TextField
        variant="outlined"
        margin="normal"
        label="Name"
        type="text"
        value={name}
        onChange={onNameChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        label="Email"
        type="email"
        value={personalEmail}
        onChange={e => setPersonalEmail(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        label="Date of Birth"
        type="date"
        value={dateOfBirth}
        onChange={e => setDateOfBirth(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        variant="outlined"
        margin="normal"
        label="Age"
        type="number"
        value={age}
        onChange={e => setAge(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        label="Address"
        type="text"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        label="Gender"
        type="text"
        value={gender}
        onChange={e => setGender(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        label="Password"
        type="password"
        value={password}
        onChange={onPasswordChange}
      />
      <Button variant="contained" color="primary" type="submit">
        Register
      </Button>
    </Box>
  );
};

export default Register;