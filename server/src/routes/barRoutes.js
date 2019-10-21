const express = require('express');
const mongoose = require('mongoose');
const config = require('../config');
const checkingAuth = require("../middlewares/checkingAuth");

const Bar = mongoose.model('Bar');

const router = express.Router();

//Acces to the screen, only for connected users
//router.use(checkingAuth);

router.get(config.rootAPI+'/bar/:barname', async (req,res) => {
    const barName = req.params.barname;
    const barRegex = new RegExp("^" + barName, 'i');
    const bar = await Bar.find({
        name: barRegex
    });
    res.send(bar);
});

    router.post(config.rootAPI+'/bar/createBar', async (req,res) => {
    const {name, description, tags, adress, coordgps, products} = req.body;
    if(!name || !description || !tags || !adress || coordgps  || !products) {
        return res.status(422).send({error: "Merci de remplir toutes les informations"})
    }
    try {
        const bar = new Bar({name, description, tags, adress, coordgps, products});
        await bar.save();
        res.send(bar);
    } catch (err) {
        res.status(422).send({error: err.message});
    }
});


module.exports = router;
