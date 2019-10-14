const express = require('express');
const mongoose = require('mongoose');
const Bar = mongoose.model('Bar');

const router = express.Router();

router.get('/bar/:barname', async (req,res) => {
    var barName = req.params.barname;
    var barRegex = new RegExp("^" + barName, 'i');
    const bar = await Bar.find({
        name: barRegex
    });
    res.send(bar);
});

module.exports = router;