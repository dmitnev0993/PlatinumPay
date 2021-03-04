import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from 'node-snackbar';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ReplayIcon from '@material-ui/icons/Replay';
import { ThemeChanger } from "./ThemeChanger/ThemeChanger";
import { amber } from "@material-ui/core/colors";
import { ThemeContext } from "../../../context/themeContext";
import { NavLink } from "react-router-dom";
import { ClickAwayListener, Grow, MenuList, Paper, Popper, Typography, withWidth } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { theme } from "../../../state/consts";
import Cookies from 'js-cookie';
import { setData, setLogin, setBalance } from "../../../actions/actions";
import { AccountBox } from "@material-ui/icons";
import lightLogo from '../../../assets/logo/logo-light-short.png'
import darkLogo from '../../../assets/logo/logo-dark-short.png'
import { CircleSpinner } from "react-spinners-kit";

const showMess = (message) => {
  Snackbar.show({
      actionTextColor: '#7575a3',
      text: message,
      actionText: 'ОК',
      pos: 'bottom-right'
  });
}

let int;

const MainHeader = ({ themeChanger, width }) => {

  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.isLogin);
  const userData = useSelector(state => state.userData);
  const level = useSelector(state => state.userData.level);
  const balance = useSelector(state => state.balance);
  const [loadingBalance, setLoadingBalance] = useState(false)
  const myHistory = useHistory();

  const exit = () => {
    Cookies.remove('token');
    dispatch(setLogin());
    dispatch(setBalance(0, 0));
    dispatch(setData({
      token: undefined,
      level: undefined,
      trafficBack: undefined,
      trafficBackUrl: undefined,
      username: undefined
    }))
  }

  useEffect(() => {
    if (Cookies.get('token')) {
      console.log(myHistory.location.pathname)
      if (!isLogin) {
        dispatch(setLogin())
        dispatch(setData({
          token: Cookies.get('token'),
        }))
        if (myHistory.location.pathname === '/' || myHistory.location.pathname === '/login' || myHistory.location.pathname === '/register') {
          myHistory.push('/dashboard')
        }
      }
      else {
        if (myHistory.location.pathname === '/' || myHistory.location.pathname === '/login' || myHistory.location.pathname === '/register') {
          myHistory.push('/dashboard')
        }
      }
    }
    else{
      if(myHistory.location.pathname !== '/' && myHistory.location.pathname !== '/login' && myHistory.location.pathname !== '/register'){
        myHistory.push('/login')
      }
    }
  }, [isLogin])

  useEffect(()=>{
    if(level === 0 && myHistory.location.pathname !== '/dashboard' && myHistory.location.pathname !== '/dashboard/profile'){
      myHistory.push('/dashboard')
      notActivated();
    }
  },[level])

  useEffect(() => {
    
    if(!isLogin){ clearInterval(int) }
    else{
      int = setInterval(() => {
      //  console.log('token')
        if(isLogin){
          fetch(`https://secure.platinumpay.cc/v1/client/auth/token`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        })
          .then((res) => {
            return res.json()
          })
          .then(data => {
            if (myHistory.location.pathname !== '/' && myHistory.location.pathname !== '/login' && myHistory.location.pathname !== '/register') {
              if (!data.result) {
                exit()
              }
              else {
                dispatch(setData({
                  token: Cookies.get('token'),
                  level: data.response.level,
                }))
              }
            }
          })
        }
  
      }, 5000);
    }
  }, [isLogin])

  useEffect(() => {
    if (isLogin) {
      setLoadingBalance(true);

      fetch(`https://secure.platinumpay.cc/v1/client/auth/token`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      })
        .then((res) => {
          return res.json()
        })
        .then(data => {
          if (myHistory.location.pathname !== '/' && myHistory.location.pathname !== '/login' && myHistory.location.pathname !== '/register') {
            if (!data.result) {
              exit()
            }
            else {
              dispatch(setData({
                level: data.response.level,
              }))
            }
          }
        })

      fetch('https://secure.platinumpay.cc/v1/client/profile/getBalance', {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      })
        .then(res => {
          return res.json()
        })
        .then(data => {
          dispatch(setBalance(data.response.balance, data.response.rates.BTC))
          setLoadingBalance(false)
        })

      fetch(`https://secure.platinumpay.cc/v1/client/profile/getProfile`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      })
        .then(res => {
          return res.json()
        })
        .then(data => {
          dispatch(setData({
            username: data.response.username,
            trafficBack: data.response.trafficBack,
            trafficBackUrl: data.response.trafficBackUrl,
            telegram: data.response.telegram,
            api: data.response.api
          }))
        })
    }
  }, [isLogin])

  const { currentTheme } = useContext(ThemeContext);


  const useStyles = makeStyles((theme) => ({
    logo: {
      maxWidth: '40px'
    },
    root: {
      flexGrow: 1,
    },
    active: {
      //color:'#E5A800!important' 
    },
    menuButton: {
      marginRight: theme.spacing(2),
      // '& .MuiTouchRipple-root':{
      //   display:'none'
      // }
    },
    title: {
      flexGrow: 1,
      fontFamily: "RobotoBold",
    },
    authBlock: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      // backgroundColor: amber[900],
      borderRadius: theme.spacing(1),
      padding: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    loginNav: {
      padding: "8px",
      color: currentTheme === 'dark' ? 'white' : 'black',
      marginRight: "10px",
      fontFamily: "RobotoRegular",
      "&:hover": {
        color: '#9999BB!important',
      },
    },
    registerNav: {
      boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
      padding: "10px 8px",
      borderRadius: '3px',
      backgroundColor: 'rgb(75, 124, 243)',
      "&:hover": {
        backgroundColor: '#42baf9',
      },
      fontFamily: "RobotoRegular",
    },
    menuItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: 'center'
    },
    menu: {
      '& .MuiMenu-paper': {
        backgroundColor: currentTheme === 'dark' ? 'rgb(12, 12, 27)' : 'white'
      }
    },
  }));

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const reloadBalance = () => {
    setLoadingBalance(true);

    fetch('https://secure.platinumpay.cc/v1/client/profile/getBalance', {
      headers: {
        Authorization: `Bearer ${userData.token}`
      }
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        dispatch(setBalance(data.response.balance, data.response.rates.BTC))
        setLoadingBalance(false);
      })
  }

  const notActivated = () => {
    showMess('Ваш аккаунт не активирован');
}


  return (
    <>
      <div
        className={classes.root}
      >
        <AppBar position="fixed" style={{
          boxShadow: currentTheme === 'dark' ? 'none' : "rgb(212 215 225 / 28%) 0px 1px 6px",
          transition: "box-shadow 250ms",
          zIndex: isLogin ? '2001' : '',
          borderBottom: currentTheme === 'dark' ? '1px solid #232135' : 'none',
        }}>
          <Toolbar
            style={{
              minHeight: 63,
              backgroundColor: !Cookies.get('token') ? currentTheme === 'dark' ? 'rgb(20, 19, 34)' : theme.light : currentTheme === 'dark' ? '#0c0c1b' : theme.light,
              boxShadow: 'none'
            }}
          >
            <div
              className={classes.title}
              style={{
                fontSize: width === "xs" && 30,
              }}
            >
              {isLogin ?
                width === 'xs' ?
                  <NavLink
                    to="/dashboard"
                    exact
                    style={{
                      textDecoration: "none",
                      color: currentTheme === "light" ? theme.dark : theme.light,
                    }}
                  >
                    <img alt='' className={classes.logo} src={currentTheme === 'dark' ? darkLogo : lightLogo} />
                  </NavLink>
                  :
                  null
                :
                <NavLink
                  to="/"
                  exact
                  style={{
                    textDecoration: "none",
                    color: currentTheme === "light" ? theme.dark : theme.light,
                  }}
                >
                  <img alt='' className={classes.logo} src={currentTheme === 'dark' ? darkLogo : lightLogo} />
                </NavLink>
              }
            </div>
            {width !== "xs" ?
              !isLogin ?
                (
                  <div className={classes.authBlock}>
                    <NavLink
                      className={classes.loginNav}
                      to="/login"
                      exact
                      activeClassName={classes.active}
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      Войти
                </NavLink>
                    <NavLink
                      to="/register"
                      className={classes.registerNav}
                      activeClassName={classes.active}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Регистрация
                </NavLink>

                  </div>
                ) :
                (
                  <>
                    {loadingBalance ?
                      <div
                        style={{
                          marginRight: '32px',
                          display:'flex',
                        alignItems:'flex-end',
                        height:'33px'
                        }}>
                        <CircleSpinner
                          size={11}
                          color={currentTheme === 'dark' ? 'white' : 'black'}
                          loading={loadingBalance}
                        >
                        </CircleSpinner>
                      </div>
                      :
                      <div
                        style={{
                          display: 'flex',
                          color: '#808080',
                          marginRight:'25px',
                          alignItems:'flex-end'
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <Typography variant='h7'
                            style={{
                              fontSize: '15px'
                            }}
                          >
                            RUB
                        </Typography>
                          <Typography
                            style={{
                              marginRight: '18px',
                              color: currentTheme === 'dark' ? 'white' : 'black',
                              fontSize: '16px'
                            }}>
                            {`${balance.money} ₽`}

                          </Typography>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <Typography variant='h7'
                            style={{
                              fontSize: '15px'
                            }}
                          >
                            BTC
                        </Typography>
                          <Typography
                            style={{
                              color: currentTheme === 'dark' ? 'white' : 'black',
                              fontSize: '16px'
                            }}>
                            {`${balance.rates} ₿`}

                          </Typography>
                        </div>
                        <IconButton
                          onClick={reloadBalance}
                          style={{
                            color: currentTheme === 'dark' ? 'white' : 'black',
                            padding: '2px 2px 3px 2px',
                            marginLeft:'4px'
                          }}>
                          <ReplayIcon style={{
                            height: '18px'
                          }}></ReplayIcon>
                        </IconButton>
                      </div>
                    }
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="menu"
                      style={{
                        borderRadius: 3,
                        color: currentTheme === 'light' ? 'black' : '',
                        backgroundColor: currentTheme === 'dark' ? 'rgb(26, 32, 44)' : 'rgb(245, 245, 245)',
                        width: '42px',
                        height: '42px',
                        alignItems: 'center',
                        padding: '0px',
                        borderRadius:'8px'
                      }}
                      onClick={handleClick}
                    >
                      <AccountBox />
                    </IconButton>
                    <Popper open={open} anchorEl={anchorEl} role={undefined} transition disablePortal>
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                            backgroundColor: currentTheme === 'dark' ? 'rgb(20, 19, 34)' : ''
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList autoFocusItem={open} id="menu-list-grow" >
                                <MenuItem onClick={handleClose}>
                                  <NavLink
                                    className={classes.loginNav}
                                    to="/dashboard/profile"
                                    exact
                                    activeClassName={classes.active}
                                    style={{
                                      textDecoration: "none",
                                    }}
                                  >
                                    Профиль
                </NavLink>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                  <NavLink
                                    className={classes.loginNav}
                                    onClick={exit}
                                    to="/login"
                                    exact
                                    activeClassName={classes.active}
                                    style={{

                                      textDecoration: "none",
                                    }}
                                  >
                                    Выйти
                </NavLink>
                                </MenuItem>
                                {/* <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </>

                )
              : !isLogin ? (
                <>
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    style={{ borderRadius: 5, backgroundColor: amber[600], width: '42px', height: '42px', alignItems: 'center', padding: '0px' }}
                    onClick={handleClick}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    className={classes.menu}
                    id="fade-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}

                  >
                    <MenuItem onClick={handleClose} className={classes.menuItem}>
                      <NavLink
                        className={classes.loginNav}
                        to="/login"
                        exact
                        activeClassName={classes.active}
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        Войти
                    </NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <NavLink
                        className={classes.registerNav}
                        to="/register"
                        activeClassName={classes.active}
                        style={{ color: "white", textDecoration: "none", }}
                      >
                        Регистрация
                    </NavLink>
                    </MenuItem>
                  </Menu>
                </>
              ) :
                (<>
                  {loadingBalance ?
                    <div
                      style={{
                        marginRight: '25px',
                        display:'flex',
                        alignItems:'flex-end',
                        height:'33px'
                      }}
                    >
                      <CircleSpinner
                        size={11}
                        color={currentTheme === 'dark' ? 'white' : 'black'}
                        loading={loadingBalance}
                      >
                      </CircleSpinner>
                    </div>
                    :
                    <div
                        style={{
                          display: 'flex',
                          color: '#808080',
                          marginRight:'18px',
                          alignItems:'flex-end'
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <Typography variant='h7'
                            style={{
                              fontSize: '15px'
                            }}
                          >
                            RUB
                        </Typography>
                          <Typography
                            style={{
                              marginRight: '14px',
                              color: currentTheme === 'dark' ? 'white' : 'black',
                              fontSize: '16px'
                            }}>
                            {`${balance.money} ₽`}

                          </Typography>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <Typography variant='h7'
                            style={{
                              fontSize: '15px'
                            }}
                          >
                            BTC
                        </Typography>
                          <Typography
                            style={{
                              color: currentTheme === 'dark' ? 'white' : 'black',
                              fontSize: '16px'
                            }}>
                            {`${balance.rates} ₿`}

                          </Typography>
                        </div>
                        <IconButton
                          onClick={reloadBalance}
                          style={{
                            color: currentTheme === 'dark' ? 'white' : 'black',
                            padding: '2px 2px 3px 2px',
                            marginLeft:'3px'
                          }}>
                          <ReplayIcon style={{
                            height: '18px'
                          }}></ReplayIcon>
                        </IconButton>
                      </div>
                  }
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    style={{
                      borderRadius: 3,
                      color: currentTheme === 'light' ? 'black' : '',
                      backgroundColor: currentTheme === 'dark' ? 'rgb(26, 32, 44)' : 'rgb(245, 245, 245)',
                      width: '42px',
                      height: '42px',
                      alignItems: 'center',
                      padding: '0px',
                      borderRadius:'8px'
                    }}
                    onClick={handleClick}
                  >
                    <AccountBox />
                  </IconButton>
                  <Popper open={open} anchorEl={anchorEl} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                          backgroundColor: currentTheme === 'dark' ? 'rgb(20, 19, 34)' : ''
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" >

                              <MenuItem onClick={handleClose}>
                                <NavLink
                                  className={classes.loginNav}
                                  to="/dashboard/profile"
                                  exact
                                  activeClassName={classes.active}
                                  style={{
                                    textDecoration: "none",
                                  }}
                                >
                                  Профиль
                </NavLink>
                              </MenuItem>

                              <MenuItem onClick={handleClose}>
                                <NavLink
                                  className={classes.loginNav}
                                  onClick={exit}
                                  to="/login"
                                  exact
                                  activeClassName={classes.active}
                                  style={{
                                    textDecoration: "none",
                                  }}
                                >
                                  Выйти
                </NavLink>
                              </MenuItem>

                              {/* <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </>
                )
            }

            <ThemeChanger themeChanger={themeChanger} />
          </Toolbar>
        </AppBar>
      </div >
      {/* <a href="tg://resolve?domain=telegram" class="telegramim_button telegramim_shadow telegramim_pulse" style={{
      width:  width === 'xs' ? '50px' : '70px',
      position: 'fixed',
      bottom: width === 'xs' ? '10px' : '32px',
      right: width === 'xs' ? '10px' : '42px',
      zIndex: '2001',
      boxShadow: '0px 0px 12px #27a5e7',
      borderRadius:'50%',
      height: width === 'xs' ? '50px' : '70px',
      }}>
     <img alt='' style={{
       maxWidth:  width === 'xs' ? '50px' : '70px'
     }} src={tgLogo}/> 
     </a> */}
    </>
  );
};

export default withWidth()(MainHeader);
