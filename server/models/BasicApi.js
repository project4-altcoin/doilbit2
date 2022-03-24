
// const slugify = require('slugify');
const { default: mongoose } = require("mongoose");

const BasicApiSchema = new mongoose.Schema({                        // 스키마 설정 = 어떤 형태의 데이터를 저장할 것인지 정의.

    "hash": {
        type: String,
        required: true
    },
    "confirmations": {
        type: Number,
        required: true
    },
    "strippedsize": {
        type: Number,
        required: true
    },
    "size": {
        type: Number,
        required: true
    },
    "weight": {
        type: Number,
        required: true
    },
    "height": {
        type: Number,
        required: true
    },
    "version": {
        type: Number,
        required: true
    },
    "versionHex": {
        type: String,
        required: true
    },
    "merkleroot": {
        type: String,
        required: true
    },
    "tx": {
        type: Array,
        required: true
    },
    "time": {
        type: Number,
        required: true
    },
    "mediantime": {
        type: Number,
        required: true
    },
    "nonce": {
        type: Number,
        required: true
    },
    "bits": {
        type: String,
        required: true
    },
    "difficulty": {
        type: Number,
        required: true
    },
    "chainwork": {
        type: String,
        required: true
    },
    "previousblockhash": {
        type: String,
        required: true
    },
    "nextblockhash": {
        type: String,
        required: true
    }
}
);

// Mongoose Middleware - Pre
// BasicApiSchema.pre("save", async function(next) {
//     this.slug = await slugify(this.name, { lower: true });  // lower 옵션을 사용하면 slugify 함수에서 입력된 값을 소문자로 변환해줌
//     console.log('Slugify ran' + this.name);
//     next();
// });

// BasicApiSchema.pre("save", async function(next) {
//     const loc = await geocoder.geocode(this.address);
//     this.location = {
//         type: "Point",
//         coordinates: [loc[0].longitude, loc[0].latitude],
//         formattedAddress: loc[0].formattedAddress,
//         street: loc[0].streetName,
//         city: loc[0].city,
//         state: loc[0].stateCode,
//         zipcode: loc[0].zipcode,
//         country: loc[0].countryCode
//     };
//     this.address = undefined;
//     next();
// });


module.exports = mongoose.model('BasicApi', BasicApiSchema);                // BasicApi 스키마를 모델로 변환하여 exports 함수를 통해서 사용할 수 있도록 함
