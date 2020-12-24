import React, { useContext } from "react";
import withWidth from "@material-ui/core/withWidth";
import { makeStyles, Box, Typography } from "@material-ui/core";
import { ThemeContext } from "../../../context/themeContext";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

const StatisticsToday = ({ width }) => {
    const { currentTheme } = useContext(ThemeContext);

    const useStyles = makeStyles((theme) => ({
        contStatistics: {
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : '',
            width: width === 'lg' ? '25vw' : width === 'xl' ? '27vw' : width === 'md' ? '100vw' : width === 'sm' ? '100vw' : '100vw',
            padding: '15px',
            margin: '10px 10px',
            border: currentTheme === 'dark' ? '1px solid #232135' : 'none',
            height:'80px',
            position:'relative',
            borderRadius:'5px',
            '& .recharts-responsive-container':{
                position:'absolute',
                bottom:'-5px',
                right:'-5px'
            }
        }
    }));

    const dataLine = [
        { name: 'A', uv: 2300, pv: 2400 },
        { name: 'B', uv: 2500, pv: 2300 },
        { name: 'C', uv: 2700, pv: 1800 },
        { name: 'D', uv: 5300, pv: 2400 },
        { name: 'E', uv: 4500, pv: 1900 },
        { name: 'F', uv: 3300, pv: 3400 },
        { name: 'G', uv: 2300, pv: 2400 },
    ]

    const createLine = data => {
        return (
            <ResponsiveContainer className='resCont' width={width === 'xs' ? '40%' : '30%'} height={100} >
                <AreaChart   data={dataLine}
                >
                    <defs>
                        <linearGradient id="MyGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="rgba(0, 136, 254, 0.8)" />
                            <stop offset="95%" stopColor="rgba(0, 136, 254, 0)" />
                        </linearGradient>
                    </defs>
                    {/* <Tooltip /> */}
                    <Tooltip itemStyle={{color:'rgb(117, 117, 163)'}} />
                    <Area
                        type="monotone"
                        dataKey="uv"
                        stroke="#0088FE"
                        strokeWidth="2"
                        fillOpacity="1"
                        fill={currentTheme === 'dark' ? "rgba(75,124,243,.1)" : 'white'}
                        dot
                    />
                </AreaChart>
            </ResponsiveContainer>

        )
    }

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
                    Сегодняшняя статистика
              </Typography>
                <Box style={{
                    width: width === 'xs' ? 'calc(100vw - 35px)' : 'calc(100vw - 145px)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap'
                }}>

                    <Box
                        className={classes.contStatistics}
                    >
                        <Box style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                        }}>
                            <Typography variant={width === 'xs' ? 'h5' : 'h4'}>1240</Typography>
                            <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'}>Транзакций</Typography>
                        </Box>
                        <Box>{createLine}</Box>
                    </Box>

                    <Box
                        className={classes.contStatistics}
                    >
                        <Box style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                        }}>
                            <Typography variant={width === 'xs' ? 'h5' : 'h4'}>$256.12</Typography>
                            <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'}>Доход</Typography>
                        </Box>
                        <Box>{createLine}</Box>
                    </Box>

                    <Box
                        className={classes.contStatistics}
                    >
                        <Box style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                        }}>
                            <Typography variant={width === 'xs' ? 'h5' : 'h4'}>$56.12</Typography>
                            <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'}>Результат</Typography>
                        </Box>
                        <Box>{createLine}</Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default withWidth()(StatisticsToday);