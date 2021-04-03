import React, { useContext, useState, useMemo, useEffect } from "react";
import Selectrix from 'react-selectrix';
import ReactSelect, { Props } from "react-select";
import { useDispatch, useSelector } from 'react-redux';
import withWidth from "@material-ui/core/withWidth";
import { NavLink, useHistory } from "react-router-dom";
import { ThemeContext } from "../../../../context/themeContext";
import Cookies from 'js-cookie';
import Panel from "../../components/Panel";
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Button, ClickAwayListener, Grow, Icon, IconButton, InputBase, InputLabel, makeStyles, MenuItem, MenuList, NativeSelect, Paper, Popper, Switch, Tab, Tabs, TextField, Typography, withStyles } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import { Alert, AlertTitle } from '@material-ui/lab';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { isBackToPr, isCreated, setData, setDataProducts, setScrollPr, setBackLabel } from "../../../../actions/actions";
import { CircleSpinner } from "react-spinners-kit";
import lightLogo from '../../../../assets/logo/logo-light.png';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Snackbar from 'node-snackbar';
import ListSubheader from '@material-ui/core/ListSubheader';
import ReplayIcon from '@material-ui/icons/Replay';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import Collapse from '@material-ui/core/Collapse';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ClearIcon from '@material-ui/icons/Clear';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LinkIcon from '@material-ui/icons/Link';
import PeopleIcon from '@material-ui/icons/People';
import { setIdForRef } from '../../../../actions/actions'

const showMess = (message) => {
    Snackbar.show({
        actionTextColor: '#7575a3',
        text: message,
        actionText: 'ОК',
        pos: 'bottom-right'
    });
}

const Products = ({ width }) => {
    console.log(width)
    const dispatch = useDispatch();
    const dataProducts = useSelector(state => state.dataProducts);
    const level = useSelector(state => state.userData.level);
    const scrollPr = useSelector(state => state.scrollPr);
    const created = useSelector(state => state.created);
    const backLabel = useSelector(state => state.backLabel);
    const backToProducts = useSelector(state => state.backToProducts);
    const { currentTheme } = useContext(ThemeContext);
    const [loading, setLoading] = useState(true);
    const [opened, setOpened] = useState(false);
    const [open, setOpen] = React.useState([]);
    const [open2, setOpen2] = React.useState(false);
    const [idState, setIdState] = useState(null);
    const [lvl, setLvl] = useState(level);
    const [state,setState] = useState({});
    const [label,setLabel] = useState('Все');
    const [stateBackLabel, setStateBackLabel] = useState('');

    const handleClickOpen = () => {
        setOpen2(true);
    };

    const handleClose = () => {
        setOpen2(false);
    };

    const handleOpen = (i) => {
        const arr = open.map((it)=>(it));
        arr[i] = !arr[i];
        setOpen(arr);
    };

    const getURL = (URL) => {
        navigator.clipboard.writeText(URL);
        showMess('Ссылка скопирована')
    };


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
        },
        fcont:{
            "& .MuiFormControlLabel-label.Mui-disabled":{
             //   color: currentTheme === 'dark' ? 'slategrey' : '',
            }
        }
    }));
    const classes = useStyles();

    const myHistory = useHistory();

    const [pageState, setPageState] = useState(1);
    const [ic, setIc] = useState(false);
    const [val, setVal] = useState(undefined);

    // if(scrollPr){
    //     console.log('dsds',scrollPr);
    //     window.scroll(0,scrollPr);
    // }
    
    useEffect(() => {
        

        if (level !== 0) {
            console.log(backToProducts)
            if(!backToProducts){
                var urlencoded = new URLSearchParams();
            if (created) setIc(true);
            urlencoded.append('isSubscription', false);
            urlencoded.append('isManage', created);
            urlencoded.append('isWait', false);
            urlencoded.append('page', 1);
            fetch('https://secure.platinumpay.cc/v1/client/products/getProducts', {
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
                    dispatch(setDataProducts(data.response));
                    setLoading(false);
                    if (created) dispatch(isCreated());
                })
            }
            else{
                setLoading(false);
                dispatch(isBackToPr());
                setStateBackLabel(backLabel);
                dispatch(setBackLabel(''));
            }
        }


    }, [])

    useEffect(() => {
        console.log(level)
        if (level !== undefined) setLvl(level);
    }, [level])



    const reloadProducts = ()=>{
        setLoading(true);

        const params = ['isManage', 'isSubscription', 'isWait'];
        var urlencoded = new URLSearchParams();

        for (let param of params) {
            if (param === val) urlencoded.append(param, true);
            else urlencoded.append(param, false);
        }

        urlencoded.append('page', pageState);

        fetch('https://secure.platinumpay.cc/v1/client/products/getProducts', {
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
                dispatch(setDataProducts(data.response));
                setLoading(false);
                console.log(data.response)
            })
    }

   

    const productsHandle = async (e, page) => {
        if(page === pageState)return;
        setLoading(true);
        const params = ['isManage', 'isSubscription', 'isWait']
        var urlencoded = new URLSearchParams();
        if (page) {
            setPageState(page);
            urlencoded.append('page', page);
            for (let param of params) {
                if (param === val) urlencoded.append(param, true);
                else urlencoded.append(param, false);
            }
        }
        else {
            console.log(e);
            setIc(false);
            setLabel(e.label);
            setVal(e.key);
            urlencoded.append('page', pageState);
            for (let param of params) {
                if (param === e.key) urlencoded.append(param, true);
                else urlencoded.append(param, false);
            }
        }

        fetch('https://secure.platinumpay.cc/v1/client/products/getProducts', {
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
                dispatch(setDataProducts(data.response));
                setLoading(false);
                console.log(data.response)
            })
    }

    useEffect(() => { console.log(dataProducts) }, [dataProducts])
    const toCreate = () => {
        myHistory.push('/dashboard/products/create')
    }

    const subscribe = (id) => {
        console.log(id)

        var urlencoded = new URLSearchParams();
        urlencoded.append('productId', id);
        fetch('https://secure.platinumpay.cc/v1/client/products/subscriptions/useSubscription', {
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
                let ob = { ...dataProducts };
                for (let pr of ob.data) {
                    if (pr.productId === data.response.productId) {
                        pr.subscription = 1;
                        pr.subscriptions += 1;
                    }
                }
                dispatch(setDataProducts(ob));
            })
            .catch(err => {
                console.log(err)
            })
    }

    const Unsubscribe = (id) => {
        var urlencoded = new URLSearchParams();
        urlencoded.append('productId', id);
        fetch('https://secure.platinumpay.cc/v1/client/products/subscriptions/useSubscription', {
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
                let ob = { ...dataProducts };
                for (let pr of ob.data) {
                    if (pr.productId === data.response.productId) {
                        pr.subscription = 0;
                        pr.subscriptions -= 1;
                    }
                }
                dispatch(setDataProducts(ob));
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleWait = (e, id,i) => {
        console.log(e.target.checked, id)

        var urlencoded = new URLSearchParams();
        urlencoded.append('productId', id);
        urlencoded.append('wait', e.target.checked === true ? 0 : 1);
        fetch('https://secure.platinumpay.cc/v1/client/products/setWait', {
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
                const arr = dataProducts.data.map((it)=>({...it}));
                arr[i].wait = arr[i].wait === 0 ? 1 : 0;
                for(let it of arr){
                    if(!it.wait && !it.type){
                        it.status = 'Открытый';
                    }
                    else if(!it.wait && it.type){
                        it.status = 'Закрытый';
                    }
                    else if(it.wait){
                        it.status = 'На проверке';
                    }
                };
                dispatch(setDataProducts({
                    ...dataProducts,
                    data:arr
                }));
            })
            .catch(err => {
                console.log(err)
            })

    }

    useEffect(()=>{
        if(scrollPr && !loading){
            console.log('dsds',scrollPr);
            window.scrollTo(0, scrollPr);
            dispatch(setScrollPr(0));
        }
        console.log(loading)
    },[loading])

    const handleType = (e, id,i) => {
        console.log(e.target.checked, id)

        var urlencoded = new URLSearchParams();
        urlencoded.append('productId', id);
        urlencoded.append('type', e.target.checked === true ? 0 : 1);
        fetch('https://secure.platinumpay.cc/v1/client/products/setType', {
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
                const arr = dataProducts.data.map((it)=>({...it}));
                arr[i].type = arr[i].type === 0 ? 1 : 0;
                for(let it of arr){
                    if(!it.wait && !it.type){
                        it.status = 'Открытый';
                    }
                    else if(!it.wait && it.type){
                        it.status = 'Закрытый';
                    }
                    else if(it.wait){
                        it.status = 'На проверке';
                    }
                };
                dispatch(setDataProducts({
                    ...dataProducts,
                    data:arr
                }));
            })
            .catch(err => {
                console.log(err)
            })

    }

    const handlePremium = (e, id,i) => {
        console.log(e.target.checked, id)

        var urlencoded = new URLSearchParams();
        urlencoded.append('productId', id);
        urlencoded.append('premium', e.target.checked === true ? 1 : 0);
        fetch('https://secure.platinumpay.cc/v1/client/products/setPremium', {
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
                const arr = dataProducts.data.map((it)=>({...it}));
                arr[i].premium = arr[i].premium === 0 ? 1 : 0;
                for(let it of arr){
                    if(!it.wait && !it.type){
                        it.status = 'Открытый';
                    }
                    else if(!it.wait && it.type){
                        it.status = 'Закрытый';
                    }
                    else if(it.wait){
                        it.status = 'На проверке';
                    }
                };
                dispatch(setDataProducts({
                    ...dataProducts,
                    data:arr
                }));
            })
            .catch(err => {
                console.log(err)
            })

    }

    const handleDelete = (id) => {
        var urlencoded = new URLSearchParams();
        urlencoded.append('productId', id);
        fetch('https://secure.platinumpay.cc/v1/client/products/deleteProduct', {
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
                let ob = { ...dataProducts };
                for (let i = 0; i < ob.data.length; i++) {
                    if (data.response.productId === ob.data[i].productId) {
                        console.log(ob, 'COMPLETE')
                        ob.data.splice(i, 1);
                        break;
                    }
                }
                dispatch(setDataProducts(ob));
                showMess('Продукт удален');
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        if(dataProducts.count){
            setState({...dataProducts});
        }
        
    }, [dataProducts])

    useEffect(()=>{
        console.log(dataProducts,state,myArr());
        if(state.count && !dataProducts.count){
            dispatch(setDataProducts(state));
        }
    },[dataProducts,state]);

    // useEffect(()=>{
    //     if(state.count && !dataProducts.count){
    //         dispatch(setDataProducts(state));
    //     }
    // },[state])

    const myArr = () => {
        if(dataProducts.count) return dataProducts;
        else return state;
    }

    const products = myArr().count && myArr().data.map((pr, i) => {
        return (
            <Box
                key={i}
                style={{
                    color: currentTheme === 'dark' ? '#7575a3' : 'black',
                    width: '100%',
                    //  maxWidth: '1300px',
                    display: 'flex',
                    margin: width === 'xs' ? '20px 10px 20px 0px' : '20px 0px',
                    justifyContent: 'flex-start',
                    border: currentTheme === 'dark' ? '1px rgb(20, 28, 34) solid' : '1px #e4e9f0 solid',
                    alignItems: 'flex-start',
                    position: 'relative',
                    flexDirection: width === 'xs' ? 'column' : 'row'
                }}
            >
                <Box
                    style={{
                        display: 'flex',
                        width: width === 'xs' ? '100%' : '300px',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: width === 'xs' ? '15px' : '0px',
                        borderRight: width !== 'xs' ? (currentTheme === 'dark' ? '1px solid rgb(20, 28, 34)' : '1px rgb(228, 233, 240) solid') : 'none'
                    }}
                >
                    <Box
                        style={{
                            width: width === 'xs' ? '100%' : width === 'sm' ? '250px' : '300px',
                            position: 'relative',
                            // height: width === 'xs' ? 'fit' : width === 'sm' ? '250px' : '300px',
                        }}
                    >
                        <img
                            style={{
                                width: width === 'xs' ? '100%' : width === 'sm' ? '250px' : '300px',
                            }}
                            src={pr.image} />
                        <Typography
                            style={{
                                color: '#ffffff',
                                padding: '0 22px 0 22px',
                                textTransform: 'uppercase',
                                position: 'absolute',
                                left: '0px',
                                bottom: '4px',
                                borderRadius: '0 20px 0 0',
                                background: 'slategrey',
                            }}
                        >
                            {pr.status}
                        </Typography>
                        {pr.premium ?
                            <Typography
                                style={{
                                    color: '#ffffff',
                                    padding: '0 22px 0 22px',
                                    textTransform: 'uppercase',
                                    position: 'absolute',
                                    right: '0px',
                                    top: '0px',
                                    borderRadius: '0 0 0 20px',
                                    background: 'rgb(249, 185, 66)',
                                }}
                            >
                                Premium
                    </Typography>
                            : null}
                    </Box>
                    <Typography
                        style={{
                            margin: '15px 0px 2px 0px'
                        }}
                    >
                        Цена: {pr.amount} ₽
                    </Typography>
                    <Typography
                        style={{
                            margin: '0px 0px 7.5px 0px'
                        }}
                    >
                        Отчисления: {pr.reward} ₽ ({pr.deductions} %)
                    </Typography>

                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        style={{
                            width: '100%',
                            paddingBottom: '0px'
                        }}
                    >

                        {pr.subscription
                            ?
                            <>
                                <ListItem
                                    className={classes.ListItem}
                                    button
                                    onClick={()=>{handleOpen(i)}}>
                                    <ListItemIcon
                                        className={classes.listIcon}
                                    >
                                        {open[i] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemIcon>
                                    <ListItemText primary="Выберите действие" />

                                </ListItem>

                                <Collapse in={open[i]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItem
                                            className={classes.ListItem}
                                            button onClick={() => { myHistory.push('/dashboard/products/url') }}>
                                            <ListItemIcon
                                                className={classes.listIcon}
                                            >
                                                <LinkIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Создать ссылку" />
                                        </ListItem>
                                        <ListItem
                                            className={classes.ListItem}
                                            button onClick={() => { Unsubscribe(pr.productId) }}>
                                            <ListItemIcon
                                                className={classes.listIcon}
                                            >
                                                <ClearIcon />
                                            </ListItemIcon >
                                            <ListItemText primary="Отписаться" />
                                        </ListItem >
                                    </List>
                                </Collapse>



                            </>
                            :
                            <ListItem
                                className={classes.ListItem}
                                button onClick={pr.wait ? () => { showMess('Продукт не разрешён к публикации') } : () => { subscribe(pr.productId) }}>
                                <ListItemIcon
                                    className={classes.listIcon}
                                >
                                    <LibraryAddCheckIcon />
                                </ListItemIcon>
                                <ListItemText primary="Стать партнером" />
                            </ListItem>
                        }

                        {
                            level === 2 || pr.author ?
                                <>
                                    <ListItem
                                        button
                                        onClick={
                                            pr.wait && level !== 2 ? () => { showMess('Продукт не разрешён к публикации') } :
                                                pr.subscriptions === 0 ?
                                                    () => {
                                                        showMess('Партнеры не найдены')
                                                    }
                                                    :
                                                    () => {
                                                        dispatch(setIdForRef(pr.productId));
                                                        dispatch(setScrollPr(window.scrollY));
                                                        dispatch(isBackToPr());
                                                        dispatch(setBackLabel(label));
                                                        myHistory.push('/dashboard/products/subscriptions')
                                                    }}
                                        className={classes.ListItem}
                                    >
                                        <ListItemIcon
                                            className={classes.listIcon}
                                        >
                                            <PeopleIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Посмотреть партнеров" />
                                    </ListItem>

                                    <ListItem
                                        button
                                        onClick={
                                            pr.wait && level !== 2 ? () => { showMess('Продукт не разрешён к публикации') } :
                                                    () => {
                                                        return;
                                                    }}
                                        className={classes.ListItem}
                                    >
                                        <ListItemIcon
                                            className={classes.listIcon}
                                        >
                                            <EditIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Редактировать" />
                                    </ListItem>

                                    <ListItem
                                        button
                                        onClick={
                                            pr.wait && level !== 2 ? () => { showMess('Продукт не разрешён к публикации') } :
                                                () => {
                                                    setIdState(pr.productId)
                                                    handleClickOpen()
                                                }}
                                        className={classes.ListItem}
                                        style={{
                                            backgroundColor: 'red',
                                            color: 'white',

                                        }}
                                    >
                                        <ListItemIcon
                                            style={{
                                                color: 'white'
                                            }}
                                        >
                                            <DeleteIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Удалить" />
                                    </ListItem>
                                </>
                                : null
                        }
                    </List>
                </Box>
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        width: '100%',
                    }}
                >

                    {width === 'xs' ?
                        <Accordion
                            style={{
                                width: '100%',
                                boxShadow: 'none',
                                borderBottom: currentTheme === 'dark' ? '1px rgb(20, 28, 34) solid' : '1px #e4e9f0 solid',
                                backgroundColor: currentTheme === 'dark' ? 'rgb(20, 19, 34)' : 'white',
                                color: currentTheme === 'dark' ? '#7575a3' : 'black',
                                padding: '0px 4px'
                            }}

                        >
                            <AccordionSummary
                                onClick={() => { setOpened(!opened) }}
                            >

                                {opened ?
                                    <>
                                        <Typography>Скрыть</Typography>
                                        <Icon>
                                            <ExpandLessIcon>

                                            </ExpandLessIcon>
                                        </Icon>
                                    </>
                                    :
                                    <>
                                        <Typography>Показать</Typography>
                                        <Icon>
                                            <ExpandMoreIcon>

                                            </ExpandMoreIcon>
                                        </Icon>
                                    </>
                                }
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box
                                    style={{
                                        display: 'flex',
                                        flexWrap: 'nowrap',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        flexDirection: width === 'xs' || width === 'sm' ? 'column' : 'row',
                                        width: '100%',
                                        color: currentTheme === 'dark' ? 'rgb(117, 117, 152)' : 'rgb(128, 128, 128)'
                                    }}
                                >
                                    <a
                                    href={pr.url}
                                    target='_blank'
                                    style={{
                                        width: width === 'xs' || width === 'sm' ? '100%' : '',
                                        color: currentTheme === 'dark' ? 'rgb(117, 117, 152)' : 'rgb(128, 128, 128)'
                                    }}
                                    >
                                    <Typography
                                        className={classes.p}
                                        style={{
                                            height: '40px',
                                            cursor: 'pointer',
                                            padding: width === 'xs' || width === 'sm' ? '10px 0px' : '10px 20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: width === 'xs' || width === 'sm' ? '100%' : '',
                                            color: currentTheme === 'dark' ? 'rgb(117, 117, 152)' : 'rgb(128, 128, 128)'
                                        }}
                                    >
                                        URL
                        </Typography>
                                    </a>
                                    <Typography
                                        className={classes.p}
                                        style={{
                                            height: '40px',
                                            cursor: 'pointer',
                                            padding: width === 'xs' || width === 'sm' ? '10px 0px' : '10px 20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: width === 'xs' || width === 'sm' ? '100%' : ''
                                        }}
                                    >
                                        ЦЕНЫ
                        </Typography>
                                    <Typography
                                        className={classes.p}
                                        style={{
                                            height: '40px',
                                            cursor: 'pointer',
                                            padding: width === 'xs' || width === 'sm' ? '10px 0px' : '10px 20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: width === 'xs' || width === 'sm' ? '100%' : ''
                                        }}
                                    >
                                        ЗАКАЗЫ
                        </Typography>
                                    <Typography
                                        className={classes.p}
                                        style={{
                                            height: '40px',
                                            cursor: 'pointer',
                                            padding: width === 'xs' || width === 'sm' ? '10px 0px' : '10px 20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: width === 'xs' || width === 'sm' ? '100%' : '',
                                            borderBottom: pr.author ? currentTheme === 'dark' ? '1px rgb(20, 28, 34) solid' : '1px #e4e9f0 solid' : 'none',
                                        }}
                                    >
                                        СТАТИСТИКА
                        </Typography>
                                    {pr.author ?
                                        <Typography
                                            className={classes.p}
                                            style={{
                                                height: '40px',
                                                cursor: 'pointer',
                                                padding: width === 'xs' || width === 'sm' ? '10px 0px' : '10px 20px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: width === 'xs' || width === 'sm' ? '100%' : ''
                                            }}
                                        >
                                            ПРИГЛАСИТЬ
                    </Typography>
                                        : null}

                                </Box>
                            </AccordionDetails>
                        </Accordion>
                        :
                        <>
                            <Box
                                style={{
                                    display: 'flex',
                                    flexWrap: 'nowrap',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    flexDirection: width === 'xs' || width === 'sm' ? 'column' : 'row',
                                    width: '100%',
                                    borderBottom: currentTheme === 'dark' ? '1px rgb(20, 28, 34) solid' : '1px #e4e9f0 solid',
                                    color: currentTheme === 'dark' ? 'rgb(117, 117, 152)' : 'rgb(128, 128, 128)'
                                }}
                            >
                                <a
                                href={pr.url}
                                target='_blank'
                                style={{
                                    color: currentTheme === 'dark' ? 'rgb(117, 117, 152)' : 'rgb(128, 128, 128)'
                                }}
                                >
                                <Typography
                                    className={classes.p}
                                    style={{
                                        height: '40px',
                                        cursor: 'pointer',
                                        padding: width === 'xs' || width === 'sm' ? '10px 0px' : '10px 20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: width === 'xs' || width === 'sm' ? '100%' : '',
                                        color: currentTheme === 'dark' ? 'rgb(117, 117, 152)' : 'rgb(128, 128, 128)'
                                    }}
                                >
                                    URL
                        </Typography>
                                </a>
                                <Typography
                                    className={classes.p}
                                    style={{
                                        height: '40px',
                                        cursor: 'pointer',
                                        padding: width === 'xs' || width === 'sm' ? '10px 0px' : '10px 20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: width === 'xs' || width === 'sm' ? '100%' : ''
                                    }}
                                >
                                    ЦЕНЫ
                        </Typography>
                                <Typography
                                    className={classes.p}
                                    style={{
                                        height: '40px',
                                        cursor: 'pointer',
                                        padding: width === 'xs' || width === 'sm' ? '10px 0px' : '10px 20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: width === 'xs' || width === 'sm' ? '100%' : ''
                                    }}
                                >
                                    ЗАКАЗЫ
                        </Typography>
                                <Typography
                                    className={classes.p}
                                    style={{
                                        height: '40px',
                                        cursor: 'pointer',
                                        padding: width === 'xs' || width === 'sm' ? '10px 0px' : '10px 20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: width === 'xs' || width === 'sm' ? '100%' : '',
                                        borderRight: pr.author ? currentTheme === 'dark' ? '1px rgb(20, 28, 34) solid' : '1px #e4e9f0 solid' : 'none',
                                    }}
                                >
                                    СТАТИСТИКА
                        </Typography>
                                {pr.author
                                    ?
                                    <Typography
                                        className={classes.p}
                                        style={{
                                            height: '40px',
                                            cursor: 'pointer',
                                            padding: width === 'xs' || width === 'sm' ? '10px 0px' : '10px 20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: width === 'xs' || width === 'sm' ? '100%' : ''
                                        }}
                                    >
                                        ПРИГЛАСИТЬ
                    </Typography>
                                    : null}

                            </Box>
                        </>
                    }


                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start'
                        }}
                    >
                        <Typography variant='h5'
                            style={{
                                margin: '30px 0px 20px 20px',
                            }}
                        >
                            {pr.title}
                        </Typography>

                        <Typography variant='h7'
                            style={{
                                margin: '10px 20px 10px 20px',
                                wordBreak: 'break-all',
                            }}
                        >
                            {pr.description}
                        </Typography>
                    </Box>

                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            margin: '20px 0px 15px 20px',
                            width: 'calc(100% - 20px)'
                        }}
                    >
                        <Typography variant='h6'>
                            Информация о продукте
                        </Typography>
                        <hr
                            style={{
                                backgroundColor: currentTheme === 'dark' ? 'rgb(20, 28, 34)' : '#e4e9f0',
                                border: 'none',
                                height: '1px',
                                width: '100%',
                                margin: '0px'
                            }}
                        />
                        <Box
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: 'calc(100% - 20px)',
                                flexWrap: 'wrap'
                            }}
                        >
                            <Typography
                                style={{
                                    margin: '10px 0px',
                                    width: width === 'xs' ? '100%' : '48%',
                                    textAlign: 'start'
                                }}
                            >
                                Автор: {pr.username}
                            </Typography>
                            <Typography
                                style={{
                                    margin: '10px 0px',
                                    width: width === 'xs' ? '100%' : '48%',
                                    textAlign: 'start'
                                }}
                            >
                                Добавлен: {pr.date} {pr.time}
                            </Typography>
                            <Typography
                                style={{
                                    margin: '10px 0px',
                                    width: width === 'xs' ? '100%' : '48%',
                                    textAlign: 'start'
                                }}
                            >
                                Партнеры: {pr.subscriptions}
                            </Typography>

                            <Typography
                                style={{
                                    margin: '10px 0px',
                                    width: width === 'xs' ? '100%' : '48%',
                                    textAlign: 'start'
                                }}
                            >
                                Количество апсейлов: {pr.upsales}
                            </Typography>
                        </Box>
                    </Box>

                    {level === 2
                        ?
                        <Box
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                margin: '20px 0px 15px 20px',
                                width: 'calc(100% - 20px)'
                            }}
                        >
                            <Typography variant='h6'>
                                Управление продуктом
                    </Typography>
                            <hr
                                style={{
                                    backgroundColor: currentTheme === 'dark' ? 'rgb(20, 28, 34)' : '#e4e9f0',
                                    border: 'none',
                                    height: '1px',
                                    width: '100%',
                                    margin: '0px'
                                }}
                            />
                            <Box
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    width: 'calc(100% - 20px)',
                                    flexWrap: 'wrap'
                                }}
                            >

                                    {pr.author === 1 ?
                                    <FormControl component="fieldset"
                                        className={classes.fcont}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                            marginBottom: '15px',
                                            marginRight: width === 'xs' || width === 'sm' ? '0px' : '5px',
                                        }}>
                                        <FormGroup aria-label="position" row>
                                            <FormControlLabel
                                                value="trightop"
                                                control={
                                                    <Switch
                                                        defaultChecked={!pr.type}
                                                        disabled={pr.wait}
                                                        onClick={pr.wait ? () => { showMess('Продукт не разрешён к публикации') } : null}
                                                        onChange={(e) => handleType(e, pr.productId,i)}
                                                        color="primary"
                                                        name="checkedB"
                                                        inputProps={{ role: 'switch' }}
                                                    />
                                                }
                                                label="Опубликовать"
                                                labelPlacement="right"
                                                style={{
                                                    color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                                                }}
                                            />
                                        </FormGroup>
                                    </FormControl>
                                    : null
                                }

                                <FormControl component="fieldset"
                                    className={classes.fcont}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        marginBottom: '15px',
                                        marginRight: width === 'xs' ? '0px' : '5px',
                                        marginLeft: width === 'xs' ? '0px' : '5px',
                                    }}>
                                    <FormGroup aria-label="position" row>
                                        <FormControlLabel
                                            value="trightop"
                                            control={
                                                <Switch
                                                    defaultChecked={!pr.wait}
                                                    onChange={(e) => handleWait(e, pr.productId,i)}
                                                    color="primary"
                                                    name="checkedB"
                                                    inputProps={{ role: 'switch' }}
                                                />
                                            }
                                            label="Разрешен к публикации"
                                            labelPlacement="right"
                                            style={{
                                                color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                                            }}
                                        />
                                    </FormGroup>
                                </FormControl>
                                <FormControl component="fieldset"
                                    className={classes.fcont}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        marginBottom: '15px',
                                        marginLeft: width === 'xs' || width === 'sm' ? '0px' : '5px',
                                    }}>
                                    <FormGroup aria-label="position" row>
                                        <FormControlLabel
                                            value="trightop"
                                            control={
                                                <Switch
                                                    defaultChecked={pr.premium}
                                                    onChange={(e) => handlePremium(e, pr.productId,i)}
                                                    color="primary"
                                                    name="checkedB"
                                                    inputProps={{ role: 'switch' }}
                                                />
                                            }
                                            label="Premium"
                                            labelPlacement="right"
                                            style={{
                                                color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                                            }}
                                        />
                                    </FormGroup>
                                </FormControl>

                                


                            </Box>
                        </Box>
                        :
                        pr.author === 1 ?
                            <Box
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    margin: '20px 0px 15px 20px',
                                    width: 'calc(100% - 20px)'
                                }}
                            >
                                <Typography variant='h6'>
                                    Управление продуктом
                    </Typography>
                                <hr
                                    style={{
                                        backgroundColor: currentTheme === 'dark' ? 'rgb(20, 28, 34)' : '#e4e9f0',
                                        border: 'none',
                                        height: '1px',
                                        width: '100%',
                                        margin: '0px'
                                    }}
                                />
                                <Box
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        width: 'calc(100% - 20px)',
                                        flexWrap: 'wrap'
                                    }}
                                >
                                    <FormControl component="fieldset"
                                        className={classes.fcont}
                                        onClick={pr.wait ? () => { showMess('Продукт не разрешён к публикации') } : null}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                            marginBottom: '15px',
                                            marginRight: width === 'xs' ? '0px' : '5px'
                                        }}>
                                        <FormGroup aria-label="position" row>
                                            <FormControlLabel
                                                value="trightop"
                                                control={
                                                    <Switch
                                                        defaultChecked={!pr.type}
                                                        disabled={pr.wait}
                                                        onClick={pr.wait ? () => { showMess('Продукт не разрешён к публикации') } : null}
                                                        onChange={(e) => handleType(e, pr.productId,i)}
                                                        color="primary"
                                                        name="checkedB"
                                                        inputProps={{ role: 'switch' }}
                                                    />
                                                }
                                                label="Опубликовать"
                                                labelPlacement="right"
                                                style={{
                                                    color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                                                }}
                                            />
                                        </FormGroup>
                                    </FormControl>

                                </Box>
                            </Box>
                            : null
                    }


                </Box>
            </Box >
        )
    })


    return (
        <>
            <Panel></Panel>
            <Dialog
                open={open2}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                className={classes.dialog}
            >
                <DialogTitle id="responsive-dialog-title">{"Вы действительно хотите удалить продукт?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Подтвердите, что вы действительно хотите удалить продукт, еще раз нажав кнопку Подтвердить
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => {
                        handleDelete(idState);
                        handleClose();
                        setIdState(null);
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
                <Box
                    style={{
                        display: 'flex',
                        justifyContent: width === 'xs' ? 'center' : 'flex-start',
                        width: '100%',
                        alignItems: 'center',
                        flexDirection: width === 'xs' ? 'column' : 'row',
                        position: 'relative',
                        
                    }}
                >




                    <Box
                    style={{
                        display:'flex',
                        justifyContent:'flex-start',
                        position:'relative',
                        width: width === 'xs' ? '100%' : '45%',
                        maxWidth: '250px',
                    }}
                    >
                    <FormControl
                        className={classes.input}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                           // width: width === 'xs' ? '100%' : '45%',
                            maxWidth: '250px',
                            width:'100%',
                            height: '45px'
                        }}
                    >
                        <Selectrix
                            onChange={productsHandle}
                            materialize={true}
                            searchable={false}
                            className={classes.select}
                            placeholder={ic ? 'В управлении' : stateBackLabel ? stateBackLabel : 'Все'}
                            options={
                                lvl === 2 ?
                                    [
                                        { key: 'isSubscription', label: 'В партнерстве' },
                                        { key: 'isManage', label: 'В управлении' },
                                        { key: 'isWait', label: 'В ожидании' }
                                    ]
                                    :
                                    [
                                        { key: 'isSubscription', label: 'В партнерстве' },
                                        { key: 'isManage', label: 'В управлении' },

                                    ]
                            }
                        >

                        </Selectrix>
                    </FormControl>
                    <IconButton
                    onClick={reloadProducts}
                    style={{
                        marginTop:'13px',
                        position:'absolute',
                        right:'-44px'
                    }}
                    >
                        <ReplayIcon
                        style={{
                            color: currentTheme === 'dark' ? 'rgb(117, 117, 163)' : '',
                            fontSize:'17px'
                        }}
                        >

                        </ReplayIcon>
                    </IconButton>
                    </Box>

                    <Button
                        className={classes.butt}
                        onClick={toCreate}
                        variant="contained"
                        style={{
                            color: 'white',
                            backgroundColor: 'rgb(75, 124, 243)',
                            borderRadius: '2px',
                            fontSize: '14px',
                            height: '45px',
                            width: width === 'xs' ? '100%' : '45%',
                            maxWidth: '250px',
                            border: '0px',
                            alignSelf: 'left',
                            position: width === 'xs' ? '' : 'absolute',
                            right: '0px',
                            marginTop: width === 'xs' ? '15px' : '0px'
                        }}

                    >
                        Создать продукт
                    </Button>

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
                    <Box style={{
                        width: width === 'xs' ? 'calc(100vw - 35px)' : 'calc(100vw - 145px)',
                        padding: '10px 0px 0px 0px',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        {!dataProducts.count && !state.count ?
                            <Box
                                style={{
                                    color: currentTheme === 'dark' ? '#595c97' : 'black',
                                    textAlign: 'left',
                                    marginTop: '100px'
                                }}>
                                <Typography variant={width === 'xs' ? 'h5' : 'h4'} style={{ marginBottom: '8px' }}>Продукты не найдены</Typography>
                                <Typography variant={width === 'xs' ? 'h7' : 'h6'}>Продукты не найдены, либо еще не созданы</Typography>
                            </Box>
                            :
                            <Box
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    flexDirection: 'column'
                                }}
                            >
                                {products}
                                <Box
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        margin: '10px 0px 30px 0px',
                                        padding: '0px 0px 5px 0px'
                                    }}
                                >
                                    {dataProducts.count ?
                                        <Pagination
                                            className={classes.paginationRoot}
                                            size={width === 'xs' ? 'medium' : 'large'}
                                            count={dataProducts.pages}
                                            page={pageState}
                                            onChange={productsHandle}
                                        ></Pagination>
                                        : null
                                    }


                                </Box>
                            </Box>
                        }
                    </Box>
                }

                {/* {!loading ?
                    <Box
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        {dataProducts.count ?
                            <Pagination
                                className={classes.paginationRoot}
                                size={width === 'xs' ? 'medium' : 'large'}
                                count={dataProducts.pages}
                                onChange={productsHandle}
                            ></Pagination>
                            : null
                        }


                    </Box>
                    : null
                } */}
            </Box>
        </>
    );
};

export default withWidth()(Products);