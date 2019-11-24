const express = require('express');
const mongoose = require('mongoose');
const config = require('../config');
const multer = require('multer');
const checkingAuth = require("../middlewares/checkingAuth");

const Bar = mongoose.model('Bar');
const router = express.Router();

//Acces to the screen, only for connected users
//router.use(checkingAuth);

// get all bars
router.get(config.rootAPI + '/allbars', async (req, res) => {

    const user = await Bar.find({});
    var result = [];

    for (const k in user) {
        if (user.hasOwnProperty(k)) {
            {
                var name = user[k].name;
                var description = user[k].description;
                var tags = user[k].tags;
                var adress = user[k].adress;
                var note = user[k].note;
                var image = user[k].image;
                var product = user[k].product;
                result.push({ 'name': name, 'description': description, 'tags': tags, 'adress': adress, 'note': note, 'image': image, 'product': product });
            };
        }
    }
    res.send(result)   ;
});

router.get(config.rootAPI + '/bar/:barname', async (req, res) => {
    const barName = req.params.barname;
    const barRegex = new RegExp("^" + barName, 'i');
    const bar = await Bar.find({
        name: barRegex
    });
    res.send(bar);
});

const upload = multer({
    limits: {
        //Max of file 1Mo= 1000000 bytes.
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|ppeg)$/)) {
            return cb(new Error('Merci de télécharger une image'));
        }
        cb(undefined, true)
    }
});

router.post(config.rootAPI + '/bar/create-bar', upload.single('upload-bar'), async (req, res) => {
    const { name, description, tags, adress, note, products } = req.body;
    const image = req.file.buffer;
    if (!name || !description || !tags || !adress || !note || !image || !products) {
        return res.status(422).send({
            error: 'Merci de remplir toutes les informations pour créer un bar à savoir\
        [name, description, tags, adresse, coordonnées gps, produits et images' })
    }
    try {
        const bar = new Bar({ name, description, tags, adress, note, image, products });
        await bar.save();
        res.send(bar);
    } catch (err) {
        res.status(422).send({ error: err.message });
    }
}, (error, req, res, next) => {
    res.status(422).send({ error: error.message })
});


router.post('/upload', upload.single('upload-bar'), (req, res) => {
    res.send();
}, (error, req, res, next) => {
    res.status(422).send({ error: error.message })
});

module.exports = router;