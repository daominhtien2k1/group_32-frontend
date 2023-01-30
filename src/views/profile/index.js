// material-ui
import { TextField, Box, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { backend_url } from '../../redux/backend_url.js';
import { updateProfile } from '../../redux/actions/UserActions.js';
// project imports
import MainCard from 'ui-component/cards/MainCard';
// ==============================|| SAMPLE PAGE ||============================== //

const Profile = () => {
    const [userInfo, setUserInfo] = useState(useSelector((state) => state.userLogin.userInfo));
    const { success } = useSelector((state) => state.userLogin);
    const dispatch = useDispatch();
    const handleChangeUserInfo = (e, field) => {
        setUserInfo((prevState) => ({
            ...prevState,
            [field]: e.target.value
        }));
    };
    const onUpdateProfile = () => {
        console.log('click update profile');
        dispatch(
            updateProfile({
                name: userInfo.name,
                studentCode: userInfo.studentCode
            })
        );
        if (success) {
            window.location.reload();
        }
    };
    return (
        <MainCard
            sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
            title="Thông tin cá nhân"
        >
            <div sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField
                        sx={{ p: 1 }}
                        id="outlined-name"
                        label="Họ và tên"
                        value={userInfo?.name ?? ''}
                        onChange={(e) => handleChangeUserInfo(e, 'name')}
                    />
                    <TextField sx={{ p: 1 }} id="outlined-k" label="Khóa" value={userInfo?.level ?? 'K64'} />
                    <TextField sx={{ p: 1 }} id="outlined-email" label="Email" value={userInfo?.email ?? ''} />
                    <TextField
                        sx={{ p: 1 }}
                        id="outlined-mssv"
                        label="Mã số sinh viên"
                        value={userInfo?.studentCode ?? ''}
                        onChange={(e) => handleChangeUserInfo(e, 'studentCode')}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField sx={{ p: 1 }} id="outlined-k" label="Số điện thoại" value={userInfo?.numberPhone ?? ''} />
                    <TextField sx={{ p: 1 }} id="outlined-mssv" label="Trạng thái thẻ" value="Lock" />
                    <TextField sx={{ p: 1 }} id="outlined-mssv" label="Dân tộc" value="Lock" />
                    <TextField sx={{ p: 1 }} id="outlined-mssv" label="Tôn giáo" value="Lock" />
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
                            <MenuItem value={10}>CNTT & TT</MenuItem>
                            <MenuItem value={20}>Dien, Dien tu</MenuItem>
                            <MenuItem value={30}>Ngoai ngu</MenuItem>
                            <MenuItem value={30}>Kinh te quan ly</MenuItem>
                            <MenuItem value={30}>Sinh hoc</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField sx={{ p: 1 }} id="outlined-mssv" label="Lớp hoặc ngành" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <FormControl sx={{ p: 1 }} fullWidth>
                        <InputLabel id="demo-simple-select-label">Loại hình thức đào tạo</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Loại hình thức đào tạo">
                            <MenuItem value={10}>Chương trình tiên tiến</MenuItem>
                            <MenuItem value={20}>Chương trình đại trà</MenuItem>
                            <MenuItem value={30}>Chương trình chất lượng cao</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img src="https://ssl.gstatic.com/onebox/media/sports/logos/srAAE0bOnCppUrlbJpFiHQ_96x96.png" alt="Logo" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button color="secondary" variant="contained" onClick={() => onUpdateProfile()}>
                        Sửa thông tin cá nhân
                    </Button>
                </Box>
            </div>
        </MainCard>
    );
};

export default Profile;
