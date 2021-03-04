import React, { useContext } from "react";
import { useDispatch, useSelector } from 'react-redux';
import withWidth from "@material-ui/core/withWidth";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "../../context/themeContext";
import Cookies from 'js-cookie';
import Panel from "./components/Panel";
import StatisticsToday from "./components/StatisticsToday";
import StatisticsMonthly from './components/StatisticsMonthly';
import { Box } from "@material-ui/core";



const Dashboard = ({ width }) => {
  console.log(width)
  const { currentTheme } = useContext(ThemeContext);
  const level = useSelector(state => state.userData.level);
  const myHistory = useHistory();

  return (
    <>
      <Panel />
      <Box
        className='animate__animated animate__fadeIn'
        style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          right: '0xp',
          bottom: '0px',
          width: width === 'xs' ? 'calc(100vw - 35px)' : 'calc(100vw - 145px)',
          paddingTop: '90px',
          paddingLeft: width === 'xs' ? '15px' : '105px',
          backgroundColor: currentTheme === 'light' ? 'white' : 'rgb(20, 19, 34)',
          zIndex: '9',
          textAlign: width === 'xs' ? 'center' : ''
        }}>
        {level === 0 ?
          <Box
            style={{
              backgroundColor: '#ebc063',
              borderColor: '#ebc063',
              color: '#a07415',
              minWidth: '150px',
              padding: '15px',
              marginBottom: '20px',
              border: '1px solid transparent',
              borderRadius: '3px',
              margin:'0px 10px 20px 10px'
            }}
          >
            Ваш аккаунт не активирован, свяжитесь с администрацией сервиса за его активацией
          </Box>
          : null}
        <StatisticsToday />
        <StatisticsMonthly />
      </Box>
    </>
  );
};

export default withWidth()(Dashboard);