import React, { useContext } from "react";
import withWidth from "@material-ui/core/withWidth";
import {  useHistory } from "react-router-dom";
import { ThemeContext } from "../../context/themeContext";
import Cookies from 'js-cookie';
import Panel from "./components/Panel";
import StatisticsToday from "./components/StatisticsToday";
import StatisticsMonthly from './components/StatisticsMonthly';
import Referrals from "./components/Referrals";
import Cards from "./components/Cards";
import Accounts from "./components/Accounts";
import Transactions from "./components/Transactions";
import { Box } from "@material-ui/core";



const Dashboard = ({ width }) => {
  console.log(width)
  const { currentTheme } = useContext(ThemeContext);

  const myHistory = useHistory();
  if(!Cookies.get('token')){
    myHistory.push('/')
  }

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
          paddingTop:'90px',
          paddingLeft: width === 'xs' ? '15px' : '105px',
          backgroundColor: currentTheme === 'light' ? 'white' : 'rgb(20, 19, 34)',
          zIndex: '9',
          textAlign: width === 'xs' ? 'center' : '',
        }}>
            
      <StatisticsToday />
      <StatisticsMonthly />
      <Referrals />
      <Cards />
      <Accounts />
      <Transactions />
      </Box>
    </>
  );
};

export default withWidth()(Dashboard);