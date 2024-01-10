const mongoose = require('mongoose')

const CodeSchema = new mongoose.Schema({
    generatedCode: {
        type: String,
        required: true,
        unique: true
    },
    expirationTime: {
        type: Date,
        required: true
    },
    isUsed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Code", CodeSchema)