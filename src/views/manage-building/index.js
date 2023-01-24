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
import BuildingTable from './BuildingTable';

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

const ManageBuilding = () => {
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h3" gutterBottom>
                    QUẢN LÝ TÒA NHÀ
                </Typography>
            </Stack>
            <BuildingTable />;
        </>
    );
};

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250
//         }
//     }
// };
//
// function getStyles(type, buildingType, theme) {
//     return {
//         fontWeight: buildingType.indexOf(type) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
//     };
// }
//
// const buildingTypes = ['Khu B1', 'Khu B3', 'Khu B5', 'Khu B5B', 'Khu B6', 'Khu B7', 'Khu B8', 'Khu B9', 'Khu B13', 'Khu B13B'];
// const ManageBuilding = () => {
//     const theme = useTheme();
//     const [buildingType, setBuildingType] = useState([]);
//
//     const handleChange = (event) => {
//         const {
//             target: { value }
//         } = event;
//         setBuildingType(
//             // On autofill we get a stringified value.
//             typeof value === 'string' ? value.split(',') : value
//         );
//     };
//     return (
//         <Grid container spacing={gridSpacing}>
//             <Grid item xs={4} md={6}>
//                 <FormControl fullWidth={true}>
//                     <Select
//                         multiple
//                         displayEmpty
//                         value={buildingType}
//                         onChange={handleChange}
//                         input={<OutlinedInput />}
//                         renderValue={(selected) => {
//                             if (selected.length === 0) {
//                                 return <em>- Dãy khu kí túc xá -</em>;
//                             }
//
//                             return selected.join(', ');
//                         }}
//                         MenuProps={MenuProps}
//                         inputProps={{ 'aria-label': 'Without label' }}
//                     >
//                         <MenuItem disabled value="">
//                             <em>- Dãy khu kí túc xá -</em>
//                         </MenuItem>
//                         {buildingTypes.map((type) => (
//                             <MenuItem key={type} value={type} style={getStyles(type, buildingType, theme)}>
//                                 {type}
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>
//             </Grid>
//         </Grid>
//     );
// };
export default ManageBuilding;
