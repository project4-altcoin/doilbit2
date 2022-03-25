const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,  // 몽고디비에서 사용하는 객체 아이디 타입
        ref: 'User',                           // 참조할 모델 이름
        required: true                         // 필수 입력
    },
    quantity: {                                // 입금할 금액
        type: Number,                          // 숫자타입
        required: true                         // 필수 입력
    },

    createdAt: {                                // 생성일자
        type: Date,                             // 날짜 타입
        default: Date.now                       // 현재 시간으로 설정
    },
    updatedAt: {                                // 수정일자
        type: Date,                             // 날짜 타입
        default: Date.now                       // 현재 시간으로 설정
    },
    deposit: {                                 // 입금
        type: Number,                          // 숫자타입
        default: 0                             // 기본값 0
    },
    withdraw: {                                // 출금
        type: Number,                          // 숫자타입
        default: 0                             // 기본값 0
    }
});


bankSchema.pre('save', function(next) {
    if (!this.isModified('createdAt')) {
        this.createdAt = Date.now();
    }
    next();
});

bankSchema.pre('updateOne', function(next) {
    this.update({}, { $set: { updatedAt: Date.now() } });
    next();
})

bankSchema.statics.getBank = async function(userId) {
    const bank = await this.findOne({userId});
    return bank;
};

bankSchema.statics.getBankList = async function(userId) {
    const bankList = await this.find({userId});
    return bankList;
};


bankSchema.statics.getBalance = async function(userId) {
    const bank = await this.findOne({ userId })
    console.log("return bank: ", bank);
    if (!bank) {
        return 0;
    }
    return bank.quantity;
}

bankSchema.statics.deposit = async function(userId, quantity) {
    try {
        const bank = await Bank.findOne({
            userId: userId
        });
        if (bank) {
            const deposit = Number(bank.quantity ) + Number(quantity);
            bank.quantity =  String(deposit);
            await bank.save();
        } else {
            await Bank.create({
                userId: userId,
                quantity: quantity
            });
        }
    } catch (err) {
        throw err;
    }
};

bankSchema.statics.withdraw = async function(userId, quantity) {
    try {
        const bank = await Bank.findOne({
            userId: userId
        });
        if (bank) {
            bank.quantity -= quantity;
            await bank.save();
        } else {
            throw new Error('User not found');
        }
    } catch (err) {
        throw err;
    }
};

bankSchema.statics.transfer = async function(fromUserId, toUserId, quantity) {
    try {
        const fromBank = await Bank.findOne({
            userId: fromUserId
        });
        if (fromBank) {
            fromBank.quantity -= quantity;
            await fromBank.save();
        } else {
            throw new Error('User not found');
        }
    } catch (err) {
        throw err;
    }
    try {
        const toBank = await Bank.findOne({
            userId: toUserId
        });
        if (toBank) {
            toBank.quantity += quantity;
            await toBank.save();
        } else {
            throw new Error('User not found');
        }
    } catch (err) {
        throw err;
    }
};


const Bank = mongoose.model('Bank', bankSchema);
module.exports = Bank;
