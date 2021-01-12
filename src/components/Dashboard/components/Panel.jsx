import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import withWidth from "@material-ui/core/withWidth";
import { useTheme } from '@material-ui/core/styles';
import { makeStyles, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, Divider, Icon, Hidden, Accordion, AccordionSummary, AccordionDetails, Box } from "@material-ui/core";
import {  ChevronRight, ChevronLeft } from '@material-ui/icons';
import HomeIconOutlined from '@material-ui/icons/HomeOutlined';
import AppsIconOutlined from '@material-ui/icons/AppsOutlined';
import StorageIconOutlined from '@material-ui/icons/StorageOutlined';
import ShoppingCartIconOutlined from '@material-ui/icons/ShoppingCartOutlined';
import PhotoOutlinedIcon from '@material-ui/icons/PhotoOutlined';
import CreditCardOutlinedIcon from '@material-ui/icons/CreditCardOutlined';
import PieChartOutlinedIcon from '@material-ui/icons/PieChartOutlined';
import clsx from 'clsx';
import { ThemeContext } from "../../../context/themeContext";
import MenuIcon from "@material-ui/icons/Menu";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import lightLogo from '../../../assets/logo/logo-light-header.png'
import darkLogo from '../../../assets/logo/logo-dark-header.png'
import lightShortLogo from '../../../assets/logo/logo-light-short.png'
import darkShortLogo from '../../../assets/logo/logo-dark-short.png'

const Panel = ({ width }) => {
    const { currentTheme } = useContext(ThemeContext);
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const drawerWidth = width === 'xs' ? '' : '280px';

    const useStyles = makeStyles((theme) => ({
        logo:{
            maxWidth:'150px',
            margin: width === 'xs' ? '0px 0px 10px 16px' : '1px 0px 10px 24px'
        },
        hide: {
            display: 'none',
        },
        drawer: {
            '& .MuiDrawer-paperAnchorDockedLeft':{
                borderRight:'none'
            },
            flexShrink: 0,

            whiteSpace: 'nowrap',
            '& .MuiDrawer-paper': {
                top: '0px',
                bottom: '40px',
                right: width === 'xs' ? '0px' : 'auto',
                boxShadow: currentTheme === 'dark' ? 'none' : "rgb(212 215 225 / 28%) 0px 1px 6px",
                zIndex:'2002',
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
            overflow:'scroll',
            backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : '',
            color: currentTheme === 'dark' ? '#7575a3' : '',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            overflow:'visible',
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
        secret: {
            display: 'none',
            top: '0px',
            left: '64px',
            minWidth: '120px',
            zIndex: '9999',
            position: 'absolute',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textDecoration: 'none',
            color: currentTheme === 'dark' ? '#aeaee0' : '#595c97',
            backgroundColor: currentTheme === 'dark' ? '#232135' : 'white',
            boxShadow: currentTheme === 'dark' ? 'none' : '0px 0px 20px -11px rgba(0,0,0,0.8)',
            '& ul': {
                listStyle: 'none',
                padding: '0px',
                width: '100%',
                '& li': {
                    margin: '20px',
                    fontSize: '0.95rem',
                    width: '100%',
                    textAlign: 'left',
                    '&:hover': {
                        color: '#4b7cf3'
                    }
                }
            }

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
            width: '100%',
            fontSize: '0.95rem',
            '& svg': {
                fontSize: '1.13rem!important',
            }
        },

    }));

    const handleDrawer = () => {
        setOpen(!open);
    };

    const classes = useStyles();

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
             
             {open ? <img alt='' className={classes.logo} src={currentTheme === 'dark' ? darkLogo : lightLogo}/>
             : <img alt='' className={classes.logo} src={currentTheme === 'dark' ? darkShortLogo : lightShortLogo} style={{
                 maxWidth:'40px'
             }}/>
             }
             
            </NavLink>

                    <div className={classes.root}>
                        {open ?
                            <Typography variant='h7' style={{
                                color: currentTheme === 'dark' ? '#232135' : '#c8c4db',
                                margin: '5px 0px 5px 15px'

                            }}>Номе</Typography>
                            :
                            <Divider style={{
                                width: '70%',
                                backgroundColor: currentTheme === 'dark' ? '#232135' : '#c8c4db',
                                margin: '10px 0px'
                            }}>

                            </Divider>
                        }
                        {open ?
                            <>
                                <Accordion>
                                    <AccordionSummary
                                        // expandIcon={open ? <><ExpandMoreIcon /><People /></> : ''}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    // onClick={open ? null : handleDrawer}
                                    >
                                        <Box className={classes.heading}>Home <div><ExpandMoreIcon /><HomeIconOutlined /></div> </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>

                                        <ul className={classes.ulAcc}>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                        </ul>

                                    </AccordionDetails>
                                </Accordion>
                            </>
                            :
                            <Icon className='iconSec'>
                                <HomeIconOutlined
                                    className={classes.icons}
                                    style={{
                                        height: '30px',
                                        margin: '5px 0px'
                                    }}></HomeIconOutlined>
                                <div
                                    className={`${classes.secret} blocSec`}
                                >
                                    <ul>
                                        <li>Profile</li>
                                        <li>Calendar</li>
                                        <li>Gallery</li>
                                        <li>Mail</li>
                                    </ul>
                                </div>
                            </Icon>
                        }



                        {open ?
                            <Typography variant='h7'
                                style={{
                                    color: currentTheme === 'dark' ? '#232135' : '#c8c4db',
                                    margin: '5px 0px 5px 15px'

                                }}>APPS n PAGES</Typography>
                            :
                            <Divider style={{
                                width: '70%',
                                backgroundColor: currentTheme === 'dark' ? '#232135' : '#c8c4db',
                                margin: '10px 0px'
                            }}>

                            </Divider>
                        }

                        {open ?
                            <>
                                <Accordion>
                                    <AccordionSummary
                                        // expandIcon={open ? <><ExpandMoreIcon /><ExpandMoreIcon /></> : ''}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    // onClick={open ? null : handleDrawer}
                                    >
                                        <Box className={classes.heading}>Apps <div><ExpandMoreIcon /><AppsIconOutlined /></div></Box>
                                    </AccordionSummary>
                                    <AccordionDetails>

                                        <ul className={classes.ulAcc}>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                        </ul>

                                    </AccordionDetails>
                                </Accordion>

                            </>
                            :
                            <Icon className='iconSec'>
                                <AppsIconOutlined
                                    className={classes.icons}
                                    style={{
                                        height: '30px',
                                        margin: '5px 0px'
                                    }}></AppsIconOutlined >
                                <div
                                    className={`${classes.secret} blocSec`}
                                >
                                    <ul>
                                        <li>Profile</li>
                                        <li>Calendar</li>
                                        <li>Gallery</li>
                                        <li>Mail</li>
                                    </ul>
                                </div>

                            </Icon>
                        }
                        {open ?
                            <>
                                <Accordion>
                                    <AccordionSummary
                                        // expandIcon={open ? <><ExpandMoreIcon /><ExpandMoreIcon /></> : ''}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    // onClick={open ? null : handleDrawer}
                                    >
                                        <Box className={classes.heading}>Extra apps <div><ExpandMoreIcon /><StorageIconOutlined /></div> </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>

                                        <ul className={classes.ulAcc}>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                        </ul>

                                    </AccordionDetails>
                                </Accordion>

                            </>
                            :
                            <Icon className='iconSec'>
                                <StorageIconOutlined
                                    className={classes.icons}
                                    style={{
                                        height: '30px',
                                        margin: '5px 0px'
                                    }}></StorageIconOutlined >
                                <div
                                    className={`${classes.secret} blocSec`}
                                >
                                    <ul>
                                        <li>Profile</li>
                                        <li>Calendar</li>
                                        <li>Gallery</li>
                                        <li>Mail</li>
                                    </ul>
                                </div>
                            </Icon>
                        }
                        {open ?
                            <>
                                <Accordion>
                                    <AccordionSummary
                                        // expandIcon={open ? <><ExpandMoreIcon /><ExpandMoreIcon /></> : ''}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    // onClick={open ? null : handleDrawer}
                                    >
                                        <Box className={classes.heading}>Ecommerce <div><ExpandMoreIcon /><ShoppingCartIconOutlined /></div></Box>
                                    </AccordionSummary>
                                    <AccordionDetails>

                                        <ul className={classes.ulAcc}>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                        </ul>

                                    </AccordionDetails>
                                </Accordion>

                            </>
                            :
                            <Icon className='iconSec'>
                                <ShoppingCartIconOutlined
                                    className={classes.icons}
                                    style={{
                                        height: '30px',
                                        margin: '5px 0px'
                                    }}></ShoppingCartIconOutlined >
                                <div
                                    className={`${classes.secret} blocSec`}
                                >
                                    <ul>
                                        <li>Profile</li>
                                        <li>Calendar</li>
                                        <li>Gallery</li>
                                        <li>Mail</li>
                                    </ul>
                                </div>
                            </Icon>
                        }
                        {open ?
                            <>
                                <Accordion>
                                    <AccordionSummary
                                        // expandIcon={open ? <><ExpandMoreIcon /><ExpandMoreIcon /></> : ''}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    // onClick={open ? null : handleDrawer}
                                    >
                                        <Box className={classes.heading}>Gallery <div><ExpandMoreIcon /><PhotoOutlinedIcon /></div></Box>
                                    </AccordionSummary>
                                    <AccordionDetails>

                                        <ul className={classes.ulAcc}>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                        </ul>

                                    </AccordionDetails>
                                </Accordion>

                            </>
                            :
                            <Icon className='iconSec'>
                                <PhotoOutlinedIcon
                                    className={classes.icons}
                                    style={{
                                        height: '30px',
                                        margin: '5px 0px'
                                    }}></PhotoOutlinedIcon >
                                <div
                                    className={`${classes.secret} blocSec`}
                                >
                                    <ul>
                                        <li>Profile</li>
                                        <li>Calendar</li>
                                        <li>Gallery</li>
                                        <li>Mail</li>
                                    </ul>
                                </div>
                            </Icon>
                        }
                        {open ?
                            <Typography variant='h7' style={{
                                color: currentTheme === 'dark' ? '#232135' : '#c8c4db',
                                margin: '5px 0px 5px 15px'

                            }}>COMPONENTS</Typography>
                            :
                            <Divider style={{
                                width: '70%',
                                backgroundColor: currentTheme === 'dark' ? '#232135' : '#c8c4db',
                                margin: '10px 0px'
                            }}>

                            </Divider>
                        }
                        {open ?
                            <>
                                <Accordion>
                                    <AccordionSummary
                                        // expandIcon={open ? <><ExpandMoreIcon /><ExpandMoreIcon /></> : ''}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    // onClick={open ? null : handleDrawer}
                                    >
                                        <Box className={classes.heading}>Cards <div><ExpandMoreIcon /><CreditCardOutlinedIcon /></div></Box>
                                    </AccordionSummary>
                                    <AccordionDetails>

                                        <ul className={classes.ulAcc}>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                        </ul>

                                    </AccordionDetails>
                                </Accordion>

                            </>
                            :
                            <Icon className='iconSec'>
                                <CreditCardOutlinedIcon
                                    className={classes.icons}
                                    style={{
                                        height: '30px',
                                        margin: '5px 0px'
                                    }}></CreditCardOutlinedIcon >
                                <div
                                    className={`${classes.secret} blocSec`}
                                >
                                    <ul>
                                        <li>Profile</li>
                                        <li>Calendar</li>
                                        <li>Gallery</li>
                                        <li>Mail</li>
                                    </ul>
                                </div>
                            </Icon>
                        }
                        {open ?
                            <>
                                <Accordion>
                                    <AccordionSummary
                                        // expandIcon={open ? <><ExpandMoreIcon /><ExpandMoreIcon /></> : ''}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    // onClick={open ? null : handleDrawer}
                                    >
                                        <Box className={classes.heading}>Charts <div><ExpandMoreIcon /><PieChartOutlinedIcon /></div></Box>
                                    </AccordionSummary>
                                    <AccordionDetails>

                                        <ul className={classes.ulAcc}>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                            <li className={classes.liAcc}>Profile</li>
                                        </ul>

                                    </AccordionDetails>
                                </Accordion>

                            </>
                            :
                            <Icon className='iconSec'>
                                <PieChartOutlinedIcon ple='true'
                                    className={classes.icons}
                                    style={{
                                        height: '30px',
                                        margin: '5px 0px'
                                    }}></PieChartOutlinedIcon >
                                <div
                                    className={`${classes.secret} blocSec`}
                                >
                                    <ul>
                                        <li>Profile</li>
                                        <li>Calendar</li>
                                        <li>Gallery</li>
                                        <li>Mail</li>
                                    </ul>
                                </div>
                            </Icon>
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