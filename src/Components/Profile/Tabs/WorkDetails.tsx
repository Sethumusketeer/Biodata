import React from 'react';
import { TextField, Box, Card, CardContent, Button } from '@mui/material';
import { styles } from '../../styles.tsx';

const WorkDetails = ({ currentUser, setCurrentUser, handleUpdateWorkDetails }) => {
    return (
        <form onSubmit={handleUpdateWorkDetails} style={{ paddingLeft: '10px' }}>
            <Card style={styles.card}>
                <CardContent style={styles.cardContent}>
                    <TextField
                        style={styles.textField}
                        InputProps={{ style: styles.input }}
                        margin="normal"
                        variant="outlined"
                        label="Official Email"
                        fullWidth
                        value={currentUser.email || ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                        required
                    />
                    <TextField
                        style={styles.textField}
                        InputProps={{ style: styles.input }}
                        margin="normal"
                        variant="outlined"
                        label="Designation"
                        fullWidth
                        value={currentUser.designation || ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, designation: e.target.value })}
                        required
                    />
                    <TextField
                        style={styles.textField}
                        InputProps={{ style: styles.input }}
                        margin="normal"
                        variant="outlined"
                        label="DateJoined"
                        type="date"
                        fullWidth
                        value={currentUser.dateJoined ? currentUser.dateJoined.split('T')[0] : ""}
                        onChange={(e) => setCurrentUser({ ...currentUser, dateJoined: e.target.value })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                    />
                    <TextField
                        style={styles.textField}
                        InputProps={{ style: styles.input }}
                        margin="normal"
                        variant="outlined"
                        label="Job Title"
                        fullWidth
                        value={currentUser.jobTitle || ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, jobTitle: e.target.value })}
                        required
                    />
                    <TextField
                        style={styles.textField}
                        InputProps={{ style: styles.input }}
                        margin="normal"
                        variant="outlined"
                        label="Department"
                        fullWidth
                        value={currentUser.department || ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, department: e.target.value })}
                        required
                    />
                    <TextField
                        style={styles.textField}
                        InputProps={{ style: styles.input }}
                        margin="normal"
                        variant="outlined"
                        label="Manager"
                        fullWidth
                        value={currentUser.manager || ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, manager: e.target.value })}
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
        </form >
    )
}

export default WorkDetails;