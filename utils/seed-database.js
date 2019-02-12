'use strict';
const mongoose = require('mongoose');

const { MONGODB_URI } = require('../config');

const User = require('../models/user');

const { users } = require('../db/seed/data');

console.log(`Connecting to mongodb at ${MONGODB_URI}`);

mongoose.connect(MONGODB_URI, { useNewUrlParser:true, useCreateIndex : true })
  .then(() => {
    console.log('Dropping the Database...');
    mongoose.connection.db.dropDatabase();
  })
  .then(()=> {
    console.log('Seeding Database...');
    return Promise.all([
      User.insertMany(users),
      // User.createIndexes()
    ]);
  })
  .then(([users]) => {
    console.log(`Inserted ${users.length} users`);
  })
  .then(() => {
    console.log('Disconnecting...');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
  });

// this drops whatever is currently in the database and repopulates it when we run it with node ./utils/seed-database.js