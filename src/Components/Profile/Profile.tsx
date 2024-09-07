import React, { useEffect, useState } from 'react';
import PersonalDetails from './Tabs/PersonalDetails.tsx';
import WorkDetails from './Tabs/WorkDetails.tsx';
import OtherDetails from './Tabs/OtherDetails.tsx';
import { Box } from '@mui/material';
import { Tabs, Tab, Container, Grid, Typography, Button } from '@material-ui/core';
import '../styles.tsx';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

interface CurrentUser {
  name: string;
  personalEmail: string;
  gender: string;
  dateOfBirth: string;
  age: string;
  address: string;
  email: string;
  designation: string;
  dateJoined: string;
  jobTitle: string;
  department: string;
  manager: string;
  shift: string;
  location: string;
  visa: string;
  languages: string;
  ImageData: string;
}

interface UserProfileProps {
  empId: number;
}

const useStyles = makeStyles((theme) => ({
  box: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    }
  },
  root: {
    fontSize: '160px',
    fontFamily: 'Arial',
  }
}));

const UserProfile: React.FC<UserProfileProps> = ({ empId }) => {

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [tab, setTab] = useState(0);
  const classes = useStyles();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://localhost:7259/api/user/userdetails/${empId}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data);
        } else {
          console.log('Server Error:', response.statusText);
        }
      } catch (error) {
        console.log('Failed to fetch user:', error);
      }
    };
    fetchUser();
  }, [empId]);

  const handleUpdatePersonalDetails = async (event) => {
    event.preventDefault();
    const response = await fetch(`https://localhost:7259/api/user/updatepersonaldetails/${empId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentUser),
    });

    if (!response.ok) {
      console.log('Update Error:', response.statusText);
    }
  };

  const handleUpdateProfilePic = async (e) => {
    e.preventDefault();

    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await fetch(`https://localhost:7259/api/user/updateProfilePic/${empId}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.log('Update Error:', response.statusText);
      } else {
        const userResponse = await fetch(
          `https://localhost:7259/api/user/userdetails/${empId}`
        );

        if (userResponse.ok) {
          const userData = await userResponse.json();
          userData.ImageData += '?time=' + new Date().getTime();
          setCurrentUser(userData);
        } else {
          console.log('Failed to fetch updated user data');
        }
      }
    }
  };

  const handleUpdateWorkDetails = async (event) => {
    event.preventDefault();
    const response = await fetch(`https://localhost:7259/api/user/updateProfessionalDetails/${empId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentUser),
    });

    if (!response.ok) {
      console.log('Update Error:', response.statusText);
    }
  };

  const handleUpdateOtherDetails = async (event) => {
    event.preventDefault();
    const response = await fetch(`https://localhost:7259/api/user/updateotherdetails/${empId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentUser),
    });

    if (!response.ok) {
      console.log('Update Error:', response.statusText);
    }
  };

  console.log("Current user:", currentUser);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  if (currentUser === null) {
    return <div>Loading...</div>
  } else {
    return (
      <div >
        <Container fixed style={{
          backgroundImage: `url('https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=600')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          minWidth: "100vw",
          minHeight: "100vh",
          margin: 0,
          padding: 50,
          top: -10,
          position: "fixed",
          overflowY: "auto",
        }}>
          <Typography variant="h3" style={{
            fontSize: '60px',
            fontFamily: 'cursive',
            color: 'SaddleBrown',
            fontWeight: 'bold'
          }}>Welcome, {currentUser.name}
          </Typography>
          <br />
          <Button onClick={handleLogout} style={{
            position: "absolute",
            top: 50,
            right: 50,
            background: "white"
          }}>
            Logout
          </Button>
          <img
            style={{
              position: "fixed",
              top: 100,
              right: 100,
              borderRadius: "50%",
              width: "300px",
              height: "300px",
              objectFit: "cover"
            }}
            src={currentUser.ImageData !== null ? `https://localhost:7259/api/user/getProfileImage/${empId}?${new Date().getTime()}` : 'DefaultImagePath'}
            alt="User Profile"
          />
          <form style={{
            position: "fixed",
            top: 450,
            right: 70,
          }} onSubmit={handleUpdateProfilePic}>
            <input type="file" accept="image/*" onChange={handleImageChange} required />
            <button type="submit">Update Profile Pic</button>
          </form>
          <Box
            p={2}
            my={2}
            display="flex"
            sx={{
              width: 700,
              height: 0,
            }}
            className={classes.box}>
            <Grid container spacing={0} justify="center">
              <Grid item xs={12}>
                <Tabs value={tab} onChange={handleTabChange} >
                  <Tab label="Personal Information" style={{
                    fontSize: '16px',
                    fontFamily: 'cursive',
                    color: 'MidnightBlue',
                    fontWeight: 'bold'
                  }} />
                  <Tab label="Work Information" style={{
                    fontSize: '16px',
                    fontFamily: 'cursive',
                    color: 'DarkSlateGray',
                    fontWeight: 'bold'
                  }} />
                  <Tab label="Others" style={{
                    fontSize: '16px',
                    fontFamily: 'cursive',
                    color: 'FireBrick',
                    fontWeight: 'bold'
                  }} />
                </Tabs>
              </Grid>
              {tab === 0 && (
                <PersonalDetails currentUser={currentUser} setCurrentUser={setCurrentUser} handleUpdatePersonalDetails={handleUpdatePersonalDetails} />
              )}
              {tab === 1 && (
                <WorkDetails currentUser={currentUser} setCurrentUser={setCurrentUser} handleUpdateWorkDetails={handleUpdateWorkDetails} />
              )}
              {tab === 2 && (
                <OtherDetails currentUser={currentUser} setCurrentUser={setCurrentUser} handleUpdateOtherDetails={handleUpdateOtherDetails} />
              )}
            </Grid>
          </Box>
        </Container>
      </div>
    );
  }
};

export default UserProfile;