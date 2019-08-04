import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const LinesSchema = new Schema({
  uploader: { type: ObjectId, ref: 'user', required: true },
});

let LinesModel = mongoose.model('lines', LinesSchema);

export default LinesModel;
