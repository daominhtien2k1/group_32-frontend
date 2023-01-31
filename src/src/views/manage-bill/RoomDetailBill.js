// ĐÃ XÓA FILE NÀY
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Card, CardContent, Divider, Grid, Input, InputAdornment, Stack, Typography } from '@mui/material';
import { gridSpacing } from '../../redux/constants/constant';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import BillTrackingTable from './BillTrackingTable';
import Button from '@mui/material/Button';
import MaterialReactTable from 'material-react-table';

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

const RoomDetailBill = () => {
    const theme = useTheme();
    const [isFeePaid, setIsFeePaid] = useState('Chưa thanh toán');
    const handleChangeIsFeePaid = (event) => {
        setIsFeePaid(event.target.value);
    };
    return (
        <>
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
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography mb={1.5} variant="h3" component="div">
                                    Danh sách sinh viên
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
                                    Các khoản phí trong tháng (chung cả phòng)
                                </Typography>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography mb={1.5} variant="h4" component="div">
                                            1. Phí lưu trú
                                        </Typography>
                                        <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                                            <Typography sx={{ fontSize: 16 }} color="text.secondary">
                                                - Phí internet:
                                            </Typography>
                                            <FormControl variant="standard" sx={{ width: 120 }}>
                                                <Input
                                                    id="standard-adornment-money"
                                                    value={120000}
                                                    endAdornment={<InputAdornment position="end">đ</InputAdornment>}
                                                    aria-describedby="standard-money-helper-text"
                                                    inputProps={{
                                                        'aria-label': 'dong',
                                                        padding: 0
                                                    }}
                                                />
                                            </FormControl>
                                        </Stack>
                                        <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                                            <Typography sx={{ fontSize: 16 }} color="text.secondary">
                                                - Phí tiền nước:
                                            </Typography>
                                            <FormControl variant="standard" sx={{ width: 120 }}>
                                                <Input
                                                    id="standard-adornment-money"
                                                    value={67000}
                                                    endAdornment={<InputAdornment position="end">đ</InputAdornment>}
                                                    aria-describedby="standard-money-helper-text"
                                                    inputProps={{
                                                        'aria-label': 'dong',
                                                        padding: 0
                                                    }}
                                                />
                                            </FormControl>
                                            <Typography sx={{ fontSize: 16 }} color="text.secondary">
                                                /
                                            </Typography>
                                            <FormControl variant="standard" sx={{ width: 120 }}>
                                                <Input
                                                    id="standard-adornment-money"
                                                    value={100}
                                                    endAdornment={<InputAdornment position="end">m3 nước</InputAdornment>}
                                                    aria-describedby="standard-money-helper-text"
                                                    inputProps={{
                                                        'aria-label': 'dong',
                                                        padding: 0
                                                    }}
                                                />
                                            </FormControl>
                                        </Stack>
                                        <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                                            <Typography sx={{ fontSize: 16 }} color="text.secondary">
                                                - Phí tiền điện:
                                            </Typography>
                                            <FormControl variant="standard" sx={{ width: 120 }}>
                                                <Input
                                                    id="standard-adornment-money"
                                                    value={300000}
                                                    endAdornment={<InputAdornment position="end">đ</InputAdornment>}
                                                    aria-describedby="standard-money-helper-text"
                                                    inputProps={{
                                                        'aria-label': 'dong',
                                                        padding: 0
                                                    }}
                                                />
                                            </FormControl>
                                            <Typography sx={{ fontSize: 16 }} color="text.secondary">
                                                /
                                            </Typography>
                                            <FormControl variant="standard" sx={{ width: 120 }}>
                                                <Input
                                                    id="standard-adornment-money"
                                                    value={300}
                                                    endAdornment={<InputAdornment position="end">kWh</InputAdornment>}
                                                    aria-describedby="standard-money-helper-text"
                                                    inputProps={{
                                                        'aria-label': 'dong',
                                                        padding: 0
                                                    }}
                                                />
                                            </FormControl>
                                        </Stack>
                                    </CardContent>
                                </Card>
                                <Card variant="outlined" sx={{ mt: 2 }}>
                                    <CardContent>
                                        <Typography mb={1.5} variant="h4" component="div">
                                            2. Phí giữ xe tháng
                                        </Typography>
                                        <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                                            <Typography sx={{ fontSize: 16 }} color="text.secondary">
                                                - Xe máy:
                                            </Typography>
                                            <FormControl variant="standard" sx={{ width: 120 }}>
                                                <Input
                                                    id="standard-adornment-money"
                                                    value={50000}
                                                    endAdornment={<InputAdornment position="end">đ</InputAdornment>}
                                                    aria-describedby="standard-money-helper-text"
                                                    inputProps={{
                                                        'aria-label': 'dong',
                                                        padding: 0
                                                    }}
                                                />
                                            </FormControl>
                                        </Stack>
                                        <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                                            <Typography sx={{ fontSize: 16 }} color="text.secondary">
                                                - Xe đạp:
                                            </Typography>
                                            <FormControl variant="standard" sx={{ width: 120 }}>
                                                <Input
                                                    id="standard-adornment-money"
                                                    value={'Không có'}
                                                    endAdornment={<InputAdornment position="end">đ</InputAdornment>}
                                                    aria-describedby="standard-money-helper-text"
                                                    inputProps={{
                                                        'aria-label': 'dong',
                                                        padding: 0
                                                    }}
                                                />
                                            </FormControl>
                                        </Stack>
                                    </CardContent>
                                </Card>
                                <Divider light sx={{ mt: 2 }} />
                                <Typography sx={{ fontSize: 18, mt: 2, mb: 2 }} color="text.secondary" gutterBottom>
                                    Tổng cộng tháng này: 500.000đ
                                </Typography>
                                <Stack direction="row">
                                    <Typography sx={{ fontSize: 18, mr: 2 }} color="text.secondary" gutterBottom>
                                        Trạng thái:
                                    </Typography>
                                    <FormControl variant="standard" sx={{ width: 200 }}>
                                        <Select labelId="pay" id="pay" value={isFeePaid} onChange={handleChangeIsFeePaid}>
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={'Đã thanh toán'}>Đã thanh toán</MenuItem>
                                            <MenuItem value={'Chưa thanh toán'}>Chưa thanh toán</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
            <Card variant="outlined" sx={{ mt: 4 }}>
                <CardContent>
                    <Typography mb={1.5} variant="h3" component="div">
                        Theo dõi hạn thanh toán
                    </Typography>
                    <BillTrackingTable />
                </CardContent>
            </Card>
            <Stack direction="row" justifyContent="flex-end" alignItems="flex-start" mt={2}>
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

export default RoomDetailBill;
