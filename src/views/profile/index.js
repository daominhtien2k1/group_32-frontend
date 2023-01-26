// material-ui
import { TextField, Box, Button } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// ==============================|| SAMPLE PAGE ||============================== //

const Profile = () => (
    <MainCard title="Thông tin cá nhân">
        <div sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <TextField sx={{ p: 1 }} id="outlined-name" label="Họ và tên" />
                <TextField sx={{ p: 1 }} id="outlined-k" label="Số điện thoại" />
                <TextField sx={{ p: 1 }} id="outlined-mssv" label="Mã số sinh viên" />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <TextField sx={{ p: 1 }} id="outlined-email" label="Email" />
                <TextField sx={{ p: 1 }} id="outlined-password" label="Mật khẩu" />
                <TextField sx={{ p: 1 }} id="outlined-password" label="Nhập lại mật khẩu" />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <img src="https://ssl.gstatic.com/onebox/media/sports/logos/srAAE0bOnCppUrlbJpFiHQ_96x96.png" alt="Logo" />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button color="secondary" variant="contained">
                    Sửa thông tin cá nhân
                </Button>
            </Box>
        </div>
    </MainCard>
);

export default Profile;
