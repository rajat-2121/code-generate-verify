const router = require('express').Router();
const {
    generateCode,
    useCode
} = require('../controllers/codeController');

router.route('/').post(generateCode);
router.route('/use').post(useCode);

module.exports = router