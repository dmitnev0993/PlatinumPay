import React, { useContext, useEffect, useState } from "react";
import withWidth from "@material-ui/core/withWidth";
import { makeStyles, Typography, Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Button, ClickAwayListener, Grow, Icon, InputBase, InputLabel, MenuItem, MenuList, NativeSelect, Paper, Popper, Switch, Tab, Tabs, TextField, withStyles, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, FormControl } from "@material-ui/core";
import { ThemeContext } from "../../../context/themeContext";
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import { Visibility, VisibilityOff, People, Close } from '@material-ui/icons';
import ReplayIcon from '@material-ui/icons/Replay';
import DeleteIcon from '@material-ui/icons/Delete';
import Cookies from 'js-cookie';
import SearchIcon from '@material-ui/icons/Search';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Selectrix from 'react-selectrix';
import Snackbar from 'node-snackbar';

const showMess = (message) => {
    Snackbar.show({
        actionTextColor: '#7575a3',
        text: message,
        actionText: 'ОК',
        pos: 'bottom-right'
    });
}

const UrlsTable = ({ width, data, setData, setLoading, shortId, setShortId, subId, setSubId, pageState, handleShorteners }) => {
    const dispatch = useDispatch();
    const { currentTheme } = useContext(ThemeContext);
    const [state, setState] = useState([]);
    const [vis, setVis] = useState(false);
    const [open, setOpen] = useState(false);
    const [iState, setIState] = useState(null);
    const idUrl = useSelector(state => state.idForUrl);
    const [idUrlSt, setIdUrlSt] = useState(idUrl);

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
                width: '160px',
                minWidth: '160px',
                maxWidth: '160px',
                fontSize: '18px',
                color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                borderColor: currentTheme === 'dark' ? 'rgb(20, 28, 34)' : ''
            },
            "& .MuiTableCell-body": {
                width: '160px',
                minWidth: '160px',
                maxWidth: '160px',
                fontSize: '16px',
                border: 'none',
                color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                //wordBreak: 'break-all',
                // overflow: 'hidden',
            },
        },
        text: {
            margin: '0px 5px',
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottom: '1px solid #7575a3',
            },
            "& .MuiInputBase-input": {
                color: currentTheme === 'dark' ? '#aeaee0' : 'black',
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
                console.log(data);
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
                showMess('Ошибка!');
            })
    }

    const columns = [
        { field: 'name', headerName: 'Имя пользователя', width: 210 },
        { field: 'deductions', headerName: 'Отчисления', width: 150 },
        { field: 'date', headerName: 'Дата', width: 140 },
        { field: 'time', headerName: 'Время', width: 140 },
        // {
        //     field: 'age',
        //     headerName: 'Age',
        //     type: 'number',
        //     width: 90,
        // },
        // {
        //     field: 'fullName',
        //     headerName: 'Full name',
        //     description: 'This column has a value getter and is not sortable.',
        //     sortable: false,
        //     width: 230,
        //     valueGetter: (params) =>
        //         `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
        // },
    ];
    console.log(data)
    let rows = data.arr.length > 0 ? data.arr.map((it, i) => {
        return {
            url: it.trafficBackUrl,
            value: it.trafficBackValue,
            subId: it.subId,
            status: it.status,
            ind: it.pixelIdentifier,
            pixelV: it.pixelValue,
            date: it.date,
            time: it.time,
        }
    }) : { id: 1, name: '', deductions: '', date: 0, time: 0 };
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
    useEffect(() => { console.log(state); }, [state])

    const classes = useStyles();

    const startEdit = (i) => {
        console.log('start', i);
        const arr = state.map((it) => ({ ...it }));
        arr[i].edit = true;
        setState(arr);
    };

    const completeEdit = (i) => {
        console.log('com', i);
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

    useEffect(() => { console.log(vis) }, [vis])

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
        urlencoded.append('trafficBackValue', state[i].trafficBackValue);
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
                console.log(data);
            })
            .catch(err => {
                console.log(err);
                showMess('Ошибка!');
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
                console.log(dataRes, data);
                const arr = data.arr.map(it => ({ ...it }));
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].shortId === dataRes.response.shortId) {
                        console.log('BAX');
                        arr.splice(i, 1);
                    }
                }
                console.log(arr);
                setData({
                    ...data,
                    arr: arr
                });
                showMess('Ссылка удалена');
            })
            .catch(err => {
                console.log(err);
                showMess('Ошибка!');
            })
    }

    return (
        <>
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
                        flexDirection: width === 'xs' ? 'column' : 'row'
                    }}
                >
                    <Box
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            margin: '0px 0px 10px 0px',
                            alignItems: 'center',
                            width: '44%'
                        }}
                    >
                        <Typography variant={width === 'xs' ? 'h6' : 'h5'}
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
                            width: width === 'xs' ? '100%' : '55%',
                            display: 'flex',
                            justifyContent: width === 'xs' ? 'center' : 'flex-end',
                            height: '47px',
                            alignItems: 'center'
                        }}
                    >
                        <TextField
                            placeholder='shortId'
                            className={classes.text}
                            defaultValue={shortId ? shortId : undefined}
                            onBlur={(e) => { setShortId(e.target.value) }}
                        >

                        </TextField>

                        <TextField
                            placeholder='subId'
                            className={classes.text}
                            defaultValue={subId ? subId : undefined}
                            onBlur={(e) => { setSubId(e.target.value) }}
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

                        {/* <FormControl
                        className={classes.input}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                           // width: width === 'xs' ? '100%' : '45%',
                            maxWidth: '150px',
                            width:'100%',
                            height: '45px'
                        }}
                    >
                        <Selectrix
                            materialize={true}
                            searchable={false}
                            className={classes.select}
                            placeholder='Все'
                            options={
                                    [
                                        { key: '0', label: '0' },
                                        { key: '1', label: '1' },
                                        { key: '2', label: '2' }
                                    ]
                            }
                        >

                        </Selectrix>
                    </FormControl> */}
                    </Box>

                </Box>


                <TableContainer className={classes.table} component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">URL</TableCell>
                                <TableCell align="left">TrafficBack</TableCell>
                                <TableCell align="left">SubId</TableCell>
                                <TableCell align="left">pixelIdentifier</TableCell>
                                <TableCell align="left">pixelValue</TableCell>
                                <TableCell align="left">Дата</TableCell>
                                <TableCell align="left">Время</TableCell>
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
                                                    state[i].trafficBackUrl
                                                :
                                                row.trafficBackUrl
                                        }
                                    </TableCell>
                                    <TableCell align="left">
                                        {
                                            state[i] ?
                                                state[i].edit ?
                                                    <TextField
                                                        className={classes.text}
                                                        defaultValue={state[i].trafficBackValue}
                                                        onChange={minmaxTrafficBack}
                                                        onBlur={(e) => { editShortener(e, i, 'trafficBackValue') }}
                                                    >

                                                    </TextField>
                                                    :
                                                    state[i].trafficBackValue
                                                :
                                                row.trafficBackValue
                                        }
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.subId}
                                    </TableCell>
                                    <TableCell align="left">
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
                                                    state[i].pixelIdentifier
                                                :
                                                row.pixelIdentifier
                                        }
                                    </TableCell>
                                    <TableCell align="left">
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
                                                    state[i].pixelValue
                                                :
                                                row.pixelValue
                                        }
                                    </TableCell>
                                    <TableCell align="left">{row.date}</TableCell>
                                    <TableCell align="left">{row.time}</TableCell>
                                    <TableCell align="left">
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
            </Box>

        </>
    );
};

export default withWidth()(UrlsTable);