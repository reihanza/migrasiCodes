const router = require('express-promise-router')();

const { confirmPartner } = require('../controllers/partner')

router.route('/confirmation/:activatedCode').get(confirmPartner);

module.exports = router;