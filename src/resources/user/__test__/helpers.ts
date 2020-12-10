import faker from 'faker';
const makeUser = (): Record<string, unknown> => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  unit: 'test',
  email: faker.internet.email(),
  password: faker.random.alphaNumeric(10),
  phone: faker.phone.phoneNumber(),
  profile: faker.random.number(2),
});

export { makeUser };
