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
import icon from '../images/parking.png'

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
    localStorage.removeItem('chatMessage')
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
                position="static"
            >
                <Toolbar>
                    <Typography style={{margin:'10px', cursor:'pointer'}} variant="h5" className={classes.title}>
                        <img style={{height:'40px'}} src={icon} ></img>
                        &copy; Saigon Parking 2020
                    </Typography>
                    <Typography style={{width:'50%' ,minHeight: '50px', overflow:'hidden', margin:'10px', cursor:'pointer', boxShadow:'inset -7px 0 9px -7px #000000, inset 7px 0 9px -7px #000000'}} variant="h5" className={classes.title}>
                        <div className='scroll text'>
                            <div>
                                1653005: <span>Vu Tuong Bach - </span>1653006: <span>Huynh Thanh Binh - </span>1653012: <span>Pham Viet Minh Dao - </span>1653020: <span>Vu Hai - </span>1653076: <span>Dang Duc Tai</span>
                            </div>
                        </div>
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