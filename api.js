var express = require('express')
var router = express.Router()

// Retrieve
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://raa:1234@ds111299.mlab.com:11299/hackathonraa';

router.get('/songs', function (req, res) {
    MongoClient.connect(url, function (err, db) {
      var dbo = db.db('hackathonraa');
      dbo.collection('Songs').find().toArray(function (err, result) {
        res.json(result);
        db.close();
      })
    });
});
  
router.post('/songs/add', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        var dbo = db.db('hackathonraa');
        var newSong = {
        "trackId" : req.body.trackId,
        "Name" : req.body.Name,
        "Author" : req.body.Author,
        "Rating" : 0
        };

        dbo.collection('Songs').insert(newSong, function () {
            console.log("Added Successfully");
            db.close();
        });
    });
});
  
router.put('/songs/rating/update/:trackId/:id', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        var dbo = db.db('hackathonraa');

        dbo.collection('Songs').updateOne(
            { "trackId": parseInt(req.params.trackId),
            "_id" : ObjectID(req.params.id) },
            { $set: { "Rating": req.body.Rating + 1 } },
            function (err, object) {
                if (err) {
                console.log(err.message);  // returns error if no matching object found
                } else {
                console.log(object);
                }
                db.close();
            }
        );
    });
});

router.delete('/songs/rating/update/:trackId/:id', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        var dbo = db.db('hackathonraa');

        dbo.collection('Songs').deleteOne(
        { "trackId": parseInt(req.params.trackId),
          "_id" : ObjectID(req.params.id) },
        { $set: { "Rating": req.body.Rating + 1 } },
        function (err, object) {
            if (err) {
            console.log(err.message);  // returns error if no matching object found
            } else {
            console.log(object);
            }
            db.close();
        });
    });
});

module.exports = router;