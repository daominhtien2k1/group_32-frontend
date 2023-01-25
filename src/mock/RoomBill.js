import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const rooms_bill = [...Array(24)].map((_, index) => ({
    id: faker.datatype.uuid(),
    name: sample(['401', '402', '403', '404', '405', '406', '407', '408', '409']),
    type: sample(['Phòng thường', 'Phòng thường, máy lạnh ', 'Phòng dịch vụ']),
    beds: sample(['4', '4', '6', '6', '8', '8', '4', '6', '3']),
    genderType: sample(['Nam', 'Nữ'])
}));

export default rooms_bill;
