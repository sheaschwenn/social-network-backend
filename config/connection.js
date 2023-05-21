// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/socialnetworkDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
  
//   // Export connection
//   module.exports = mongoose.connection;

const mongoose = require('mongoose');

// Wrap Mongoose around local connection to MongoDB
mongoose.connect('mongodb://localhost:27017/socialnetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export connection
module.exports = mongoose.connection;