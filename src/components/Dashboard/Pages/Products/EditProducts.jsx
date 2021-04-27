import React, { useContext, useState, useMemo, useEffect, useRef } from "react";
import Snackbar from 'node-snackbar';
import { useDispatch, useSelector } from 'react-redux';
import withWidth from "@material-ui/core/withWidth";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "../../../../context/themeContext";
import Cookies from 'js-cookie';
import Panel from "../../components/Panel";
import { Box, Button, IconButton, makeStyles, TextField, Typography, withStyles } from "@material-ui/core";
import { isCreated, setProduct } from "../../../../actions/actions";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { CircleSpinner } from "react-spinners-kit";


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

const EditProducts = ({ width }) => {
    console.log(width)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [loadingImg, setLoadingImg] = useState(false);


    const [fields, setFields] = useState([{
        price: '',
        url: ''
    }])
    const { currentTheme } = useContext(ThemeContext);
    const fileInput = useRef(null);
    const product = useSelector(state => state.product);
    const [productState, setProductState] = useState(product);
    const [state, setState] = useState({
        img: product.image ? product.image : null,
        imgId: product.imageId ? product.imageId : null
    })
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

    const add = () => {
        setFields([...fields, {
            price: '',
            url: ''
        }]);
    }

    const redirectPr = () => {
        myHistory.push('/dashboard/products')
    }


    useEffect(() => {
        if (product.title) {
            console.log(productState)
            return;
        }
        else {
            console.log(productState, 'BB')
            myHistory.push('/dashboard/products');
        }
    }, [])


    const updateProduct = () => {
        setLoading(true);
        const name = document.querySelector('#name').value;
        const description = document.querySelector('#description').value;
        const deductions = document.querySelector('#deductions').value;
        const url = document.querySelector('#url').value;

        var urlencoded = new URLSearchParams();
        urlencoded.append("productId", productState.productId);
        urlencoded.append("title", name);
        urlencoded.append("description", description);
        urlencoded.append("deductions", deductions);
        urlencoded.append("imageId", state.imgId);
        urlencoded.append("url", url);

        fetch('https://secure.platinumpay.cc/v1/client/products/editProduct', {
            method: 'POST', headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
            body: urlencoded
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                if (!data.errorMsg) {
                    dispatch(isCreated());
                    dispatch(setProduct({
                        ...product,
                        title: name,
                        description: description,
                        deductions: deductions,
                        imageId: state.imgId,
                        image: state.img,
                        url: url
                    }))
                    showMess('Продукт успешно изменен');
                    myHistory.push('/dashboard/products');
                }
                else {
                    showMess('Ошибка!');
                    myHistory.push('/dashboard/products');
                }
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                showMess('Ошибка');
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

    const minmax = (e) => {
        if (+e.target.value > 100) {
            e.target.value = 100;
        }
        if (+e.target.value < 0) {
            e.target.value = 0;
        }
    }

    useEffect(() => {
        console.log(state)
    }, [state])

    const fileUp = async (e) => {
        if (!e.target.files[0]) {
            return;
        }
        if (e.target.files[0].size > 5000000) {
            showMess('Файл слишком большой');
            return;
        }
        setLoadingImg(true);

        var file = e.target.files[0];

        // var reader = new FileReader();
        // reader.onloadend = async function () {
        //    await setState({
        //         ...state,
        //         img: e.target.files[0],
        //         src: reader.result
        //     });
        //     var img = await new Image();
        //     img.src = await reader.result;
        //    await setImgSt(img);
        // }
        // reader.readAsDataURL(file);
        var formData = new FormData();
        formData.append("image", file);
        fetch('https://secure.platinumpay.cc/v1/client/products/uploadImage', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            body: formData
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data);
                setState({
                    ...state,
                    img: data.response.image,
                    imgId: data.response.imageId,
                });
                setLoadingImg(false);
            })
            .catch(err => {
                console.log(err);
                setLoadingImg(false);
                showMess('Ошибка');
            });




    }
    // useEffect(() => {
    //     if (state.src) {
    //         const f = async () => {
    //             const canvass = await document.getElementById('canvas');
    //             var ctx = await canvass.getContext('2d');
    //             console.log(imgSt.width);
    //             const w1 = imgSt.width * 0.15;
    //             const h1 = imgSt.height * 0;
    //             const w2 = imgSt.width * 0.7;
    //             const h2 = imgSt.height;
    //             console.log(w1, h1, w2, h2)
    //             await ctx.drawImage(imgSt, w1, h1, w2, h2, 0, 0, 300, 300);
    //             console.log(imgSt.width);
    //         };
    //         f();
    //     }
    // }, [imgSt])

    return (
        <>
            <Panel></Panel>
            {width === 'xs' ?

                <IconButton
                    onClick={redirectPr}
                    style={{
                        position: 'fixed',
                        top: '85px',
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
                        top: '90px',
                        right: '15px',
                        color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                        zIndex: '100'
                    }}
                >
                    Вернуться назад
            </Button>}
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
                        justifyContent: 'flex-start'
                    }}
                >
                    <Box
                        style={{
                            width: '100%',
                            maxWidth: '700px',
                            textAlign: 'start'
                        }}
                    >
                        <Box
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: width === 'xs' ? 'center' : 'flex-start'
                            }}
                        >
                            <Typography
                                variant='h5'
                                style={{
                                    color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                                    margin: '0px'
                                }}
                            >
                                Редактировать продукт
                </Typography>
                        </Box>
                        <Typography
                            style={{
                                color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                                margin: '15px 0px 5px 0px'
                            }}
                        >
                            Название
                </Typography>
                        {currentTheme === 'dark' ?
                            <CssTextField
                                id="name"
                                placeholder="Название"
                                defaultValue={productState.title ? productState.title : undefined}
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
                                defaultValue={productState.title ? productState.title : undefined}
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
                                defaultValue={productState.description ? productState.description : undefined}
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
                                defaultValue={productState.description ? productState.description : undefined}
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
                            Отчисления партнерам
                </Typography>
                        {currentTheme === 'dark' ?
                            <CssTextField
                                id="deductions"
                                placeholder="Отчисления партнерам"
                                type='number'
                                onChange={minmax}
                                defaultValue={productState.deductions ? productState.deductions : undefined}
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
                                defaultValue={productState.deductions ? productState.deductions : undefined}
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
                            URL
                </Typography>
                        {currentTheme === 'dark' ?
                            <CssTextField
                                id="url"
                                placeholder="URL"
                                type='text'
                                defaultValue={productState.url ? productState.url : 'aaaaaaaa'}
                                required
                                style={{
                                    margin: '0px 0px 25px 0px',
                                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                    width: '100%'
                                }}
                            />
                            :
                            <CssTextField2
                                id="url"
                                placeholder="URL"
                                type='text'
                                defaultValue={productState.url ? productState.url : 'aaaaaaaa'}
                                required
                                style={{
                                    margin: '0px 0px 25px 0px',
                                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                                    width: '100%',
                                    border: '1px solid #e4e9f0'
                                }}
                            />}


                        {/* <Typography
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
                        />} */}






                        <Typography
                            variant='h6'
                            style={{
                                color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black',
                                margin: '0px 0px 10px 0px'
                            }}
                        >
                            Изменить изображение
                </Typography>

                        <Box
                            style={{
                                display: 'flex',
                                flexDirection: width === 'xs' ? 'column' : 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                marginBottom: '25px'
                            }}
                        >
                            <input type='file'
                                ref={fileInput}
                                onChange={fileUp}
                                style={{
                                    display: 'none',
                                }}
                            />
                            {
                                !loadingImg ?

                                    !state.img ?
                                        <button
                                            onClick={() => { fileInput.current.click() }}
                                            style={{
                                                backgroundColor: 'inherit',
                                                border: '2px dashed  rgb(151, 151, 151)',
                                                width: '300px',
                                                height: '300px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                color: currentTheme === 'dark' ? 'rgb(174, 174, 224)' : 'black'
                                            }}>
                                            Выберите файл
                        </button>
                                        :

                                        <img
                                            src={state.img}
                                            onClick={() => { fileInput.current.click() }}
                                            style={{
                                                width: '300px',
                                                height: '300px',
                                                cursor: 'pointer',
                                            }}
                                        />


                                    :

                                    <Box
                                        style={{
                                            width: '300px',
                                            height: '300px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <CircleSpinner
                                            size={18}
                                            color={currentTheme === 'dark' ? 'white' : 'black'}
                                            loading={loadingImg}
                                        />
                                    </Box>

                            }


                        </Box>

                        <Box
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                flexDirection: width === 'xs' ? 'column' : 'row',
                                paddingBottom: '20px'
                            }}
                        >
                            <Button
                                className={classes.butt}
                                variant="contained"
                                onClick={updateProduct}
                                style={{
                                    color: 'white',
                                    backgroundColor: 'rgb(75, 124, 243)',
                                    margin: width === 'xs' ? '10px 0px 7px 0px' : '10px 25px 7px 0px',
                                    borderRadius: '2px',
                                    fontSize: '15px',
                                    height: '45px',
                                    width: width === 'xs' ? '100%' : '50%',
                                    maxWidth: width === 'xs' ? '170px' : width === 'sm' ? '200px' : '250px',
                                    border: '0px',
                                    alignSelf: 'left',
                                    paddingBottom: '10px'
                                }}

                            >
                                Подтвердить
          </Button>
                            {/* <Button
                                className={classes.butt}
                                variant="contained"
                                onClick={redirectPr}
                                style={{
                                    color: 'white',
                                    backgroundColor: '#525252',
                                    margin: width === 'xs' ? '10px 0px 30px 0px' : '10px 25px 30px 0px',
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
                                Отменить
          </Button> */}
                        </Box>
                    </Box>
                </Box>
            }
        </>

    );
};

export default withWidth()(EditProducts);