import React, { useContext, useEffect, useState } from "react";
import withWidth from "@material-ui/core/withWidth";
import { makeStyles, Typography, Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Button, ClickAwayListener, Grow, Icon, InputBase, InputLabel, MenuItem, MenuList, NativeSelect, Paper, Popper, Switch, Tab, Tabs, TextField, withStyles, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@material-ui/core";
import { ThemeContext } from "../../../context/themeContext";
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ReplayIcon from '@material-ui/icons/Replay';
import DeleteIcon from '@material-ui/icons/Delete';
import Cookies from 'js-cookie';

const Referrals = ({ width, data, setData, setLoading, id, page }) => {
    const dispatch = useDispatch();
    const { currentTheme } = useContext(ThemeContext);
    const [state, setState] = useState([]);
    const idForRef = useSelector(state => state.idForRef);
    const pageForRef = useSelector(state => state.pageForRef);

    const useStyles = makeStyles((theme) => ({
        table: {
            height: '690px',
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
        }
    }));

    const reloadRef = () => {
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
            id: i + 1,
            name: it.username,
            deductions: it.deductions,
            date: it.date,
            time: it.time,
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
    // const rows = [{
    //     id: 1, name: 'Snow', deductions: 'Jon', date: 35, time:12
    // }]



    // [
    //     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    //     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    //     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    //     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    // ];

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

    return (
        <>
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
                        Партнеры
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
                                    <TableCell align="left">{row.date}</TableCell>
                                    <TableCell align="left">{row.time}</TableCell>
                                    <TableCell align="left">
                                        <IconButton
                                            onClick={state[i] ? state[i].edit ? () => { completeEdit(i) } : () => { startEdit(i) } : null}
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
                                        <IconButton>
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