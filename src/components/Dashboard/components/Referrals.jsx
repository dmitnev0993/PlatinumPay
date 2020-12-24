import React, { useContext } from "react";
import withWidth from "@material-ui/core/withWidth";
import { makeStyles, Typography } from "@material-ui/core";
import { ThemeContext } from "../../../context/themeContext";
import { DataGrid } from '@material-ui/data-grid';

const Referrals = ({ width }) => {
    const { currentTheme } = useContext(ThemeContext);

    const useStyles = makeStyles((theme) => ({
        grid: {
            
            '& .MuiIconButton-label': {
                color: currentTheme === 'dark' ? '#aeaee0' : '#595c97'
            },
            '& .MuiDataGrid-root .MuiDataGrid-cellRight': {
                textAlign: 'left'
            },
            '& .MuiDataGrid-root .MuiDataGrid-cell': {
                border: 'none'
            },
            '& .MuiDataGrid-root .MuiDataGrid-colCellTitleContainer': {
                justifyContent: 'center'
            },
            '& .MuiDataGrid-root .MuiDataGrid-colCellRight .MuiDataGrid-colCellTitleContainer': {
                justifyContent: 'center'
            },
            '& .MuiDataGrid-colCell-draggable': {
                width: '100vw',
                display: 'flex',
                justifyContent: 'center'
            },
            '& .MuiTablePagination-root': {
                color: currentTheme === 'dark' ? '#aeaee0!important' : '#595c97!important'
            },
            '& .MuiDataGrid-root': {
                border: 'none',
                color: currentTheme === 'dark' ? '#aeaee0!important' : '#595c97!important',
                backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                margin: '15px',
                fontSize: width === 'xs' ? '15px' : width === 'sm' ? '15px' : width === 'md' ? '15px' : '21px',
                
            },
            '& .MuiDataGrid-root .MuiDataGrid-window':{
                '&::-webkit-scrollbar':{
                    width: '5px',
                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : 'white',
                    
                  },
                  '&::-webkit-scrollbar-thumb':{
                    backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : '#c8c4db', 
                  }
            }
        }
    }));


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 200 },
        { field: 'lastName', headerName: 'Last name', width: 200 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 230,
            valueGetter: (params) =>
                `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
        },
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

    const classes = useStyles();

    return (
        <>
        <Typography variant={width === 'xs' ? 'h6' : 'h5'} style={{
                    color: currentTheme === 'dark' ? '#aeaee0' : 'black',
                    
                    
                    margin: '20px 10px',
                    // borderBottom:'1px solid rgb(174, 174, 224)'
                }}>
                    Последние рефералы
              </Typography>


                    <div className={classes.grid} style={{
                         height: 400, 
                         width: width === 'xs' ? 'calc(100vw - 60px)' : 'calc(100vw - 170px)',
                         marginBottom:'25px'
                         }}>
                        <DataGrid rows={rows} columns={columns} pageSize={5} />
                    </div>

        </>
    );
};

export default withWidth()(Referrals);