import mongoose, { Document } from 'mongoose';
import User from '../../../entities/IUser';

export type MongooseUserType = User & Document;

const MongooseUserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const MongooseUserModel = mongoose.model<MongooseUserType>(
  'Users',
  MongooseUserSchema,
);

export default MongooseUserModel;
