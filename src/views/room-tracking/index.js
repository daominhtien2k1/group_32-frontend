import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// material-ui
import { Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';

import { gridSpacing } from '../../redux/constants/constant';
import MaterialReactTable from 'material-react-table';
import MainCard from '../../ui-component/cards/MainCard';
import { detailRoom } from '../../redux/actions/RoomActions';
import { getBillList } from '../../redux/actions/BillActions';
import { getProfile } from '../../redux/actions/UserActions';

let data = [
    // {
    //     stt: 1,
    //     name: 'Đào Minh Tiến',
    //     mssv: 20190070
    // },
    // {
    //     stt: 2,
    //     name: 'Vũ Đình Tiến',
    //     mssv: 20190071
    // }
];

const FriendListTable = ({ data }) => {
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

const RoomTracking = () => {
    const dispatch = useDispatch();
    const roomDetail = useSelector((state) => state.roomDetail);
    const { loading, error, room } = roomDetail;

    const userLogin = useSelector((state) => state.userLogin);
    const profile = useSelector((state) => state.profile);
    // const [roomID, setRoomID] = useState(userLogin.userInfo.roomId);
    const { userInfo } = profile;
    const [roomID, setRoomID] = useState(userInfo?.data.roomId);
    useEffect(() => {
        dispatch(getProfile());
        dispatch(getBillList());
    }, [dispatch]);

    useEffect(() => {
        console.log(roomID, userInfo);
        // nếu là mảng thì dính đòn chạy vô hạn ([]!= []), nhưng là số int nên ko bị lỗi
        setRoomID(userInfo?.data.roomId);
        if (roomID !== 0 && roomID !== null && userInfo != null) {
            // console.log(roomID);
            dispatch(detailRoom(roomID));
        }
    }, [roomID, userInfo]);

    const [dataStudent, setDataStudent] = useState(data);
    useEffect(() => {
        if (room != undefined && room.length !== 0) {
            const dataMap = room.data.Users.map((item, index) => {
                return {
                    stt: index + 1,
                    name: item.name,
                    mssv: item.studentCode
                };
            });
            setDataStudent(dataMap);
        }
    }, [room]);

    const billList = useSelector((state) => state.billList);
    let { bills } = billList;

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="h3" gutterBottom>
                    THEO DÕI THÔNG TIN PHÒNG
                </Typography>
            </Stack>
            <MainCard title="Ghi chú" sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                    - Hạn duy trì phòng như theo hợp đồng
                </Typography>
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                    - Tiền phòng có thể trả theo nhiều đợt
                </Typography>
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                    - Tiền điện/nước... có thể là cố định tùy theo hợp đồng/hoặc tính biến động cuối tháng
                </Typography>
            </MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid container item spacing={gridSpacing} direction="column" xs={5} md={5}>
                    <Grid item>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography mb={1.5} variant="h3" component="div">
                                    Phòng kí túc xá: {room != null ? room?.data?.name : 'Không có'}
                                </Typography>
                                <Typography sx={{ fontSize: 16, mb: 1 }} color="text.secondary" gutterBottom>
                                    Loại phòng: {room != null ? room?.data?.RoomCategory.name : 'Không có'}
                                </Typography>
                                <Typography sx={{ fontSize: 16, mb: 1 }} color="text.secondary" gutterBottom>
                                    Kiểu phòng: Nam
                                </Typography>
                                <Typography sx={{ fontSize: 16, mb: 1 }} color="text.secondary" gutterBottom>
                                    Số người hiện tại: {dataStudent.length}
                                </Typography>
                                <Typography sx={{ fontSize: 16, mb: 1 }} color="text.secondary" gutterBottom>
                                    Số người tối đa: {room != null ? room?.data?.RoomCategory.capacity : 'Không có'}
                                </Typography>
                                <Typography sx={{ fontSize: 16, mb: 1 }} color="text.secondary" gutterBottom>
                                    Mô tả chi tiết: {room != null ? room?.data?.RoomCategory.description : 'Không có'}
                                </Typography>
                                <Typography sx={{ fontSize: 16, mb: 1 }} color="text.secondary" gutterBottom>
                                    Tiền phòng: {room != null ? room?.data?.RoomCategory.priceRoom : 'Không có'}
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
                                <FriendListTable data={dataStudent} />
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
                                        <Typography sx={{ fontSize: 16, mb: 1 }} color="text.secondary" gutterBottom>
                                            - Tiền phòng:
                                            {bills != null && dataStudent.length !== 0
                                                ? `${bills?.data?.items[0]?.priceRoom} đ`
                                                : ' Không có'}
                                        </Typography>
                                        <Typography sx={{ fontSize: 16, mb: 1 }} color="text.secondary" gutterBottom>
                                            - Phí tiền nước: {bills != null ? `${bills?.data?.items[0]?.priceWater} đ` : 'Không có'}
                                        </Typography>
                                        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                            - Phí tiền điện: {bills != null ? `${bills?.data?.items[0]?.priceElectric} đ` : 'Không có'}
                                        </Typography>
                                        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                            - Phí tiền internet: {bills != null ? `${bills?.data?.items[0]?.priceInternet} đ` : 'Không có'}
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card variant="outlined" sx={{ mt: 2 }}>
                                    <CardContent>
                                        <Typography mb={1.5} variant="h4" component="div">
                                            2. Phí giữ xe tháng
                                        </Typography>
                                        <Typography sx={{ fontSize: 16, mb: 1 }} color="text.secondary" gutterBottom>
                                            - Tiền xe:{' '}
                                            {bills != null && dataStudent.length !== 0
                                                ? `${bills?.data?.items?.[0]?.isPaid}`
                                                    ? 'Không có'
                                                    : bills?.data?.items?.[0]?.isPaid
                                                : 'Không có'}
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Divider light sx={{ mt: 2 }} />
                                <Typography sx={{ fontSize: 18, mt: 2 }} color="text.secondary" gutterBottom>
                                    Trạng thái:{' '}
                                    {bills != null && dataStudent.length !== 0
                                        ? `${bills?.data?.items[0]?.isPaid}`
                                            ? 'Chưa thanh toán'
                                            : 'Đã thanh toán'
                                        : 'Chưa thanh toán'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default RoomTracking;
