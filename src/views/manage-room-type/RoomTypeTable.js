import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
//50 us states array
const beds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const RoomTypeTable = () => {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [tableData, setTableData] = useState(() => data);
    const [validationErrors, setValidationErrors] = useState({});

    const handleCreateNewRow = (values) => {
        tableData.push(values);
        setTableData([...tableData]);
    };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
            tableData[row.index] = values;
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
            if (!confirm(`Bạn có muốn xóa loại phòng: ${row.getValue('type')}`)) {
                return;
            }
            //send api delete request here, then refetch or update local table data for re-render
            tableData.splice(row.index, 1);
            setTableData([...tableData]);
        },
        [tableData]
    );

    const columns = [
        {
            accessorKey: 'type',
            header: 'Loại phòng',
            size: 140
        },
        {
            accessorKey: 'beds',
            header: 'Số giường',
            muiTableBodyCellEditTextFieldProps: {
                select: true, //change to select for a dropdown
                children: beds.map((bed) => (
                    <MenuItem key={bed} value={bed}>
                        {bed}
                    </MenuItem>
                ))
            }
        },
        {
            accessorKey: 'description',
            header: 'Mô tả chi tiết',
            size: 200
        },
        {
            accessorKey: 'price1',
            header: 'Phí lưu trú (1 tháng)',
            size: 200
        },
        {
            accessorKey: 'price3',
            header: 'Phí lưu trú (3 tháng)',
            size: 200
        },
        {
            accessorKey: 'price6',
            header: 'Phí lưu trú (6 tháng)',
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
            <DialogContent>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack
                        sx={{
                            width: '100%',
                            minWidth: { xs: '300px', sm: '360px', md: '400px' },
                            gap: '1.5rem'
                        }}
                    >
                        {columns.map((column) => {
                            if (column.accessorKey !== 'beds')
                                return (
                                    <TextField
                                        key={column.accessorKey}
                                        label={column.header}
                                        name={column.accessorKey}
                                        onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                    />
                                );
                            else if (column.accessorKey === 'beds')
                                return (
                                    <TextField
                                        SelectProps={{ MenuProps: MenuProps }}
                                        key={column.accessorKey}
                                        label={column.header}
                                        name={column.accessorKey}
                                        select
                                        onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                    >
                                        {beds.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
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
