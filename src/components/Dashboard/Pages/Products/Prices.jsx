import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import withWidth from "@material-ui/core/withWidth";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "../../../../context/themeContext";
import Cookies from 'js-cookie';
import Panel from "../../components/Panel";
import { Box, makeStyles,  Typography } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import { CircleSpinner } from "react-spinners-kit";
import Snackbar from 'node-snackbar';
import PriceTable from "../../components/PriceTable";


const showMess = (message) => {
    Snackbar.show({
        actionTextColor: '#7575a3',
        text: message,
        actionText: 'ОК',
        pos: 'bottom-right'
    });
}

const Prices = ({ width }) => {

    console.log(width)
    const dispatch = useDispatch();
    const idForPrices = useSelector(state => state.idForPrices);

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
    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [amountState, setAmountState] = useState(false);
    const [pageState, setPageState] = useState(1);
    const [id, setId] = useState(idForPrices);

    useEffect(() => {
        console.log(idForPrices);
        if (!idForPrices) {
            myHistory.push('/dashboard/products');
            return;
        }
        var urlencoded = new URLSearchParams();
        urlencoded.append('productId', id);
        urlencoded.append('page', pageState);
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
                setLoadingPage(false);
            })
            .catch(err => {
                console.log(err);
                setLoadingPage(false);
            })

    }, [])

    const handlePrices = (e, page) => {
        var urlencoded = new URLSearchParams();
        urlencoded.append('productId', id);

        if (page === pageState) return;
        setLoading(true);
        if (page) {
            urlencoded.append('page', page);
            setPageState(page);
        }
        else {
            urlencoded.append('page', pageState);
        }

        if (amountState) {
            urlencoded.append('amount', amountState);
        }
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
                if (data.response.count) {
                    setData({
                        ...data,
                        arr: data.response.data,
                        pages: data.response.pages
                    });
                }
                else {
                    showMess('Цена не найдена');
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
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
                    <>
                    {loadingPage ?
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
                            loading={loadingPage}
                        />
                    </Box>
                    :
                        <Box
                            style={{
                                width: '100%'
                            }}
                        >
                            {data.arr.length > 0 ?
                                <PriceTable data={data} setData={setData} setLoading={setLoading} amountState={amountState} setAmountState={setAmountState} pageState={pageState} handlePrices={handlePrices} id={id} loading={loading}/>
                                :
                                <Box
                                    style={{
                                        color: currentTheme === 'dark' ? '#595c97' : 'black',
                                        textAlign: 'center',
                                        marginTop: '100px'
                                    }}>
                                    <Typography variant={width === 'xs' ? 'h5' : 'h4'} style={{ marginBottom: '8px' }}>Цены не найдены</Typography>
                                    <Typography variant={width === 'xs' ? 'h7' : 'h6'}>Цены не найдены, либо еще не созданы</Typography>
                                </Box>
                            }
                        </Box>
}

                        {data.arr.length > 0 ?
                        loading ?
                        null
                        :
                                <Box
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    margin: '22px 0px 0px 0px',
                                    paddingBottom: '20px'
                                }}
                            >
                                <Pagination
                                    className={classes.paginationRoot}
                                    size={width === 'xs' ? 'medium' : 'large'}
                                    count={data.pages}
                                    page={pageState}
                                    onChange={handlePrices}
                                ></Pagination>
                            </Box>
                                :
                                null
                            }
                        
                    </>
                
            </Box>
        </>
    )
};

export default withWidth()(Prices);