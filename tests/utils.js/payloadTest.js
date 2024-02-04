import { faker } from '@faker-js/faker';

const testID = () => Math.floor(Math.random() * 1000) + 1;
const testID2 = () => Math.floor(Math.random() * 1000) + 2;
const payloadTest = {
  cafe: {
    id: testID(),
    nombre: faker.animal.dog(),
  },
};

const payloadTest2 = {
  cafe: {
    id: testID2(),
    nombre: faker.animal.cat(),
  },
};

export { payloadTest,payloadTest2 };
