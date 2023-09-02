import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [email, setEmail] = useState('');
    const [admin, setAdmin] = useState(false);
    const [doctor, setDoctor] = useState(false);
    const [staff, setStaff] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const storedEmail = sessionStorage.getItem('Email');
        const roleAccount = sessionStorage.getItem('Role');
        if (storedEmail) {
            setEmail(storedEmail);
        }
        if (roleAccount.toLowerCase() === 'doctor') {
            setDoctor(true);
        }
        if (roleAccount.toLowerCase() === 'staff') {
            setStaff(true);
        }
        if (roleAccount.toLowerCase() === 'admin') {
            setAdmin(true);
        }
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        document.cookie = "";
        sessionStorage.clear();
        navigate("/login")
    };

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Typography sx={{ minWidth: 10 }}>Hello, {email}</Typography>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <AccountCircleIcon sx={{ width: 40, height: 40, color: 'white' }}></AccountCircleIcon>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {admin &&
                    <MenuItem onClick={() => { navigate("/admin") }}>
                        <Avatar /> ADMIN
                    </MenuItem>
                }
                {doctor &&
                    <MenuItem onClick={() => { navigate("/Doctor") }}>
                        <Avatar /> Doctor
                    </MenuItem>
                }
                {staff &&
                    <MenuItem onClick={() => { navigate("/staff") }}>
                        <Avatar /> STAFF
                    </MenuItem>
                }
                <MenuItem onClick={() => { navigate("/profile") }}>
                    <Avatar /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
