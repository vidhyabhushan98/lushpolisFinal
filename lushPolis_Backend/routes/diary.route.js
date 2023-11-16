const controller = require('../controllers/diary.controller');

module.exports = (app) => {

    app.post('/addEntry', function (req,res){
        console.log('addEntry');
        controller.addEntry(req,res);
        console.log('addEntry done');
    });

    app.post('/createDiary', function(req,res){
        console.log('createDiary');
        controller.createDiary(req,res);
        console.log('createDiary done');
    });

    app.post('/getEntriesByMonth', function(req,res){
        console.log ('getEntriesByMonth');
        controller.getEntriesByMonth(req,res);
        console.log ('getEntriesByMonth done');
    });

    app.post('/getEntriesByDate', function(req,res){
        console.log ('getEntriesByDate');
        controller.getEntriesByDate(req,res);
        console.log ('getEntriesByDate done');
    });

    app.post('/createNewDiaryDetails', function(req,res){
        console.log('createNewDiaryDetails starting');
        controller.createNewDiaryDetails(req,res);
        console.log('createNewDiaryDetails done');
    });

    app.post('/fetchDiaryDetails', function(req,res){
        console.log('fetchDiaryDetails');
        controller.fetchDiaryDetails(req,res);
        console.log('fetchDiaryDetails done');
    });

    app.post('/updateDiaryDetails', function(req,res){
        console.log('updateDiaryDetails');
        controller.updateDiaryDetails(req,res);
        console.log('updateDiaryDetails done');
    });  

    app.post('/fetchAllUserDiaries', function (req,res){
        console.log('fetchAllUserDiaries');
        controller.fetchAllUserDiaries(req,res);
        console.log('fetchAllUserDiaries done');
    });

    
    // app.post('/updateEntry', function (req,res){
    //     console.log('updateEntry');
    //     controller.updateEntry(req,res);
    //     console.log('updateEntry done');
    // });

    // app.post('/deleteEntry', function (req,res){
    //     console.log('deleteEntry');
    //     controller.deleteEntry(req,res);
    //     console.log('deleteEntry done');
    // });

    // app.post('/fetchDiary', function(req,res){
    //     console.log('fetchDiary');
    //     controller.fetchDiary(req,res);
    //     console.log('fetchDiary done');
    // });

    // app.post('/deleteDiary', function(req,res){
    //     console.log ('deleteDiary');
    //     controller.deleteDiary(req,res);
    //     console.log ('deleteDiary done');
    // });
};