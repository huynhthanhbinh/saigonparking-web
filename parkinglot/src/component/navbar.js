import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie'
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 0,
        padding: '0 4px',
    },
}))(Badge);

const handleLogout = () => {
    Cookies.remove("token")
    Cookies.remove("refreshtoken")
    Cookies.remove("checkUserName")
    window.location.href = '/'
}

export default function MiniDrawer({numberMessage}) {
    const classes = useStyles();

    const handleOpen = () => {
        console.log('open')
    }
    
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
            >
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Saigon ParkingLot
                    </Typography>
                    <IconButton style={{marginRight:'10px'}} aria-label="email">
                        <StyledBadge badgeContent={numberMessage} color="secondary">
                            <MailIcon onClick={handleOpen} style={{color:'white'}} />
                        </StyledBadge>
                    </IconButton>
                    <Button onClick={handleLogout} color="inherit">LOGOUT</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}