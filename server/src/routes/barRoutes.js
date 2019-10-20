const express = require('express');
const mongoose = require('mongoose');
const config = require('../config');

const Bar = mongoose.model('Bar');

const router = express.Router();

router.get(config.rootAPI+'bar/:barname', async (req,res) => {
    var barName = req.params.barname;
    var barRegex = new RegExp("^" + barName, 'i');
    const bar = await Bar.find({
        name: barRegex
    });
    res.send(bar);
});

module.exports = router;