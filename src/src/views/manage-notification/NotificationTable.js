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
    TextareaAutosize,
    TextField,
    Tooltip
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const data = [
    {
        id: '9s41rp',
        title: 'Thông báo 1',
        detail: 'Sắp đến hạn nộp phí ktx'
    },
    {
        id: '7s49rp',
        title: 'Thông báo 2',
        detail: 'Sắp đến hạn nộp phí ktx2'
    },
    {
        id: '8s49rp',
        title: 'Thông báo 3',
        detail: 'Sắp đến hạn nộp phí ktx3'
    },
    {
        id: '8k49rp',
        title: 'Thông báo 4',
        detail: 'Sắp đến hạn nộp phí ktx4'
    }
];
//50 us states array

const NotificationTable = () => {
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
            if (!confirm(`Bạn có muốn xóa thông báo: ${row.getValue('title')}`)) {
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
            accessorKey: 'title',
            header: 'Tiêu đề thông báo',
            size: 140
        },
        {
            accessorKey: 'detail',
            header: 'Chi tiết'
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
                        Thêm thông báo
                    </Button>
                )}
            />
            <CreateNewNotificationModal
                columns={columns}
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleCreateNewRow}
            />
        </>
    );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewNotificationModal = ({ open, columns, onClose, onSubmit }) => {
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
            <DialogTitle textAlign="center">Thêm thông báo</DialogTitle>
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
                            if (column.accessorKey !== 'detail')
                                return (
                                    <TextField
                                        key={column.accessorKey}
                                        label={column.header}
                                        title={column.accessorKey}
                                        onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                    />
                                );
                            else if (column.accessorKey === 'detail')
                                return <TextareaAutosize aria-label="empty textarea" placeholder="Chi tiết" style={{ height: 150 }} />;
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

export default NotificationTable;
