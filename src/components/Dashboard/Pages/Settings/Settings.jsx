import React, { useContext, useState, useMemo, useEffect } from "react";
import Selectrix from 'react-selectrix';
import ReactSelect, { Props } from "react-select";
import { useDispatch, useSelector } from 'react-redux';
import withWidth from "@material-ui/core/withWidth";
import { NavLink, useHistory } from "react-router-dom";
import { ThemeContext } from "../../../../context/themeContext";
import Cookies from 'js-cookie';
import Panel from "../../components/Panel";
import { Box, Button, IconButton, makeStyles, Switch, TextField, Typography, withStyles } from "@material-ui/core";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { CircleSpinner } from "react-spinners-kit";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Snackbar from 'node-snackbar';


const showMess = (message) => {
    Snackbar.show({
        actionTextColor: '#7575a3',
        text: message,
        actionText: 'ОК',
        pos: 'bottom-right'
    });
}

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

const Settings = ({ width }) => {

    console.log(width)
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData);
    const level = useSelector(state => state.userData.level);
    const idForRef = useSelector(state => state.idForRef);
    const pageForRef = useSelector(state => state.pageForRef);

    const { currentTheme } = useContext(ThemeContext);


    const useStyles = makeStyles(theme => ({
        p: {
            '&:hover': {
                backgroundColor: currentTheme === 'dark' ? '#232135' : '#e4e9f0'
            },
        },
        paginationRoot: {
            "& .MuiPaginationItem-root": {
                color: currentTheme === 'dark' ? 'white' : '',
            },
            "& .MuiPaginationItem-page.Mui-selected": {
                backgroundColor: currentTheme === 'dark' ? '#232135' : ''
            }
        },
        input: {
            '& .MuiInput-underline:after': {
                borderBottom: '2px solid #4169E1'
            },
            '&:hover': {
                '& .MuiInput-underline:before': {
                    borderBottom: '2px solid #4169E1'
                }
            },
            '& .MuiInput-underline:before': {
                borderBottom: '1px solid #4169E1'
            },
            // "&:not([multiple]) option, &:not([multiple]) optgroup": {

            //   }
        },
        select: {
            "&.react-selectrix.rs-base-materialize .rs-toggle": {
                paddingLeft: '7px',
                paddingTop: '14px',
                textAlign: 'start',
                backgroundColor: currentTheme === 'dark' ? 'rgb(20, 19, 34)' : 'white',
                borderRadius: '0px',
                height: '100%'
            },
            "&.react-selectrix.rs-base-materialize .rs-header": {
                borderBottom: currentTheme === 'dark' ? '1px solid rgb(75, 124, 243)' : '',
                height: '45px'
            },
            "&.react-selectrix .rs-body": {
                backgroundColor: currentTheme === 'dark' ? 'rgb(20, 19, 34)' : 'white',
            },
            "&.react-selectrix .rs-option:not(.disabled).focused,&.react-selectrix .rs-option:not(.disabled).selected": {
                backgroundColor: currentTheme === 'dark' ? '#232135' : 'white',
            },
            "&.react-selectrix": {
                height: '45px'
            },
            "&.rs-wrapper": {
                height: '45px'
            }
        },
        alert: {
            "& .MuiAlert-icon": {
                alignItems: 'center',
                fontSize: '30px'
            }
        },
        item: {
            padding: "8px",
            color: currentTheme === 'dark' ? 'white' : 'black',
            fontFamily: "RobotoRegular",
            fontSize: '14px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textTransform: 'uppercase',
            "&:hover": {
                color: '#9999BB!important',
            },
        },
        ListItem: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start'
        },
        listIcon: {
            color: currentTheme === 'dark' ? 'rgb(117, 117, 163)' : ''
        },
        dialog: {
            '& .MuiDialog-paper': {
                backgroundColor: currentTheme === 'dark' ? '#424242' : '',
                color: currentTheme === 'dark' ? 'white' : '',
            },
            "& .MuiDialogContentText-root": {
                color: currentTheme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '',
            }
        }
    }));
    const classes = useStyles();

    const myHistory = useHistory();

    const [data, setData] = useState({
        arr: [],
        pages: 1,
        page: 1
    });
    const [loading, setLoading] = useState(true);
    const [nameState, setNameState] = useState(false);
    const [levelState, setLevelState] = useState(false);
    const [pageState, setPageState] = useState(1);

    useEffect(() => {
        // if(level !== 2){
        //     myHistory.push('/dashboard')
        // }
            console.log(idForRef);
            var urlencoded = new URLSearchParams();
            urlencoded.append('page', pageState);
            fetch('https://secure.platinumpay.cc/v1/client/users/getUsers', {
                method: 'POST', headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
                body: urlencoded
            })
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                    setData({
                        ...data,
                        arr: data.response.data,
                        pages: data.response.pages
                    });
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                })
        
    }, [])

    const redirect = () => {
        myHistory.push('/dashboard');
    }


    return (
        <>
            <Panel>

            </Panel>

            <Box
                className='animate__animated animate__fadeIn'
                style={{
                    position: 'absolute',
                    top: '0px',
                    left: '0px',
                    right: '0xp',
                    bottom: '0px',
                    width: width === 'xs' ? 'calc(100vw - 30px)' : 'calc(100vw - 125px)',
                    paddingTop: '90px',
                    paddingLeft: width === 'xs' ? '15px' : '105px',
                    backgroundColor: currentTheme === 'light' ? 'white' : 'rgb(20, 19, 34)',
                    zIndex: '9',
                    textAlign: width === 'xs' ? 'center' : '',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                }}
            >

                {loading ?
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
                    loading={loading}
                />
            </Box>
                :

                <>

                <Box
                style={{
                    width:'100%',
                    maxWidth:'700px',
                    textAlign:'left'
                }}
                >
                <Box
                style={{
                    width:'100%',
                    display:'flex',
                    justifyContent: width === 'xs' ? 'center' : 'flex-start'
                }}
                >
                <Typography variant='h5'
                            style={{
                                color: currentTheme === 'dark' ? '#aeaee0' : 'black',

                                // borderBottom:'1px solid rgb(174, 174, 224)'
                            }}>
                            Настройки
                    </Typography>
                </Box>

                    <Typography
                            style={{
                                color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                                margin: '15px 0px 5px 0px'
                            }}
                        >
                            URL
                         </Typography>
                        {currentTheme === 'dark' ?
                            <CssTextField
                                id="name"
                                placeholder="URL"
                                required
                                style={{
                                    margin: '0px 0px 25px 0px',
                                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                    width: '100%'
                                }}
                            />
                            :
                            <CssTextField2
                                id="name"
                                placeholder="URL"
                                required
                                style={{
                                    margin: '0px 0px 25px 0px',
                                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                    width: '100%',
                                    border: '1px solid #e4e9f0'
                                }}
                            />}



                        <Typography
                            style={{
                                color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                                margin: '0px 0px 5px 0px'
                            }}
                        >
                            Комиссия
                </Typography>
                {currentTheme === 'dark' ?
                            <CssTextField
                                id="name"
                                placeholder="Комиссия"
                                required
                                style={{
                                    margin: '0px 0px 25px 0px',
                                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                    width: '100%'
                                }}
                            />
                            :
                            <CssTextField2
                                id="name"
                                placeholder="Комиссия"
                                required
                                style={{
                                    margin: '0px 0px 25px 0px',
                                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                    width: '100%',
                                    border: '1px solid #e4e9f0'
                                }}
                            />}


                        <Typography
                        style={{
                            color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                            margin: '0px 0px 5px 0px'
                        }}
                    >
                        Технические работы
                </Typography>


                <FormControl component="fieldset"
                                        className={classes.fcont}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            justifyContent: 'flex-end',
                                            marginBottom: '25px',
                                            marginRight: width === 'xs' || width === 'sm' ? '0px' : '5px',
                                        }}>
                                        <FormGroup aria-label="position" row>
                                            <FormControlLabel
                                                value="trightop"
                                                control={
                                                    <Switch
                                                       // onChange={handleSwitch}
                                                        color="primary"
                                                        name="checkedB"
                                                        inputProps={{ role: 'switch' }}
                                                    />
                                                }
                                                label=""
                                                labelPlacement="right"
                                                style={{
                                                    color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                                                }}
                                            />
                                        </FormGroup>
                                    </FormControl>
                </Box>

                </>
                }
            </Box>
        </>
    )
};

export default withWidth()(Settings);