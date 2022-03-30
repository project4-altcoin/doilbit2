const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// name, email, password, password confirmation
const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "ID를 입력해주세요."],
        minlength: [3, "ID는 3자 이상이어야 합니다."],
        maxlength: [40, "ID는 40자 이하로 입력해주세요."]
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
    balance: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}
});

userSchema.pre('save', async function(next) {                 // 암호화된 비밀번호를 저장하기 전에 실행되는 함수
    if(!this.isModified('password')) return next();           // 암호를 변경하지 않았으면 다음 작업을 진행하지 않는다.
    this.password = await bcrypt.hash(this.password, 12);     // 암호를 암호화한다.
    this.passwordConfirmation = undefined;                    // 암호화된 비밀번호를 저장하기 위해 암호화된 비밀번호를 삭제한다.
    next();

});

userSchema.methods.correctPassword = async function(typedPassword, userPassword) {  // 사용자가 입력한 비밀번호와 암호화된 비밀번호를 비교하는 함수
    return await bcrypt.compare(typedPassword, userPassword);                       // 입력한 비밀번호와 암호화된 비밀번호를 비교한다.
}
userSchema.methods.login = function() {
    return {
        _id: this._id,
        token: this.token,
        email: this.email,
        balance: this.balance
    }
}


userSchema.methods.validateEmail = function(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

userSchema.methods.validatePassword = function(password) {
    const re = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    return re.test(String(password));
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if(!user) {
        throw new Error('Unable to login');
    }
    const isMatch = await user.correctPassword(password, user.password);
    if(!isMatch) {
        throw new Error('Unable to login');
    }
    return user;
}

userSchema.statics.findByUserId = async (userId) => {
    const user = await User.findOne({ userId });
    if(!user) {
        throw new Error('Unable to login');
    }
    return user;
}




const User = mongoose.model('User', userSchema);
module.exports = User;
