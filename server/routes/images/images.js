var models = require('express').Router();
const fs = require('fs');
const Emitter = require('events');

/**
 * Saves the images to the server and returns the image urls. Can save more than one
 * image at a time
 */
models.post('/', (req, res) => {
    let didErrorOcurred = false;
    let imageUrls = [];
    let processedImages = 0;
    var emmiter = new Emitter();

    emmiter.on('send', ()=> {
        if (didErrorOcurred) {
            res.status(500).json({message: "התמונה לא נשמרה בשרת"});
        } else {
            res.status(200).json({message:"תן בראש ותשתמש בתמונות", imageUrls: imageUrls});
            // // res.sendFile(__dirname + "../../../../images/" + req.files["blured.jpg"].name)
            // var img = fs.readFileSync(__dirname + "../../../../images/" + req.files["blured.jpg"].name);
            // res.writeHead(200, {'Content-Type': 'image/jpeg' });
            // res.end(img, 'binary');
        }
    });

    // Going through all the pictures
    for (let currFile in req.files) {
        let imagePath = req.files[currFile].path;
        let imagePathInServer = __dirname + "../../../../images/" + req.files[currFile].name;
        imageUrls.push('http://localhost:3000/images/' + req.files[currFile].name);

        // For saving the image
        const os = fs.createWriteStream(imagePathInServer);
        const is = fs.createReadStream(imagePath);

        // writing the file
        is.pipe(os);

        // Error writing the picture
        is.on('error', function(err) {
            processedImages++;
            if (err) {
                didErrorOcurred = true;
            }

            processedImages == Object.keys(req.files).length ? emmiter.emit('sent') : '';
        });
        
        // file end
        is.on('end', function() {
            //delete file from temp folder
            fs.unlink(imagePath, function(err) {
                if (err) {
                    didErrorOcurred = true;
                }
                
                processedImages++;
                processedImages == Object.keys(req.files).length ? emmiter.emit('send') : '';
            });
        });
    }
    
});

models.get('/', (req,res) => {
    res.status(200).json({message:"good"});
})

module.exports = models;