const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const DatasetSchema = new Schema({
    name: String,
    description: String,
    archivosDataset: Array,
    DateOfInsert: {type: Date,
    default: new Date()},
    PhotoDataSet: ObjectId
});

const DataSet = mongoose.model('DataSet',DatasetSchema);
module.exports = DataSet;