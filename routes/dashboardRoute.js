const router = require('express').Router();
const {isAuthenticate} = require('../middleware/authMiddleware')

const { 
	dashboardGetController
} = require('../controllers/dashboardController');

router.get('/', isAuthenticate, dashboardGetController);

module.exports = router;