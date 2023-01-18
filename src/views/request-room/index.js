import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {
    Avatar,
    Card,
    Checkbox,
    Grid,
    IconButton,
    Paper,
    Popover,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow
} from '@mui/material';
import { Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import { gridSpacing } from '../../redux/constants/constant';
import { filter } from 'lodash';
import ROOMLIST from '../../mock/Room';

import Label from '../../ui-component/label';
import Iconify from '../../ui-component/iconify';
import RoomListToolbar from '../../sections/room/RoomListToolBar';

import RoomListHead from '../../sections/room/RoomListHead';

const TABLE_HEAD = [
    { id: 'name', label: 'Tên phòng' },
    { id: 'beds', label: 'Số giường' },
    { id: 'type', label: 'Loại phòng' },
    { id: 'leftBeds', label: 'Số giường còn lại' },
    { id: 'status', label: 'Trạng thái' }
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]); // chỉ có tác dụng giữ nguyên thứ tự 2 phần tử cùng chỉ số, không cần thiết vì thư viện đã sẵn có
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1]; // chỉ có tác dụng giữ nguyên thứ tự 2 phần tử cùng chỉ số, không cần thiết vì thư viện đã sẵn có
    });
    if (query) {
        return filter(array, (_room) => {
            return _room.type.toLowerCase().indexOf(query.toLowerCase()) !== -1 || query.toLowerCase().includes(_room.beds.toLowerCase());
        });
    }
    return stabilizedThis.map((el) => el[0]);
}

// ==============================|| Request room page||============================== //
const MenuProps = {
    PaperProps: {
        style: {
            overflowY: 'scroll',
            height: '200px'
        }
    }
};

const RequestRoom = () => {
    const [building, setBuilding] = useState('B1');
    const [floor, setFloor] = useState(1);
    const theme = useTheme();
    const handleChangeBuilding = (event) => {
        setBuilding(event.target.value);
    };
    const handleChangeFloor = (event) => {
        setFloor(event.target.value);
    };

    const [open, setOpen] = useState(null);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [filterType, setFilterType] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByType = (event) => {
        setPage(0);
        setFilterType(event.target.value);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ROOMLIST.length) : 0;
    const filteredRooms = applySortFilter(ROOMLIST, getComparator(order, orderBy), filterType);
    const isNotFound = !filteredRooms.length && !!filterType;

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h3" gutterBottom>
                    TRANG THÔNG TIN ĐĂNG KÍ PHÒNG Ở KÝ TÚC XÁ ĐẠI HỌC BÁCH KHOA HÀ NỘI
                </Typography>
            </Stack>
            <Grid container spacing={gridSpacing} mb={4}>
                <Grid item xs={2} md={2}>
                    <FormControl fullWidth>
                        <InputLabel id="buidling">Khu</InputLabel>
                        <Select
                            labelId="building-label"
                            id="building-value"
                            value={building}
                            label="Building"
                            onChange={handleChangeBuilding}
                            MenuProps={MenuProps}
                        >
                            <MenuItem value={'B1'}>B1</MenuItem>
                            <MenuItem value={'B3'}>B3</MenuItem>
                            <MenuItem value={'B5'}>B5</MenuItem>
                            <MenuItem value={'B5B'}>B5B</MenuItem>
                            <MenuItem value={'B7'}>B7</MenuItem>
                            <MenuItem value={'B9'}>B9</MenuItem>
                            <MenuItem value={'B13'}>B13</MenuItem>
                            <MenuItem value={'B13B'}>B13B</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2} md={2}>
                    <FormControl fullWidth>
                        <InputLabel id="floor">Tầng</InputLabel>
                        <Select
                            labelId="building-label"
                            id="building-value"
                            value={floor}
                            label="Tầng"
                            onChange={handleChangeFloor}
                            MenuProps={MenuProps}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2} md={2}>
                    <Button
                        variant="outlined"
                        sx={{
                            '&[aria-controls="menu-list-grow"],&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light,
                                borderColor: 'secondary.light'
                            },
                            borderColor: 'secondary.light',
                            backgroundColor: 'secondary.light',
                            color: theme.palette.secondary.dark
                        }}
                    >
                        Tìm kiếm
                    </Button>
                </Grid>
            </Grid>
            <Card>
                <RoomListToolbar filterType={filterType} onFilterType={handleFilterByType} />
                <TableContainer sx={{ minWidth: 800, paddingX: 2 }}>
                    <Table>
                        <RoomListHead
                            order={order}
                            orderBy={orderBy}
                            headLabel={TABLE_HEAD}
                            rowCount={ROOMLIST.length}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {filteredRooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                const { id, name, beds, type, leftBeds, status } = row;

                                return (
                                    <TableRow hover key={id} tabIndex={-1} role="checkbox">
                                        <TableCell align="left">{name}</TableCell>
                                        <TableCell align="left">{beds} giường</TableCell>
                                        <TableCell align="left">{type}</TableCell>
                                        <TableCell align="left">{leftBeds} giường</TableCell>
                                        <TableCell align="left">
                                            <Label color={(status === 'Không khả dụng' && 'error') || 'success'}>{status}</Label>
                                        </TableCell>

                                        <TableCell align="right">
                                            <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                                                <Iconify icon={'eva:more-vertical-fill'} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>

                        {isNotFound && (
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                        <Paper
                                            sx={{
                                                textAlign: 'center'
                                            }}
                                        >
                                            <Typography variant="h6" paragraph>
                                                Không tìm thấy
                                            </Typography>

                                            <Typography variant="body2">
                                                Không tìm thấy kết quả cho &nbsp;
                                                <strong>&quot;{filterType}&quot;</strong>.
                                                <br /> Hãy thử xem lại lỗi chính tả hoặc nhập đầy đủ
                                            </Typography>
                                        </Paper>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={ROOMLIST.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75
                        }
                    }
                }}
            >
                <MenuItem>Xem chi tiết</MenuItem>
                <MenuItem>Đăng kí</MenuItem>
            </Popover>
        </>
    );
};

export default RequestRoom;
