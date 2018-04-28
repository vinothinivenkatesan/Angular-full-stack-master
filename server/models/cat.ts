import * as mongoose from 'mongoose';

const catSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  description:String,
  files:String
});

const Cat = mongoose.model('Cat', catSchema);

export default Cat;
