import React, { useContext, useEffect, useState } from "react";
import withWidth from "@material-ui/core/withWidth";
import { useHistory } from "react-router-dom";
import { makeStyles, Typography, Box, Button, Paper, Switch, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, FormControl, FormGroup, FormControlLabel } from "@material-ui/core";
import { ThemeContext } from "../../../context/themeContext";
import { useSelector } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import { CircleSpinner } from "react-spinners-kit";
import DoneIcon from '@material-ui/icons/Done';
import ReplayIcon from '@material-ui/icons/Replay';
import DeleteIcon from '@material-ui/icons/Delete';
import Cookies from 'js-cookie';
import SearchIcon from '@material-ui/icons/Search';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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

let myId = null;

const UrlsTable = ({ width, data, setData, loading, setLoading, shortId, setShortId, subId, setSubId, sourceSt, setSourceSt, nameSt, setNameSt, pageState, handleShorteners }) => {
    const { currentTheme } = useContext(ThemeContext);
    const [state, setState] = useState([]);
    const [open, setOpen] = useState(false);
    const [iState, setIState] = useState(null);
    const idUrl = useSelector(state => state.idForUrl);
    if (idUrl) myId = idUrl;
    const [idUrlSt, setIdUrlSt] = useState(myId);
    const arr = [];
    for (let i of data.response.data) {
        arr.push(i.trafficBackValue);
    };
    const [hide, setHide] = useState(arr);
    const myHistory = useHistory();

    const useStyles = makeStyles((theme) => ({
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
        table: {
            height: 'fit-content',
            width: '100%',
            padding: '0px',
            backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',


            "&.MuiPaper-elevation1": {
                boxShadow: 'none',
                padding: '10px 0px',
            },
            "&.MuiPaper-elevation1::-webkit-scrollbar": {
                height: '12px',
                width: '12px',
                backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
            },
            "&.MuiPaper-elevation1::-webkit-scrollbar-thumb": {
                backgroundColor: currentTheme === 'dark' ? '#2b2a38' : '#c8c4db',
            },
            "& .MuiTableCell-head": {
                width: '210px',
                display: 'flex',
                justifyContent: 'flex-start',
                fontSize: '18px',
                color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                borderColor: currentTheme === 'dark' ? 'rgb(20, 28, 34)' : ''
            },
            "& .MuiTableRow-root": {
                display: 'flex',
                justifyContent: 'flex-start',
            },
            "& .MuiTableCell-body": {
                width: '210px',
                fontSize: '16px',
                border: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',

                color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                // wordBreak: 'keep-all',
                // overflow: 'hidden',
            },
        },
        text: {
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottom: '1px solid #7575a3',
            },
            "& .MuiInputBase-input": {
                color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                paddingTop: '0px',
                paddingBottom: '3px'
            },
            '& .MuiInput-underline:before': {

                borderBottomColor: '#7575a3',
            },
        },
        dialog: {
            '& .MuiDialog-paper': {
                backgroundColor: currentTheme === 'dark' ? '#424242' : '',
                color: currentTheme === 'dark' ? 'white' : '',
            },
            "& .MuiDialogContentText-root": {
                color: currentTheme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '',
            }
        },
        box2in: {
            overflowX: 'hidden',
            height: '50px',
            alignItems: 'flex-end!important'
        },
        box2in2: {
            overflowX: 'hidden',
            height: '50px',
            alignItems: 'flex-start',
        },
        fcont: {
            "& .MuiFormControlLabel-root": {
                // display:'flex',
                // justifyContent:'flex-start',
                // alignItems:'flex-start'
                position: 'relative'
            },
            "& .MuiSwitch-root": {
                position: 'absolute',
                top: '-18px',
                left: '0px'
            }
        }
    }));

    const reloadShorteners = () => {
        setLoading(true);
        var urlencoded = new URLSearchParams();
        urlencoded.append('productId', idUrlSt);
        urlencoded.append('page', pageState);
        fetch('https://secure.platinumpay.cc/v1/client/products/shorteners/getShorteners', {
            method: 'POST', headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
            body: urlencoded
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                //  console.log(data);
                if (data.response.count) {
                    setData({
                        ...data,
                        arr: data.response.data,
                        pages: data.response.pages
                    });
                }
                else {
                    return;
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
                showMess('Ошибка');
            })
    }

    useEffect(() => {
        const arr = [];
        if (data.arr.length) {
            for (let it of data.arr) {
                arr.push({
                    trafficBackUrl: it.trafficBackUrl,
                    trafficBackValue: it.trafficBackValue,
                    subId: it.subId,
                    shortId: it.shortId,
                    pixelIdentifier: it.pixelIdentifier,
                    pixelValue: it.pixelValue,
                    edit: false
                })
            }

            setState(arr);

        }
    }, [data.arr])
    // useEffect(() => { console.log(state); }, [state])

    const classes = useStyles();

    const startEdit = (i) => {
        // console.log('start', i);
        const arr = state.map((it) => ({ ...it }));
        arr[i].edit = true;
        setState(arr);
    };

    const completeEdit = (i) => {
        // console.log('com', i);
        const arr = state.map((it) => ({ ...it }));
        arr[i].edit = false;
        setState(arr);
    };

    const minmaxTrafficBack = (e) => {
        if (+e.target.value > 1) {
            e.target.value = 1;
        }
        if (+e.target.value < 0) {
            e.target.value = 0;
        }
    }

    const editShortener = (e, i, param) => {
        const arr = state.map((it) => ({ ...it }));
        arr[i][param] = e.target.value;
        setState(arr);
    }

    // useEffect(() => { console.log(vis) }, [vis])

    const handleClose = () => {
        setOpen(false);
    };

    const editShorteners = (i) => {

        var urlencoded = new URLSearchParams();
        urlencoded.append('productId', idUrlSt);
        urlencoded.append('shortId', state[i].shortId);
        urlencoded.append('pixelIdentifier', state[i].pixelIdentifier);
        urlencoded.append('pixelValue', state[i].pixelValue);
        urlencoded.append('trafficBackUrl', state[i].trafficBackUrl);
        urlencoded.append('trafficBackValue', hide[i]);
        fetch('https://secure.platinumpay.cc/v1/client/products/shorteners/editShortener', {
            method: 'POST', headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
            body: urlencoded
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                //  console.log(data);
            })
            .catch(err => {
                console.log(err);
                showMess('Ошибка');
            })
    }

    const deleteShortener = (i) => {
        var urlencoded = new URLSearchParams();
        urlencoded.append('productId', idUrlSt);
        urlencoded.append('shortId', state[i].shortId);
        fetch('https://secure.platinumpay.cc/v1/client/products/shorteners/deleteShortener', {
            method: 'POST', headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
            body: urlencoded
        })
            .then(res => {
                return res.json();
            })
            .then(dataRes => {
                //(dataRes, data);
                const arr = data.arr.map(it => ({ ...it }));
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].shortId === dataRes.response.shortId) {
                        // console.log('BAX');
                        arr.splice(i, 1);
                    }
                }
                // console.log(arr);
                setData({
                    ...data,
                    arr: arr
                });
                showMess('Ссылка удалена');
            })
            .catch(err => {
                console.log(err);
                showMess('Ошибка');
            })
    }

    const handleHide = (i, e) => {
        // console.log(e.target.checked);
        let arr = hide.map((it) => (it));
        arr[i] = e.target.checked ? 1 : 0;
        setHide(arr);
    }

    const redirectPr = () => {
        myHistory.push('/dashboard/products')
    }

    return (
        <>
            {width === 'xs' ?

                <IconButton
                    onClick={redirectPr}
                    style={{
                        position: 'fixed',
                        top: '93px',
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
                        top: '100px',
                        right: '15px',
                        color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                        zIndex: '100'
                    }}
                >
                    Вернуться назад
            </Button>
            }
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                className={classes.dialog}
            >
                <DialogTitle id="responsive-dialog-title">{"Вы действительно хотите удалить ссылку?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Подтвердите, что вы действительно хотите удалить ссылку, еще раз нажав кнопку Подтвердить
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => {
                        deleteShortener(iState);
                        handleClose();
                    }}
                        style={{
                            color: '#2196f3'
                        }}
                    >
                        Подтвердить
          </Button>
                    <Button onClick={handleClose} color="secondary" autoFocus
                        style={{
                            color: '#2196f3'
                        }}
                    >
                        Отменить
          </Button>
                </DialogActions>
            </Dialog>
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItem: 'center',
                    width: '100%'
                }}
            >
                <Box
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: width === 'xs' ? 'flex-start' : 'space-around',
                        flexDirection: 'column'
                    }}
                >
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
                            Мои ссылки
                    </Typography>
                        <IconButton
                            onClick={reloadShorteners}
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
                            marginBottom: '15px',
                            display: 'flex',
                            justifyContent: width === 'xs' ? 'center' : 'flex-start',
                            height: '47px',
                            alignItems: 'center',
                            width: '100%'
                        }}
                    >

                        <TextField
                            placeholder='Источник кампании '
                            className={classes.text}
                            defaultValue={sourceSt ? sourceSt : undefined}
                            onBlur={(e) => { setSourceSt(e.target.value) }}
                            style={{
                                margin: '0px 5px 0px 0px'
                            }}
                        >

                        </TextField>

                        <TextField
                            placeholder='Название кампании'
                            className={classes.text}
                            defaultValue={nameSt ? nameSt : undefined}
                            onBlur={(e) => { setNameSt(e.target.value) }}
                            style={{
                                margin: '0px 5px'
                            }}
                        >

                        </TextField>




                        {/* <IconButton
                            onClick={handleShorteners}
                            style={{
                                marginTop: '7px'
                            }}
                        >
                            <SearchIcon
                                style={{
                                    color: currentTheme === 'dark' ? 'rgb(117, 117, 163)' : '',
                                    fontSize: '17px'
                                }}
                            >

                            </SearchIcon>
                        </IconButton> */}

                    </Box>

                    <Box
                        style={{
                            marginBottom: '15px',
                            display: 'flex',
                            justifyContent: width === 'xs' ? 'center' : 'flex-start',
                            height: '47px',
                            alignItems: 'center',
                            width: '100%'
                        }}
                    >

                        <TextField
                            placeholder='shortId'
                            className={classes.text}
                            defaultValue={shortId ? shortId : undefined}
                            onBlur={(e) => { setShortId(e.target.value) }}
                            style={{
                                margin: '0px 5px 0px 0px'
                            }}
                        >

                        </TextField>

                        <TextField
                            placeholder='subId'
                            className={classes.text}
                            defaultValue={subId ? subId : undefined}
                            onBlur={(e) => { setSubId(e.target.value) }}
                            style={{
                                margin: '0px 5px'
                            }}
                        >

                        </TextField>


                        <IconButton
                            onClick={handleShorteners}
                            style={{
                                marginTop: '7px'
                            }}
                        >
                            <SearchIcon
                                style={{
                                    color: currentTheme === 'dark' ? 'rgb(117, 117, 163)' : '',
                                    fontSize: '17px'
                                }}
                            >

                            </SearchIcon>
                        </IconButton>

                    </Box>

                </Box>

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
                <TableContainer className={classes.table} component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Источник кампании</TableCell>
                                <TableCell align="left">Название кампании</TableCell>
                                <TableCell align="left"
                                    style={{
                                        width: '410px'
                                    }}>
                                    Настройка пикселя
                                    </TableCell>
                                <TableCell align="left">Настройка суб-аккаунта</TableCell>
                                <TableCell align="left"
                                    style={{
                                        width: '480px'
                                    }}
                                >Настройка трафик-бэк
                                </TableCell>
                                <TableCell align="left"
                                    style={{
                                        width: '160px'
                                    }}
                                >Дата</TableCell>
                                <TableCell align="left"
                                    style={{
                                        width: '160px'
                                    }}
                                >Время</TableCell>
                                <TableCell align="left"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.arr.map((row, i) => (
                                <TableRow key={row.id}>
                                    {/* 
            url: it.trafficBackUrl,
            value: it.trafficBackValue,
            subId: it.subId,
            status: it.status,
            ind: it.pixelIdentifier,
            pixelV: it.pixelValue,
            date: it.date,
            time: it.time, 
            */}
                                    <TableCell align="left">
                                        {row.campaignSource ? row.campaignSource : 'Не найден'}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.campaignName ? row.campaignName : 'Не найден'}
                                    </TableCell>
                                    <TableCell align="left"
                                        style={{
                                            width: '410px'
                                        }}
                                    >
                                        <Box
                                            className={classes.box2in}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                width: '59%',
                                                flexWrap: 'wrap',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Typography
                                                style={{

                                                    width: '100%',
                                                    color: currentTheme === 'dark' ? '#575770' : 'rgb(128, 128, 128)'
                                                }}
                                            >
                                                Идентификатор параметра
                                        </Typography>
                                            {

                                                state[i] ?
                                                    state[i].edit ?
                                                        <TextField
                                                            className={classes.text}
                                                            defaultValue={state[i].pixelIdentifier}
                                                            onBlur={(e) => { editShortener(e, i, 'pixelIdentifier') }}
                                                        >

                                                        </TextField>
                                                        :
                                                        state[i].pixelIdentifier ? state[i].pixelIdentifier : 'Не найден'
                                                    :
                                                    row.pixelIdentifier ? row.pixelIdentifier : 'Не найден'

                                            }
                                        </Box>
                                        <Box
                                            className={classes.box2in}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                width: '40%',
                                                flexWrap: 'wrap',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Typography
                                                style={{

                                                    width: '100%',
                                                    color: currentTheme === 'dark' ? '#575770' : 'rgb(128, 128, 128)'
                                                }}
                                            >
                                                Значение параметра
                                        </Typography>
                                            {

                                                state[i] ?
                                                    state[i].edit ?
                                                        <TextField
                                                            className={classes.text}
                                                            defaultValue={state[i].pixelValue}
                                                            onBlur={(e) => { editShortener(e, i, 'pixelValue') }}
                                                        >

                                                        </TextField>
                                                        :
                                                        state[i].pixelValue ? state[i].pixelValue : 'Не найден'
                                                    :
                                                    row.pixelValue ? row.pixelValue : 'Не найден'

                                            }
                                        </Box>
                                    </TableCell>
                                    <TableCell align="left"
                                    >
                                        <Box
                                            className={classes.box2in}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                width: '100%',
                                                flexWrap: 'wrap',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Typography
                                                style={{

                                                    width: '100%',
                                                    color: currentTheme === 'dark' ? '#575770' : 'rgb(128, 128, 128)'
                                                }}
                                            >
                                                Значение параметра
                                        </Typography>
                                            {row.subId ? row.subId : 'Не найден'}
                                        </Box>
                                    </TableCell>
                                    <TableCell align="left"
                                        style={{
                                            width: '480px'
                                        }}
                                    >
                                        <Box
                                            className={classes.box2in}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                flexWrap: 'wrap',
                                                width: '69%',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Typography
                                                style={{

                                                    width: '100%',
                                                    color: currentTheme === 'dark' ? '#575770' : 'rgb(128, 128, 128)'
                                                }}
                                            >
                                                URL
                                        </Typography>
                                            {

                                                state[i] ?
                                                    state[i].edit ?
                                                        <TextField
                                                            className={classes.text}
                                                            defaultValue={state[i].trafficBackUrl}
                                                            onBlur={(e) => { editShortener(e, i, 'trafficBackUrl') }}
                                                        >

                                                        </TextField>
                                                        :
                                                        state[i].trafficBackUrl ? state[i].trafficBackUrl : 'Не найден'
                                                    :
                                                    row.trafficBackUrl ? row.trafficBackUrl : 'Не найден'

                                            }
                                        </Box>
                                        <Box
                                            className={classes.box2in2}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                width: '29%',
                                                flexWrap: 'wrap',
                                                alignItems: 'flex-start',
                                                overflowX: 'visible',
                                                position: 'relative'
                                            }}
                                        >
                                            <Typography
                                                style={{
                                                    marginTop: '2px',
                                                    width: '100%',
                                                    color: currentTheme === 'dark' ? '#575770' : 'rgb(128, 128, 128)'
                                                }}
                                            >
                                                TrafficBack
                                        </Typography>
                                            <FormControl component="fieldset"
                                                className={classes.fcont}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    justifyContent: 'flex-end',
                                                    marginRight: width === 'xs' || width === 'sm' ? '0px' : '5px',
                                                }}>
                                                <FormGroup aria-label="position" row>
                                                    <FormControlLabel
                                                        value="trightop"
                                                        control={
                                                            <Switch
                                                                disabled={state[i] ? !state[i].edit : false}
                                                                checked={hide[i]}
                                                                onChange={(e) => { handleHide(i, e) }}
                                                                color="primary"
                                                                name="checkedB"
                                                                inputProps={{ role: 'switch' }}
                                                            />
                                                        }
                                                        style={{
                                                            color: currentTheme === 'dark' ? '#aeaee0' : 'black',

                                                        }}
                                                    />
                                                </FormGroup>
                                            </FormControl>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="left"
                                        style={{
                                            width: '160px'
                                        }}
                                    >{row.date}</TableCell>
                                    <TableCell align="left"
                                        style={{
                                            width: '160px'
                                        }}
                                    >{row.time}</TableCell>
                                    <TableCell align="left"
                                        style={{
                                            width: '160px',
                                            justifyContent: 'flex-start'
                                        }}
                                    >
                                        <IconButton
                                            onClick={state[i] ? state[i].edit ? () => {
                                                completeEdit(i);
                                                editShorteners(i);
                                            } : () => { startEdit(i) } : null}
                                        >
                                            {
                                                state[i] ? state[i].edit ?
                                                    <DoneIcon
                                                        style={{
                                                            color: currentTheme === 'dark' ? '#aeaee0' : 'black'
                                                        }}
                                                    >
                                                    </DoneIcon>
                                                    :
                                                    <EditIcon
                                                        style={{
                                                            color: currentTheme === 'dark' ? '#aeaee0' : 'black'
                                                        }}
                                                    >
                                                    </EditIcon>
                                                    :
                                                    null}
                                        </IconButton>
                                        <IconButton
                                            onClick={() => {
                                                setIState(i);
                                                setOpen(true);
                                            }}
                                        >
                                            <DeleteIcon

                                                style={{
                                                    color: currentTheme === 'dark' ? '#aeaee0' : 'black'
                                                }}
                                            >
                                            </DeleteIcon>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
}
            </Box>

        </>
    );
};

export default withWidth()(UrlsTable);