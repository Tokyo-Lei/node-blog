let mongodb = require('./db'),
    mongoose = require('mongoose');
//const Schema = mongoose.Schema;
//const userSchema = new Schema({ });
	
let Userchema = new mongoose.Schema({
    name: String,
    password: String,
    email:String,
    createTime: Date
})


//let msgModel = mongoose.model('user',Userchema);

exports = module.exports = mongoose.model('user', Userchema);


