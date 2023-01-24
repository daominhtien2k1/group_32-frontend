// material-ui
import { Stack, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import OfficerTable from './OfficerTable';

const ManageOfficer = () => {
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h3" gutterBottom>
                    QUẢN LÝ CÁN BỘ
                </Typography>
            </Stack>
            <OfficerTable />
        </>
    );
};

export default ManageOfficer;
