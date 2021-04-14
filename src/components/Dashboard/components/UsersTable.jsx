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

const UsersTable = ({ width, data, setData, setLoading, nameState, setNameState, levelState, setLevelState, pageState, handleUsers }) => {
    const dispatch = useDispatch();
    const { currentTheme } = useContext(ThemeContext);
    const [state, setState] = useState([]);
    const [vis, setVis] = useState(false);
    const idForRef = useSelector(state => state.idForRef);
    const pageForRef = useSelector(state => state.pageForRef);
    const [open, setOpen] = useState(false);
    const [idState, setIdState] = useState(null);

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

    const reloadUsers = () => {
        setLoading(true);
        var urlencoded = new URLSearchParams();
        urlencoded.append('page', pageState ? pageState : 1);
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
                console.log(err)
                setLoading(false);
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
            name: it.username,
            telegram: it.telegram,
            level: it.level,
            status: it.status,
            balance: it.balance,
            api: it.api,
            date: it.date,
            time: it.time,
        }
    }) : { id: 1, name: '', deductions: '', date: 0, time: 0 };
    useEffect(() => {
        const arr = [];
        if (data.arr.length) {
            for (let it of data.arr) {
                arr.push({
                    userId: it.userId,
                    name: it.username,
                    level: it.level,
                    balance: it.balance,
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

    const minmaxLevel = (e) => {
        if (+e.target.value > 2) {
            e.target.value = 2;
        }
        if (+e.target.value < 0) {
            e.target.value = 0;
        }
    }

    const editUser = (e, i, param) => {
        const arr = state.map((it) => ({ ...it }));
        arr[i][param] = e.target.value;
        setState(arr);
    }

    useEffect(() => { console.log(vis) }, [vis])

    const handleClose = () => {
        setOpen(false);
    };

    const editUsers = (i) => {

        var urlencoded = new URLSearchParams();
        urlencoded.append('userId', state[i].userId);
        urlencoded.append('username', state[i].name);
        urlencoded.append('level', state[i].level);
        urlencoded.append('balance', state[i].balance);
        fetch('https://secure.platinumpay.cc/v1/client/users/editUser', {
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
                console.log(err)
            })
    }

    const deleteUser = (id) => {
        var urlencoded = new URLSearchParams();
        urlencoded.append('userId', id);
        fetch('https://secure.platinumpay.cc/v1/client/users/deleteUser', {
            method: 'POST', headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
            body: urlencoded
        })
            .then(res => {
                return res.json();
            })
            .then(dataRes => {
                console.log(dataRes,data);
                const arr = data.arr.map(it=>({...it}));    
                for(let i = 0; i<arr.length;i++){
                    if(arr[i].userId === id){
                        console.log('BAX');
                        arr.splice(i,1);
                    }
                }
                console.log(arr);
                setData({
                    ...data,
                    arr:arr
                });
                showMess('Пользователь удален');
            })
            .catch(err => {
                console.log(err)
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
                <DialogTitle id="responsive-dialog-title">{"Вы действительно хотите удалить пользователя?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Подтвердите, что вы действительно хотите удалить пользователя, еще раз нажав кнопку Подтвердить
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => {
                        deleteUser(idState);
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
                            Пользователи
                    </Typography>
                        <IconButton
                            onClick={reloadUsers}
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
                            placeholder='Имя пользователя'
                            className={classes.text}
                            defaultValue={nameState ? nameState : undefined}
                            onBlur={(e) => { setNameState(e.target.value) }}
                        >

                        </TextField>

                        <TextField
                            onChange={minmaxLevel}
                            placeholder='Уровень'
                            className={classes.text}
                            defaultValue={levelState ? levelState : undefined}
                            onBlur={(e) => { setLevelState(e.target.value) }}
                        >

                        </TextField>

                        <IconButton
                            onClick={handleUsers}
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
                                <TableCell align="left">Имя пользователя</TableCell>
                                <TableCell align="left">Telegram</TableCell>
                                <TableCell align="left">Уровень</TableCell>
                                <TableCell align="left">Баланс</TableCell>
                                <TableCell align="left">Статус</TableCell>
                                <TableCell align="left">Ключ API
                                <IconButton
                                        onClick={() => { setVis(!vis) }}
                                    >
                                        {!vis ?
                                            <Visibility
                                                style={{
                                                    color: currentTheme === 'dark' ? 'rgb(117, 117, 163)' : '',
                                                    fontSize: '20px'
                                                }}
                                            ></Visibility>
                                            :
                                            <VisibilityOff
                                                style={{
                                                    color: currentTheme === 'dark' ? 'rgb(117, 117, 163)' : '',
                                                    fontSize: '20px'
                                                }}
                                            ></VisibilityOff>
                                        }
                                    </IconButton>
                                </TableCell>
                                <TableCell align="left">Дата</TableCell>
                                <TableCell align="left">Время</TableCell>
                                <TableCell align="left"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.arr.map((row, i) => (
                                <TableRow key={row.id}>
                                    {/* id: it.userId,
            name: it.username,
            telegram: it.telegram,
            level: it.level,
            status: it.status,
            balance: it.balance,
            api: it.api,
            trafficBack: it.trafficBack,
            trafficBackUrl: it.trafficBackUrl,
            date: it.date,
            time: it.time, */}
                                    <TableCell align="left">
                                        {
                                            state[i] ?
                                                state[i].edit ?
                                                    <TextField
                                                        className={classes.text}
                                                        defaultValue={state[i].name}
                                                        onBlur={(e) => { editUser(e, i, 'name') }}
                                                    >

                                                    </TextField>
                                                    :
                                                    state[i].name
                                                :
                                                row.username
                                        }
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.telegram}
                                    </TableCell>
                                    <TableCell align="left">
                                        {
                                            state[i] ?
                                                state[i].edit ?
                                                    <TextField
                                                        className={classes.text}
                                                        defaultValue={state[i].level}
                                                        onChange={minmaxLevel}
                                                        onBlur={(e) => { editUser(e, i, 'level') }}
                                                    >

                                                    </TextField>
                                                    :
                                                    state[i].level
                                                :
                                                row.level
                                        }
                                    </TableCell>
                                    <TableCell align="left">
                                        {
                                            state[i] ?
                                                state[i].edit ?
                                                    <TextField
                                                        className={classes.text}
                                                        defaultValue={state[i].balance}
                                                        onBlur={(e) => { editUser(e, i, 'balance') }}
                                                    >

                                                    </TextField>
                                                    :
                                                    state[i].balance + ' ₽'
                                                :
                                                row.balance + ' ₽'
                                        }
                                    </TableCell>
                                    <TableCell align="left">{row.status}</TableCell>
                                    <TableCell align="left"
                                        style={{
                                            wordBreak: vis ? 'break-all' : 'normal',
                                            overflow: vis ? 'visible' : 'hidden'
                                        }}>{vis ? row.api : '**********************'}</TableCell>
                                    <TableCell align="left">{row.date}</TableCell>
                                    <TableCell align="left">{row.time}</TableCell>
                                    <TableCell align="left">
                                        <IconButton
                                            onClick={state[i] ? state[i].edit ? () => {
                                                completeEdit(i);
                                                editUsers(i);
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
                                                setIdState(state[i].userId);
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

export default withWidth()(UsersTable);