// utils/mocking.js
const faker = require('faker');
const bcrypt = require('bcrypt');

const generateUsers = (numUsers) => {
  const users = [];
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync('coder123', saltRounds);

  for (let i = 0; i < numUsers; i++) {
    users.push({
      name: faker.person.findName(),
      email: faker.internet.email(),
      password: hashedPassword,
      role: faker.random.arrayElement(['user', 'admin']),
      pets: [],
    });
  }
  return users;
};

module.exports = { generateUsers };

