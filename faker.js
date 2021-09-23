var faker = require("faker");
const Entity = require("./models/entity");

var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz

const entities = [];
for (var i = 0; i < 50; i++) {
  const entity = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    address: faker.address.streetAddress(),
    phone: faker.phone.phoneNumber(),
    website: faker.internet.url(),
    createdAt: new Date(),
    comments: [
      {
        author: faker.name.findName(),
        avatar: faker.internet.avatar(),
        content: faker.lorem.lines(2),
        displayTime: "less than a minute",
        datetime: faker.date.recent(),
      },
      {
        author: faker.name.findName(),
        avatar: faker.internet.avatar(),
        content: faker.lorem.lines(2),
        displayTime: "less than a minute",
        datetime: faker.date.recent(),
      },
    ],
  };
  entities.push(entity);
}

console.log(JSON.stringify(entities));

// Entity.insertMany(entities)
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// console.log(entities);
