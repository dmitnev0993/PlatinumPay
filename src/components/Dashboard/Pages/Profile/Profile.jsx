import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import withWidth from "@material-ui/core/withWidth";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Snackbar from 'node-snackbar';
import { useHistory } from "react-router-dom";
import { ThemeContext } from "../../../../context/themeContext";
import Cookies from 'js-cookie';
import Panel from "../../components/Panel";
import { AppBar, Box, Button, IconButton, makeStyles, Tab, Tabs, TextField, Typography, withStyles } from "@material-ui/core";
import { setData } from "../../../../actions/actions";
import { CircleSpinner } from "react-spinners-kit";

const CssTextField = withStyles({
  root: {
    '& .MuiFormHelperText-root': {
      backgroundColor: 'rgb(12, 12, 27)'
    },
    '& .MuiInputBase-input': {
      color: '#7575a3',
      height: '28px',
      backgroundColor: '#232135',
      padding: '8px'
    },
    // '& .MuiInputBase-input:focus': {
    //   outline:'2px solid #7575a3'
    // },
    '& .MuiInput-underline:hover': {
      outline: '2px solid #7575a3'
    },
    '& .MuiInput-underline:after': {
      display: 'none',
      borderBottomColor: '#7575a3',
    },
    '& .MuiInput-underline:focus-within': {
      outline: '2px solid #7575a3'
    },
    '& .MuiInput-underline:before': {
      display: 'none',
      borderBottomColor: '#7575a3',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#7575a3',
      },
      '&:hover fieldset': {
        borderColor: '#7575a3',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#7575a3',
      },
    },
  },
})(TextField);

const CssTextField2 = withStyles({
  root: {
    '& .MuiInputBase-input': {
      height: '28px',
      padding: '8px'
    },
    // '& .MuiInputBase-input:focus': {
    //   outline:'2px solid #78a3ff'
    // },
    '& .MuiInput-underline:hover': {
      outline: '1px solid #78a3ff'
    },
    '& .MuiInput-underline:after': {
      display: 'none',
      borderBottomColor: '#78a3ff',
    },
    '& .MuiInput-underline:focus-within': {
      outline: '1px solid #78a3ff'
    },
    '& .MuiInput-underline:before': {
      display: 'none',
      borderBottomColor: '#78a3ff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#78a3ff',
      },
      '&:hover fieldset': {
        borderColor: '#78a3ff',
      },
      '& .Mui-focused fieldset': {
        borderColor: '#78a3ff',
      },
    },
  },
})(TextField);

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

const Profile = ({ width }) => {
  console.log(width)
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData);
  const { currentTheme } = useContext(ThemeContext);

  const useStyles = makeStyles(theme => ({
    bar: {
      boxShadow: 'none',
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
        justifyContent: 'center'
      }
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

  const myHistory = useHistory();
  const [check, setCheck] = useState(0)
  //   if(!Cookies.get('token')){
  //     myHistory.push('/')
  //   }



  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const handleCheck = () => {
    let myCheck = 0;
    if (check === 0) {
      myCheck = 1;
      setCheck(1)
    }
    else {
      myCheck = 0;
      setCheck(0)
    }
    const urlData = {
      'trafficBack': myCheck
    }
    var urlencoded = new URLSearchParams();
    urlencoded.append("trafficBack", myCheck);
    fetch(`https://secure.platinumpay.cc/v1/client/profile/setTrafficBack`, {
      method: 'POST', headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: urlencoded
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data)
      })
      .catch(err=>{
        console.log(err);
        showMess('Ошибка');
    })

  }

  const handleUrl = () => {
    const url = document.querySelector('#linkTrBack').value;
    console.log(url)
    var urlencoded = new URLSearchParams();
    urlencoded.append("trafficBackUrl", url);
    fetch('https://secure.platinumpay.cc/v1/client/profile/setTrafficBackUrl', {
      method: 'POST', headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: urlencoded
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data)
        dispatch(setData({
          trafficBackUrl: data.response.trafficBackUrl,
        }))
      })
      .catch(err=>{
        console.log(err);
        showMess('Ошибка');
    })
  }

  const handleProfile = () => {
    const name = document.querySelector('#name').value;
    const telegram = document.querySelector('#telegram').value;
    console.log(name, telegram)
    var urlencoded = new URLSearchParams();
    urlencoded.append("username", name);
    urlencoded.append("telegram", telegram);
    fetch('https://secure.platinumpay.cc/v1/client/profile/editProfile', {
      method: 'POST', headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: urlencoded
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data)
        dispatch(setData({
          username: data.response.username,
          telegram: data.response.telegram
        }))
      })
      .catch(err=>{
        console.log(err);
        showMess('Ошибка');
    })
  }
  useEffect(() => {
    if (userData.trafficBack) {
      setCheck(userData.trafficBack)
    }
  }, [userData.trafficBack])


  const handlePassword = () => {
    const pass = document.querySelector('#pass').value;
    const pass2 = document.querySelector('#pass2').value;
    console.log(pass, pass2)
    if (pass !== pass2) {
      showMess('Пароли не совпадают');
      return
    }
    var urlencoded = new URLSearchParams();
    urlencoded.append("password", pass);
    urlencoded.append("repeatPassword", pass2);
    fetch('https://secure.platinumpay.cc/v1/client/profile/setPassword', {
      method: 'POST', headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: urlencoded
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data)
        if (!data.errorMsg) {
          Cookies.set('token', data.response.access_token)
          dispatch(setData({
            token: data.response.access_token
          }))
        }
        else {
          showMess('Ошибка')
        }
      })
      .catch(err=>{
        console.log(err);
        showMess('Ошибка');
    })

  }

  const resetApi = () => {
    fetch('https://secure.platinumpay.cc/v1/client/profile/resetApi', {
      method: 'GET', headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (!data.errorMsg) {
          dispatch(setData({
            api: data.response.api
          }))
        }
      })
      .catch(err=>{
        console.log(err);
        showMess('Ошибка');
    })
  }

  const copyApi = () => {
    navigator.clipboard.writeText(userData.api);
    showMess('Ключ API скопирован')
  }


  return (
    <>
      <Panel></Panel>
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
          textAlign: width === 'xs' ? 'center' : '',
        }}>
        <AppBar position="static" className={classes.bar}>
          <Tabs
            orientation={width === 'xs' ? "vertical" : "horizontal"}
            variant={width === 'sm' ? 'scrollable' : 'standard'}
            value={value}
            onChange={handleChange}
            centered
            aria-label="simple tabs example"
          >
            <Tab label="Редактировать профиль" />
            <Tab label="Сменить пароль" />
            <Tab label="API" style={{
              minWidth: '40px'
            }} />
          </Tabs>
        </AppBar>



        <TabPanel value={value} index={0} width={width}>
          {userData.username ?
            <>
              <Box style={{
                width: '100%',
                maxWidth: '1000px',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap'
              }}>
                <Box style={{
                  textAlign: 'start',
                  width: width === 'xs' ? '100%' : '49%',
                }}>
                  <Typography className={classes.label}>
                    Имя пользователя
    </Typography>
                  {currentTheme === 'dark' ?
                    <CssTextField
                      defaultValue={userData.username ? userData.username : undefined}
                      id="name"
                      placeholder="Имя пользователя"
                      required
                      style={{
                        margin: '10px 0px 10px 0px',
                        backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                        width: '100%'
                      }}
                    />
                    :
                    <CssTextField2
                      defaultValue={userData.username ? userData.username : undefined}
                      id="name"
                      placeholder="Имя пользователя"
                      required
                      style={{
                        margin: '10px 0px 10px 0px',
                        backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                        width: '100%',
                        border: '1px solid #e4e9f0'
                      }}
                    />}
                </Box>
                <Box style={{
                  textAlign: 'start',
                  width: width === 'xs' ? '100%' : '49%'
                }}>
                  <Typography className={classes.label}>
                    Telegram
    </Typography>
                  {currentTheme === 'dark' ?
                    <CssTextField
                      defaultValue={userData.telegram ? userData.telegram : undefined}
                      id="telegram"
                      placeholder="@"
                      required
                      style={{
                        margin: '10px 0px 10px 0px',
                        backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                        width: '100%'
                      }}
                    />
                    :
                    <CssTextField2
                      defaultValue={userData.telegram ? userData.telegram : undefined}
                      id="telegram"
                      placeholder="@"
                      required
                      style={{
                        margin: '10px 0px 10px 0px',
                        backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                        width: '100%',
                        border: '1px solid #e4e9f0'
                      }}
                    />}
                </Box>


              </Box>
              <Box style={{
                width: '100%',
                maxWidth: '1000px',
                display: 'flex',
                justifyContent: 'flex-start'
              }}>
                <Button
                  className={classes.butt}
                  variant="contained"
                  onClick={handleProfile}
                  style={{
                    color: 'white',
                    backgroundColor: 'rgb(75, 124, 243)',
                    marginTop: '10px',
                    borderRadius: '2px',
                    fontSize: '15px',
                    height: '45px',
                    width: '50%',
                    maxWidth: '250px',
                    border: '0px',
                    alignSelf: 'left'
                  }}

                >
                  Подтвердить
          </Button>
              </Box>
            </>
            :
            <Box
              style={{
                position: 'fixed',
                top: '0px',
                bottom: '0px',
                left: '0px',
                right: '0px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <CircleSpinner
                size={25}
                color={currentTheme === 'dark' ? 'white' : 'black'}
                loading={true}
              />
            </Box>
          }
        </TabPanel>




        <TabPanel value={value} index={1} width={width}>
          <Box style={{
            width: '100%',
            maxWidth: '1000px',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap'
          }}>
            <Box style={{
              width: width === 'xs' ? '100%' : '49%',
              textAlign: 'start'
            }}>
              <Typography className={classes.label}>
                Пароль
      </Typography>
              {currentTheme === 'dark' ?
                <CssTextField

                  id="pass"
                  placeholder="Пароль"
                  required
                  style={{
                    margin: '10px 0px 10px 0px',
                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                    width: '100%'
                  }}
                />
                :
                <CssTextField2

                  id="pass"
                  placeholder="Пароль"
                  required
                  style={{
                    margin: '10px 0px 10px 0px',
                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                    width: '100%',
                    border: '1px solid #e4e9f0'
                  }}
                />}
            </Box>

            <Box style={{
              width: width === 'xs' ? '100%' : '49%',
              textAlign: 'start'
            }}>
              <Typography className={classes.label}>
                Повторите пароль
      </Typography>
              {currentTheme === 'dark' ?
                <CssTextField

                  id="pass2"
                  placeholder="Повторите пароль"
                  required
                  style={{
                    margin: '10px 0px 10px 0px',
                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                    width: '100%'
                  }}
                />
                :
                <CssTextField2

                  id="pass2"
                  placeholder="Повторите пароль"
                  required
                  style={{
                    margin: '10px 0px 10px 0px',
                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                    width: '100%',
                    border: '1px solid #e4e9f0'
                  }}
                />}
            </Box>
          </Box>
          <Box style={{
            width: '100%',
            maxWidth: '1000px',
            display: 'flex',
            justifyContent: 'flex-start'
          }}>
            <Button
              className={classes.butt}
              onClick={handlePassword}
              variant="contained"
              style={{
                color: 'white',
                backgroundColor: 'rgb(75, 124, 243)',
                marginTop: '10px',
                borderRadius: '2px',
                fontSize: '15px',
                height: '45px',
                width: '50%',
                maxWidth: '250px',
                border: '0px',
                alignSelf: 'left'
              }}

            >
              Подтвердить
            </Button>
          </Box>
        </TabPanel>


        {/* <TabPanel value={value} index={2} width={width}>
          <Box style={{
            width: '100%',
            maxWidth: '1000px',
            flexWrap: width === 'xs' ? 'wrap' : 'nowrap',
            textAlign: 'start',
            display: 'flex',
            justifyContent: 'flex-start',
          }}>
            <Box style={{
              width: width === 'xs' ? '100%' : '49%',
              marginRight: width === 'xs' ? '0px' : '40px',
              maxWidth: '1000px',
            }}>
              <Typography className={classes.label}>
                Ссылка
             </Typography>
              {currentTheme === 'dark' ?
                <CssTextField
                  defaultValue={userData.trafficBackUrl ? userData.trafficBackUrl : undefined}
                  id="linkTrBack"
                  placeholder="Ссылка"
                  required
                  style={{
                    margin: '10px 0px 10px 0px',
                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                    width: '100%'
                  }}
                />
                :
                <CssTextField2
                  defaultValue={userData.trafficBackUrl ? userData.trafficBackUrl : undefined}
                  id="linkTrBack"
                  placeholder="Ссылка"
                  required
                  style={{
                    margin: '10px 0px 10px 0px',
                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                    width: '100%',
                    border: '1px solid #e4e9f0'
                  }}
                />}
            </Box>
            <FormControl component="fieldset"
              className={classes.fcont}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                marginBottom: '15px'
              }}>
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="trightop"
                  control={<Switch
                    checked={check}
                    onChange={handleCheck}
                    color="primary"
                    name="checkedB"
                    inputProps={{ role: 'switch' }}
                  />}
                  label="TraficBack"
                  labelPlacement="right"
                  style={{
                    color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                  }}
                />
              </FormGroup>
            </FormControl>

          </Box>
          <Box style={{
            width: '100%',
            maxWidth: '1000px',
            display: 'flex',
            justifyContent: 'flex-start'
          }}>
            <Button
              className={classes.butt}
              onClick={handleUrl}
              variant="contained"
              style={{
                color: 'white',
                backgroundColor: 'rgb(75, 124, 243)',
                marginTop: '10px',
                borderRadius: '2px',
                fontSize: '15px',
                height: '45px',
                width: '50%',
                maxWidth: '250px',
                border: '0px',
                alignSelf: 'left'
              }}

            >
              Подтвердить
            </Button>
          </Box>
        </TabPanel> */}



        <TabPanel value={value} index={2} width={width}>
          <Box
            style={{
              width: '100%',
              maxWidth: '1000px',
              flexWrap: 'wrap',
              textAlign: 'start',
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'column'
            }}
          >
            <Typography className={classes.label}>
              Ключ API
             </Typography>
            <Box
              style={{
                width: width === 'xs' ? '100%' : '49%',
                marginRight: width === 'xs' ? '0px' : '40px',
                maxWidth: '1000px',
                position: 'relative'
              }}
            >

              {
                currentTheme === 'dark' ?
                  <CssTextField
                    // value={userData.trafficBackUrl ? userData.trafficBackUrl : undefined}
                    id="linkTrBack"
                    placeholder="Ключ API"
                    value={userData.api ? userData.api : undefined}
                    disabled
                    required
                    style={{
                      margin: '10px 0px 10px 0px',
                      backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                      width: '100%'
                    }}
                  />
                  :
                  <CssTextField2
                    // value={userData.trafficBackUrl ? userData.trafficBackUrl : undefined}
                    id="linkTrBack"
                    placeholder="Ключ API"
                    value={userData.api ? userData.api : undefined}
                    disabled
                    required
                    style={{
                      margin: '10px 0px 10px 0px',
                      backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                      width: '100%',
                      border: '1px solid #e4e9f0'
                    }}
                  />

              }
              <IconButton
                onClick={copyApi}
                style={{
                  position: 'absolute',
                  right: "-1px",
                  top: '8.5px',
                  color: currentTheme === 'dark' ? '#aeaee0!important' : '',
                  cursor: 'pointer'
                }}
              >
                <FileCopyIcon
                  style={{
                    color: currentTheme === 'dark' ? '#aeaee0' : ''
                  }}></FileCopyIcon>
              </IconButton>
            </Box>

            <Button
              className={classes.butt}
              variant="contained"
              style={{
                color: 'white',
                backgroundColor: 'rgb(75, 124, 243)',
                marginTop: '10px',
                borderRadius: '2px',
                fontSize: '15px',
                height: '45px',
                width: '50%',
                maxWidth: '250px',
                border: '0px',
                alignSelf: 'left'
              }}
              onClick={resetApi}
            >
              Сбросить ключ
            </Button>
          </Box>
        </TabPanel>



      </Box>
    </>
  );
};

export default withWidth()(Profile);