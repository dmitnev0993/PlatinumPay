import React, { useContext } from "react";
import withWidth from "@material-ui/core/withWidth";
import { makeStyles, Box, Typography, Divider, Icon } from "@material-ui/core";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { ThemeContext } from "../../../context/themeContext";

const Cards = ({ width }) => {
    const { currentTheme } = useContext(ThemeContext);

    const useStyles = makeStyles((theme) => ({
        cards: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: currentTheme === 'dark' ? '#aeaee0' : 'black',
            position: 'relative',
            padding: '25px',
            backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : '',
            width: width === 'lg' ? '24vw' : width === 'xl' ? '25vw' : width === 'md' ? '100vw' : width === 'sm' ? '100vw' : '100vw',
            border: currentTheme === 'dark' ? '1px solid #232135' : 'none',
            margin: '10px',
            borderRadius:'5px',
        }
    }));


    const classes = useStyles();

    return (
        <>
            <Box style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                width: width === 'xs' ? 'calc(100vw - 35px)' : 'calc(100vw - 145px)',
            }}>

                <Typography variant={width === 'xs' ? 'h6' : 'h5'} style={{
                    color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                    paddingBottom: '20px',
                    marginLeft: '10px'
                }}>
                    Ваши карточки
              </Typography>

                <Box style={{
                    width: width === 'xs' ? 'calc(100vw - 35px)' : 'calc(100vw - 145px)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap'
                }}>

                    <Box
                        className={classes.cards}
                    >

                        <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'} style={{
                            position: 'absolute',
                            top: '13px',
                            right: '-15px',
                            backgroundColor: '#41b883',
                            color: '#fff',
                            padding: '0px 5px',
                            borderRadius: '4px'
                        }}>
                            $560,245.35
                        </Typography>

                        <Icon style={{
                            width: 'auto',
                            height: 'auto',
                            marginBottom: '15px'
                        }}>
                            <StarBorderIcon style={{
                                fontSize: width === 'xs' ? '40px' : '70px',
                                color: currentTheme === 'light' ? '#595c97' : ''
                            }}></StarBorderIcon>
                        </Icon>

                        <Typography variant={width === 'xs' ? 'h5' : 'h4'} style={{ marginBottom: '5px' }}>David Beckham</Typography>
                        <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'} style={{ marginBottom: '15px',color: currentTheme === 'light' ? '#595c97' : '' }}>8748-XXXX-1678-5416</Typography>
                        <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'} style={{color: currentTheme === 'light' ? '#595c97' : ''}}>MASTERCARD</Typography>
                        <Divider style={{
                            backgroundColor: currentTheme === 'dark' ? '#232135' : 'white',
                            margin: '20px 0px',
                            width: '100%'
                        }} />
                        <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'} style={{color: currentTheme === 'light' ? '#595c97' : ''}}>Expires at 03/22</Typography>
                    </Box>


                    <Box
                        className={classes.cards}
                    >

                        <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'} style={{
                            position: 'absolute',
                            top: '13px',
                            right: '-15px',
                            backgroundColor: '#41b883',
                            color: '#fff',
                            padding: '0px 5px',
                            borderRadius: '4px'
                        }}>
                            $560,245.35
                        </Typography>

                        <Icon style={{
                            width: 'auto',
                            height: 'auto',
                            marginBottom: '15px'
                        }}>
                            <StarBorderIcon style={{
                                fontSize: width === 'xs' ? '40px' : '70px',
                                color: currentTheme === 'light' ? '#595c97' : ''
                            }}></StarBorderIcon>
                        </Icon>

                        <Typography variant={width === 'xs' ? 'h5' : 'h4'} style={{ marginBottom: '5px' }}>David Beckham</Typography>
                        <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'} style={{ marginBottom: '15px',color: currentTheme === 'light' ? '#595c97' : '' }}>8748-XXXX-1678-5416</Typography>
                        <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'} style={{color: currentTheme === 'light' ? '#595c97' : ''}}>MASTERCARD</Typography>
                        <Divider style={{
                            backgroundColor: currentTheme === 'dark' ? '#232135' : 'white',
                            margin: '20px 0px',
                            width: '100%'
                        }} />
                        <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'} style={{color: currentTheme === 'light' ? '#595c97' : ''}}>Expires at 03/22</Typography>
                    </Box>



                    <Box
                        className={classes.cards}
                    >

                        <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'} style={{
                            position: 'absolute',
                            top: '13px',
                            right: '-15px',
                            backgroundColor: '#41b883',
                            color: '#fff',
                            padding: '0px 5px',
                            borderRadius: '4px'
                        }}>
                            $560,245.35
                        </Typography>

                        <Icon style={{
                            width: 'auto',
                            height: 'auto',
                            marginBottom: '15px'
                        }}>
                            <StarBorderIcon style={{
                                fontSize: width === 'xs' ? '40px' : '70px',
                                color: currentTheme === 'light' ? '#595c97' : ''
                            }}></StarBorderIcon>
                        </Icon>

                        <Typography variant={width === 'xs' ? 'h5' : 'h4'} style={{ marginBottom: '5px' }}>David Beckham</Typography>
                        <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'} style={{ marginBottom: '15px',color: currentTheme === 'light' ? '#595c97' : '' }}>8748-XXXX-1678-5416</Typography>
                        <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'} style={{color: currentTheme === 'light' ? '#595c97' : ''}}>MASTERCARD</Typography>
                        <Divider style={{
                            backgroundColor: currentTheme === 'dark' ? '#232135' : 'white',
                            margin: '20px 0px',
                            width: '100%'
                        }} />
                        <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'} style={{color: currentTheme === 'light' ? '#595c97' : ''}}>Expires at 03/22</Typography>
                    </Box>

                </Box>
            </Box>
        </>
    );
};

export default withWidth()(Cards);