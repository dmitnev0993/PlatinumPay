import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles, Box, Typography } from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";
import { ThemeContext } from "../../context/themeContext";
import { v4 as uuidv4 } from "uuid";
import "./mainPage.scss";
import "./MainPageStyles.css"
import SmileRain from "../SmileRain/SmileRain";
import lightLogo from '../../assets/logo/logo-light.png'
import darkLogo from '../../assets/logo/logo-dark.png'

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: '100vh',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: 'relative',
    width: '100vw!important',
    margin: '0px',
    padding: '0px',
    textAlign:'center'
  },
  gsBtn: {
    padding: "15px",
    backgroundColor: 'rgb(75, 124, 243)',
    "&:hover": {
      backgroundColor: '#42baf9',
    },
    fontFamily: "RobotoBold",
  },
}));

const MainPage = ({ themeChanger, width, sound }) => {

  //console.log(width);
  const classes = useStyles();

  const { currentTheme } = useContext(ThemeContext);

  const renderStars = () => {
    const stars = [
      { top: "calc(36% - 18px)", left: "calc(23% - 11px)", delay: 2 + "s" },
      { top: "calc(13% - 2px)", left: "calc(70% - 35px)", delay: 5 + "s" },
      { top: "calc(55% - 27px)", left: "calc(77% - 38px)", delay: 5 + "s" },
      { top: "calc(25% - 12px)", left: "calc(63% - 31px)", delay: 7 + "s" },
      { top: "calc(83% - 41px)", left: "calc(59% - 29px)", delay: 7 + "s" },
      { top: "calc(86% - 43px)", left: "calc(98% - 49px)", delay: 11 + "s" },
      { top: "calc(53% - 26px)", left: "calc(68% - 34px)", delay: 11 + "s" },
      { top: "calc(12% - 3px)", left: "calc(10% - 5px)", delay: 9 + "s" },
      { top: "calc(70% - 35px)", left: "calc(12% - 6px)", delay: 9 + "s" },
      { top: "calc(26% - 13px)", left: "calc(37% - 18px)", delay: 11 + "s" },
    ];
    const items = stars.map((star) => {
      return (
        <svg
          key={uuidv4()}
          className="star"
          style={{
            willChange: "transform",
            position: "absolute",
            userSelect: "none",
            pointerEvents: "none",
            width: 50,
            height: 50,
            top: star.top,
            left: star.left,
            zIndex: 95,
            animationDelay: star.delay,
          }}
          viewBox="0 0 68 68"
        >
          <path
            fill="#FFC700"
            d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
          ></path>
        </svg>
      );
    });
    return items;
  };
  const starsJSX = renderStars();

  return (
    <>

      <Box fixed='true' className={classes.mainContainer}>
        {<SmileRain sound={sound} />}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            maxWidth: "100%",
            height: "100%",
            overflow: 'hidden'
          }}
        >
          {starsJSX}
        </div>
        <Box
          className='animate__animated animate__fadeIn'
          style={{ zIndex:'9999' }}>
          <img style={{maxWidth: width === 'xs' ? '300px' : '450px'}} src={currentTheme === 'dark' ? darkLogo : lightLogo} />
          <Typography
            variant="h5"
            align="center"
            style={{
              color: currentTheme === 'dark' ? 'white' : 'black',
              fontFamily: "RobotoRegular",
              fontSize: width === "xs" && 16,
              zIndex:'9999',
              margin:'20px 0px'
            }}
          >
            Снимай сливки с трафика вместе с нами!
          </Typography>
        </Box>
        <Box style={{zIndex:'9999'}}>
          <NavLink
            style={{
              textDecoration: "none",
            }}
            to='register' exact>
            <div className="btn-contain">
              <div className="btn-underline-contain">
                <div className="btn-underline" style={{
                  color: currentTheme === 'dark' ? 'white' : 'black',
                  border: currentTheme === 'dark' ? '2px solid white' : '2px solid black',
                  backgroundColor: currentTheme === 'dark' ? 'rgb(20, 19, 34)' : 'white',
                  }}>
                  <span>Стать партнером</span>
                </div>
              </div>
            </div>
          </NavLink>
        </Box>
      </Box>
    </>
  );
};

export default withWidth()(MainPage);
