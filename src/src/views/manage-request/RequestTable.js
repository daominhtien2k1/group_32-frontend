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
import { getRequestList, updateRequestRoomStatus } from '../../redux/actions/RequestActions';
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
    }
];

const statuses = ['pending', 'accepted'];

const RequestTable = () => {
    const dispatch = useDispatch();
    const requestRoomList = useSelector((state) => state.requestRoomList);
    const { loading, error, requests } = requestRoomList;
    const [tableData, setTableData] = useState(() => data);

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
        setTableData(data);
    }, [requests]);

    const requestRoomStatusUpdate = useSelector((state) => state.requestRoomStatusUpdate);
    const {
        loading: loadingUpdateStatus,
        success: successUpdateStatus,
        error: errorUpdateStatus,
        request: requestUpdateStatus
    } = requestRoomStatusUpdate;
    useEffect(() => {
        if (errorUpdateStatus) {
            console.log(errorUpdateStatus);
            toast.error('Không thể thay đổi trạng thái khi đã được từ chối/chấp nhận!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            });
        }
        if (successUpdateStatus) {
            console.log(successUpdateStatus);
            toast.success('Thay đổi trạng thái thành công!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            });
        }
    }, [errorUpdateStatus, successUpdateStatus]);

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const handleCreateNewRow = (values) => {
        tableData.push(values);
        console.log(values);
        // const { id, name, floors, address } = values;
        // const floorNum = parseInt(floors.split(' ')[0], 10);
        // dispatch(createBuilding({ name: name, address: address, numberOfFloor: floorNum }));
        setTableData([...tableData]);
    };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
            tableData[row.index] = values;
            const { id, name, mssv, date, status, room, building } = values;
            dispatch(updateRequestRoomStatus(id, { status: status }));
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
            if (!confirm(`Bạn có muốn xóa yêu cầu của: ${row.getValue('name')}`)) {
                return;
            }
            const id = row.getValue('id');
            // console.log(id);
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
            header: 'MSSV'
        },
        {
            accessorKey: 'date',
            header: 'Ngày gửi yêu cầu'
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
            accessorKey: 'room',
            header: 'Phòng KTX'
        },
        {
            accessorKey: 'building',
            header: 'Tòa nhà'
        }
    ];

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
                        {/*<Tooltip arrow placement="right" title="Xóa">*/}
                        {/*    <IconButton sx={{ color: 'error.main' }} onClick={() => handleDeleteRow(row)}>*/}
                        {/*        <Delete />*/}
                        {/*    </IconButton>*/}
                        {/*</Tooltip>*/}
                    </Box>
                )}
            />
        </>
    );
};

export default RequestTable;
