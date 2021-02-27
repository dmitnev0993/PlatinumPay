import React, { useContext, useState, useMemo, useEffect } from "react";
import Selectrix from 'react-selectrix';
import ReactSelect, { Props } from "react-select";
import { useDispatch, useSelector } from 'react-redux';
import withWidth from "@material-ui/core/withWidth";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "../../../../context/themeContext";
import Cookies from 'js-cookie';
import Panel from "../../components/Panel";
import { AppBar, Box, Button, InputBase, InputLabel, makeStyles, NativeSelect, Switch, Tab, Tabs, TextField, Typography, withStyles } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import { Alert, AlertTitle } from '@material-ui/lab';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { setData } from "../../../../actions/actions";

const Products = ({ width }) => {
    console.log(width)
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData);
    const { currentTheme } = useContext(ThemeContext);

    const useStyles = makeStyles(theme => ({
        paginationRoot: {
            "& .MuiPaginationItem-root": {
                color: currentTheme === 'dark' ? 'white' : '',
            },
            "& .MuiPaginationItem-page.Mui-selected":{
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
        alert:{
            "& .MuiAlert-icon":{
                alignItems:'center',
                fontSize:'30px'
            }
        }
    }));
    const classes = useStyles();

    const myHistory = useHistory();

    const [pageState,setPageState] = useState(1);
    const [val,setVal] = useState(undefined);
    const [dataProducts,setDataProducts] = useState({});

    useEffect(()=>{
        var urlencoded = new URLSearchParams();

        urlencoded.append('subscription', false);
        urlencoded.append('manage', false);
        urlencoded.append('wait', false);
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
                setDataProducts(data.response)
            })
    

    },[])

    const productsHandle = async(e,page) => {
        const  params = ['manage', 'subscription', 'wait']
        var urlencoded = new URLSearchParams();
        if(page) {
            setPageState(page);
            urlencoded.append('page', page);
            for (let param of params) {
                if (param === val) urlencoded.append(param, true);
                else urlencoded.append(param, false);
            }
        }
        else {
            setVal(e.key)
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
                return res.json()
            })
            .then(data => {
                console.log(data)
                setDataProducts(data.response)
            })
    }


    return (
        <>
            <Panel></Panel>
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
                        justifyContent: width === 'xs' ? 'center' : 'space-around',
                        maxWidth: width === 'xs' ? '100%' : '400px',
                        alignItems: 'center',
                        flexDirection: width === 'xs' ? 'column' : 'row'
                    }}
                >
                    <Button
                        className={classes.butt}

                        variant="contained"
                        style={{
                            color: 'white',
                            backgroundColor: 'rgb(75, 124, 243)',
                            borderRadius: '2px',
                            fontSize: '15px',
                            height: '45px',
                            width: width === 'xs' ? '100%' : '45%',
                            maxWidth: '250px',
                            border: '0px',
                            alignSelf: 'left'
                        }}

                    >
                        Создать
            </Button>

                    <FormControl
                        className={classes.input}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: width === 'xs' ? '100%' : '45%',
                            maxWidth: '250px',
                            margin: width === 'xs' ? '10px 0px' : '0px',
                            height: '45px'
                        }}
                    >
                        <Selectrix
                            onChange={productsHandle}
                            materialize={true}
                            searchable={false}
                            className={classes.select}
                            placeholder=''
                            options={
                                userData.level === 2 ?
                                    [
                                        { key: 'subscription', label: 'В избранном' },
                                        { key: 'manage', label: 'В управлении' },
                                        { key: 'wait', label: 'В ожидании' }
                                    ]
                                    :
                                    [
                                        { key: 'subscription', label: 'В избранном' },
                                        { key: 'manage', label: 'В управлении' }
                                    ]
                            }
                        >

                        </Selectrix>
                    </FormControl>

                </Box>
                <Box style={{
                    height: '400px',
                    width: width === 'xs' ? 'calc(100vw - 35px)' : 'calc(100vw - 145px)',
                    padding: '100px 0px 0px 0px',
                    display:'flex',
                    justifyContent:'center',
                }}>
                    {!dataProducts.count ? 
                    <Box 
                    style={{
                        color: currentTheme === 'dark' ? '#595c97' : 'black',
                        textAlign:'left'
                    }}>
                            <Typography variant={width === 'xs' ? 'h5' : 'h4'} style={{marginBottom:'8px'}}>Продукты не найдены</Typography>
                            <Typography variant={width === 'xs' ? 'h7' : 'h6'}>Продукты не найдены, либо еще не созданы</Typography>
                    </Box>
                    :
                    <Box
                    style={{
                        width:'100%'
                    }}
                    >
                        Products
                    </Box>
                }
                </Box>

               <Box
               style={{
                   width:'100%',
                   display:'flex',
                   justifyContent:'center'
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
            </Box>
        </>
    );
};

export default withWidth()(Products);