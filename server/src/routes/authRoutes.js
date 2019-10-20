const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req,res) => {
    try{
        const {username , email, password } = req.body;
        const user = new User({username, email, password});
        await user.save();

        const token = jwt.sign({userId: user._id}, 'BARAKA_SECRET');
        res.send({token});
    } catch (err) {
        return  res.status(422).send(err.message);
    }
});

router.post('/signin', async (req,res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).send({ error: "Renseigner l'email et le mot de passe" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(422).send({ error: "Le mot de passe ou l'e-mail est invalide" });
    }

    try {
        await user.comparePassword(password);
        const token = jwt.sign({userId: user._id}, 'BARAKA_SECRET');
        res.send({ token});
    } catch (err) {
        return res.status(422).send({error: "Le mot de passe ou l'e-mail est invalide"});
    }
});

module.exports = router;