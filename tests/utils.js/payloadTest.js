import { faker } from '@faker-js/faker';

const testID = () => Math.floor(Math.random() * 1000) + 1;

const payloadTest = {
  cafe: {
    id: testID(),
    nombre: faker.animal.dog(),
  },
};

export { payloadTest };
