const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys.js");
const User = require('../models/User');
const Presentation = require('../models/Presentation');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 10;
const NUM_SEED_PRESENTATIONS = 10;

// Create users
const users = [];

users.push(
  new User ({
    username: 'demo-user',
    email: 'demo-user@appacademy.io',
    hashedPassword: bcrypt.hashSync('starwars', 10)
  })
)

for (let i = 1; i < NUM_SEED_USERS; i++) {
  // const firstName = faker.name.firstName();
  // const lastName = faker.name.lastName();
  const username = faker.internet.userName();
  users.push(
    new User ({
      // username: faker.internet.userName(firstName, lastName),
      // email: faker.internet.email(firstName, lastName),
      username,
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10)
    })
  )
}
  
// Create tweets
// const tweets = [];

// for (let i = 0; i < NUM_SEED_TWEETS; i++) {
//   tweets.push(
//     new Tweet ({
//       text: faker.hacker.phrase(),
//       author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id
//     })
//   )
// }

// Create Presentations 
const presentations = [];

for (let i = 0; i < NUM_SEED_PRESENTATIONS; i++) {
  const slides = {
    slide1: {
      id: 1,
      text: faker.lorem.sentence()
    },
    slide2: {
      id: 2,
      text: faker.lorem.sentence()
    },
  };

  presentations.push(
    new Presentation({
      title: faker.hacker.phrase(),
      category: faker.hacker.phrase(),
      author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
      slides: slides
    })
  )
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

const insertSeeds = () => {
  console.log("Resetting db and seeding users and presentations...");

  User.collection.drop()
                 .then(() => Presentation.collection.drop())
                 .then(() => User.insertMany(users))
                 .then(() => Presentation.insertMany(presentations))
                 .then(() => {
                   console.log("Done!");
                   mongoose.disconnect();
                 })
                 .catch(err => {
                   console.error(err.stack);
                   process.exit(1);
                 });
}


