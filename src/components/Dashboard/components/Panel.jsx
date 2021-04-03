import React, { useContext } from "react";
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import Snackbar from 'node-snackbar';
import { NavLink } from "react-router-dom";
import withWidth from "@material-ui/core/withWidth";
import { useTheme } from '@material-ui/core/styles';
import { makeStyles, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, Divider, Icon, Hidden, Box } from "@material-ui/core";
import { ChevronRight, ChevronLeft } from '@material-ui/icons';
import HomeIconOutlined from '@material-ui/icons/HomeOutlined';
import AppsIconOutlined from '@material-ui/icons/AppsOutlined';
import StorageIconOutlined from '@material-ui/icons/StorageOutlined';
import ShoppingCartIconOutlined from '@material-ui/icons/ShoppingCartOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import clsx from 'clsx';
import { ThemeContext } from "../../../context/themeContext";
import MenuIcon from "@material-ui/icons/Menu";
import lightLogo from '../../../assets/logo/logo-light-header.png'
import darkLogo from '../../../assets/logo/logo-dark-header.png'
import lightShortLogo from '../../../assets/logo/logo-light-short.png'
import darkShortLogo from '../../../assets/logo/logo-dark-short.png'

const showMess = (message) => {
    Snackbar.show({
        actionTextColor: '#7575a3',
        text: message,
        actionText: 'ОК',
        pos: 'bottom-right'
    });
}

const Panel = ({ width }) => {
    const { currentTheme } = useContext(ThemeContext);

    const [open, setOpen] = React.useState(false);

    const theme = useTheme();

    const drawerWidth = width === 'xs' ? '' : '280px';

    const userData = useSelector(state => state.userData);
    const level = useSelector(state => state.userData.level);



    const useStyles = makeStyles((theme) => ({
        logo: {
            maxWidth: '150px',
            margin: width === 'xs' ? '0px 0px 10px 16px' : '1px 0px 10px 24px'
        },
        hide: {
            display: 'none',
        },
        drawer: {
            '& .MuiDrawer-paperAnchorDockedLeft': {
                borderRight: 'none'
            },
            flexShrink: 0,

            whiteSpace: 'nowrap',
            '& .MuiDrawer-paper': {
                top: '0px',
                bottom: '40px',
                right: width === 'xs' ? '0px' : 'auto',
                boxShadow: currentTheme === 'dark' ? 'none' : "rgb(212 215 225 / 28%) 0px 1px 6px",
                zIndex: '1059',
                '&::-webkit-scrollbar': {
                    width: '5px',
                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : '',

                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: currentTheme === 'dark' ? '#32304b!important' : '#c8c4db',
                }
            },

        },
        drawerOpen: {
            overflow: 'auto',
            backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : '',
            color: currentTheme === 'dark' ? '#7575a3' : '',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            overflow: 'visible',
            display: width === 'xs' ? 'none' : 'visible',
            backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : '',
            color: currentTheme === 'dark' ? 'rgb(117, 117, 163)' : '#595c97',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: '85px'
        },
        buttClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: '85px'
        },
        buttOpen: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            width: drawerWidth
        },

        root: {
            '& .MuiIcon-root': {
                position: 'relative',
                width: '80%',
                height: 'auto',
                borderRadius: '10px',
                cursor: 'pointer',
                overflow: 'visible',
                '&:hover': {
                    backgroundColor: currentTheme === 'dark' ? '#232135' : '#e4e9f0',
                    color: '#4b7cf3',
                },
            },
            '& .MuiPaper-elevation1': {
                boxShadow: 'none'
            },
            '& .MuiAccordionDetails-root': {
                padding: '0px 0px 10px 0px',
                marginBottom: '5px'
            },
            '& .MuiAccordionSummary-root.Mui-expanded': {
                height: 'none',
                backgroundColor: currentTheme === 'dark' ? '#232135' : '#e4e9f0'
            },
            '& .MuiAccordion-root.Mui-expanded': {
                margin: '0px'
            },
            '& .MuiAccordionSummary-expandIcon': {
                color: currentTheme === 'dark' ? 'rgb(117, 117, 163)' : '#595c97',
            },
            '& .MuiCollapse-container': {
                backgroundColor: currentTheme === 'dark' ? '#232135' : '#e4e9f0'
            },
            '& .MuiAccordion-root:before': {
                display: 'none'
            },
            '& .MuiPaper-root': {
                // height: '30px',
                backgroundColor: 'inherit',
                color: currentTheme === 'dark' ? 'rgb(117, 117, 163)' : '#595c97',
                textAlign: 'center',
                '&:hover': {
                    backgroundColor: currentTheme === 'dark' ? '#232135' : '#e4e9f0',
                    color: '#4b7cf3'
                },


            },

            textAlign: !open ? 'center' : '',
            display: open && width === 'xs' ? 'block' : 'flex',
            flexDirection: 'column',
            alignItems: !open ? 'center' : '',
            justifyContent: !open ? 'center' : '',
        },
        liAcc: {
            width: '100%',
            cursor: 'pointer',
            padding: '10px 0px 10px 30px',
            margin: '5px 0px',
            color: 'rgb(117, 117, 163)',
            textAlign: 'left',
            fontSize: '0.95rem',
            '&:hover': {
                color: '#4b7cf3'
            }
        },
        ulAcc: {
            width: '100%',
            listStyleType: 'none',
            padding: '0px'
        },
        icons: {
            margin: '11.6px 0px!important',
            fontSize: '1.13rem'
        },
        heading: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.95rem',
            '& svg': {
                fontSize: '1.13rem!important',
            },
            color: currentTheme === 'dark' ? 'rgb(117, 117, 163)' : '#595c97',
            padding: '0px 16px',
            cursor: 'pointer',
            minHeight: '48px',
            '&:hover': {
                backgroundColor: currentTheme === 'dark' ? '#232135' : '#e4e9f0',
                color: '#4b7cf3',
            },
        },

    }));

    const handleDrawer = () => {
        setOpen(!open);
    };

    const classes = useStyles();
    const myHistory = useHistory();
    const routeProducts = () => {
        myHistory.push('/dashboard/products');
    }
    const routeHome = () => {
        myHistory.push('/dashboard');
    }

    const notActivated = () => {
        showMess('Ваш аккаунт не активирован');
    }

    const routeUsers = () => {
        myHistory.push('/dashboard/users');
    }
    return (
        <>


            <Hidden smUp>
                <IconButton
                    onClick={handleDrawer}
                    style={{
                        backgroundColor: '#001529',
                        position: 'fixed',
                        top: '15vh',
                        left: '10px',
                        zIndex: '999',
                        color: 'red'
                    }}>
                    <MenuIcon style={{
                        color: currentTheme === 'dark' ? '#aeaee0' : 'white'
                    }}></MenuIcon>
                </IconButton>
            </Hidden>



            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })
                }
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >




                <List>

                    <NavLink
                        to="/dashboard"
                        exact
                        style={{
                            textDecoration: "none",
                            color: currentTheme === "light" ? theme.dark : theme.light,

                        }}
                    >

                        {open ? <img alt='' className={classes.logo} src={currentTheme === 'dark' ? darkLogo : lightLogo} />
                            : <img alt='' className={classes.logo} src={currentTheme === 'dark' ? darkShortLogo : lightShortLogo} style={{
                                maxWidth: '40px'
                            }} />
                        }

                    </NavLink>

                    <div className={classes.root}>
                        {open ?
                            <Typography variant='h7' style={{
                                color: currentTheme === 'dark' ? '#232135' : '#c8c4db',
                                margin: '5px 0px 5px 15px'

                            }}>Главная</Typography>
                            :
                            <Divider style={{
                                width: '70%',
                                backgroundColor: currentTheme === 'dark' ? '#232135' : '#c8c4db',
                                margin: '10px 0px'
                            }}>

                            </Divider>
                        }
                        {open ?

                            <Box
                                className={classes.heading}
                                onClick={routeHome}
                            >
                                Главная <HomeIconOutlined />
                            </Box>

                            :
                            <Icon
                                onClick={routeHome}
                            >

                                <HomeIconOutlined
                                    className={classes.icons}
                                    style={{
                                        height: '30px',
                                        margin: '5px 0px',
                                    }}>
                                </HomeIconOutlined>


                            </Icon>
                        }



                        {open ?
                            <Typography variant='h7'
                                style={{
                                    color: currentTheme === 'dark' ? '#232135' : '#c8c4db',
                                    margin: '5px 0px 5px 15px'

                                }}>Каталоги</Typography>
                            :
                            <Divider style={{
                                width: '70%',
                                backgroundColor: currentTheme === 'dark' ? '#232135' : '#c8c4db',
                                margin: '10px 0px'
                            }}>

                            </Divider>
                        }

                        {open ?

                            <Box
                                onClick={level === 0 ? notActivated : routeProducts}
                                className={classes.heading}
                            >
                                Продукты <AppsIconOutlined />
                            </Box>

                            :

                            <Icon
                                onClick={level === 0 ? notActivated : routeProducts}
                            >

                                <AppsIconOutlined
                                    className={classes.icons}
                                    style={{
                                        height: '30px',
                                        margin: '5px 0px',
                                    }}></AppsIconOutlined >


                            </Icon>

                        }
                        {open ?

                            <Box className={classes.heading}>Заказы <ShoppingCartIconOutlined /></Box>

                            :
                            <Icon >
                                <ShoppingCartIconOutlined
                                    className={classes.icons}
                                    style={{
                                        height: '30px',
                                        margin: '5px 0px'
                                    }}></ShoppingCartIconOutlined >

                            </Icon>
                        }
                        {open ?

                            <Box className={classes.heading}>Статистика <EqualizerOutlinedIcon /></Box>

                            :
                            <Icon >
                                <EqualizerOutlinedIcon
                                    className={classes.icons}
                                    style={{
                                        height: '30px',
                                        margin: '5px 0px'
                                    }}></EqualizerOutlinedIcon >

                            </Icon>
                        }
                        {userData.level === 2 ?
                            open ?
                                <Typography variant='h7' style={{
                                    color: currentTheme === 'dark' ? '#232135' : '#c8c4db',
                                    margin: '5px 0px 5px 15px'

                                }}>Для администраторов</Typography>
                                :
                                <Divider style={{
                                    width: '70%',
                                    backgroundColor: currentTheme === 'dark' ? '#232135' : '#c8c4db',
                                    margin: '10px 0px'
                                }}>

                                </Divider>
                            : null
                        }
                        {userData.level === 2 ?
                            open ?

                                <Box 
                                className={classes.heading}
                                onClick={routeUsers}
                                >
                                    Пользователи 
                                    <PeopleAltOutlinedIcon />
                                    </Box>

                                :
                                <Icon 
                                onClick={routeUsers}
                                >
                                    <PeopleAltOutlinedIcon
                                        className={classes.icons}
                                        style={{
                                            height: '30px',
                                            margin: '5px 0px'
                                        }}></PeopleAltOutlinedIcon >
                                </Icon>
                            : null
                        }



                    </div>

                    <ListItem
                        className={clsx(classes.drawer, {
                            [classes.buttOpen]: open,
                            [classes.buttClose]: !open,
                        })
                        }
                        classes={{
                            alignItemsFlexStart: clsx({
                                [classes.buttOpen]: open,
                                [classes.buttClose]: !open,
                            }),
                        }}
                        onClick={handleDrawer}
                        style={{
                            justifyContent: 'center',
                            backgroundColor: currentTheme === 'dark' ? '#14142d' : 'white',
                            cursor: 'pointer',
                            position: 'fixed',
                            bottom: '0px',
                            height: '40px',
                        }}>
                        <ListItemIcon style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <div className={classes.toolbar}>
                                <Icon style={{
                                    color: currentTheme === 'dark' ? '#7575a3' : '',
                                    width: '100%'
                                }}>
                                    {!open ? <ChevronRight /> : <ChevronLeft />}
                                </Icon>
                            </div>
                        </ListItemIcon>
                    </ListItem>
                </List>

            </Drawer>

        </>
    );
};

export default withWidth()(Panel);