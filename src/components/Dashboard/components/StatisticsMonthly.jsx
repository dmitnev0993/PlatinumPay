import React, { useContext } from "react";
import withWidth from "@material-ui/core/withWidth";
import { makeStyles, Box, Typography } from "@material-ui/core";
import { ThemeContext } from "../../../context/themeContext";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const StatisticsMonthly = ({ width }) => {
    const { currentTheme } = useContext(ThemeContext);

    const useStyles = makeStyles((theme) => ({
        contStatistics: {
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : '',
            width: width === 'lg' ? '18vw' : width === 'xl' ? '20vw' : width === 'md' ? '37vw' : width === 'sm' ? '100vw' : '100vw',
            padding: '15px',
            margin:'10px 10px',
            border: currentTheme === 'dark' ? '1px solid #232135' : 'none',
            borderRadius:'5px',
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

    // const formatXAxis = (tickItem) => {
    //     return tickItem.fill = 'red'
    //   }

    const createLine = data => {
        return (
            <ResponsiveContainer width='98%' height={200} >
                <LineChart
                data={dataLine}
                
            >
                <CartesianGrid horizontal={false} stroke="rgb(174, 174, 224)" strokeDasharray="1 2" />
                <XAxis dataKey="name" interval={0} tickLine={false} axisLine={false} />
                <Tooltip itemStyle={{color:'rgb(117, 117, 163)'}} />
                <Line type='monotone' dataKey='uv' stroke='#4b7cf3' strokeWidth="4px" />
            </LineChart>
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
                marginTop: '25px',
                width: width === 'xs' ? 'calc(100vw - 35px)' : 'calc(100vw - 145px)',
            }}>
                <Typography variant={width === 'xs' ? 'h6' : 'h5'} style={{
                    color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                    paddingBottom: '20px',
                    marginLeft:'10px'
                }}>
                    Статистика за месяц
              </Typography>
                <Box style={{
                    width: width === 'xs' ? 'calc(100vw - 35px)' : 'calc(100vw - 145px)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
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
                            <Typography variant={width === 'xs' ? 'h5' : 'h4'}>78,367</Typography>
                            <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'}>Всего продаж</Typography>
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
                            <Typography variant={width === 'xs' ? 'h5' : 'h4'}>+90%</Typography>
                            <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'}>Рост продаж</Typography>
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
                            <Typography variant={width === 'xs' ? 'h5' : 'h4'}>900</Typography>
                            <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'}>Завершено</Typography>
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
                            <Typography variant={width === 'xs' ? 'h5' : 'h4'}>$78.62M</Typography>
                            <Typography variant={width === 'xs' ? 'subtitle2' : 'h6'}>Оплачено в крипте</Typography>
                        </Box>
                        <Box>{createLine}</Box>


                    </Box>

                </Box>


            </Box>
        </>
    );
};

export default withWidth()(StatisticsMonthly);