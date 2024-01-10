const Code = require('../models/Code')
const crypto = require('crypto');

exports.generateCode = async (req, res) => {
    const newCode = new Code({
        generatedCode: crypto.randomBytes(5).toString('hex'), // 5 alphanumeric code
        expirationTime: new Date(Date.now() + 1 * 60 * 1000) // +1 min.
    })

    try {
        const savedCode = await newCode.save()
        res.status(200).json({ generatedCode: savedCode.generatedCode, expirationTime: savedCode.expirationTime.toISOString() })

    } catch (error) {
        res.status(500).json(error);
    }
}

exports.useCode = async (req, res) => {
    const code = req.body.code;
    try {
        const codeDocument = await Code.findOne({generatedCode: code})
        // console.log(codeDocument, code)
        if(codeDocument && Date.now() < codeDocument.expirationTime) {
            if(!codeDocument.isUsed) {
                await Code.findOneAndUpdate({generatedCode: codeDocument.generatedCode}, {isUsed: true}, {new: true})
                res.status(200).json({status: 'success', message: 'Code is correct!'})
            } else {
                res.status(200).json({status: 'unsuccess', message: 'This code has already been used.'})
            }
        }
        else if(codeDocument) {
            res.status(200).json({status: 'unsuccess', message: 'The code has expired!'})
        }
        else {
            res.status(200).json({status: 'unsuccess', message: 'Incorrect code'})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}