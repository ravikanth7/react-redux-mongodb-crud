import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: 'String', required: true },
  code: { type: 'String', required: true , index: { unique: true }},
  quantity: { type: 'Number', required: true },
  expiry: { type: 'Date', default: Date.now, required: true }
}, {
  versionKey: false
});

export default mongoose.model('Products', productSchema);