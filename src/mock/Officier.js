import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const officerList = [...Array(12)].map((_, index) => ({
    id: faker.datatype.uuid(),
    avatarUrl: `avatar_${index + 1}.jpg`,
    name: faker.name.fullName(),
    email: faker.internet.email(),
    role: sample(['Leader', 'Hr Manager', 'UI Designer', 'UX Designer', 'UI/UX Designer'])
}));

export default officerList;
