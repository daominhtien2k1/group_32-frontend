import PropTypes from 'prop-types';
// @mui
import { Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

// ----------------------------------------------------------------------

OfficerListHead.propTypes = {
    order: PropTypes.oneOf(['asc', 'desc']),
    orderBy: PropTypes.string,
    rowCount: PropTypes.number,
    headLabel: PropTypes.array,
    onRequestSort: PropTypes.func
};

export default function OfficerListHead({ order, orderBy, rowCount, headLabel, onRequestSort }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead sx={{ bgcolor: 'warning.main' }}>
            <TableRow>
                {headLabel.map((headCell) => (
                    <TableCell key={headCell.id} align="left" sortDirection={orderBy === headCell.id ? order : false}>
                        <TableSortLabel
                            hideSortIcon
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
