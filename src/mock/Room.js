import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const rooms = [...Array(24)].map((_, index) => ({
    id: faker.datatype.uuid(),
    name: sample(['401', '402', '403', '404', '405', '406', '407', '408', '409']),
    beds: sample(['4', '4', '6', '6', '8', '8', '4', '6', '3']),
    type: sample(['Phòng thường', 'Phòng thường, máy lạnh ', 'Phòng dịch vụ']),
    genderType: sample(['Nam', 'Nữ']),
    leftBeds: sample(['5/8', '7/8', '4/8', '6/8', '1/8']),
    status: sample(['Khả dụng', 'Khả dụng', 'Không khả dụng'])
}));

export default rooms;
