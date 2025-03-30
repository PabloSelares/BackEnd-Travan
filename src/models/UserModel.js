import { Schema, model, mongo } from 'mongoose';
import mongoose from 'mongoose';

const schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'CLIENT' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
export default  mongoose.model('User', schema);

