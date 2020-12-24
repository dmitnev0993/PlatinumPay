import React, { useContext } from "react";
import {  useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { ThemeChanger } from "./ThemeChanger/ThemeChanger";
import { amber } from "@material-ui/core/colors";
import { ThemeContext } from "../../../context/themeContext";
import { NavLink } from "react-router-dom";
import { ClickAwayListener, Grow, MenuList, Paper, Popper, withWidth } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { theme } from "../../../state/consts";
import Cookies from 'js-cookie';
import { setData, setLogin } from "../../../actions/actions";
import { AccountBox } from "@material-ui/icons";
import lightLogo from '../../../assets/logo/logo-light-header.png'
import darkLogo from '../../../assets/logo/logo-dark-header.png'

const MainHeader = ({ themeChanger, width }) => {

  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.isLogin);
  const myHistory = useHistory();

  if (Cookies.get('token')) {
    if (!isLogin) {
      dispatch(setLogin())
      dispatch(setData({
        token: Cookies.get('token'),
        level: Cookies.get('level'),
      }))
      myHistory.push('/dashboard')
    }
    else myHistory.push('/dashboard')
  }


  const { currentTheme } = useContext(ThemeContext);


  const useStyles = makeStyles((theme) => ({
    logo:{
      maxWidth:'150px'
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
           <img className={classes.logo} src={currentTheme === 'dark' ? darkLogo : lightLogo}/>
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
            <img className={classes.logo} src={currentTheme === 'dark' ? darkLogo : lightLogo}/>
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
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                style={{ 
                  borderRadius: 3, 
                  color: currentTheme === 'light' ? 'black' : '',
                  backgroundColor: currentTheme === 'dark' ? 'rgb(20, 19, 34)' : 'white', 
                  width: '42px', 
                  height: '42px', 
                  alignItems: 'center', 
                  padding: '0px' }}
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
                  onClick={() => {
                    Cookies.remove('token');
                    Cookies.remove('level');
                    dispatch(setLogin());
                    dispatch(setData({}))
                  }}
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
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                style={{ 
                  borderRadius: 3, 
                  color: currentTheme === 'light' ? 'black' : '',
                  backgroundColor: currentTheme === 'dark' ? 'rgb(20, 19, 34)' : 'white', 
                  width: '42px', 
                  height: '42px', 
                  alignItems: 'center', 
                  padding: '0px' }}
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
                  onClick={() => {
                    Cookies.remove('token');
                    Cookies.remove('level');
                    dispatch(setLogin());
                    dispatch(setData({}));
                  }}
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
     <img style={{
       maxWidth:  width === 'xs' ? '50px' : '70px'
     }} src={tgLogo}/> 
     </a> */}
     </>
  );
};

export default withWidth()(MainHeader);
