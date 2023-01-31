import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MaterialReactTable from 'material-react-table';
import MainCard from '../../ui-component/cards/MainCard';
import { Box, IconButton, MenuItem, Stack, Typography } from '@mui/material';
import { deleteRequestRoom, getRequestList } from '../../redux/actions/RequestActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let data = [
    {
        name: 'Nguyễn Văn A',
        mssv: '20190070',
        date: '1/1/2022',
        status: 'Đăng kí thành công',
        room: '401',
        building: 'B1'
        // type: 'Phòng thường',
        // semester: '20221',
        // startDay: '1/1/2022',
        // endDay: '1/6/2022'
    }
];

const RequestListTable = ({ data }) => {
    const columns = [
        // {
        //     accessorKey: 'id',
        //     header: 'id'
        // },
        {
            accessorKey: 'name',
            header: 'Họ và tên'
        },
        {
            accessorKey: 'mssv',
            header: 'MSSV'
        },
        {
            accessorKey: 'date',
            header: 'Ngày gửi yêu cầu'
        },
        {
            accessorKey: 'status',
            header: 'Trạng thái'
        },
        {
            accessorKey: 'room',
            header: 'Phòng KTX'
        },
        {
            accessorKey: 'building',
            header: 'Tòa nhà'
        }
        // {
        //     accessorKey: 'type',
        //     header: 'Loại phòng'
        // },
        // {
        //     accessorKey: 'semester',
        //     header: 'Học kì'
        // },
        // {
        //     accessorKey: 'startDay',
        //     header: 'Ngày bắt đầu ở'
        // },
        // {
        //     accessorKey: 'endDay',
        //     header: 'Ngày trả phòng'
        // }
    ];

    const dispatch = useDispatch();
    const requestRoomDelete = useSelector((state) => state.requestRoomDelete);
    const { loading, success, error } = requestRoomDelete;

    const handleDeleteRequest = (id) => {
        dispatch(deleteRequestRoom(id));
    };
    useEffect(() => {
        if (error) {
            toast.error('Không thể xóa yêu cầu khi đã được từ chối/chấp nhận!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            });
        }
        if (success) {
            toast.success('Xóa yêu cầu thành công!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            });
        }
    }, [error, success]);
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
            />
            <MaterialReactTable
                enableRowActions
                renderRowActionMenuItems={(row, index) => [
                    <MenuItem onClick={() => handleDeleteRequest(row.row.original.id)}>Xóa</MenuItem>
                ]}
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
const RequestList = () => {
    const dispatch = useDispatch();
    const requestRoomList = useSelector((state) => state.requestRoomList);
    const { loading, error, requests } = requestRoomList;

    useEffect(() => {
        dispatch(getRequestList());
    }, [dispatch]);

    useEffect(() => {
        if (requests.length !== 0) {
            data = requests.data.items.map((item) => {
                return {
                    id: item.id,
                    name: item.User.name,
                    mssv: item.User.studentCode,
                    date: item.createdAt,
                    status: item.status,
                    room: item.Room.name,
                    building: item.Room.Building.name
                };
            });
        }
    }, [requests]);
    // bị lỗi chậm 1 đợt
    console.log(data);
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h3" gutterBottom>
                    DANH SÁCH LỊCH SỬ ĐĂNG KÍ PHÒNG
                </Typography>
            </Stack>
            <RequestListTable data={data} />
        </>
    );
};

export default RequestList;
