import React, { useContext } from "react";
import withWidth from "@material-ui/core/withWidth";
import { makeStyles, Box, Typography, Icon } from "@material-ui/core";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { ThemeContext } from "../../../context/themeContext";

const Accounts = ({ width }) => {
    const { currentTheme } = useContext(ThemeContext);

    const useStyles = makeStyles((theme) => ({
        tran: {
            display:'flex',
            flexWrap:'wrap',
            flexDirection:'column',
            justifyContent:'center',
            color: currentTheme === 'dark' ? '#aeaee0' : 'black',
            backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : '',
            width: '100vw',
            border: currentTheme === 'dark' ? '1px solid #232135' : 'none',
            borderLeft:'5px #41b883 solid',
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
                marginTop: '25px',
                width: width === 'xs' ? 'calc(100vw - 35px)' : 'calc(100vw - 145px)',
            }}>
                <Typography variant={width === 'xs' ? 'h6' : 'h5'} style={{
                    color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                    paddingBottom: '20px',
                    marginLeft:'10px'
                }}>
                    Последние транзакции
              </Typography>
                <Box style={{
                    width: width === 'xs' ? 'calc(100vw - 35px)' : 'calc(100vw - 145px)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                }}>


                   <Box
                   className={classes.tran}
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
                               flexWrap:'wrap',
                               padding:'20px 20px'
                           }}>
                               <Typography variant={width === 'xs' ? 'h6' : 'h5'} style={{width:'100%'}}>+$10,264</Typography>
                               <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'} style={{width:'100%',color: currentTheme === 'light' ? '#595c97' : ''}}>4512-XXXX-1678-7528</Typography>
                           </Box>
                           <Icon style={{
                            width: 'auto',
                            height: 'auto',
                            display:'flex',
                            alignItems:'center',
                            marginRight:'10px',
                            
                        }}>
                            <ArrowBackIcon style={{
                                border:'4px #41b883 solid',
                                borderRadius:'35px',
                                fontSize: '35px',
                                color:'#41b883'
                            }}></ArrowBackIcon>
                        </Icon>
                       </Box>
                       <Box style={{
                           backgroundColor: currentTheme === 'dark' ? '#232135' : '',
                           alignItems:'center',
                           padding:'20px 10px'
                           }}>
                           <Typography variant='h7' style={{color: currentTheme === 'light' ? '#595c97' : ''}}>To DigitalOcean Cloud Hosting, Winnetka, LA</Typography>
                       </Box>
                   </Box>


                   <Box
                   className={classes.tran}
                   style={{
                    borderLeft:'5px red solid',
                   }}
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
                               flexWrap:'wrap',
                               padding:'20px 20px'
                           }}>
                               <Typography variant={width === 'xs' ? 'h6' : 'h5'} style={{width:'100%'}}>-$1,125</Typography>
                               <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'} style={{width:'100%',color: currentTheme === 'light' ? '#595c97' : ''}}>4512-XXXX-1678-7528</Typography>
                           </Box>
                           <Icon style={{
                            width: 'auto',
                            height: 'auto',
                            display:'flex',
                            alignItems:'center',
                            marginRight:'10px',
                            
                        }}>
                            <ArrowForwardIcon style={{
                                border:'4px red solid',
                                borderRadius:'35px',
                                fontSize: '35px',
                                color:'red'
                            }}></ArrowForwardIcon>
                        </Icon>
                       </Box>
                       <Box style={{
                           backgroundColor: currentTheme === 'dark' ? '#232135' : '',
                           alignItems:'center',
                           padding:'20px 10px'
                           }}>
                           <Typography variant='h7' style={{color: currentTheme === 'light' ? '#595c97' : ''}}>From Tesla Cars, Inc</Typography>
                       </Box>
                   </Box>


                   <Box
                   className={classes.tran}
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
                               flexWrap:'wrap',
                               padding:'20px 20px'
                           }}>
                               <Typography variant={width === 'xs' ? 'h6' : 'h5'} style={{width:'100%'}}>+$10,264</Typography>
                               <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'} style={{width:'100%',color: currentTheme === 'light' ? '#595c97' : ''}}>4512-XXXX-1678-7528</Typography>
                           </Box>
                           <Icon style={{
                            width: 'auto',
                            height: 'auto',
                            display:'flex',
                            alignItems:'center',
                            marginRight:'10px',
                            
                        }}>
                            <ArrowBackIcon style={{
                                border:'4px #41b883 solid',
                                borderRadius:'35px',
                                fontSize: '35px',
                                color:'#41b883'
                            }}></ArrowBackIcon>
                        </Icon>
                       </Box>
                       <Box style={{
                           backgroundColor: currentTheme === 'dark' ? '#232135' : '',
                           alignItems:'center',
                           padding:'20px 10px'
                           }}>
                           <Typography variant='h7' style={{color: currentTheme === 'light' ? '#595c97' : ''}}>To DigitalOcean Cloud Hosting, Winnetka, LA</Typography>
                       </Box>
                   </Box>


                   <Box
                   className={classes.tran}
                   style={{
                    borderLeft:'5px red solid',
                   }}
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
                               flexWrap:'wrap',
                               padding:'20px 20px'
                           }}>
                               <Typography variant={width === 'xs' ? 'h6' : 'h5'} style={{width:'100%'}}>-$1,125</Typography>
                               <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'} style={{width:'100%',color: currentTheme === 'light' ? '#595c97' : ''}}>4512-XXXX-1678-7528</Typography>
                           </Box>
                           <Icon style={{
                            width: 'auto',
                            height: 'auto',
                            display:'flex',
                            alignItems:'center',
                            marginRight:'10px',
                            
                        }}>
                            <ArrowForwardIcon style={{
                                border:'4px red solid',
                                borderRadius:'35px',
                                fontSize: '35px',
                                color:'red'
                            }}></ArrowForwardIcon>
                        </Icon>
                       </Box>
                       <Box style={{
                           backgroundColor: currentTheme === 'dark' ? '#232135' : '',
                           alignItems:'center',
                           padding:'20px 10px'
                           }}>
                           <Typography variant='h7' style={{color: currentTheme === 'light' ? '#595c97' : ''}}>From Tesla Cars, Inc</Typography>
                       </Box>
                   </Box>


                   

                </Box>


            </Box>
        </>
    );
};

export default withWidth()(Accounts);