import React, { useContext, useEffect, useState } from "react";
import withWidth from "@material-ui/core/withWidth";
import { makeStyles, Typography, Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Button, ClickAwayListener, Grow, Icon, InputBase, InputLabel, MenuItem, MenuList, NativeSelect, Paper, Popper, Switch, Tab, Tabs, TextField, withStyles, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, FormControl, FormGroup, FormControlLabel } from "@material-ui/core";
import { ThemeContext } from "../../../context/themeContext";
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ReplayIcon from '@material-ui/icons/Replay';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import Snackbar from 'node-snackbar';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Cookies from 'js-cookie';

const Referrals = ({ width, data, setData, setLoading, id, page }) => {
    const dispatch = useDispatch();
    const { currentTheme } = useContext(ThemeContext);
    const [state, setState] = useState([]);
    const idForRef = useSelector(state => state.idForRef);
    const pageForRef = useSelector(state => state.pageForRef);
    const [open, setOpen] = useState(false);
    const arr = [];
    for (let i of data.response.data) {
        arr.push(i.hide);
    };
    console.log(arr);
    const [hide, setHide] = useState(arr);
    const [idForDel, setIdForDel] = useState({
        userId: null,
        productId: null
    });

    const useStyles = makeStyles((theme) => ({
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
            }
        },
        text: {
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

    const showMess = (message) => {
        Snackbar.show({
            actionTextColor: '#7575a3',
            text: message,
            actionText: 'ОК',
            pos: 'bottom-right'
        });
    }

    const reloadRef = () => {
        setLoading(true);
        var urlencoded = new URLSearchParams();
        urlencoded.append('productId', id);
        urlencoded.append('page', page);
        fetch('https://secure.platinumpay.cc/v1/client/products/subscriptions/getSubscriptions', {
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
    }

    const editSubscription = (i) => {
        console.log('edit');
        var urlencoded = new URLSearchParams();
        urlencoded.append('userId', data.arr[i].userId);
        urlencoded.append('productId', id);
        urlencoded.append('deductions', state[i].val);
        urlencoded.append('hide', hide[i]);
        fetch('https://secure.platinumpay.cc/v1/client/products/subscriptions/editSubscription', {
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
            })
    }

    const deleteSubscription = () => {
        console.log('del');
        var urlencoded = new URLSearchParams();
        urlencoded.append('userId', idForDel.userId);
        urlencoded.append('productId', idForDel.productId);
        fetch('https://secure.platinumpay.cc/v1/client/products/subscriptions/deleteSubscription', {
            method: 'POST', headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
            body: urlencoded
        })
            .then(res => {
                return res.json();
            })
            .then(dataRes => {
                console.log(dataRes);
                setIdForDel({
                    userId: null,
                    productId: null
                });
                const arrD = data.arr.map((it) => ({ ...it }));
                console.log(arrD, data.arr);
                for (let i = 0; i < arrD.length; i++) {
                    if (arrD[i].userId === dataRes.response.userId) {
                        arrD.splice(i, 1);
                    }
                }
                setData({
                    ...data,
                    arr:arrD
                });
                showMess('Партнер удален');
            })
            .catch(err => {
                console.log(err);
                showMess('Ошибка!');
            })
    }

    console.log(data)
    let rows = data.arr.length > 0 ? data.arr.map((it, i) => {
        return {
            id: i + 1,
            name: it.username,
            deductions: it.deductions,
            date: it.date,
            time: it.time,
            hide: it.hide
        }
    }) : { id: 1, name: '', deductions: '', date: 0, time: 0 };
    useEffect(() => {
        const arr = [];
        if (data.arr.length) {
            for (let it of data.arr) {
                arr.push({
                    val: it.deductions,
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

    const changeDeductions = (e, i) => {
        if (e.target.value) {
            const arr = state.map((it) => ({ ...it }));
            arr[i].val = e.target.value;
            setState(arr);
        }

    }

    const minmax = (e) => {
        if (+e.target.value > 100) {
            e.target.value = 100;
        }
        if (+e.target.value < 0) {
            e.target.value = 0;
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleHide = (i, e) => {
        console.log(e.target.checked);
        let arr = hide.map((it) => (it));
        arr[i] = e.target.checked ? 1 : 0;
        setHide(arr);
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                className={classes.dialog}
            >
                <DialogTitle id="responsive-dialog-title">{"Вы действительно хотите удалить партнера?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Подтвердите, что вы действительно хотите удалить партнера, еще раз нажав кнопку Подтвердить
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => {
                        deleteSubscription();
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
                        display: 'flex',
                        justifyContent: 'flex-start',
                        margin: '0px 0px 20px 0px',
                        alignItems: 'center'
                    }}
                >
                    <Typography variant={width === 'xs' ? 'h6' : 'h5'}
                        style={{
                            color: currentTheme === 'dark' ? '#aeaee0' : 'black',

                            // borderBottom:'1px solid rgb(174, 174, 224)'
                        }}>
                        Мои партнеры
              </Typography>
                    <IconButton
                        onClick={reloadRef}
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

                {/* { field: 'name', headerName: 'Имя пользователя', width: 210 },
        { field: 'deductions', headerName: 'Отчисления', width: 150 },
        { field: 'date', headerName: 'Дата', width: 140 },
        { field: 'time', headerName: 'Время',  */}
                <TableContainer className={classes.table} component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Имя пользователя</TableCell>
                                <TableCell align="left">Отчисления</TableCell>
                                <TableCell align="left">Скрыть статистику</TableCell>
                                <TableCell align="left">Дата</TableCell>
                                <TableCell align="left">Время</TableCell>
                                <TableCell align="left"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, i) => (
                                <TableRow key={row.name}>
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="left">
                                        {
                                            state[i] ?
                                                state[i].edit ?
                                                    <TextField
                                                        className={classes.text}
                                                        defaultValue={state[i].val}
                                                        onChange={minmax}
                                                        onBlur={(e) => { changeDeductions(e, i) }}
                                                    >

                                                    </TextField>
                                                    :
                                                    state[i].val
                                                :
                                                row.deductions
                                        }
                                    </TableCell>
                                    <TableCell align="left">

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

                                    </TableCell>
                                    <TableCell align="left">{row.date}</TableCell>
                                    <TableCell align="left">{row.time}</TableCell>
                                    <TableCell align="left">
                                        <IconButton
                                            onClick={state[i] ? state[i].edit ? () => { completeEdit(i) } : () => { startEdit(i) } : null}
                                        >
                                            {
                                                state[i] ? state[i].edit ?
                                                    <DoneIcon
                                                        onClick={() => { editSubscription(i) }}
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
                                                setIdForDel({
                                                    userId: data.arr[i].userId,
                                                    productId: id
                                                }
                                                )
                                                setOpen(true)
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

export default withWidth()(Referrals);