// ĐÃ XÓA FILE NÀY
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

import data from '../../mock/Bill';

const statuses = ['Đã thanh toán', 'Chưa thanh toán', 'Quá hạn'];

const BillTrackingTable = () => {
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
            if (!confirm(`Bạn có muốn xóa: ${row.getValue('name')}`)) {
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
            accessorKey: 'name',
            header: 'Họ và tên'
        },
        {
            accessorKey: 'mssv',
            header: 'Mã số sinh viên'
        },
        {
            accessorKey: 'money',
            header: 'Số tiền phải đóng'
        },
        {
            accessorKey: 'paymentDueDate',
            header: 'Hạn thanh toán'
        },
        {
            accessorKey: 'maintainanceDate',
            header: 'Hạn duy trì phòng'
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
            },
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
                        Thêm sinh viên
                    </Button>
                )}
            />
            <CreateNewOfficerModal
                columns={columns}
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleCreateNewRow}
            />
        </>
    );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewOfficerModal = ({ open, columns, onClose, onSubmit }) => {
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
                height: '100px'
            }
        }
    };
    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">Thêm sinh viên</DialogTitle>
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
                            if (column.accessorKey !== 'status')
                                return (
                                    <TextField
                                        key={column.accessorKey}
                                        label={column.header}
                                        name={column.accessorKey}
                                        onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                    />
                                );
                            else if (column.accessorKey === 'status')
                                return (
                                    <TextField
                                        SelectProps={{ MenuProps: MenuProps }}
                                        key={column.accessorKey}
                                        label={column.header}
                                        name={column.accessorKey}
                                        select
                                        onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                    >
                                        {statuses.map((option) => (
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

export default BillTrackingTable;
