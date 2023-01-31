import EnhancedMuiTable from '../../ui-component/tables/EnhancedMuiTable';
import CustomMaterialReactTable from '../../ui-component/tables/CustomMaterialReactTable';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

import { gridSpacing } from '../../redux/constants/constant';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import BuildingTable from './NotificationTable';
import NotificationTable from './NotificationTable';

// import MUIDataTable from 'mui-datatables';
//
// const columns = ['Name', 'Company', 'City', 'State'];
//
// const data = [
//     ['Joe James', 'Test Corp', 'Yonkers', 'NY'],
//     ['John Walsh', 'Test Corp', 'Hartford', 'CT'],
//     ['Bob Herm', 'Test Corp', 'Tampa', 'FL'],
//     ['James Houston', 'Test Corp', 'Dallas', 'TX']
// ];
//
// const options = {
//     filterType: 'checkbox'
// };
//
// const Building = () => <MUIDataTable title={'Employee List'} data={data} columns={columns} options={options} />;

const ManageNotification = () => {
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h3" gutterBottom>
                    QUẢN THÔNG BÁO
                </Typography>
            </Stack>
            <NotificationTable />;
        </>
    );
};

export default ManageNotification;
