import React, { useContext, useState, useEffect, useRef } from "react";
import Snackbar from 'node-snackbar';
import { useDispatch, useSelector } from 'react-redux';
import withWidth from "@material-ui/core/withWidth";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "../../../../context/themeContext";
import Cookies from 'js-cookie';
import Panel from "../../components/Panel";
import { Box, Button, makeStyles, Switch, TextField, Typography, withStyles, IconButton, RadioGroup, Radio } from "@material-ui/core";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { setIdForUrl } from "../../../../actions/actions";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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


const showMess = (message) => {
    Snackbar.show({
        actionTextColor: '#7575a3',
        text: message,
        actionText: 'ОК',
        pos: 'bottom-right'
    });
}

const CreateURL = ({ width }) => {
    console.log(width)
    const dispatch = useDispatch();
    const idUrl = useSelector(state => state.idForUrl);
    const [idUrlSt, setIdUrlSt] = useState(idUrl);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');
    const [myVal, setMyVal] = useState('');
    const [switchSt, setSwitchSt] = useState(false);
    const { currentTheme } = useContext(ThemeContext);
    const useStyles = makeStyles(theme => ({
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
        select: {
            marginTop: '20px',
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
        source: {
            marginTop: '10px',
            color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
            "& .MuiRadio-root": {
                color: currentTheme === 'dark' ? '#4e4d5d' : 'rgba(0, 0, 0, 0.54)',
            },
            "& .MuiRadio-colorPrimary.Mui-checked": {
                color: '#3f51b5',
            },
            "& .MuiFormControlLabel-root": {
                width: width === 'xs' ? '100%' : ''
            }
        }
    }));
    const classes = useStyles();

    const myHistory = useHistory();

    const redirectPr = () => {
        myHistory.push('/dashboard/products')
    }

    useEffect(() => {
        if (!idUrlSt) {
            myHistory.push('/dashboard/products')
        }
    }, [])

    const createShortener = (e) => {
        setLoading(true);

        const name = document.getElementById('name').value;
        const idn = document.getElementById('idn').value;
        const keyP = document.getElementById('keyP').value;
        const subId = document.getElementById('subId').value;
        const url = document.getElementById('url').value;

        var urlencoded = new URLSearchParams();
        urlencoded.append('productId', idUrlSt);
        urlencoded.append('campaignSource', value ? value : myVal);
        urlencoded.append('campaignName', name);
        urlencoded.append('pixelIdentifier', idn);
        urlencoded.append('pixelValue', keyP);
        urlencoded.append('subId', subId);
        urlencoded.append('trafficBackUrl', url);
        urlencoded.append('trafficBackValue', switchSt ? 1 : 0);

        fetch('https://secure.platinumpay.cc/v1/client/products/shorteners/createShortener', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            body: urlencoded
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data);
                setLoading(false);
                showMess('Ссылка создана');
                dispatch(setIdForUrl(idUrlSt));
                myHistory.push('/dashboard/products/shorteners');
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                showMess('Ошибка');
            });




    }

    const editVal = (e) => {
        // console.log(e.target.value);
        setValue(e.target.value);
        setMyVal('');
    }


    const handleSwitch = () => {
        setSwitchSt(!switchSt);
    }

    return (
        <>
            <Panel></Panel>
            {width === 'xs' ?

                <IconButton
                    onClick={redirectPr}
                    style={{
                        position: 'fixed',
                        top: '85px',
                        right: '15px',
                        zIndex: '100'
                    }}
                >
                    <ArrowBackIcon
                        style={{
                            color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                        }}
                    >

                    </ArrowBackIcon>
                </IconButton>
                :
                <Button
                    onClick={redirectPr}
                    style={{
                        position: 'fixed',
                        top: '90px',
                        right: '15px',
                        color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                        zIndex: '100'
                    }}
                >
                    Вернуться назад
            </Button>}
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
                <Box
                    className='animate__animated animate__fadeIn'
                    style={{
                        position: 'absolute',
                        top: '0px',
                        left: '0px',
                        right: '0xp',
                        bottom: '0px',
                        width: width === 'xs' ? 'calc(100vw - 77px)' : 'calc(100vw - 167px)',
                        paddingTop: '90px',
                        paddingLeft: width === 'xs' ? '15px' : '105px',
                        backgroundColor: currentTheme === 'light' ? 'white' : 'rgb(20, 19, 34)',
                        zIndex: '9',
                        textAlign: width === 'xs' ? 'center' : '',
                        display: 'flex',
                        justifyContent: 'flex-start'
                    }}
                >
                    <Box
                        style={{
                            width: '100%',
                            maxWidth: '700px',
                            textAlign: 'start'
                        }}
                    >
                        <Box
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: width === 'xs' ? 'center' : 'flex-start'
                            }}
                        >
                            <Typography
                                variant='h5'
                                style={{
                                    color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                                    margin: '0px'
                                }}
                            >
                                Создать ссылку
                </Typography>
                        </Box>
                        <FormControl component="fieldset"
                            className={classes.source}
                        >
                            <RadioGroup aria-label="source1" name="source1" row value={value}>
                                <FormControlLabel value="" onChange={(e) => editVal(e)} control={<Radio color="primary" />} label="Свои значения" />
                                <FormControlLabel value="google" onChange={(e) => editVal(e)} control={<Radio color="primary" />} label="Google Adwords" />
                                <FormControlLabel value="yandex" onChange={(e) => editVal(e)} control={<Radio color="primary" />} label="Яндекс.Директ" />
                                <FormControlLabel value="vk" onChange={(e) => editVal(e)} control={<Radio color="primary" />} label="Вконтакте" />
                                <FormControlLabel value="facebook" onChange={(e) => editVal(e)} control={<Radio color="primary" />} label="Facebook" />
                                <FormControlLabel value="instagram" onChange={(e) => editVal(e)} control={<Radio color="primary" />} label="Instagram" />
                                <FormControlLabel value="youtube" onChange={(e) => editVal(e)} control={<Radio color="primary" />} label="YouTube" />
                                <FormControlLabel value="mycom" onChange={(e) => editVal(e)} control={<Radio color="primary" />} label="Target My.com" />
                            </RadioGroup>
                        </FormControl>

                        <Typography
                            variant='h5'
                            style={{
                                color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                                margin: '25px 0px 20px 0px'
                            }}
                        >
                            Настройка кампании
                         </Typography>


                        <Typography
                            style={{
                                color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                                margin: '0px 0px 0px 0px'
                            }}
                            variant='h7'
                        >
                            Источник кампании
                         </Typography>
                        {currentTheme === 'dark' ?
                            <CssTextField
                                id="source"
                                placeholder="google, yandex, vk, facebook"
                                required
                                onChange={value ? null : (e) => setMyVal(e.target.value)}
                                value={value ? value : myVal}
                                style={{
                                    margin: '6px 0px 25px 0px',
                                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                    width: '100%'
                                }}
                            />
                            :
                            <CssTextField2
                                id="source"
                                placeholder="google, yandex, vk, facebook"
                                required
                                onChange={value ? null : (e) => setMyVal(e.target.value)}
                                value={value ? value : myVal}
                                style={{
                                    margin: '6px 0px 25px 0px',
                                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                    width: '100%',
                                    border: '1px solid #e4e9f0'
                                }}
                            />}

                        <Typography
                            style={{
                                color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                                margin: '0px 0px 0px 0px'
                            }}
                            variant='h7'
                        >
                            Название кампании
                         </Typography>
                        {currentTheme === 'dark' ?
                            <CssTextField
                                id="name"
                                placeholder="promo, discount, sale"
                                required
                                style={{
                                    margin: '6px 0px 25px 0px',
                                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                    width: '100%'
                                }}
                            />
                            :
                            <CssTextField2
                                id="name"
                                placeholder="promo, discount, sale"
                                required
                                style={{
                                    margin: '6px 0px 25px 0px',
                                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                    width: '100%',
                                    border: '1px solid #e4e9f0'
                                }}
                            />}

                        <Typography
                            variant='h5'
                            style={{
                                color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                                margin: '5px 0px 20px 0px'
                            }}
                        >
                            Настройка пикселя
                         </Typography>


                        <Typography
                            style={{
                                color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                                margin: '0px 0px 0px 0px'
                            }}
                            variant='h7'
                        >
                            Идентификатор параметра
                         </Typography>
                        {currentTheme === 'dark' ?
                            <CssTextField
                                id="idn"
                                placeholder="fbpix"
                                required
                                style={{
                                    margin: '6px 0px 25px 0px',
                                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                    width: '100%'
                                }}
                            />
                            :
                            <CssTextField2
                                id="idn"
                                placeholder="fbpix"
                                required
                                style={{
                                    margin: '6px 0px 25px 0px',
                                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                    width: '100%',
                                    border: '1px solid #e4e9f0'
                                }}
                            />}
                        <Typography
                            style={{
                                color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                                margin: '0px 0px 0px 0px'
                            }}
                            variant='h7'
                        >
                            Значение параметра
                         </Typography>
                        {currentTheme === 'dark' ?
                            <CssTextField
                                id="keyP"
                                placeholder=""
                                required
                                style={{
                                    margin: '6px 0px 25px 0px',
                                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                    width: '100%'
                                }}
                            />
                            :
                            <CssTextField2
                                id="keyP"
                                placeholder=""
                                required
                                style={{
                                    margin: '6px 0px 25px 0px',
                                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                    width: '100%',
                                    border: '1px solid #e4e9f0'
                                }}
                            />}


                        <Typography
                            variant='h5'
                            style={{
                                color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                                margin: '5px 0px 25px 0px'
                            }}
                        >
                            Настройка суб-аккаунта
                         </Typography>


                        <Typography
                            style={{
                                color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                                margin: '0px 0px 0px 0px'
                            }}
                            variant='h7'
                        >
                            Значение параметра
                         </Typography>
                        {currentTheme === 'dark' ?
                            <CssTextField
                                id="subId"
                                placeholder=""
                                required
                                style={{
                                    margin: '6px 0px 25px 0px',
                                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                    width: '100%'
                                }}
                            />
                            :
                            <CssTextField2
                                id="subId"
                                placeholder=""
                                required
                                style={{
                                    margin: '6px 0px 25px 0px',
                                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                    width: '100%',
                                    border: '1px solid #e4e9f0'
                                }}
                            />}

                        <Typography
                            variant='h5'
                            style={{
                                color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                                margin: '5px 0px 25px 0px'
                            }}
                        >
                            Настройка трафик-бэк
                         </Typography>


                        <Typography
                            style={{
                                color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                                margin: '0px 0px 0px 0px'
                            }}
                            variant='h7'
                        >
                            URL
                         </Typography>
                        {currentTheme === 'dark' ?
                            <CssTextField
                                id="url"
                                placeholder="URL"
                                required
                                style={{
                                    margin: '6px 0px 15px 0px',
                                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                    width: '100%'
                                }}
                            />
                            :
                            <CssTextField2
                                id="url"
                                placeholder="URL"
                                required
                                style={{
                                    margin: '6px 0px 15px 0px',
                                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                    width: '100%',
                                    border: '1px solid #e4e9f0'
                                }}
                            />}
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
                                            onChange={handleSwitch}
                                            color="primary"
                                            name="checkedB"
                                            inputProps={{ role: 'switch' }}
                                        />
                                    }
                                    label="TrafficBack"
                                    labelPlacement="right"
                                    style={{
                                        color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                                    }}
                                />
                            </FormGroup>
                        </FormControl>

                        <Box
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                flexDirection: width === 'xs' ? 'column' : 'row',
                                paddingBottom: '20px'
                            }}
                        >
                            <Button
                                className={classes.butt}
                                onClick={createShortener}
                                variant="contained"
                                style={{
                                    color: 'white',
                                    backgroundColor: 'rgb(75, 124, 243)',
                                    margin: width === 'xs' ? '10px 0px 7px 0px' : '10px 25px 7px 0px',
                                    borderRadius: '2px',
                                    fontSize: '15px',
                                    height: '45px',
                                    width: width === 'xs' ? '100%' : '50%',
                                    maxWidth: width === 'xs' ? '170px' : width === 'sm' ? '200px' : '250px',
                                    border: '0px',
                                    alignSelf: 'left',

                                }}

                            >
                                Подтвердить
          </Button>
                            {/* <Button
                                className={classes.butt}
                                variant="contained"
                                onClick={redirectPr}
                                style={{
                                    color: 'white',
                                    backgroundColor: '#525252',
                                    margin: width === 'xs' ? '10px 0px 30px 0px' : '10px 25px 30px 0px',
                                    borderRadius: '2px',
                                    fontSize: '15px',
                                    height: '45px',
                                    width: width === 'xs' ? '100%' : '50%',
                                    maxWidth: width === 'xs' ? '170px' : width === 'sm' ? '200px' : '250px',
                                    border: '0px',
                                    alignSelf: 'left',
                                    boxShadow: 'none',
                                }}

                            >
                                Отменить
          </Button> */}
                        </Box>

                    </Box>
                </Box>
            }
        </>

    );
};

export default withWidth()(CreateURL);