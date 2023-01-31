import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MaterialReactTable from 'material-react-table';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Tooltip
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { deleteBill, getBillList, updateBill } from '../../redux/actions/BillActions';

let data = [
    {
        id: 1,
        name: 'Nguyễn Văn A',
        isPaid: 'false',
        mssv: '20190070',
        startDate: '2022-10-01T03:20:00.000Z',
        endDate: '2023-10-01T03:20:00.000Z',
        room: '101',
        building: 'B1',
        priceRoom: 250000,
        priceInternet: 30000,
        priceElectric: 200000,
        priceWater: 20000,
        priceParking: 20000
    }
];
const statuses = ['false', 'true'];

const BillTable = () => {
    const dispatch = useDispatch();
    const billList = useSelector((state) => state.billList);
    let { loading, success, error, bills } = billList;
    const [tableData, setTableData] = useState(() => data);

    useEffect(() => {
        dispatch(getBillList());
    }, [dispatch]);
    useEffect(() => {
        if (bills.length !== 0) {
            data = bills.data.items.map((item) => {
                return {
                    id: item?.id,
                    name: item?.User?.name,
                    mssv: item?.User?.studentCode,
                    startDate: item?.startDate,
                    endDate: item?.endDate,
                    isPaid: item?.isPaid ? 'true' : 'false',
                    room: item?.Room?.name,
                    building: item?.Room?.Building?.name,
                    priceRoom: 250000,
                    priceInternet: 30000,
                    priceElectric: 200000,
                    priceWater: 20000,
                    priceParking: 20000
                };
            });
        }
        setTableData(data);
    }, [bills]);

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const handleCreateNewRow = (values) => {
        tableData.push(values);
        setTableData([...tableData]);
    };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
            tableData[row.index] = values;
            const { id, priceRoom, priceElectric, priceInternet, priceWater, priceParking, isPaid } = values;
            // console.log({ id, priceRoom, priceElectric, priceInternet, priceWater, priceParking, isPaid });
            const isPaidBoolean = isPaid === 'true' ? true : false;
            // console.log(isPaidBoolean);
            dispatch(
                updateBill(id, {
                    priceRoom: priceRoom,
                    priceElectric: priceElectric,
                    priceInternet: priceInternet,
                    priceWater: priceWater,
                    priceParking: priceParking,
                    isPaid: isPaidBoolean
                })
            );
            //send/receive api updates here, then refetch or update local table data for re-render
            setTableData([...tableData]);
            exitEditingMode(); //required to exit editing mode and close modal
        }
    };

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const handleDeleteRow = useCallback(
        (row) => {
            if (!confirm(`Bạn có muốn xóa hóa đơn của: ${row.getValue('name')}`)) {
                return;
            }
            const id = row.getValue('id');
            dispatch(deleteBill(id));
            tableData.splice(row.index, 1);
            setTableData([...tableData]);
        },
        [tableData]
    );

    const columns = [
        {
            accessorKey: 'id',
            header: 'ID',
            size: 140
        },
        {
            accessorKey: 'name',
            header: 'Họ và tên',
            size: 140
        },
        {
            accessorKey: 'mssv',
            header: 'MSSV',
            size: 140
        },
        {
            accessorKey: 'startDate',
            header: 'Ngày bắt đầu thuê',
            size: 140
        },
        {
            accessorKey: 'endDate',
            header: 'Ngày kết thúc thuê',
            size: 140
        },
        {
            accessorKey: 'isPaid',
            header: 'Trạng thái thanh toán',
            muiTableBodyCellEditTextFieldProps: {
                select: true, //change to select for a dropdown
                children: statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                        {status}
                    </MenuItem>
                ))
            }
        },
        {
            accessorKey: 'room',
            header: 'Phòng KTX',
            size: 140
        },
        {
            accessorKey: 'building',
            header: 'Tòa nhà',
            size: 140
        },
        {
            accessorKey: 'priceRoom',
            header: 'Giá phòng',
            size: 200
        },
        {
            accessorKey: 'priceInternet',
            header: 'Giá Internet',
            size: 200
        },
        {
            accessorKey: 'priceElectric',
            header: 'Tiền điện',
            size: 200
        },
        {
            accessorKey: 'priceWater',
            header: 'Tiền nước',
            size: 200
        },
        {
            accessorKey: 'priceParking',
            header: 'Tiền gửi xe',
            size: 200
        }
    ];

    return (
        <>
            <MaterialReactTable
                displayColumnDefOptions={{
                    'mrt-row-actions': {
                        muiTableHeadCellProps: {
                            align: 'left'
                        },
                        size: 120
                    }
                }}
                columns={columns}
                data={tableData}
                editingMode="modal" //default
                enableColumnOrdering
            />
        </>
    );
};

export default BillTable;
