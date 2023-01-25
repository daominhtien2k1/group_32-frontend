import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const billList = [...Array(5)].map((_, index) => ({
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    mssv: sample(['20190070', '20190071', '20190072', '20190073', '20190074']),
    money: sample([350000, 100000, 2000000]),
    paymentDueDate: '25/2/2023',
    maintainanceDate: '25/8/2023',
    status: sample(['Đã thanh toán', 'Chưa thanh toán', 'Quá hạn'])
}));

export default billList;
