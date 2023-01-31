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
import { createBuilding, deleteBuilding, getBuildingList, updateBuilding } from '../../redux/actions/BuildingActions';
import { getContractList, updateContract, updateContractStatus } from '../../redux/actions/ContractActions';

let data = [
    {
        id: 1,
        name: 'Nguyễn Văn A',
        mssv: '20190070',
        startDate: '2022-10-01T03:20:00.000Z',
        endDate: '2023-10-01T03:20:00.000Z',
        room: '101',
        building: 'B1',
        status: 'inuse',
        priceRoom: 250000,
        priceInternet: 30000,
        priceElectric: 200000,
        priceWater: 20000,
        priceParking: 20000
    }
];
const statuses = ['pending', 'inuse', 'canceled'];

const ContractTable = () => {
    const dispatch = useDispatch();
    const contractList = useSelector((state) => state.contractList);
    let { loading, error, contracts } = contractList;
    const [tableData, setTableData] = useState(() => data);

    useEffect(() => {
        dispatch(getContractList());
    }, [dispatch]);
    useEffect(() => {
        if (contracts.length !== 0) {
            data = contracts.data.items.map((item) => {
                return {
                    id: item.id,
                    name: item.User.name,
                    mssv: item.User.studentCode,
                    startDate: item.startDate,
                    endDate: item.endDate,
                    room: item.Room.name,
                    building: item.Room.Building.name,
                    status: item.status,
                    priceRoom: item.priceRoom,
                    priceInternet: item.priceInternet,
                    priceElectric: item.priceElectric,
                    priceWater: item.priceWater,
                    priceParking: item.priceParking
                };
            });
        }
        setTableData(data);
    }, [contracts]);

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const handleCreateNewRow = (values) => {
        tableData.push(values);
        setTableData([...tableData]);
    };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
            tableData[row.index] = values;
            console.log(values);
            const { id, priceRoom, priceElectric, priceInternet, priceWater, priceParking, startDate, endDate } = values;
            dispatch(
                updateContract(id, {
                    priceRoom: priceRoom,
                    priceElectric: priceElectric,
                    priceInternet: priceInternet,
                    priceWater: priceWater,
                    priceParking: priceParking,
                    startDate: startDate,
                    endDate: endDate
                })
            );
            const { status } = values;
            dispatch(updateContractStatus(id, { status: status }));
            // dispatch(updateBuilding(id, { name: name, address: address, numberOfFloor: floorNum }));
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
            if (!confirm(`Bạn có muốn xóa tòa nhà: ${row.getValue('name')}`)) {
                return;
            }
            const id = row.getValue('id');
            // dispatch(deleteBuilding(id));
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
            accessorKey: 'status',
            header: 'Trạng thái',
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
                enableEditing
                onEditingRowSave={handleSaveRowEdits}
                onEditingRowCancel={handleCancelRowEdits}
                renderRowActions={({ row, table }) => (
                    <Box sx={{ display: 'flex' }}>
                        <Tooltip arrow placement="left" title="Sửa">
                            <IconButton sx={{ color: 'success.main' }} onClick={() => table.setEditingRow(row)}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow placement="right" title="Xóa">
                            <IconButton sx={{ color: 'error.main' }} onClick={() => handleDeleteRow(row)}>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
            />
        </>
    );
};

export default ContractTable;
