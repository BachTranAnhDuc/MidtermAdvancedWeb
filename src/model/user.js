const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter username'],
    },
    password: {
        type: String,
        minLength: [6, 'Password must at least 6 characters'],
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'Please enter your username'],
    },
})

UserSchema.methods.comparePassword = async function (inputPassword) {
    const isMatch = await bcrypt.compare(inputPassword, this.password);

    return isMatch;
};

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    console.log('Before hash password');
    console.log(this.password);

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


module.exports = mongoose.model('User', UserSchema);
