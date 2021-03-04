import React, { useContext, useState, useMemo, useEffect } from "react";
import Selectrix from 'react-selectrix';
import ReactSelect, { Props } from "react-select";
import Snackbar from 'node-snackbar';
import { useDispatch, useSelector } from 'react-redux';
import withWidth from "@material-ui/core/withWidth";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "../../../../context/themeContext";
import Cookies from 'js-cookie';
import Panel from "../../components/Panel";
import { AppBar, Box, Button, Icon, InputBase, InputLabel, makeStyles, NativeSelect, Switch, Tab, Tabs, TextField, Typography, withStyles } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import { Alert, AlertTitle } from '@material-ui/lab';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { setData } from "../../../../actions/actions";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@material-ui/icons/Delete';


const CssTextField = withStyles({
    root: {
        '& .MuiFormHelperText-root': {
            backgroundColor: 'rgb(12, 12, 27)'
        },
        '& .MuiInputBase-input': {
            color: '#7575a3',
            height: '28px',
            backgroundColor: '#232135',
            padding: '8px'
        },
        // '& .MuiInputBase-input:focus': {
        //   outline:'2px solid #7575a3'
        // },
        '& .MuiInput-underline:hover': {
            outline: '2px solid #7575a3'
        },
        '& .MuiInput-underline:after': {
            display: 'none',
            borderBottomColor: '#7575a3',
        },
        '& .MuiInput-underline:focus-within': {
            outline: '2px solid #7575a3'
        },
        '& .MuiInput-underline:before': {
            display: 'none',
            borderBottomColor: '#7575a3',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#7575a3',
            },
            '&:hover fieldset': {
                borderColor: '#7575a3',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#7575a3',
            },
        },
    },
})(TextField);

const CssTextField2 = withStyles({
    root: {
        '& .MuiInputBase-input': {
            height: '28px',
            padding: '8px'
        },
        // '& .MuiInputBase-input:focus': {
        //   outline:'2px solid #78a3ff'
        // },
        '& .MuiInput-underline:hover': {
            outline: '1px solid #78a3ff'
        },
        '& .MuiInput-underline:after': {
            display: 'none',
            borderBottomColor: '#78a3ff',
        },
        '& .MuiInput-underline:focus-within': {
            outline: '1px solid #78a3ff'
        },
        '& .MuiInput-underline:before': {
            display: 'none',
            borderBottomColor: '#78a3ff',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#78a3ff',
            },
            '&:hover fieldset': {
                borderColor: '#78a3ff',
            },
            '& .Mui-focused fieldset': {
                borderColor: '#78a3ff',
            },
        },
    },
})(TextField);

const CssTextArea = withStyles({

    root: {

        '& .MuiFormHelperText-root': {
            backgroundColor: 'rgb(12, 12, 27)'
        },
        '& .MuiInputBase-input': {
            color: '#7575a3',
            height: '100px',
            backgroundColor: '#232135',
            padding: '8px',
            '&::-webkit-scrollbar': {
                width: '12px',


            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#32304b!important',
            },
        },
        // '& .MuiInputBase-input:focus': {
        //   outline:'2px solid #7575a3'
        // },
        '& .MuiInput-underline:hover': {
            outline: '2px solid #7575a3'
        },
        '& .MuiInput-underline:after': {
            display: 'none',
            borderBottomColor: '#7575a3',
        },
        '& .MuiInput-underline:focus-within': {
            outline: '2px solid #7575a3'
        },
        '& .MuiInput-underline:before': {
            display: 'none',
            borderBottomColor: '#7575a3',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#7575a3',
            },
            '&:hover fieldset': {
                borderColor: '#7575a3',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#7575a3',
            },
        },
    },
})(TextField);

const CssTextArea2 = withStyles({
    root: {
        '& .MuiInputBase-input': {
            height: '100px',
            padding: '8px',
            '&::-webkit-scrollbar': {
                width: '12px',


            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#c8c4db!important',
            },
        },
        // '& .MuiInputBase-input:focus': {
        //   outline:'2px solid #78a3ff'
        // },
        '& .MuiInput-underline:hover': {
            outline: '1px solid #78a3ff'
        },
        '& .MuiInput-underline:after': {
            display: 'none',
            borderBottomColor: '#78a3ff',
        },
        '& .MuiInput-underline:focus-within': {
            outline: '1px solid #78a3ff'
        },
        '& .MuiInput-underline:before': {
            display: 'none',
            borderBottomColor: '#78a3ff',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#78a3ff',
            },
            '&:hover fieldset': {
                borderColor: '#78a3ff',
            },
            '& .Mui-focused fieldset': {
                borderColor: '#78a3ff',
            },
        },
    },
})(TextField);

const showMess = (message) => {
    Snackbar.show({
        actionTextColor: '#7575a3',
        text: message,
        actionText: 'ОК',
        pos: 'bottom-right'
    });
  }

const CreateProduct = ({ width }) => {
    console.log(width)
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData);
    const [fields, setFields] = useState([{
        price: '',
        url: ''
    }])
    const { currentTheme } = useContext(ThemeContext);

    const useStyles = makeStyles(theme => ({
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
        }
    }));
    const classes = useStyles();

    const myHistory = useHistory();

    const [pageState, setPageState] = useState(1);
    const [val, setVal] = useState(undefined);
    const [dataProducts, setDataProducts] = useState({});


    const add = () => {
        setFields([...fields, {
            price: '',
            url: ''
        }]);
    }

    const del = (i) => {
        const copyArr = [...fields];
        copyArr.splice(i, 1);
        console.log(i, copyArr)
        setFields(copyArr);
    }

    const redirectPr = () => {
        myHistory.push('/dashboard/products')
    }

    const createProduct = () => {
        const name = document.querySelector('#name').value;
        const description = document.querySelector('#description').value;
        const url = document.querySelector('#url').value;
        const deductions = document.querySelector('#deductions').value;
        const prices = fields.map(item => (item.price));
        const urls = fields.map(item => (item.url));
        console.log(prices, url)

        var urlencoded = new URLSearchParams();
        urlencoded.append("title", name);
        urlencoded.append("description", description);
        urlencoded.append("url", url);
        urlencoded.append("deductions", deductions);
        for (let item of fields) {
            urlencoded.append("data[amount]", item.price);
            urlencoded.append("data[url]", item.url);
        }

        fetch('https://secure.platinumpay.cc/v1/client/products/createProduct', {
            method: 'POST', headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
            body: urlencoded
        })
            .then(res => {
                return res.json()
            })
            .then(data=>{
                if(!data.errorMsg){
                    showMess('Продукт успешно создан!')
                    myHistory.push('/dashboard/products');
                }
                else{
                    showMess('Ошибка!')
                }
            })

    }

    const setPrice = (e, i) => {
        let copyArr = [...fields];
        console.log(e.target.value, i, copyArr)
        copyArr[i].price = e.target.value;
        setFields(copyArr)
    }
    const setUrl = (e, i) => {
        let copyArr = [...fields];
        console.log(e.target.value, i, copyArr)
        copyArr[i].url = e.target.value;
        setFields(copyArr)
    }
    useEffect(() => {
        console.log(fields, 'SSSSSSSSSSSSSSSSSS')
    }, [fields])

    const minmax = (e)=>{
        if(+e.target.value > 100){
            e.target.value = 100;
        }
        if(+e.target.value < 0){
            e.target.value = 0;
        }
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
                    width: width === 'xs' ? 'calc(100vw - 77px)' : 'calc(100vw - 167px)',
                    paddingTop: '90px',
                    paddingLeft: width === 'xs' ? '15px' : '105px',
                    backgroundColor: currentTheme === 'light' ? 'white' : 'rgb(20, 19, 34)',
                    zIndex: '9',
                    textAlign: width === 'xs' ? 'center' : '',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Box
                    style={{
                        width: '100%',
                        maxWidth: '700px',
                        textAlign: 'start'
                    }}
                >
                    <Typography
                        style={{
                            color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                            margin: width === 'xs' ? '0px 0px 5px 0px' : '15px 0px 5px 0px'
                        }}
                    >
                        Название
                </Typography>
                    {currentTheme === 'dark' ?
                        <CssTextField
                            id="name"
                            placeholder="Название"
                            required
                            style={{
                                margin: '0px 0px 25px 0px',
                                backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                width: '100%'
                            }}
                        />
                        :
                        <CssTextField2
                            id="name"
                            placeholder="Название"
                            required
                            style={{
                                margin: '0px 0px 25px 0px',
                                backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                width: '100%',
                                border: '1px solid #e4e9f0'
                            }}
                        />}



                    <Typography
                        style={{
                            color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                            margin: '0px 0px 5px 0px'
                        }}
                    >
                        Описание
                </Typography>
                    {currentTheme === 'dark' ?
                        <CssTextArea
                            id="description"
                            placeholder="Описание"
                            multiline
                            rows={4}
                            required
                            style={{
                                margin: '0px 0px 25px 0px',
                                backgroundColor: currentTheme === 'dark' ? '#232135' : 'white',
                                width: '100%',
                            }}
                        />
                        :
                        <CssTextArea2
                            id="description"
                            placeholder="Описание"
                            multiline
                            rows={4}
                            required
                            style={{
                                margin: '0px 0px 25px 0px',
                                backgroundColor: currentTheme === 'dark' ? '#232135' : 'white',
                                width: '100%',
                                border: '1px solid #e4e9f0'
                            }}
                        />}

                    <Typography
                        style={{
                            color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                            margin: '0px 0px 5px 0px'
                        }}
                    >
                        URL
                </Typography>


                    {currentTheme === 'dark' ?
                        <CssTextField
                            id="url"
                            placeholder="URL"
                            required
                            style={{
                                margin: '0px',
                                backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                width: '100%'
                            }}
                        />
                        :
                        <CssTextField2
                            id="url"
                            placeholder="URL"
                            required
                            style={{
                                margin: '0px',
                                backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                width: '100%',
                                border: '1px solid #e4e9f0'
                            }}
                        />}



                    <Typography
                        style={{
                            color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                            margin: '25px 0px 5px 0px'
                        }}
                    >
                        Отчисления партнерам
                </Typography>
                    {currentTheme === 'dark' ?
                        <CssTextField
                            id="deductions"
                            placeholder="Отчисления партнерам"
                            type='number'
                            onChange={minmax}
                            required
                            style={{
                                margin: '0px 0px 25px 0px',
                                backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                width: '100%'
                            }}
                        />
                        :
                        <CssTextField2
                            id="deductions"
                            placeholder="Отчисления партнерам"
                            type='number'
                            onChange={minmax}
                            required
                            style={{
                                margin: '0px 0px 25px 0px',
                                backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                width: '100%',
                                border: '1px solid #e4e9f0'
                            }}
                        />}

                    <Typography
                        variant='h6'
                        style={{
                            color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                            margin: '0px 0px 10px 0px'
                        }}
                    >
                        Добавить апсейлы
                </Typography>

                    <Box
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            width: 'calc(100% + 57px)',
                            marginBottom: '25px'
                        }}
                    >

                        {fields.map((item, i) => (

                            <Box
                                key={i}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    alignItems: i === 0 ? 'flex-end' : 'center',
                                    marginBottom: '10px'
                                }}
                            >
                                <Box
                                    style={{
                                        width: '49%',
                                        display: 'flex',
                                        justifyContent: i === 0 ? 'flex-start' : 'center',
                                        alignItems: i === 0 ? 'flex-start' : 'baseline',
                                        marginRight: '7px',
                                        flexDirection: i === 0 ? 'column' : 'row',
                                    }}
                                >
                                    {i === 0 ?
                                        <Typography
                                            style={{
                                                color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                                                margin: '0px 10px 7px 0px'
                                            }}
                                        >
                                            Цена
                             </Typography>
                                        :
                                        null
                                    }
                                    {currentTheme === 'dark' ?
                                        <CssTextField
                                            placeholder="Цена"
                                            required
                                            value={fields[i].price}
                                            onChange={(e) => { setPrice(e, i) }}
                                            style={{
                                                margin: '0px',
                                                backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                                width: '100%'
                                            }}
                                        />
                                        :
                                        <CssTextField2
                                            placeholder="Цена"
                                            required
                                            value={fields[i].price}
                                            onChange={(e) => { setPrice(e, i) }}
                                            style={{
                                                margin: '0px',
                                                backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                                width: '100%',
                                                border: '1px solid #e4e9f0'
                                            }}
                                        />}
                                </Box>

                                <Box
                                    style={{
                                        width: '49%',
                                        display: 'flex',
                                        justifyContent: i === 0 ? 'flex-start' : 'center',
                                        alignItems: i === 0 ? 'flex-start' : 'baseline',
                                        marginRight: '7px',
                                        flexDirection: i === 0 ? 'column' : 'row',
                                    }}
                                >
                                    {i === 0 ?
                                        <Typography
                                            style={{
                                                color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                                                margin: '0px 0px 7px 0px'
                                            }}
                                        >
                                            URL
                                        </Typography>
                                        :
                                        null
                                    }
                                    {currentTheme === 'dark' ?
                                        <CssTextField
                                            placeholder="URL"
                                            value={fields[i].url}
                                            onChange={(e) => { setUrl(e, i) }}
                                            required
                                            style={{
                                                margin: '0px',
                                                backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                                width: '100%'
                                            }}
                                        />
                                        :
                                        <CssTextField2
                                            placeholder="URL"
                                            value={fields[i].url}
                                            onChange={(e) => { setUrl(e, i) }}
                                            required
                                            style={{
                                                margin: '0px',
                                                backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                                width: '100%',
                                                border: '1px solid #e4e9f0'
                                            }}
                                        />}
                                </Box>
                                {i === 0 ?
                                    <Icon
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            color: 'green',
                                            margin: '0px 0px 3px 10px',
                                            cursor: 'pointer'
                                        }}
                                        onClick={add}
                                    >
                                        <AddCircleOutlineIcon
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                        >

                                        </AddCircleOutlineIcon>
                                    </Icon>
                                    :
                                    <Icon
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            // backgroundColor: 'green',
                                            color: 'red',
                                            margin: '0px 0px 0px 10px',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => { del(i) }}
                                    >
                                        <HighlightOffIcon
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                        >

                                        </HighlightOffIcon>
                                    </Icon>

                                }



                            </Box>
                        ))}
                    </Box>
                    <Box
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            flexDirection: width === 'xs' ? 'column' : 'row',
                        }}
                    >
                        <Button
                            className={classes.butt}
                            variant="contained"
                            onClick={createProduct}
                            style={{
                                color: 'white',
                                backgroundColor: 'rgb(75, 124, 243)',
                                margin: width === 'xs' ? '10px 0px 7px 0px' : '10px 25px 7px 0px',
                                borderRadius: '2px',
                                fontSize: '15px',
                                height: '45px',
                                width: width === 'xs' ? '100%' : '50%',
                                maxWidth: width === 'sm' ? '150px' : '250px',
                                border: '0px',
                                alignSelf: 'left',
                                
                            }}

                        >
                            Подтвердить
          </Button>
                        <Button
                            className={classes.butt}
                            variant="contained"
                            onClick={redirectPr}
                            style={{
                                color: 'white',
                                backgroundColor: '#525252',
                                margin: width === 'xs' ? '10px 0px 7px 0px' : '10px 25px 7px 0px',
                                borderRadius: '2px',
                                fontSize: '15px',
                                height: '45px',
                                width: width === 'xs' ? '100%' : '50%',
                                maxWidth: width === 'sm' ? '150px' : '250px',
                                border: '0px',
                                alignSelf: 'left',
                                boxShadow: 'none',
                            }}

                        >
                            Отменить
          </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default withWidth()(CreateProduct);