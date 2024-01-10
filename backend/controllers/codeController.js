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
            res.json({status: 'success', message: 'Code is correct!'})
        }
        else if(codeDocument) {
            res.json({status: 'unsuccess', message: 'The code has expired!'})
        }
        else {
            res.json({status: 'unsuccess', message: 'Incorrect code'})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}