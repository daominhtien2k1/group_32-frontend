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
import {
    getRoomCategoryList,
    createRoomCategory,
    updateRoomCategory,
    deleteRoomCategory
} from '../../redux/actions/RoomCategoryActions.js';

const RoomTypeTable = () => {
    const dispatch = useDispatch();
    const roomCategoryState = useSelector((state) => state.roomCategoryList);
    console.log(roomCategoryState);
    const { roomsCategory } = roomCategoryState;
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        dispatch(getRoomCategoryList());
    }, [dispatch]);
    // console.log(buildings);
    useEffect(() => {
        let data = [];
        if (roomsCategory.length !== 0) {
            data = roomsCategory.map((roomCategory) => {
                return {
                    id: roomCategory.id,
                    name: roomCategory.name,
                    capacity: roomCategory.capacity,
                    description: roomCategory.description,
                    priceRoom: roomCategory.priceRoom
                };
            });
        }
        setTableData(data);
    }, [roomsCategory]);

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const handleCreateNewRow = (values) => {
        tableData.push(values);
        console.log(values);
        const { name, capacity, description, priceRoom } = values;
        dispatch(createRoomCategory({ name, capacity, description, priceRoom }));
        setTableData([...tableData]);
    };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
            tableData[row.index] = values;
            console.log(values);
            const { id, name, capacity, description, priceRoom } = values;
            dispatch(updateRoomCategory(id, { name, capacity, description, priceRoom }));
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
            if (!confirm(`Bạn có muốn xóa loại phòng: ${row.getValue('name')}`)) {
                return;
            }
            //send api delete request here, then refetch or update local table data for re-render
            const id = row.getValue('id');
            dispatch(deleteRoomCategory(id));
            tableData.splice(row.index, 1);
            setTableData([...tableData]);
            //deleteRoomCategory;
        },
        [tableData]
    );

    const columns = [
        {
            accessorKey: 'id',
            header: 'ID',
            size: 100
        },
        {
            accessorKey: 'name',
            header: 'Loại phòng',
            size: 140
        },
        {
            accessorKey: 'capacity',
            header: 'Số giường',
            size: 140
        },
        {
            accessorKey: 'description',
            header: 'Mô tả chi tiết',
            size: 200
        },
        {
            accessorKey: 'priceRoom',
            header: 'Phí lưu trú (1 tháng)',
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
                renderTopToolbarCustomActions={() => (
                    <Button color="secondary" onClick={() => setCreateModalOpen(true)} variant="contained">
                        Thêm loại phòng
                    </Button>
                )}
            />
            <CreateNewRoomTypeModal
                columns={columns}
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleCreateNewRow}
            />
        </>
    );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewRoomTypeModal = ({ open, columns, onClose, onSubmit }) => {
    const [values, setValues] = useState(() =>
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? ''] = '';
            return acc;
        }, {})
    );

    const handleSubmit = () => {
        //put your validation logic here
        console.log(values);
        onSubmit(values);
        onClose();
    };

    const MenuProps = {
        PaperProps: {
            style: {
                overflowY: 'scroll',
                height: '200px'
            }
        }
    };

    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">Thêm loại phòng</DialogTitle>
            <DialogContent sx={{ overflowY: 'visible' }}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack
                        sx={{
                            width: '100%',
                            minWidth: { xs: '300px', sm: '360px', md: '400px' },
                            gap: '1.5rem'
                        }}
                    >
                        {columns.map((column) => {
                            return (
                                <TextField
                                    key={column.accessorKey}
                                    label={column.header}
                                    name={column.accessorKey}
                                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                />
                            );
                        })}
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ p: '1.25rem' }}>
                <Button onClick={onClose}>Hủy</Button>
                <Button color="secondary" onClick={handleSubmit} variant="contained">
                    Thêm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RoomTypeTable;
