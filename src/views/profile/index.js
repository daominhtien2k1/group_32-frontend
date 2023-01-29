// material-ui
import { TextField, Box, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// ==============================|| SAMPLE PAGE ||============================== //

const Profile = () => (
    <MainCard sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }} title="Thông tin cá nhân">
        <div sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <TextField sx={{ p: 1 }} id="outlined-name" label="Họ và tên" />
                <TextField sx={{ p: 1 }} id="outlined-k" label="Khóa" />
                <TextField sx={{ p: 1 }} id="outlined-email" label="Email" />
                <TextField sx={{ p: 1 }} id="outlined-mssv" label="Mã số sinh viên" />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <TextField sx={{ p: 1 }} id="outlined-k" label="Số điện thoại" />
                <TextField sx={{ p: 1 }} id="outlined-mssv" label="Trạng thái thẻ" />
                <TextField sx={{ p: 1 }} id="outlined-mssv" label="Dân tộc" />
                <TextField sx={{ p: 1 }} id="outlined-mssv" label="Tôn giáo" />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <FormControl sx={{ p: 1 }} fullWidth>
                    <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Giới tính">
                        <MenuItem value={10}>Nam</MenuItem>
                        <MenuItem value={20}>Nữ</MenuItem>
                        <MenuItem value={30}>Chưa xác định</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <FormControl sx={{ p: 1 }} fullWidth>
                    <InputLabel id="demo-simple-select-label">Viện/trường</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Viện/trường">
                        <MenuItem value={10}>Nam</MenuItem>
                        <MenuItem value={20}>Nữ</MenuItem>
                        <MenuItem value={30}>Chưa xác định</MenuItem>
                    </Select>
                </FormControl>
                <TextField sx={{ p: 1 }} id="outlined-mssv" label="Lớp hoặc ngành" />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <FormControl sx={{ p: 1 }} fullWidth>
                    <InputLabel id="demo-simple-select-label">Loại hình thức đào tạo</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Loại hình thức đào tạo">
                        <MenuItem value={10}>Nam</MenuItem>
                        <MenuItem value={20}>Nữ</MenuItem>
                        <MenuItem value={30}>Chưa xác định</MenuItem>
                    </Select>
                </FormControl>
                <TextField sx={{ p: 1 }} id="outlined-mssv" label="Khóa" />
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
