import React from 'react';
import { TextField, Box, Card, CardContent, Button } from '@mui/material';
import { styles } from '../../styles.tsx';

const PersonalDetails = ({ currentUser, setCurrentUser, handleUpdatePersonalDetails }) => {
    return (
        <form onSubmit={handleUpdatePersonalDetails} style={{ paddingLeft: '10px' }}>
            <Card style={styles.card}>
                <CardContent style={styles.cardContent}>
                    <TextField
                        style={styles.textField}
                        InputProps={{ style: styles.input }}
                        margin="normal"
                        variant="outlined"
                        label="Name"
                        fullWidth
                        value={currentUser.name || ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                        required
                    />
                    <br />
                    <TextField
                        style={styles.textField}
                        InputProps={{ style: styles.input }}
                        margin="normal"
                        variant="outlined"
                        label="Personal Email"
                        fullWidth
                        value={currentUser.personalEmail || ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, personalEmail: e.target.value })}
                        required
                    />
                    <TextField
                        style={styles.textField}
                        InputProps={{ style: styles.input }}
                        margin="normal"
                        variant="outlined"
                        label="Gender"
                        fullWidth
                        value={currentUser.gender || ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, gender: e.target.value })}
                        required
                    />
                    <TextField
                        style={styles.textField}
                        InputProps={{ style: styles.input }}
                        margin="normal"
                        variant="outlined"
                        label="Age"
                        fullWidth
                        value={currentUser.age || ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, age: e.target.value })}
                        required
                    />
                    <TextField
                        style={styles.textField}
                        InputProps={{ style: styles.input }}
                        margin="normal"
                        variant="outlined"
                        label="Date Of Birth"
                        fullWidth
                        value={currentUser.dateOfBirth ? currentUser.dateOfBirth.split('T')[0] : ""}
                        onChange={(e) => setCurrentUser({ ...currentUser, dateOfBirth: e.target.value })}
                        required
                    />
                    <TextField
                        style={styles.textField}
                        InputProps={{ style: styles.input }}
                        margin="normal"
                        variant="outlined"
                        label="Address"
                        fullWidth
                        value={currentUser.address || ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, address: e.target.value })}
                        required
                    />
                </CardContent>
            </Card>
            <Box display="flex" justifyContent="flex-end" p={1}>
                <Button variant="contained" color="secondary">
                    Cancel
                </Button>
                <Box mx={2}>
                    <Button variant="contained" type="submit" color="primary">
                        Update
                    </Button>
                </Box>
            </Box>
        </form>
    )
}

export default PersonalDetails;