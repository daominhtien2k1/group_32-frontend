import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import MainCard from '../../ui-component/cards/MainCard';
import { Typography } from '@mui/material';

const data = [
    {
        type: 'Phòng thường',
        beds: 6,
        description: 'Phòng 6 bạn, có giường tầng, nhà vệ sinh khép kín',
        price1: 160000,
        price3: 800000,
        price6: 1600000
    },
    {
        type: 'Phòng thường, máy lạnh',
        beds: 6,
        description: 'Phòng 6 bạn, giường tầng, nhà vệ sinh khép kín. Trong nhà tắm có trang bị bình nóng lạnh.',
        price1: 215000,
        price3: 1000000,
        price6: 2000000
    },
    {
        type: 'Phòng dịch vụ',
        beds: 6,
        description: 'Phòng 6 bạn, giường tầng, nhà vệ sinh khép kín, bình nóng lạnh và đặc biệt là có điều hòa.',
        price1: 300000,
        price3: 1600000,
        price6: 2800000
    },
    {
        type: 'Phòng dịch vụ',
        beds: 4,
        description: 'Phòng 4 bạn, giường tầng, nhà vệ sinh khép kín, bình nóng lạnh và đặc biệt là có điều hòa.',
        price1: 360000,
        price3: 2000000,
        price6: 3200000
    },
    {
        type: 'Phòng dịch vụ',
        beds: 3,
        description: 'Phòng 3 bạn, giường tầng, nhà vệ sinh khép kín, bình nóng lạnh và đặc biệt là có điều hòa.',
        price1: 400000,
        price3: 4200000,
        price6: 4400000
    }
];

export const RoomTypeTable = () => {
    const columns = [
        {
            accessorKey: 'type',
            header: 'Loại phòng'
        },
        {
            accessorKey: 'beds',
            header: 'Số giường'
        },
        {
            accessorKey: 'description',
            header: 'Mô tả'
        },
        {
            accessorKey: 'price1',
            header: 'Phí lưu trú (1 tháng)'
        },
        {
            accessorKey: 'price3',
            header: 'Phí lưu trú (3 tháng)'
        },
        {
            accessorKey: 'price6',
            header: 'Phí lưu trú (6 tháng)'
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
            <MainCard title="Ghi chú" sx={{ marginTop: 4 }}>
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                    - Đợt đăng kí mở vào đầu mỗi tháng. Đợt đăng kí kéo dài 7 ngày. (vd: 1/6/2023 - 7/6/2023)
                </Typography>
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                    - Hạn thanh toán là 7 ngày kể từ ngày đăng kí cuối (vd: 8/6/2023 - 14/6/2023)
                </Typography>
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                    - Mức đóng cho các loại phòng chưa bao gồm tiền sử dụng điện, nước và các dịch vụ khác
                </Typography>
            </MainCard>
        </>
    );
};

export default RoomTypeTable;
