import RoomTypeTable from './RoomTypeTable';
import { Stack, Typography } from '@mui/material';

const ManageRoomType = () => {
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h3" gutterBottom>
                    QUẢN LÝ LOẠI PHÒNG
                </Typography>
            </Stack>
            <RoomTypeTable />
        </>
    );
};

export default ManageRoomType;
