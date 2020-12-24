import React, { useContext } from "react";
import withWidth from "@material-ui/core/withWidth";
import { makeStyles, Box, Typography, Divider, Icon } from "@material-ui/core";
import DnsIcon from '@material-ui/icons/Dns';
import { ThemeContext } from "../../../context/themeContext";

const Accounts = ({ width }) => {
    const { currentTheme } = useContext(ThemeContext);

    const useStyles = makeStyles((theme) => ({
        acc: {
            display:'flex',
            flexWrap:'wrap',
            flexDirection:'column',
            justifyContent:'center',
            color: currentTheme === 'dark' ? '#aeaee0' : 'black',
            position: 'relative',
            padding: '25px',
            backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : '',
            width: width === 'lg' ? '38vw' : width === 'xl' ? '41vw' : width === 'md' ? '100vw' : width === 'sm' ? '100vw' : '100vw',
            border: currentTheme === 'dark' ? '1px solid #232135' : 'none',
            margin: '10px', 
            borderRadius:'5px',
            fontFamily:'"Mukta",sans-serif'
        }
    }));

    const classes = useStyles();

    return (
        <>
            <Box style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                marginTop: '25px',
                width: width === 'xs' ? 'calc(100vw - 35px)' : 'calc(100vw - 145px)',
            }}>
                <Typography variant={width === 'xs' ? 'h6' : 'h5'} style={{
                    color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                    paddingBottom: '20px',
                    marginLeft:'10px'
                }}>
                    Ваши аккаунты
              </Typography>
                <Box style={{
                    width: width === 'xs' ? 'calc(100vw - 35px)' : 'calc(100vw - 145px)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                }}>


                   <Box 
                   className={classes.acc}
                   >
                       <Box style={{
                           display:'flex',
                           justifyContent:'space-between',
                           width:'100%'
                       }}>
                           <Box style={{
                               display:'flex',
                               flexDirection:'column',
                               justifyContent:'center',
                               alignItems:'center',
                               flexWrap:'wrap'
                           }}>
                               <Typography variant={width === 'xs' ? 'h6' : 'h5'} style={{width:'100%'}}>US 4658-1657-1235</Typography>
                               <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'} style={{width:'100%',color: currentTheme === 'light' ? '#595c97' : ''}}>$2,156.78</Typography>
                           </Box>
                           <Icon style={{
                            width: 'auto',
                            height: 'auto',
                           
                        }}>
                            <DnsIcon style={{
                                color: currentTheme === 'light' ? '#595c97' : '',
                                fontSize: width === 'xs' ? '30px' : '50px'
                            }}></DnsIcon>
                        </Icon>
                       </Box>

                       <Divider style={{
                            backgroundColor: currentTheme === 'dark' ? '#232135' : 'white',
                            margin: '20px 0px',
                            width: '100%'
                        }} />

                       <Typography variant='subtitle2' style={{color: currentTheme === 'light' ? '#595c97' : '',textAlign:'center'}}>
                       Current month charged: 12,136.78
                       </Typography>
                   </Box>

                   <Box 
                   className={classes.acc}
                   >
                       <Box style={{
                           display:'flex',
                           justifyContent:'space-between',
                           width:'100%'
                       }}>
                           <Box style={{
                               display:'flex',
                               flexDirection:'column',
                               justifyContent:'center',
                               alignItems:'center',
                               flexWrap:'wrap'
                           }}>
                               <Typography variant={width === 'xs' ? 'h6' : 'h5'} style={{width:'100%'}}>US 4658-1657-1235</Typography>
                               <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'} style={{width:'100%',color: currentTheme === 'light' ? '#595c97' : ''}}>$2,156.78</Typography>
                           </Box>
                           <Icon style={{
                            width: 'auto',
                            height: 'auto',
                           
                        }}>
                            <DnsIcon style={{
                                color: currentTheme === 'light' ? '#595c97' : '',
                                fontSize: width === 'xs' ? '30px' : '50px'
                            }}></DnsIcon>
                        </Icon>
                       </Box>

                       <Divider style={{
                            backgroundColor: currentTheme === 'dark' ? '#232135' : 'white',
                            margin: '20px 0px',
                            width: '100%'
                        }} />

                       <Typography variant='subtitle2' style={{color: currentTheme === 'light' ? '#595c97' : '',textAlign:'center'}}>
                       Current month charged: 12,136.78
                       </Typography>
                   </Box>


                   <Box 
                   className={classes.acc}
                   >
                       <Box style={{
                           display:'flex',
                           justifyContent:'space-between',
                           width:'100%'
                       }}>
                           <Box style={{
                               display:'flex',
                               flexDirection:'column',
                               justifyContent:'center',
                               alignItems:'center',
                               flexWrap:'wrap'
                           }}>
                               <Typography variant={width === 'xs' ? 'h6' : 'h5'} style={{width:'100%'}}>US 4658-1657-1235</Typography>
                               <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'} style={{width:'100%',color: currentTheme === 'light' ? '#595c97' : ''}}>$2,156.78</Typography>
                           </Box>
                           <Icon style={{
                            width: 'auto',
                            height: 'auto',
                           
                        }}>
                            <DnsIcon style={{
                                color: currentTheme === 'light' ? '#595c97' : '',
                                fontSize: width === 'xs' ? '30px' : '50px'
                            }}></DnsIcon>
                        </Icon>
                       </Box>

                       <Divider style={{
                            backgroundColor: currentTheme === 'dark' ? '#232135' : 'white',
                            margin: '20px 0px',
                            width: '100%'
                        }} />

                       <Typography variant='subtitle2' style={{color: currentTheme === 'light' ? '#595c97' : '',textAlign:'center'}}>
                       Current month charged: 12,136.78
                       </Typography>
                   </Box>


                   <Box 
                   className={classes.acc}
                   >
                       <Box style={{
                           display:'flex',
                           justifyContent:'space-between',
                           width:'100%'
                       }}>
                           <Box style={{
                               display:'flex',
                               flexDirection:'column',
                               justifyContent:'center',
                               alignItems:'center',
                               flexWrap:'wrap'
                           }}>
                               <Typography variant={width === 'xs' ? 'h6' : 'h5'} style={{width:'100%'}}>US 4658-1657-1235</Typography>
                               <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'} style={{width:'100%',color: currentTheme === 'light' ? '#595c97' : ''}}>$2,156.78</Typography>
                           </Box>
                           <Icon style={{
                            width: 'auto',
                            height: 'auto',
                           
                        }}>
                            <DnsIcon style={{
                                color: currentTheme === 'light' ? '#595c97' : '',
                                fontSize: width === 'xs' ? '30px' : '50px'
                            }}></DnsIcon>
                        </Icon>
                       </Box>

                       <Divider style={{
                            backgroundColor: currentTheme === 'dark' ? '#232135' : 'white',
                            margin: '20px 0px',
                            width: '100%'
                        }} />

                       <Typography variant='subtitle2' style={{color: currentTheme === 'light' ? '#595c97' : '',textAlign:'center'}}>
                       Current month charged: 12,136.78
                       </Typography>
                   </Box>

                </Box>


            </Box>
        </>
    );
};

export default withWidth()(Accounts);