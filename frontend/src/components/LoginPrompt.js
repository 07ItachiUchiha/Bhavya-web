import React from 'react';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button, 
    Typography,
    IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LoginPrompt = ({ open, onClose }) => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        onClose();
        navigate(path);
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Welcome to Bhavya Association
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1" paragraph>
                    To book tickets and access all features, please log in or create an account.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Creating an account gives you access to:
                </Typography>
                <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
                    <li>Book event tickets</li>
                    <li>Track your bookings</li>
                    <li>Get event updates</li>
                    <li>Special offers and more</li>
                </ul>
            </DialogContent>
            <DialogActions sx={{ p: 2.5, pt: 0 }}>
                <Button onClick={onClose} color="inherit">
                    Visit Us
                </Button>
                <Button 
                    onClick={() => handleNavigation('/register')}
                    variant="outlined"
                    color="primary"
                >
                    Register
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginPrompt; 