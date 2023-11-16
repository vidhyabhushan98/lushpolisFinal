const mongoose = require('mongoose');

const DiarySchema = new mongoose.Schema({
    details:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'DiaryDetails',
    },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  entries: [
    {
      date: {
        type: Date,
        required: true,
      },
      entries: [
        {
          time: {
            type: Date,
            required: true,
          },
          text: {
            type: String,
            required: true,
          },
          img: {
            type: String,
            required: false,
          },
        },
      ],
    },
  ],
});

const Diary = mongoose.model('Diary', DiarySchema);
module.exports = Diary;