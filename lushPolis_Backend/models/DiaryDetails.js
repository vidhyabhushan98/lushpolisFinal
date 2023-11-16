const mongoose = require('mongoose');

const DiaryDetailsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    owner: {
        type:String
    },
    title:{
        type: String,
    },
    description: {
        type: String,
    },
    plantSpecies:{
        type: String,
    },
    plantName:{
        type: String,
    },
    createdAt: {
        type: Date,
    },
    plantImage: [{public_id:{type:String}, url:{type:String}}],
});

const DiaryDetails = mongoose.model('DiaryDetails', DiaryDetailsSchema);
module.exports = DiaryDetails;