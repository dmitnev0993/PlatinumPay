import React, { useContext, useState } from "react";
import { useSelector } from 'react-redux';
import withWidth from "@material-ui/core/withWidth";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "../../../../context/themeContext";
import Panel from "../../components/Panel";
import Snackbar from 'node-snackbar';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ReplayIcon from '@material-ui/icons/Replay';
import StatisticsToday from "../../components/StatisticsToday";
import StatisticsMonthly from '../../components/StatisticsMonthly';
import { AppBar, Box, Button, IconButton, makeStyles, Tab, Tabs, TextField, Typography, withStyles } from "@material-ui/core";


function TabPanel(props) {
  const { children, value, index, width, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: width === 'sm' ? 'flex-start' : 'center'
        }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const showMess = (message) => {
  Snackbar.show({
    actionTextColor: '#7575a3',
    text: message,
    actionText: 'ОК',
    pos: 'bottom-right'
  });
}


const Stats = ({ width }) => {
  console.log(width)
  const { currentTheme } = useContext(ThemeContext);
  const level = useSelector(state => state.userData.level);
  const myHistory = useHistory();

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const useStyles = makeStyles(theme => ({
    bar: {
      boxShadow: 'none',
      margin: '15px 0px 0px 0px',
      backgroundColor: currentTheme === 'dark' ? 'rgb(20, 19, 34)' : 'white',
      '& .MuiTab-wrapper': {
        color: currentTheme === 'dark' ? '#aeaee0' : 'black',
        '&:hover': {
          color: '#4b7cf3'
        }
      },
      '& .MuiTabs-indicator': {
        backgroundColor: '#635ee7'
      },
      '& .MuiTabs-flexContainerVertical': {
        alignItems: 'center'
      },
      '& .MuiTabs-centered': {
        width: 'fit-content',

      },
      '& .MuiTabs-fixed': {
        display: 'flex',
        justifyContent: width === 'xs' ? 'center' : 'flex-start'
      },
      '& .MuiTabScrollButton-root': {
        color: currentTheme === 'dark' ? 'white' : 'black'
      },

    },
    label: {
      color: currentTheme === 'dark' ? '#aeaee0' : 'black',

    },
    fcont: {
      '& .MuiSwitch-track': {
        backgroundColor: currentTheme === 'dark' ? 'rgb(75, 124, 243)' : 'grey'
      }
    }
  }));
  const classes = useStyles();

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
        <Box
          style={{
            display: 'flex',
            justifyContent: width === 'xs' ? 'center' : 'flex-start',
            margin: '0px 0px 10px 0px',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <Typography variant='h5'
            style={{
              color: currentTheme === 'dark' ? '#aeaee0' : 'black',

              // borderBottom:'1px solid rgb(174, 174, 224)'
            }}>
            Статистика
                    </Typography>
          <IconButton
            //onClick={reloadUsers}
            style={{
              marginTop: '6px'
            }}
          >
            <ReplayIcon
              style={{
                color: currentTheme === 'dark' ? 'rgb(117, 117, 163)' : '',
                fontSize: '17px'
              }}
            >

            </ReplayIcon>
          </IconButton>
        </Box>
        <Box
          style={{
            display: 'flex',
            justifyContent: width === 'xs' ? 'center' : 'flex-start',
            margin: '0px 0px 10px 0px',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />

          </MuiPickersUtilsProvider>
        </Box>
        <Box
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start'
          }}
        >

          <AppBar position="static" className={classes.bar}>
            <Tabs
              orientation={width === 'xs' ? "vertical" : "horizontal"}
              variant={width === 'sm' ? 'scrollable' : 'standard'}
              value={value}
              onChange={handleChange}
              centered
              aria-label="simple tabs example"
            >
              <Tab label="По дням" />
              <Tab label="По месяцам" />
            </Tabs>
          </AppBar>
        </Box>

        <TabPanel value={value} index={0} width={width}>
          <StatisticsToday />
        </TabPanel>

        <TabPanel value={value} index={1} width={width}>
          <StatisticsMonthly />
        </TabPanel>

      </Box>
    </>
  );
};

export default withWidth()(Stats);