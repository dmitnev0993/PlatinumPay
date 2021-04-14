import React, { useContext, useState, useMemo, useEffect } from "react";
import Selectrix from 'react-selectrix';
import ReactSelect, { Props } from "react-select";
import { useDispatch, useSelector } from 'react-redux';
import withWidth from "@material-ui/core/withWidth";
import { NavLink, useHistory } from "react-router-dom";
import { ThemeContext } from "../../../../context/themeContext";
import Cookies from 'js-cookie';
import Panel from "../../components/Panel";
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Button, ClickAwayListener, Grow, Icon, InputBase, InputLabel, makeStyles, MenuItem, MenuList, NativeSelect, Paper, Popper, Switch, Tab, Tabs, TextField, Typography, withStyles } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import { Alert, AlertTitle } from '@material-ui/lab';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { setData } from "../../../../actions/actions";
import { CircleSpinner } from "react-spinners-kit";
import lightLogo from '../../../../assets/logo/logo-light.png';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Snackbar from 'node-snackbar';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
import Referrals from '../../components/Referrals'
import UrlsTable from "../../components/UrlsTable";


const showMess = (message) => {
    Snackbar.show({
        actionTextColor: '#7575a3',
        text: message,
        actionText: 'ОК',
        pos: 'bottom-right'
    });
}

const ManageUrls = ({ width }) => {

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
    const [shortId, setShortId] = useState('');
    const [subId, setSubId] = useState('');
    const [pageState, setPageState] = useState(1);
    const idUrl = useSelector(state=>state.idForUrl);

    useEffect(() => {
        if (!idUrl) {
            myHistory.push('/dashboard/products')
        }
            console.log(idUrl);
            var urlencoded = new URLSearchParams();
            urlencoded.append('productId', idUrl);
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
                    showMess('Ошибка!');
                })
        
    }, [])

    const handleShorteners = (e,page) => {
        var urlencoded = new URLSearchParams();
        urlencoded.append('productId', idUrl);
        if(page === pageState) return;
        setLoading(true);
        if(page){
            urlencoded.append('page', page);
            setPageState(page);
        }
        else{
            urlencoded.append('page', pageState);
        }
        if(shortId){
            urlencoded.append('shortId', shortId);
        }
        if(subId){
            urlencoded.append('subId', subId);
        }
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
                if(data.response.count){
                    setData({
                        ...data,
                        arr: data.response.data,
                        pages: data.response.pages
                    });
                }
                else{
                    showMess('Ссылка не найдена')
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                showMess('Ошибка!');
            })
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
                    width:'100%'
                }}
                >
                {data.arr.length > 0 ?
                     <UrlsTable data={data} setData={setData} setLoading={setLoading} shortId={shortId} setShortId={setShortId} subId={subId} setSubId={setSubId} pageState={pageState} handleShorteners={handleShorteners}/>
                    : 
                    null}
                </Box>

                {/* <Button
                    className={classes.butt}
                    variant="contained"
                    onClick={() => {
                        myHistory.push('/dashboard')
                    }}
                    style={{
                        color: 'white',
                        backgroundColor: '#525252',
                        margin: width === 'xs' ? '20px 0px 8px 0px' : '25px 0px 8px 0px',
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
                    Назад
          </Button> */}


                <Box
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '22px 0px 0px 0px',
                        paddingBottom:'20px'
                    }}
                >
                    <Pagination
                        className={classes.paginationRoot}
                        size={width === 'xs' ? 'medium' : 'large'}
                        count={data.pages}
                        page={pageState}
                        onChange={handleShorteners}
                    ></Pagination>
                </Box>
                </>
                }
            </Box>
        </>
    )
};

export default withWidth()(ManageUrls);