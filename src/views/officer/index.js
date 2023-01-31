import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
// @mui
import {
    Card,
    Table,
    Stack,
    Paper,
    Avatar,
    Button,
    Popover,
    Checkbox,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    TablePagination
} from '@mui/material';
// components
import Label from '../../ui-component/label';

// sections

// mock
// import officerList from '../../mock/Officier';
import OfficerListToolbar from '../../sections/officer/OfficerListToolbar';
import OfficerListHead from '../../sections/officer/OfficerListHead';

// ----------------------------------------------------------------------
let officerList = [
    {
        id: '9s41rp',
        avatarUrl: `avatar_1.jpg`,
        name: 'Nguyễn Hữu Khôi',
        email: 'khoi.nguyenhuu@hust.edu.vn',
        role: 'Giám đốc Trung tâm'
    },
    {
        id: '9s41rp',
        avatarUrl: `avatar_1.jpg`,
        name: 'Vũ Văn Trường',
        email: 'truong.vuvan@hust.edu.vn',
        role: 'Phó Giám đốc Trung tâm'
    },
    {
        id: '9s41rp',
        avatarUrl: `avatar_3.jpg`,
        name: 'Vũ Thanh Nga',
        email: 'nga.vuthanh@hust.edu.vn',
        role: 'Cán bộ Văn phòng Trung tâm'
    }
];

const TABLE_HEAD = [
    { id: 'name', label: 'Họ và tên' },
    { id: 'email', label: 'Email' },
    { id: 'role', label: 'Vai trò' }
];

// ----------------------------------------------------------------------

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
        return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function Officer() {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

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

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - officerList.length) : 0;

    const filteredOfficers = applySortFilter(officerList, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredOfficers.length && !!filterName;

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h3" gutterBottom>
                    DANH SÁCH CÁN BỘ CÓ THỂ TRỢ GIÚP
                </Typography>
                {/*<Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>*/}
                {/*    New User*/}
                {/*</Button>*/}
            </Stack>

            <Card>
                <OfficerListToolbar filterType={filterName} onFilterType={handleFilterByName} />
                <TableContainer sx={{ minWidth: 800, paddingX: 2 }}>
                    <Table>
                        <OfficerListHead
                            order={order}
                            orderBy={orderBy}
                            headLabel={TABLE_HEAD}
                            rowCount={officerList.length}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {filteredOfficers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                const { id, name, email, role, avatarUrl } = row;
                                return (
                                    <TableRow hover key={id} tabIndex={-1}>
                                        <TableCell component="th" scope="row" padding="none">
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <Avatar alt={name} src={require(`../../assets/images/avatars/${avatarUrl}`)} />
                                                <Typography variant="subtitle2" noWrap>
                                                    {name}
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="left">{email}</TableCell>
                                        <TableCell align="left">{role}</TableCell>
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
                                                <strong>&quot;{filterName}&quot;</strong>.
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
                    count={officerList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </>
    );
}
