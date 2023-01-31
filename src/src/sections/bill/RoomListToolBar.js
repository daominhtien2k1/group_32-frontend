import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment } from '@mui/material';
// component
import Iconify from '../../ui-component/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3)
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
    width: 280,
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': {
        width: 360
        // boxShadow: theme.customShadows.z8
    },
    '& fieldset': {
        borderWidth: `1px !important`,
        borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`
    }
}));

// ----------------------------------------------------------------------

RoomListToolbar.propTypes = {
    filterType: PropTypes.string,
    onFilterType: PropTypes.func
};

export default function RoomListToolbar({ filterType, onFilterType }) {
    return (
        <StyledRoot>
            <StyledSearch
                value={filterType}
                onChange={onFilterType}
                placeholder="Tìm kiếm loại phòng/số giường..."
                startAdornment={
                    <InputAdornment position="start">
                        <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                    </InputAdornment>
                }
            />
            <Tooltip title="Filter list">
                <IconButton>
                    <Iconify icon="ic:round-filter-list" />
                </IconButton>
            </Tooltip>
        </StyledRoot>
    );
}
