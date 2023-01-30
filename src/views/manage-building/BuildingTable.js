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

let data = [
    {
        id: '9s41rp',
        name: 'B1',
        floors: '8 tầng',
        address: 'Số 1 Đại Cồ Việt, phường Bách Khoa, quận Hai Bà Trưng, thành phố Hà Nội'
    },
    {
        id: '7s49rp',
        name: 'B3',
        floors: '10 tầng',
        address: 'Số 2 Đại Cồ Việt, phường Bách Khoa, quận Hai Bà Trưng, thành phố Hà Nội'
    },
    {
        id: '8s49rp',
        name: 'B5',
        floors: '6 tầng',
        address: 'Số 3 Đại Cồ Việt, phường Bách Khoa, quận Hai Bà Trưng, thành phố Hà Nội'
    },
    {
        id: '8k49rp',
        name: 'B5B',
        floors: '8 tầng',
        address: 'Số 4 Đại Cồ Việt, phường Bách Khoa, quận Hai Bà Trưng, thành phố Hà Nội'
    }
];
//50 us states array
const floors = [
    '1 tầng',
    '2 tầng',
    '3 tầng',
    '4 tầng',
    '5 tầng',
    '6 tầng',
    '7 tầng',
    '8 tầng',
    '9 tầng',
    '10 tầng',
    '11 tầng',
    '12 tầng',
    '13 tầng',
    '14 tầng',
    '15 tầng'
];

const BuildingTable = () => {
    const dispatch = useDispatch();
    const buildingList = useSelector((state) => state.buildingList);
    let { loading, error, buildings } = buildingList;
    const [tableData, setTableData] = useState(() => data);
    // console.log('Data', data);
    // console.log('Tabledata', tableData);

    useEffect(() => {
        dispatch(getBuildingList());
    }, [dispatch]);
    // console.log(buildings);
    useEffect(() => {
        if (buildings.length !== 0) {
            data = buildings.data.items.map((building) => {
                return {
                    id: building.id,
                    name: building.name,
                    floors: `${building.numberOfFloor} tầng`,
                    address: building.address
                };
            });
        }
        setTableData(data);
    }, [buildings]);

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const handleCreateNewRow = (values) => {
        tableData.push(values);
        console.log(values);
        const { id, name, floors, address } = values;
        const floorNum = parseInt(floors.split(' ')[0], 10);
        dispatch(createBuilding({ name: name, address: address, numberOfFloor: floorNum }));
        setTableData([...tableData]);
    };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
            tableData[row.index] = values;
            console.log(values);
            const { id, name, floors, address } = values;
            const floorNum = parseInt(floors.split(' ')[0], 10);
            dispatch(updateBuilding(id, { name: name, address: address, numberOfFloor: floorNum }));
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
            dispatch(deleteBuilding(id));
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
            header: 'Tên khu kí túc',
            size: 140
        },
        {
            accessorKey: 'floors',
            header: 'Số tầng',
            muiTableBodyCellEditTextFieldProps: {
                select: true, //change to select for a dropdown
                children: floors.map((floor) => (
                    <MenuItem key={floor} value={floor}>
                        {floor}
                    </MenuItem>
                ))
            }
        },
        {
            accessorKey: 'address',
            header: 'Địa chỉ',
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
                        Thêm tòa nhà
                    </Button>
                )}
            />
            <CreateNewBuildingModal
                columns={columns}
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleCreateNewRow}
            />
        </>
    );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewBuildingModal = ({ open, columns, onClose, onSubmit }) => {
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
            <DialogTitle textAlign="center">Thêm tòa nhà</DialogTitle>
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
                            if (column.accessorKey === 'id')
                                return (
                                    <TextField
                                        disabled={false}
                                        key={column.accessorKey}
                                        label={column.header}
                                        name={column.accessorKey}
                                        onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                    />
                                );
                            if (column.accessorKey !== 'floors')
                                return (
                                    <TextField
                                        key={column.accessorKey}
                                        label={column.header}
                                        name={column.accessorKey}
                                        onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                    />
                                );
                            else if (column.accessorKey === 'floors')
                                return (
                                    <TextField
                                        SelectProps={{ MenuProps: MenuProps }}
                                        key={column.accessorKey}
                                        label={column.header}
                                        name={column.accessorKey}
                                        select
                                        onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                    >
                                        {floors.map((option) => (
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

export default BuildingTable;
