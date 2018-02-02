import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: 'String', required: true },
  email: { type: 'String', required: true , index: { unique: true }}, 
  password: { type: 'String', required: true }
}, {
  versionKey: false
});

export default mongoose.model('Users', userSchema);