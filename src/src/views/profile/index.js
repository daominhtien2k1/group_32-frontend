// material-ui
import { TextField, Box, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backend_url } from '../../redux/backend_url.js';
import { updateProfile } from '../../redux/actions/UserActions.js';
// project imports
import MainCard from 'ui-component/cards/MainCard';
// ==============================|| SAMPLE PAGE ||============================== //

const Profile = () => {
    const [userInfo, setUserInfo] = useState(useSelector((state) => state.userLogin.userInfo));
    console.log(userInfo);
    const dispatch = useDispatch();

    const handleChangeUserInfo = (e, field) => {
        setUserInfo((prevState) => ({
            ...prevState,
            [field]: e.target.value
        }));
    };
    const onUpdateProfile = () => {
        console.log(userInfo);
        dispatch(
            updateProfile({
                name: userInfo?.name ?? '',
                studentCode: userInfo?.studentCode ?? '',
                generation: userInfo?.generation ?? '',
                phoneNumber: userInfo?.phoneNumber ?? '',
                ethnic: userInfo?.ethnic ?? '',
                religion: userInfo?.religion ?? '',
                gender: userInfo?.gender ?? '',
                faculty: userInfo?.faculty ?? '',
                majors: userInfo?.majors ?? ''
            })
        );
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
                    <TextField
                        sx={{ p: 1 }}
                        id="outlined-k"
                        label="Khóa"
                        value={userInfo?.generation ?? ''}
                        onChange={(e) => handleChangeUserInfo(e, 'generation')}
                    />
                    <TextField sx={{ p: 1 }} disabled={true} id="outlined-email" label="Email" value={userInfo?.email ?? ''} />
                    <TextField
                        sx={{ p: 1 }}
                        id="outlined-mssv"
                        label="Mã số sinh viên"
                        value={userInfo?.studentCode ?? ''}
                        onChange={(e) => handleChangeUserInfo(e, 'studentCode')}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField
                        sx={{ p: 1 }}
                        id="outlined-k"
                        label="Số điện thoại"
                        value={userInfo?.phoneNumber ?? ''}
                        onChange={(e) => handleChangeUserInfo(e, 'phoneNumber')}
                    />
                    <FormControl sx={{ p: 1 }} fullWidth>
                        <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Giới tính"
                            value={userInfo?.gender ?? ''}
                            onChange={(e) => handleChangeUserInfo(e, 'gender')}
                        >
                            <MenuItem value={'nam'}>Nam</MenuItem>
                            <MenuItem value={'nữ'}>Nữ</MenuItem>
                            <MenuItem value={'chưa xác định'}>Chưa xác định</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        sx={{ p: 1 }}
                        id="outlined-mssv"
                        label="Dân tộc"
                        value={userInfo?.ethnic ?? ''}
                        onChange={(e) => handleChangeUserInfo(e, 'ethnic')}
                    />
                    <TextField
                        sx={{ p: 1 }}
                        id="outlined-mssv"
                        label="Tôn giáo"
                        value={userInfo?.religion ?? ''}
                        onChange={(e) => handleChangeUserInfo(e, 'religion')}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <FormControl sx={{ p: 1 }} fullWidth>
                        <InputLabel id="demo-simple-select-label">Viện/trường</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Viện/trường"
                            value={userInfo?.faculty ?? ''}
                            onChange={(e) => handleChangeUserInfo(e, 'faculty')}
                        >
                            <MenuItem value={'CNTT & TT'}>CNTT & TT</MenuItem>
                            <MenuItem value={'Điện, Điện tử'}>Điện, Điện tử</MenuItem>
                            <MenuItem value={'Ngoại ngữ'}>Ngoại ngữ</MenuItem>
                            <MenuItem value={'Kinh tế'}>Kinh tế</MenuItem>
                            <MenuItem value={'Sinh học'}>Sinh học</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        sx={{ p: 1 }}
                        id="outlined-mssv"
                        label="Lớp hoặc ngành"
                        value={userInfo?.majors ?? ''}
                        onChange={(e) => handleChangeUserInfo(e, 'majors')}
                    />
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
