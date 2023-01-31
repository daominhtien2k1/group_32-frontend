import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Grid, Stack } from '@mui/material';
import { Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import { gridSpacing } from '../../redux/constants/constant';
import { Outlet, useNavigate } from 'react-router-dom';
import { getBuildingList } from '../../redux/actions/BuildingActions';
import { getRoomCategoryList } from '../../redux/actions/RoomCategoryActions';

const MenuProps = {
    PaperProps: {
        style: {
            overflowY: 'scroll',
            height: '200px'
        }
    }
};
let buildingIDList = [
    { id: 1, name: 'B10' },
    { id: 3, name: 'B8' }
];
const RequestRoom = () => {
    const dispatch = useDispatch();
    const buildingList = useSelector((state) => state.buildingList);
    let { loading, error, buildings } = buildingList;

    useEffect(() => {
        dispatch(getBuildingList());
        dispatch(getRoomCategoryList());
    }, [dispatch]);

    const [dataBuildingIDlist, setDataBuildingIDlist] = useState(buildingIDList);
    useEffect(() => {
        if (buildings.length !== 0) {
            const buildingIDListMap = buildings.data.items.map((building) => {
                return {
                    id: building.id,
                    name: building.name
                };
            });
            setDataBuildingIDlist(buildingIDListMap);
        }
    }, [buildings]);

    const [building, setBuilding] = useState(1);
    const [floor, setFloor] = useState(1);
    const theme = useTheme();
    const navigate = useNavigate();
    const handleChangeBuilding = (event) => {
        console.log(event.target.value);
        setBuilding(event.target.value);
    };
    const handleChangeFloor = (event) => {
        setFloor(event.target.value);
    };

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
                        <InputLabel id="building">Khu</InputLabel>
                        <Select
                            labelId="building-label"
                            id="building-value"
                            value={building}
                            label="Building"
                            onChange={handleChangeBuilding}
                            MenuProps={MenuProps}
                        >
                            {dataBuildingIDlist.map((item) => (
                                <MenuItem value={item.id}>{item.name}</MenuItem>
                            ))}
                            {/*<MenuItem value={1}>B1</MenuItem>*/}
                            {/*<MenuItem value={3}>B3</MenuItem>*/}
                            {/*<MenuItem value={5}>B5</MenuItem>*/}
                            {/*<MenuItem value={4}>B5B</MenuItem>*/}
                        </Select>
                    </FormControl>
                </Grid>
                {/*<Grid item xs={2} md={2}>*/}
                {/*    <FormControl fullWidth>*/}
                {/*        <InputLabel id="floor">Tầng</InputLabel>*/}
                {/*        <Select*/}
                {/*            labelId="building-label"*/}
                {/*            id="building-value"*/}
                {/*            value={floor}*/}
                {/*            label="Tầng"*/}
                {/*            onChange={handleChangeFloor}*/}
                {/*            MenuProps={MenuProps}*/}
                {/*        >*/}
                {/*            <MenuItem value={1}>1</MenuItem>*/}
                {/*            <MenuItem value={2}>2</MenuItem>*/}
                {/*            <MenuItem value={3}>3</MenuItem>*/}
                {/*            <MenuItem value={4}>4</MenuItem>*/}
                {/*            <MenuItem value={5}>5</MenuItem>*/}
                {/*            <MenuItem value={6}>6</MenuItem>*/}
                {/*            <MenuItem value={7}>7</MenuItem>*/}
                {/*            <MenuItem value={8}>8</MenuItem>*/}
                {/*            <MenuItem value={9}>9</MenuItem>*/}
                {/*            <MenuItem value={10}>10</MenuItem>*/}
                {/*        </Select>*/}
                {/*    </FormControl>*/}
                {/*</Grid>*/}
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
                        onClick={() => {
                            navigate(`${building}`);
                        }}
                    >
                        Tìm kiếm
                    </Button>
                </Grid>
            </Grid>
            <Outlet />
        </>
    );
};

export default RequestRoom;
