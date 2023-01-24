import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import MainCard from '../../ui-component/cards/MainCard';
import { Stack, Typography } from '@mui/material';

const data = [
    {
        date: '1/1/2022',
        status: 'Đăng kí thành công',
        room: '401',
        building: 'B1',
        type: 'Phòng thường',
        semester: '20221',
        startDay: '1/1/2022',
        endDay: '1/6/2022'
    },
    {
        date: '6/1/2022',
        status: 'Đăng kí thành công',
        room: '405',
        building: 'B1',
        type: 'Phòng thường',
        semester: '20221',
        startDay: '6/1/2022',
        endDay: '1/12/2022'
    }
];

const RequestListTable = () => {
    const columns = [
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
        },
        {
            accessorKey: 'type',
            header: 'Loại phòng'
        },
        {
            accessorKey: 'semester',
            header: 'Học kì'
        },
        {
            accessorKey: 'startDay',
            header: 'Ngày bắt đầu ở'
        },
        {
            accessorKey: 'endDay',
            header: 'Ngày trả phòng'
        }
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
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h3" gutterBottom>
                    DANH SÁCH LỊCH SỬ ĐĂNG KÍ PHÒNG
                </Typography>
            </Stack>
            <RequestListTable />
        </>
    );
};

export default RequestList;
