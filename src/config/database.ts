import Mongoose from 'mongoose';

import '@modules/users/infra/mongoose/entities/MongooseUser';

Mongoose.connect('mongodb://localhost:27017/mongodb-test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
