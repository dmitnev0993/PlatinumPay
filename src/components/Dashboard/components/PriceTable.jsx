import React, { useContext, useEffect, useState } from "react";
import withWidth from "@material-ui/core/withWidth";
import { useHistory } from "react-router-dom";
import { makeStyles, Typography, Box, Button, Paper, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@material-ui/core";
import { ThemeContext } from "../../../context/themeContext";
import { useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ReplayIcon from '@material-ui/icons/Replay';
import Cookies from 'js-cookie';
import SearchIcon from '@material-ui/icons/Search';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Snackbar from 'node-snackbar';
import { CircleSpinner } from "react-spinners-kit";

const showMess = (message) => {
    Snackbar.show({
        actionTextColor: '#7575a3',
        text: message,
        actionText: 'ОК',
        pos: 'bottom-right'
    });
}

const PriceTable = ({ width, data, setData, setLoading, amountState, setAmountState, pageState, handlePrices, id, loading }) => {
    const dispatch = useDispatch();
    const { currentTheme } = useContext(ThemeContext);
    const [state, setState] = useState([]);
    const [vis, setVis] = useState(false);
    const [open, setOpen] = useState(false);
    const [idState, setIdState] = useState(null);
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

    const reloadPrices = () => {
        setLoading(true);
        var urlencoded = new URLSearchParams();
        urlencoded.append('productId', id);
        urlencoded.append('page', pageState ? pageState : 1);
        fetch('https://secure.platinumpay.cc/v1/client/products/prices/getPrices', {
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
                    priceId: it.priceId,
                    url: it.url,
                    path: it.path,
                    amount: it.amount,
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

    const editPrice = (e, i, param) => {
        const arr = state.map((it) => ({ ...it }));
        arr[i][param] = e.target.value;
        setState(arr);
    }

    useEffect(() => { console.log(vis) }, [vis])

    const handleClose = () => {
        setOpen(false);
    };

    const editPrices = (i) => {

        var urlencoded = new URLSearchParams();
        urlencoded.append('productId', id);
        urlencoded.append('priceId', state[i].priceId);
        urlencoded.append('amount', state[i].amount);
        urlencoded.append('path', state[i].path);
        fetch('https://secure.platinumpay.cc/v1/client/products/prices/editPrice', {
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

    const deletePrice = (idPr) => {
        var urlencoded = new URLSearchParams();
        urlencoded.append('productId', id);
        urlencoded.append('priceId', idPr);
        fetch('https://secure.platinumpay.cc/v1/client/products/prices/deletePrice', {
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
                    if (arr[i].priceId === idState) {
                        console.log('BAX');
                        arr.splice(i, 1);
                    }
                }
                console.log(arr);
                setData({
                    ...data,
                    arr: arr
                });
                showMess('Пользователь удален');
            })
            .catch(err => {
                console.log(err)
            })
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
</Button>}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                className={classes.dialog}
            >
                <DialogTitle id="responsive-dialog-title">{"Вы действительно хотите удалить цену?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Подтвердите, что вы действительно хотите удалить цену, еще раз нажав кнопку Подтвердить
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => {
                        deletePrice(idState);
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
                            width:'100%'
                        }}
                    >
                        <Typography variant='h5'
                            style={{
                                color: currentTheme === 'dark' ? '#aeaee0' : 'black',

                                // borderBottom:'1px solid rgb(174, 174, 224)'
                            }}>
                            Мои цены
                    </Typography>
                        <IconButton
                            onClick={reloadPrices}
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
                            width:'100%'
                        }}
                    >
                        <TextField
                            placeholder='Цена'
                            className={classes.text}
                            defaultValue={amountState ? amountState : undefined}
                            onBlur={(e) => { setAmountState(e.target.value) }}
                            style={{
                                margin: '0px'
                            }}
                        >

                        </TextField>

                        <IconButton
                            onClick={handlePrices}
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
                                <TableCell align="left">Цена</TableCell>
                                <TableCell align="left">Путь</TableCell>
                                <TableCell align="left">Дата</TableCell>
                                <TableCell align="left">Время</TableCell>
                                <TableCell align="left"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.arr.map((row, i) => (
                                <TableRow key={row.id}>
                                    <TableCell align="left">
                                        {
                                            state[i] ?
                                                state[i].edit ?
                                                    <TextField
                                                        className={classes.text}
                                                        defaultValue={state[i].amount}
                                                        onBlur={(e) => { editPrice(e, i, 'amount') }}
                                                    >

                                                    </TextField>
                                                    :
                                                    state[i].amount + ' ₽'
                                                :
                                                row.amount + ' ₽'
                                        }
                                    </TableCell>
                                    <TableCell align="left">
                                        {
                                            state[i] ?
                                                state[i].edit ?
                                                    <TextField
                                                        className={classes.text}
                                                        defaultValue={state[i].path}
                                                        onBlur={(e) => { editPrice(e, i, 'path') }}
                                                    >

                                                    </TextField>
                                                    :
                                                    state[i].path
                                                :
                                                row.path
                                        }
                                    </TableCell>
                                    <TableCell align="left">{row.date}</TableCell>
                                    <TableCell align="left">{row.time}</TableCell>
                                    <TableCell align="left">
                                        <IconButton
                                            onClick={state[i] ? state[i].edit ? () => {
                                                completeEdit(i);
                                                editPrices(i);
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

export default withWidth()(PriceTable);