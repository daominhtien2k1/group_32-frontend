import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MaterialReactTable from 'material-react-table';
import MainCard from '../../ui-component/cards/MainCard';
import { Stack, Typography } from '@mui/material';
import { getRequestList } from '../../redux/actions/RequestActions';

let data = [
    {
        name: 'AAA',
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
    return (
        <>
            <MaterialReactTable
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
