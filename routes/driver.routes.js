const express = require('express');
const router = express.Router();

// upload
const setUpload = require('../util/upload.js');

// controllers
const DriverController = require('../controllers/driver.controller.js');
const driverController = new DriverController();

// 이미지업로드
router.post('/drivers/image', setUpload('one-sheep/driverImage'), driverController.imageUpload);
// 사장 회원가입
router.post('/drivers/signup', driverController.signUp);


const { Driver } = require('../models/index.js');
router.get('/drivers/:driverId', driverController.getDriverById)

// async (req,res) => {
//     const {driverId} = req.params

//     const driver = await Driver.findAll({
//         where: {driverId},
//         attributes: ['name', 'image']
//     })

//     res.status(200).send(driver[0])


// }

module.exports = router;
