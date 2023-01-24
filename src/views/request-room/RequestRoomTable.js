import { useState } from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
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
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import RoomListToolbar from '../../sections/room/RoomListToolBar';
import RoomListHead from '../../sections/room/RoomListHead';
import ROOMLIST from '../../mock/Room';
import Label from '../../ui-component/label';
import Iconify from '../../ui-component/iconify';
import MenuItem from '@mui/material/MenuItem';

import { filter } from 'lodash';
import { gridSpacing } from '../../redux/constants/constant';

const TABLE_HEAD = [
    { id: 'name', label: 'Tên phòng' },
    { id: 'type', label: 'Loại phòng' },
    { id: 'beds', label: 'Số giường' },
    { id: 'genderType', label: 'Kiểu phòng' },
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
            return (
                _room.type.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                query.toLowerCase().includes(_room.beds.toLowerCase()) ||
                query.toLowerCase().includes(_room.genderType.toLowerCase())
            );
        });
    }
    return stabilizedThis.map((el) => el[0]);
}

// ==============================|| Request room page||============================== //

const RequestRoomTable = () => {
    const [detailViewOpen, setDetailViewOpen] = useState(false);
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
                                const { id, name, beds, type, genderType, leftBeds, status } = row;

                                return (
                                    <TableRow hover key={id} tabIndex={-1} role="checkbox">
                                        <TableCell align="left">{name}</TableCell>
                                        <TableCell align="left">{type}</TableCell>
                                        <TableCell align="left">{beds} giường</TableCell>
                                        <TableCell align="left">{genderType}</TableCell>
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
                <MenuItem onClick={() => setDetailViewOpen(true)}>Xem chi tiết</MenuItem>
                <MenuItem>Đăng kí</MenuItem>
            </Popover>

            <DetailViewModal detailViewOpen={detailViewOpen} onClose={() => setDetailViewOpen(false)} onSubmit={() => {}} />
        </>
    );
};

const DetailViewModal = ({ detailViewOpen, onClose, onSubmit }) => {
    const handleSubmit = () => {};

    return (
        <Dialog open={detailViewOpen}>
            <DialogTitle variant="h4" textAlign="center">
                Chi tiết thông tin phòng
            </DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={2} md={2}>
                            <Card variant="outlined" sx={{ minWidth: 450 }}>
                                <CardContent>
                                    <Typography mb={1.5} variant="h5" component="div">
                                        Phòng kí túc xá: 401
                                    </Typography>
                                    <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary" gutterBottom>
                                        Loại phòng: Phòng dịch vụ
                                    </Typography>
                                    <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary" gutterBottom>
                                        Kiểu phòng: Nam
                                    </Typography>
                                    <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary" gutterBottom>
                                        Số người hiện tại: 5
                                    </Typography>
                                    <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary" gutterBottom>
                                        Số người tối đa: 8
                                    </Typography>
                                    <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary" gutterBottom>
                                        Mô tả chi tiết: Phòng 6 bạn, có giường tầng, nhà vệ sinh khép kín
                                    </Typography>
                                    <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary" gutterBottom>
                                        Phí lưu trú 1 tháng: 160000
                                    </Typography>
                                    <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary" gutterBottom>
                                        Phí lưu trú 3 tháng: 200000
                                    </Typography>
                                    <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary" gutterBottom>
                                        Phí lưu trú 6 tháng: 240000
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Trạng thái: Khả dụng
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions sx={{ p: '1.25rem' }}>
                <Button onClick={onClose}>Quay lại</Button>
                <Button color="secondary" onClick={handleSubmit} variant="contained">
                    Đăng kí
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RequestRoomTable;
