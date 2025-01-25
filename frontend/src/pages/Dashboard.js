import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';

const Dashboard = () => {
    return (
        <Container style={{ marginTop: '2rem' }}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '1rem' }}>
                        <Typography variant="h6" gutterBottom>
                            My Events
                        </Typography>
                        {/* Add event list here */}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '1rem' }}>
                        <Typography variant="h6" gutterBottom>
                            My Bookings
                        </Typography>
                        {/* Add bookings list here */}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard; 