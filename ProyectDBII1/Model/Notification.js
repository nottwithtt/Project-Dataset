const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const NotificationSchema = new Schema({
    id_userSubmit: ObjectId,
    id_userNotifier: ObjectId,
    nameDataset: String,
    DateNotifies: {
        type: Date,
        default: new Date()
    },
});

const DataSet = mongoose.model('Notification',NotificationSchema);
module.exports = DataSet;