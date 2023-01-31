import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MaterialReactTable from 'material-react-table';
import MainCard from '../../ui-component/cards/MainCard';
import { Button, Stack, Typography } from '@mui/material';
import { getRequestList } from '../../redux/actions/RequestActions';

let data = [
    {
        id: 'AAA',
        type: '20190070',
        level: '1/1/2022',
        content: 'Đăng kí thành công',
        response: '401'
    }
];

const RequestListTable = ({ data }) => {
    const columns = [
        {
            accessorKey: 'id',
            header: '#'
        },
        {
            accessorKey: 'type',
            header: 'Loại'
        },
        {
            accessorKey: 'level',
            header: 'Trạng thái'
        },
        {
            accessorKey: 'content',
            header: 'Mô tả'
        },
        {
            accessorKey: 'response',
            header: 'Kết quả'
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
const Complaints = () => {
    const dispatch = useDispatch();
    const requestRoomList = useSelector((state) => state.requestRoomList);
    const { loading, error, requests } = requestRoomList;
    const [createModalOpen, setCreateModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getRequestList());
    }, [dispatch]);

    useEffect(() => {
        if (requests.length !== 0) {
            data = requests.data.items.map((item) => {
                return {
                    name: item?.User?.name,
                    mssv: item?.User?.studentCode,
                    date: item?.createdAt,
                    status: item?.status,
                    room: item?.Room?.name,
                    building: item?.Room?.Building?.name
                };
            });
        }
    }, [requests]);
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h3" gutterBottom>
                    Hỗ trợ, Phản ánh
                </Typography>
            </Stack>
            <Button onClick={() => setCreateModalOpen(true)} color="secondary" variant="contained">
                Đăng ký
            </Button>
            <RequestListTable data={data} />
        </>
    );
};

export default Complaints;
