import React from 'react';
import { TextField, Box, Card, CardContent, Button } from '@mui/material';
import { styles } from '../../styles.tsx';

const OtherDetails = ({ currentUser, setCurrentUser, handleUpdateOtherDetails }) => {
    return (
        <form onSubmit={handleUpdateOtherDetails} style={{ paddingLeft: '10px' }}>
            <Card style={styles.card}>
                <CardContent style={styles.cardContent}>
                    <TextField
                        style={styles.textField}
                        InputProps={{ style: styles.input }}
                        margin="normal"
                        variant="outlined"
                        label="Work Shift"
                        fullWidth
                        value={currentUser.shift || ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, shift: e.target.value })}
                        required
                    />
                    <TextField
                        style={styles.textField}
                        InputProps={{ style: styles.input }}
                        margin="normal"
                        variant="outlined"
                        label="Location"
                        fullWidth
                        value={currentUser.location || ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, location: e.target.value })}
                        required
                    />
                    <TextField
                        style={styles.textField}
                        InputProps={{ style: styles.input }}
                        margin="normal"
                        variant="outlined"
                        label="Visa Status"
                        fullWidth
                        value={currentUser.visa || ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, visa: e.target.value })}
                        required
                    />
                    <TextField
                        style={styles.textField}
                        InputProps={{ style: styles.input }}
                        margin="normal"
                        variant="outlined"
                        label="Language Known"
                        fullWidth
                        value={currentUser.languages || ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, languages: e.target.value })}
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

export default OtherDetails;