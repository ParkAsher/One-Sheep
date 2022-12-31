const express = require('express');
const router = express.Router();

// upload
const setUpload = require('../util/upload.js');

// controllers
const DriverController = require('../controllers/driver.controller');
const driverController = new DriverController();

// 이미지업로드
router.post('/drivers/image', setUpload('one-sheep/driverImage'), driverController.imageUpload);
//router.post('/driver/signup');

module.exports = router;
