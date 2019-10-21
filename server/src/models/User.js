const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userFavoriteBarSchena = new mongoose.Schema({
    barid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bar'
    },
    comment:{
        type: String,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    favoriteBars: [userFavoriteBarSchena]
});

//before save the password in DB  hash + salt

userSchema.pre('save',function (next){
    const user = this;
    if(!user.isModified('password')){
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err){
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) =>{
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

// Compare the password
userSchema.methods.comparePassword = function (candidatePassword){
    const user = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) =>{
            if(err){
                return reject(err);
            }
            if(!isMatch){
                return reject(false);
            }
            resolve(true);
        })
    });
};

mongoose.model('User',userSchema);