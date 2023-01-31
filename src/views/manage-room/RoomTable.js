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
    Tooltip,
    Select,
    InputLabel,
    FormControl
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { getRoomCategoryList } from '../../redux/actions/RoomCategoryActions.js';
import { getBuildingList } from '../../redux/actions/BuildingActions';

import { getRoomFromBuildingIDList, getRoomList, createRoom, updateRoom, deleteRoom, getRoomById } from '../../redux/actions/RoomActions';
const RoomTable = () => {
    const dispatch = useDispatch();
    const roomState = useSelector((state) => state.roomList);
    const { rooms } = roomState;
    // console.log('rooms:', rooms);
    // console.log('room: ', room);
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        // console.log('reload rooms');
        dispatch(getRoomList());
    }, [dispatch]);
    // console.log(buildings);
    useEffect(() => {
        // console.log('reload table');
        let data = [];
        if (rooms.length !== 0) {
            data = rooms.map((room) => {
                return {
                    id: room?.id,
                    name: room?.name,
                    buildingId: room?.buildingId,
                    roomCategoryId: room?.roomCategoryId,
                    description: room?.RoomCategory?.description ?? '',
                    capacity: room?.RoomCategory?.capacity ?? 0,
                    numberCurrent: room?.Users?.length ?? 0,
                    priceRoom: room?.RoomCategory?.priceRoom ?? 0,
                    buildingName: room?.Building?.name ?? 0,
                    address: room?.Building?.address ?? ''
                };
            });
        }
        setTableData([...data]);
    }, [rooms]);

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [editModelOpen, setEditModelOpen] = useState(false);
    const [idRoomUpdate, setIdRoomUpdate] = useState(-1);
    const handleCreateNewRow = (values) => {
        console.log('values create', values);
        const { name, buildingId, roomCategoryId } = values;
        dispatch(createRoom({ name, buildingId, roomCategoryId }));
    };
    const onShowModelUpdate = (id) => {
        setEditModelOpen(true);
        setIdRoomUpdate(id);
    };
    const handleSaveRowEdits = async (values) => {
        console.log('values save', values);
        const { id, name, buildingId, roomCategoryId } = values;
        dispatch(updateRoom(id, { name, buildingId, roomCategoryId }));
    };

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const handleDeleteRow = (row) => {
        console.log('row:', row);
        if (!confirm(`Bạn có muốn xóa phòng ${row.original.name}, tòa ${row.original.buildingName}`)) {
            return;
        }
        //send api delete request here, then refetch or update local table data for re-render
        // const id = row.getValue('id');
        dispatch(deleteRoom(row.original.id));
        //tableData.splice(row.index, 1);
        //setTableData([...tableData]);
        //deleteRoom;
    };

    const columns = [
        {
            accessorKey: 'name',
            header: 'Tên phòng',
            size: 140
        },
        {
            accessorKey: 'buildingName',
            header: 'Tòa',
            size: 140
        },

        {
            accessorKey: 'description',
            header: 'Mô tả chi tiết',
            size: 200
        },
        {
            accessorKey: 'numberCurrent',
            header: 'Số lượng hiện tại',
            size: 140
        },
        {
            accessorKey: 'capacity',
            header: 'Số giường',
            size: 140
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
                // onEditingRowSave={handleSaveRowEdits}
                onEditingRowCancel={handleCancelRowEdits}
                renderRowActions={({ row }) => (
                    <Box sx={{ display: 'flex' }}>
                        <Tooltip arrow placement="left" title="Sửa">
                            <IconButton sx={{ color: 'success.main' }} onClick={() => onShowModelUpdate(row.original.id)}>
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
                        Thêm phòng
                    </Button>
                )}
            />
            <CreateNewRoomTypeModal
                columns={columns}
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleCreateNewRow}
            />
            <EditRoomTypeModal
                open={editModelOpen}
                onClose={() => setEditModelOpen(false)}
                onSubmit={handleSaveRowEdits}
                idUpdate={idRoomUpdate}
            />
        </>
    );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewRoomTypeModal = ({ open, onClose, onSubmit }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBuildingList());
        dispatch(getRoomCategoryList());
    }, [open]);
    const buildingList = useSelector((state) => state.buildingList);
    const roomCategoryList = useSelector((state) => state.roomCategoryList);
    // console.log(buildingList);
    const buildings = buildingList?.buildings?.data?.items ?? [];
    const { roomsCategory } = roomCategoryList;
    // console.log('buildings:', buildings);
    const [roomInfo, setRoomInfo] = useState({});
    const handleChangeRoomInfo = (e, field) => {
        setRoomInfo((prevState) => ({
            ...prevState,
            [field]: e.target.value
        }));
    };
    console.log(roomInfo);
    const handleSubmit = () => {
        //put your validation logic here
        console.log(roomInfo);
        onSubmit(roomInfo);
        setRoomInfo({});
        onClose();
    };
    const hanldeClose = () => {
        setRoomInfo({});
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
            <DialogTitle textAlign="center">Thêm phòng</DialogTitle>
            <DialogContent sx={{ overflowY: 'visible' }}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack
                        sx={{
                            width: '100%',
                            minWidth: { xs: '300px', sm: '360px', md: '400px' },
                            gap: '1.5rem'
                        }}
                    >
                        <TextField
                            sx={{ p: 1 }}
                            id="outlined-k"
                            label="Tên phòng"
                            value={roomInfo?.name ?? ''}
                            onChange={(e) => handleChangeRoomInfo(e, 'name')}
                        />
                        <FormControl sx={{ p: 1 }} fullWidth>
                            <InputLabel id="demo-simple-select-label">Thông tin tòa nhà</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Thông tin tòa nhà"
                                value={roomInfo?.buildingId ?? ''}
                                onChange={(e) => handleChangeRoomInfo(e, 'buildingId')}
                            >
                                {buildings &&
                                    buildings.map((building) => (
                                        <MenuItem value={building.id} key={building.id}>
                                            {building.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>{' '}
                        <FormControl sx={{ p: 1 }} fullWidth>
                            <InputLabel id="demo-simple-select-label">Thông tin phòng</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Thông tin phòng"
                                value={roomInfo?.roomCategoryId ?? ''}
                                onChange={(e) => handleChangeRoomInfo(e, 'roomCategoryId')}
                            >
                                {roomsCategory &&
                                    roomsCategory.map((roomCategory) => (
                                        <MenuItem
                                            value={roomCategory.id}
                                            key={roomCategory.id}
                                        >{`${roomCategory.description}, ${roomCategory.capacity} giường, Giá : ${roomCategory.priceRoom}/tháng`}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ p: '1.25rem' }}>
                <Button onClick={hanldeClose}>Hủy</Button>
                <Button color="secondary" onClick={handleSubmit} variant="contained">
                    Thêm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export const EditRoomTypeModal = ({ open, onClose, onSubmit, idUpdate }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBuildingList());
        dispatch(getRoomCategoryList());
        if (idUpdate > 0) {
            dispatch(getRoomById(idUpdate));
        }
    }, [open]);
    const buildingList = useSelector((state) => state.buildingList);
    const roomCategoryList = useSelector((state) => state.roomCategoryList);
    const buildings = buildingList?.buildings?.data?.items ?? [];
    const { roomsCategory } = roomCategoryList;
    const room = useSelector((state) => state.roomList.room);
    // console.log('room', room);
    const [roomUpdate, setRoomUpdate] = useState({});
    // console.log('roomUpdate', roomUpdate);
    useEffect(() => {
        setRoomUpdate({ ...room });
    }, [room]);
    const handleChangeRoomInfo = (e, field) => {
        setRoomUpdate((prevState) => ({
            ...prevState,
            [field]: e.target.value
        }));
    };
    const handleSubmit = () => {
        //put your validation logic here
        console.log(roomUpdate);
        onSubmit(roomUpdate);
        setRoomUpdate({});
        onClose();
    };
    const hanldeClose = () => {
        setRoomUpdate({});
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
            <DialogTitle textAlign="center">Sửa phòng</DialogTitle>
            <DialogContent sx={{ overflowY: 'visible' }}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack
                        sx={{
                            width: '100%',
                            minWidth: { xs: '300px', sm: '360px', md: '400px' },
                            gap: '1.5rem'
                        }}
                    >
                        <TextField
                            sx={{ p: 1 }}
                            id="outlined-k"
                            label="Tên phòng"
                            value={roomUpdate?.name ?? ''}
                            onChange={(e) => handleChangeRoomInfo(e, 'name')}
                        />
                        <FormControl sx={{ p: 1 }} fullWidth>
                            <InputLabel id="demo-simple-select-label">Thông tin tòa nhà</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Thông tin tòa nhà"
                                value={roomUpdate?.buildingId ?? ''}
                                onChange={(e) => handleChangeRoomInfo(e, 'buildingId')}
                            >
                                {buildings &&
                                    buildings.map((building) => (
                                        <MenuItem value={building.id} key={building.id}>
                                            {building.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>{' '}
                        <FormControl sx={{ p: 1 }} fullWidth>
                            <InputLabel id="demo-simple-select-label">Thông tin phòng</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Thông tin phòng"
                                value={roomUpdate?.roomCategoryId ?? ''}
                                onChange={(e) => handleChangeRoomInfo(e, 'roomCategoryId')}
                            >
                                {roomsCategory &&
                                    roomsCategory.map((roomCategory) => (
                                        <MenuItem
                                            value={roomCategory.id}
                                            key={roomCategory.id}
                                        >{`${roomCategory.description}, ${roomCategory.capacity} giường, Giá : ${roomCategory.priceRoom}/tháng`}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ p: '1.25rem' }}>
                <Button onClick={hanldeClose}>Hủy</Button>
                <Button color="secondary" onClick={handleSubmit} variant="contained">
                    Thêm
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default RoomTable;
