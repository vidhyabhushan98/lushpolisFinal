const Diary = require('../models/Diary');
const User = require('../models/User');
const DiaryDetails = require('../models/DiaryDetails');
const cloudinary = require('../config/cloudinary');
const mongoose = require('mongoose');


exports.addEntry = async (req, res) => {
  
  const { userId, year, month, date, text, details, img } = req.body;
  //console.log("addEntry 1", userId, year, month, date, text, details, img);
  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ message: 'Invalid userId' });
  }

  if (!Number.isInteger(year) || !Number.isInteger(month) || !date || !text) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let diary = await Diary.findOne({
      details: details,
      owner: userId,
      year: year,
      month: month,
    });

    if (!diary) {
      diary = new Diary({
        details: details,
        owner: userId,
        year: year,
        month: month,
        entries: [],
      });
    }
    let entry = diary.entries.find((e) => {
      const eDate = new Date(e.date);
      eDate.setHours(0, 0, 0, 0); 
      
      const inputDate = new Date();
      inputDate.setFullYear(year); 
      inputDate.setMonth(month-1); 
      inputDate.setDate(date); 
      inputDate.setHours(0, 0, 0, 0);
      console.log("eDate", eDate, inputDate);
      return eDate.toDateString() === inputDate.toDateString();

    });

    if (!entry) {
      console.log("entry not found", new Date());
      entry = {
        date: new Date(),
        entries:[
          {
            time: new Date(),
            text: text,
            img: (img==="" || img===undefined) ? "" : img,
          }
        ]
      };
      diary.entries.push(entry);
    }
    else{
      entry.entries.push({
        time: new Date(),
        text: text,
        img: (img==="" || img===undefined) ? "" : img,
      });
    }

    await diary.save();
    return res.json({ entry: entry, message: 'Diary entry added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.createDiary = async (req, res) => {
    const { owner, year, month, details } = req.body;
    console.log("createDiary 1", owner, year, month, details);
    if (!owner || typeof owner !== 'string') {
      return res.status(400).json({ message: 'Invalid owner' });
    }
    console.log("createDiary 2");
  
    if (!Number.isInteger(year) || !Number.isInteger(month)) {
      return res.status(400).json({ message: 'Invalid year or month' });
    }
    console.log("createDiary 3");
  
    try {
      const user = await User.findById(owner);
      console.log("createDiary 4");
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      console.log("createDiary 5");
      const existingDiary = await Diary.findOne({ owner, year, month, details });

      if (existingDiary) {
        console.log("existingDiary", existingDiary);
        return res.status(400).json({ message: 'Diary for this year and month already exists' });
      }
      console.log("createDiary 6");
      const newDiary = new Diary({
        details: details,
        owner: owner,
        year: year,
        month: month,
        entries: [],
      });
      console.log("createDiary 7");
      await newDiary.save();
      console.log("createDiary 8");
      return res.json({ diary: newDiary, message: 'Diary created successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  exports.getEntriesByDate = async (req, res) => {
    const { owner, year, month, date, details } = req.body;
    console.log("get entries by date", owner, year, month, date, details);
    try {
      const user = await User.findById(owner);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const diary = await Diary.findOne({ owner, year, month, details });
  
      if (!diary) {
        return res.status(404).json({ message: 'Diary not found' });
      }
      const entry = diary.entries.find((e) =>{
        const eDate = new Date(e.date);
        eDate.setHours(0, 0, 0, 0); 
      
        const inputDate = new Date();
        inputDate.setFullYear(year); 
        inputDate.setMonth(month-1); 
        inputDate.setDate(date); 
        inputDate.setHours(0, 0, 0, 0);
        console.log("eDate", eDate, inputDate);
        return eDate.toDateString() === inputDate.toDateString();
      });
      if (!entry) {
        return res.status(200).json({ message: 'Entries for this date not found' });
      }
  
      return res.json({ entries: entry.entries, message: 'Entries fetched successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
  exports.getEntriesByMonth = async (req, res) => {
    // console.log("getEntriesByMonth 1")
    const { owner, year, month, details } = req.body;
    //console.log("getEntriesByMonth 2")
    try {
      const user = await User.findById(owner);
      //console.log("getEntriesByMonth 3")
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      //console.log("getEntriesByMonth 4")
      const diary = await Diary.findOne({ owner, year, month, details });
      //console.log("getEntriesByMonth 5")
      if (!diary) {
        return res.status(200).json({ message: 'Diary not found' });
      }
      //console.log("getEntriesByMonth 6")
      const allEntries = diary.entries;
      //console.log("getEntriesByMonth 7")
      return res.json({ entries: allEntries, message: 'Entries for the month fetched successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
  exports.fetchDiaryDetails = async (req, res) => {
    // console.log("fetchDiaryDetails 1")
    const {detailsId} = req.body;
    // console.log(detailsId)
    // console.log("fetchDiaryDetails 2")
    if (!detailsId || typeof detailsId !== 'string') {
      // console.log("fetchDiaryDetails 2.1")
      return res.status(400).json({ message: 'Invalid detailsId' });
    }
    // console.log("fetchDiaryDetails 3")
    try {
      const diaryDetails = await DiaryDetails.findById(detailsId);
      // console.log("fetchDiaryDetails 4")
      if (!diaryDetails) {
        return res.status(404).json({ message: 'Diary details not found' });
      }
      // console.log("fetchDiaryDetails 5")
      return res.json({ diaryDetails: diaryDetails, message: 'Diary details fetched successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  exports.createNewDiaryDetails = async (req, res) => {
    // console.log("step 0")
    const { userId, title,userName, description, plantSpecies, plantName, plantImage } = req.body;
    // console.log("step 1")
    // console.log("step 2")
    try {
        const user = await User.findById(userId);
        //console.log("step 3")
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        //console.log("step 4")
        let imageUrl={};
        //console.log("step 5")
        if(plantImage){
          //console.log("step 6")
            imageUrl = await cloudinary.uploader.upload(plantImage, {
                folder: 'plantDiary',
            }, (error, result) => {
              if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Server error' });
              }
          });
        }
        //console.log("step 7")
        const newDiaryDetails = new DiaryDetails({
            userId: userId,
            owner: userName,
            title: title,
            description: description,
            plantSpecies: plantSpecies,
            plantName: plantName,
            createdAt: new Date(),
            plantImage: imageUrl ? [{
              public_id: imageUrl.public_id,
              url: imageUrl.secure_url,
          }] :[], 
        });
        //console.log("step 8")
        const uploaded = await newDiaryDetails.save();
        //console.log("step 9")
        user.diaries.push(uploaded._id);
        //console.log("step 10")
        await user.save();
        //console.log("step 11")
        return res.json({ user:user,diaryDetails: newDiaryDetails, message: 'Diary details created successfully' });
    } catch (error) {
      console.error(error.toString());
      return res.status(500).json({ message: 'Server error' });
    }
  };


  exports.fetchAllUserDiaries = async (req, res) => {
    console.log("fetchAllUserDiaries 1");
    const {userId} = req.body;
    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ message: 'Invalid userId' });
    }
    console.log("fetchAllUserDiaries 2");
    try {
        const user = await User.findById(userId);
        console.log("fetchAllUserDiaries 3");
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log("fetchAllUserDiaries 4");
        const diaryDetailsIds = user.diaries;
        console.log("fetchAllUserDiaries 5");
        const diariesDetails = await DiaryDetails.find({ _id: { $in: diaryDetailsIds } });
        console.log("fetchAllUserDiaries 6");
        return res.json({ diaryDetails: diariesDetails, message: 'Diary details fetched successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
}


