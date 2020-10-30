import Mongoose from 'mongoose';

Mongoose.connect('mongodb://localhost:27017/mongodb-test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
