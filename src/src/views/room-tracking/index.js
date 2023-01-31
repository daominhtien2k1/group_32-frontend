// material-ui
import { Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';

import { gridSpacing } from '../../redux/constants/constant';
import MaterialReactTable from 'material-react-table';
import MainCard from '../../ui-component/cards/MainCard';

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

const RoomTracking = () => (
    <>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h3" gutterBottom>
                THEO DÕI THÔNG TIN PHÒNG
            </Typography>
        </Stack>
        <MainCard title="Ghi chú" sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ color: 'error.main' }}>
                - Đóng tiền trọ theo từng gói đăng kí tháng, 7 ngày kể từ ngày đăng kí cuối (vd: 8/6/2023 - 14/6/2023)
            </Typography>
            <Typography variant="body2" sx={{ color: 'error.main' }}>
                - Hạn duy trì phòng là thời gian theo gói đăng kí kể từ ngày đầu tiên đăng kí thành công. Sinh viên chú ý nếu muốn gia hạn
                thì phải đăng kí tiếp đầu tháng tiếp theo (vd: 1/7/2023 - 7/7/2023)
            </Typography>
            <Typography variant="body2" sx={{ color: 'error.main' }}>
                - Đóng các loại tiền khác như tiền trọ theo hàng tháng, vào tuần cuối của tháng (vd: 23/6/2023 - 30/6/2023)
            </Typography>
            <Typography variant="body2" sx={{ color: 'error.main' }}>
                - Tiền phòng là đóng cá nhân, các loại tiền khác đóng chung theo phòng
            </Typography>
        </MainCard>
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
                            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                Trạng thái: Chưa thanh toán
                            </Typography>
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
                                Các khoản phí trong tháng (chung cả phòng)
                            </Typography>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography mb={1.5} variant="h4" component="div">
                                        1. Phí lưu trú
                                    </Typography>
                                    <Typography sx={{ fontSize: 16, mb: 1 }} color="text.secondary" gutterBottom>
                                        - Phí internet: 120.000đ
                                    </Typography>
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
                                        2. Phí giữ xe tháng
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
    </>
);

export default RoomTracking;
