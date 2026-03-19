import mongoose, { Model, Schema } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
}
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  }
});
const User = mongoose.model<IUser>('User', userSchema);

export default User;