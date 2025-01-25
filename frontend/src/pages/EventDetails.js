import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Paper, Typography, Button, Grid } from '@mui/material';

const EventDetails = () => {
    const { id } = useParams();
    // TODO: Fetch event details using the id

    return (
        <Container style={{ marginTop: '2rem' }}>
            <Paper elevation={3} style={{ padding: '2rem' }}>
                <Typography variant="h4" gutterBottom>
                    Tech Conference 2024
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Typography variant="body1" paragraph>
                            Detailed description of the event goes here...
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Date: June 15, 2024
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Location: San Francisco, CA
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Price: $299
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ marginBottom: '1rem' }}
                        >
                            Book Now
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default EventDetails; 