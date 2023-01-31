import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const officerList = [...Array(12)].map((_, index) => ({
    id: faker.datatype.uuid(),
    avatarUrl: `avatar_${index + 1}.jpg`,
    name: faker.name.fullName(),
    email: faker.internet.email(),
    role: sample([
        'Giám đốc Trung tâm',
        'Phó Giám đốc Trung tâm',
        'Cán bộ Văn phòng Trung tâm',
        'Hỗ trợ kỹ thuật',
        'Cán bộ Quản lý tòa nhà'
    ])
}));

export default officerList;
