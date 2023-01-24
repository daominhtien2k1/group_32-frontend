import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Grid, Stack } from '@mui/material';
import { Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import { gridSpacing } from '../../redux/constants/constant';
import { Outlet, useNavigate } from 'react-router-dom';

const MenuProps = {
    PaperProps: {
        style: {
            overflowY: 'scroll',
            height: '200px'
        }
    }
};

const RequestRoom = () => {
    const [building, setBuilding] = useState('B1');
    const [floor, setFloor] = useState(1);
    const theme = useTheme();
    const navigate = useNavigate();
    const handleChangeBuilding = (event) => {
        setBuilding(event.target.value);
    };
    const handleChangeFloor = (event) => {
        setFloor(event.target.value);
    };

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h3" gutterBottom>
                    TRANG THÔNG TIN ĐĂNG KÍ PHÒNG Ở KÝ TÚC XÁ ĐẠI HỌC BÁCH KHOA HÀ NỘI
                </Typography>
            </Stack>
            <Grid container spacing={gridSpacing} mb={4}>
                <Grid item xs={2} md={2}>
                    <FormControl fullWidth>
                        <InputLabel id="building">Khu</InputLabel>
                        <Select
                            labelId="building-label"
                            id="building-value"
                            value={building}
                            label="Building"
                            onChange={handleChangeBuilding}
                            MenuProps={MenuProps}
                        >
                            <MenuItem value={'B1'}>B1</MenuItem>
                            <MenuItem value={'B3'}>B3</MenuItem>
                            <MenuItem value={'B5'}>B5</MenuItem>
                            <MenuItem value={'B5B'}>B5B</MenuItem>
                            <MenuItem value={'B7'}>B7</MenuItem>
                            <MenuItem value={'B9'}>B9</MenuItem>
                            <MenuItem value={'B13'}>B13</MenuItem>
                            <MenuItem value={'B13B'}>B13B</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2} md={2}>
                    <FormControl fullWidth>
                        <InputLabel id="floor">Tầng</InputLabel>
                        <Select
                            labelId="building-label"
                            id="building-value"
                            value={floor}
                            label="Tầng"
                            onChange={handleChangeFloor}
                            MenuProps={MenuProps}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2} md={2}>
                    <Button
                        variant="outlined"
                        sx={{
                            '&[aria-controls="menu-list-grow"],&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light,
                                borderColor: 'secondary.light'
                            },
                            borderColor: 'secondary.light',
                            backgroundColor: 'secondary.light',
                            color: theme.palette.secondary.dark
                        }}
                        onClick={() => {
                            navigate(`${building}/${floor}`);
                        }}
                    >
                        Tìm kiếm
                    </Button>
                </Grid>
            </Grid>
            <Outlet />
        </>
    );
};

export default RequestRoom;
