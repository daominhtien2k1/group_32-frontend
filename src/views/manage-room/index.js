import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Card, CardContent, Divider, Grid, Input, InputAdornment, Stack, TextField } from '@mui/material';
import { Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import { gridSpacing } from '../../redux/constants/constant';
import MaterialReactTable from 'material-react-table';

const MenuProps = {
    PaperProps: {
        style: {
            overflowY: 'scroll',
            height: '200px'
        }
    }
};
const data = [
    {
        stt: 1,
        name: 'Đào Minh Tiến',
        mssv: 20190070,
        telephone: '0123456789'
    },
    {
        stt: 2,
        name: 'Đào Minh Tiến',
        mssv: 20190070,
        telephone: '0123456789'
    }
];

const FriendListTable = () => {
    const columns = [
        {
            accessorKey: 'stt',
            header: 'STT',
            size: 60
        },
        {
            accessorKey: 'name',
            header: 'Họ và tên',
            size: 120
        },
        {
            accessorKey: 'mssv',
            header: 'Mã số sinh viên',
            size: 120
        },
        {
            accessorKey: 'telephone',
            header: 'Điện thoại',
            size: 120
        }
    ];

    return (
        <>
            <MaterialReactTable
                muiTableProps={{
                    sx: {
                        tableLayout: 'fixed'
                    }
                }}
                columns={columns}
                data={data}
                enableColumnActions={false}
                enableColumnFilters={false}
                enablePagination={false}
                enableSorting={false}
                enableBottomToolbar={false}
                enableTopToolbar={false}
                muiTableBodyRowProps={{ hover: false }}
            />
        </>
    );
};
const ManageRoom = () => {
    const [building, setBuilding] = useState('B1');
    const [floor, setFloor] = useState(1);
    const theme = useTheme();
    const handleChangeBuilding = (event) => {
        setBuilding(event.target.value);
    };
    const handleChangeFloor = (event) => {
        setFloor(event.target.value);
    };
    const [isPaid, setIsPaid] = useState('Thanh toán');
    const handleChangeIsPaid = (event) => {
        setIsPaid(event.target.value);
    };

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h3" gutterBottom>
                    QUẢN LÝ PHÒNG VÀ HÓA ĐƠN PHÒNG
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
                        onClick={() => {}}
                    >
                        Tìm kiếm
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={gridSpacing}>
                <Grid container item spacing={gridSpacing} direction="column" xs={5} md={5}>
                    <Grid item>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography mb={1.5} variant="h3" component="div">
                                    Phòng kí túc xá: 401
                                </Typography>
                                <Typography sx={{ fontSize: 16, mb: 1 }} color="text.secondary" gutterBottom>
                                    Loại phòng: Phòng dịch vụ
                                </Typography>
                                <Typography sx={{ fontSize: 16, mb: 1 }} color="text.secondary" gutterBottom>
                                    Kiểu phòng: Nam
                                </Typography>
                                <Typography sx={{ fontSize: 16, mb: 1 }} color="text.secondary" gutterBottom>
                                    Số người hiện tại: 5
                                </Typography>
                                <Typography sx={{ fontSize: 16, mb: 1 }} color="text.secondary" gutterBottom>
                                    Số người tối đa: 8
                                </Typography>
                                <Typography sx={{ fontSize: 16, mb: 1 }} color="text.secondary" gutterBottom>
                                    Mô tả chi tiết: Phòng 6 bạn, có giường tầng, nhà vệ sinh khép kín
                                </Typography>
                                <Typography sx={{ fontSize: 16, mb: 1 }} color="text.secondary" gutterBottom>
                                    Tiền phòng tổng cộng (gói 6 tháng): 1.200.000
                                </Typography>
                                <Typography sx={{ fontSize: 16, mb: 1 }} color="text.secondary" gutterBottom>
                                    Hạn thanh toán: 25/2/2023
                                </Typography>
                                <Typography sx={{ fontSize: 16, mb: 1 }} color="text.secondary" gutterBottom>
                                    Hạn duy trì phòng: 25/8/2023
                                </Typography>
                                <Stack flexDirection="row">
                                    <Typography sx={{ fontSize: 16, width: 100 }} color="text.secondary" gutterBottom>
                                        Trạng thái:
                                    </Typography>
                                    <FormControl variant="standard" sx={{ width: 200 }}>
                                        <Select labelId="pay" id="pay" value={isPaid} onChange={handleChangeIsPaid}>
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={'Thanh toán'}>Thanh toán</MenuItem>
                                            <MenuItem value={'Chưa thanh toán'}>Chưa thanh toán</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography mb={1.5} variant="h3" component="div">
                                    Danh sách bạn cùng phòng
                                </Typography>
                                <FriendListTable />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container item xs={7} md={7}>
                    <Grid item xs={12} md={12}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography mb={1.5} variant="h3" component="div">
                                    Các khoản phí trong tháng
                                </Typography>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography mb={1.5} variant="h4" component="div">
                                            1. Phí lưu trú
                                        </Typography>
                                        <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                                            <Typography sx={{ fontSize: 16, mb: 1 }} color="text.secondary" gutterBottom>
                                                - Phí internet:
                                            </Typography>
                                            <FormControl variant="standard" sx={{ width: 120 }}>
                                                <Input
                                                    id="standard-adornment-money"
                                                    endAdornment={<InputAdornment position="end">đ</InputAdornment>}
                                                    aria-describedby="standard-money-helper-text"
                                                    inputProps={{
                                                        'aria-label': 'dong'
                                                    }}
                                                />
                                            </FormControl>
                                        </Stack>
                                        <Typography sx={{ fontSize: 16, mb: 1 }} color="text.secondary" gutterBottom>
                                            - Phí tiền nước: 67.000/100m3 nước
                                        </Typography>
                                        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                            - Phí tiền điện: 300.000/300kWh
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card variant="outlined" sx={{ mt: 2 }}>
                                    <CardContent>
                                        <Typography mb={1.5} variant="h4" component="div">
                                            2. Phí giữ xe tháng (chung cả phòng)
                                        </Typography>
                                        <Typography sx={{ fontSize: 16, mb: 1 }} color="text.secondary" gutterBottom>
                                            - Xe máy: 50000đ
                                        </Typography>
                                        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                            - Xe đạp: Không có
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Divider light sx={{ mt: 2 }} />
                                <Typography sx={{ fontSize: 18, mt: 2 }} color="text.secondary" gutterBottom>
                                    Tổng cộng tháng này: 500.000đ
                                </Typography>
                                <Typography sx={{ fontSize: 18, mt: 2 }} color="text.secondary" gutterBottom>
                                    Trạng thái: Chưa thanh toán
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
            <Stack direction="row" justifyContent="flex-end" alignItems="flex-start">
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
                    onClick={() => {}}
                >
                    Lưu thông tin
                </Button>
            </Stack>
        </>
    );
};

export default ManageRoom;
