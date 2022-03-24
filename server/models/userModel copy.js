const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// name, email, password, password confirmation
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "이름을 입력해주세요."],
        minlength: [3, "이름은 3자 이상이어야 합니다."],
        maxlength: [40, "이름은 40자 이하로 입력해주세요."]
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        minlength: [5, "이메일은 5자 이상입니다."],
        maxlength: [50, "이메일은 50자 이하로 입력해주세요."],
        // validate : [this.validateEmail, "이메일 형식이 올바르지 않습니다."],
        unique: true
    },
    password: {
        type: String,
        required: [true, "비밀번호를 입력해주세요."],
        minlength: [5, "비밀번호는 5자 이상이어야 합니다."],
        maxlength: [25, "비밀번호는 25자 이하로 입력해주세요."]
    },
    passwordConfirmation: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 25,
        validate: {
            validator: function(el) {
                return el === this.password;
            },
            message: "비밀번호가 일치하지 않습니다."  
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}
});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirmation = undefined;
    next();

});

userSchema.methods.correctPassword = async function(typedPassword, userPassword) {
    return await bcrypt.compare(typedPassword, userPassword);
}


const User = mongoose.model('User', userSchema);
module.exports = User;
