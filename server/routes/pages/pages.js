var models = require('express').Router();
const images = require('../images/images.js');
const pages = require('../../Db/page.js');

/**
 * Adds the image to the pages api
 */
models.use("/images", images);

models.post('/', (req, res) => {
    pages.addNewObject(req.fields, (data) => {
        res.status(200).json(data);
    });
});

models.get('/', (req, res) => {
    pages.getAll((data) => {
        res.status(200).json(data);
    });
});

models.get('/search/:exp', (req, res) => {
    pages.getSpecific({name:{$regex:"(" + req.params.exp + "){1}"}}, (data) => {
        res.status(200).json(data);
    })
});

models.get('/:id', (req, res)=> {
    pages.getById(req.params.id, data=> {
        res.status(200).json(data);
    })
})

models.delete('/:id', (req, res) => {
    pages.removeObject(req.params.id, data=> {
        res.status(200).json(data);
    })
})

models.put('/:id', (req, res) => {
    pages.updateObject(req.params.id, {contents:req.fields.contents}, (data)=> {
        res.status(200).json(data);
    })
})

module.exports = models;