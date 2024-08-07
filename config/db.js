// {
//     "mongoURI": "mongodb+srv://Sakshi09:test123@instaclone.gwk4cly.mongodb.net/?retryWrites=true&w=majority&appName=instaclone",
//     "jwtSecret": "JR/N7RqDst+vEvpEFZsimRynVSVdaXXXfLUAD6DLb8A=",
//     "googleClientID": "101619794660002383910",
//     "googleClientSecret": "your_google_client_secret"
//   }
// config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
