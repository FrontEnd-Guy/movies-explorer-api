const mongoose = require('mongoose');

const connect = async () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const databaseUrl = isProduction ? process.env.DATABASE_URL : 'mongodb://127.0.0.1:27017/bitfilmsdb';

  try {
    await mongoose.connect(databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

module.exports = connect;
