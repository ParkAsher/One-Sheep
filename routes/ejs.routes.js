const express = require('express');
const router = express.Router();
const authMiddlewares = require('../middlewares/auth-middlewares.js');
const { route } = require('./driver.routes.js');

/* views mapping */
/* 
    페이지 마다 authMiddleware를 넣어준 이유는,
    저 페이지 주소로 들어갈 때 header.ejs에 로그인 된 상태에 따라 좀 다르게 처리하기위해 (프론트용) 넣어줌과 동시에
    로그인이 꼭 필요한 페이지를 들어가면서 유저정보를 전달해주기 위해
*/
router.get('/', authMiddlewares, (req, res) => {
    // 로그인이 되어있다면?
    if (res.locals.user && res.locals.user.type === 'driver') {
        return res.redirect('/driver');
    }
    if (res.locals.user && res.locals.user.type === 'customer') {
        return res.redirect('/customer');
    }
    res.render('index.ejs', { components: 'login', user: res.locals.user });
});

router.get('/register', authMiddlewares, (req, res) => {
    // 로그인이 되어있다면?
    if (res.locals.user && res.locals.user.type === 'driver') {
        return res.redirect('/driver');
    }
    if (res.locals.user && res.locals.user.type === 'customer') {
        return res.redirect('/customer');
    }
    res.render('index.ejs', { components: 'register', user: res.locals.user });
});

router.get('/login', authMiddlewares, (req, res) => {
    // 로그인이 되어있다면?
    if (res.locals.user && res.locals.user.type === 'driver') {
        return res.redirect('/driver');
    }
    if (res.locals.user && res.locals.user.type === 'customer') {
        return res.redirect('/customer');
    }
    res.render('index.ejs', { components: 'login', user: res.locals.user });
});

router.get('/driver', authMiddlewares, (req, res) => {
    // 로그인이 되어있지 않다면?
    if (!res.locals.user) {
        return res.render('index.ejs', { components: 'driver', user: res.locals.user });
    }
    // 로그인이 되어있는데 유저의 타입이 customer이면?
    if (res.locals.user.type === 'customer') {
        return res.redirect('/customer');
    }
    console.log(res.locals.user);
    res.render('index.ejs', { components: 'driver', user: res.locals.user });
});

router.get('/customer', authMiddlewares, (req, res) => {
    // 로그인이 되어있지 않다면?
    if (!res.locals.user) {
        return res.render('index.ejs', { components: 'customer', user: res.locals.user });
    }
    // 로그인이 되어있는데 유저의 타입이 customer이면?
    if (res.locals.user.type === 'driver') {
        return res.redirect('/driver');
    }
    res.render('index.ejs', { components: 'customer', user: res.locals.user });
});

router.get('/order', authMiddlewares, (req, res) => {
    // 로그인이 되어있지 않다면?
    if (!res.locals.user) {
        return res.render('index.ejs', { components: 'order', user: res.locals.user });
    }
    res.render('index.ejs', { components: 'order', user: res.locals.user });
});

router.get('/mypage', authMiddlewares, (req, res) => {
    // 로그인이 되어있지 않다면?
    if (!res.locals.user) {
        return res.render('index.ejs', { components: 'mypage', user: res.locals.user });
    }
    res.render('index.ejs', { components: 'mypage', user: res.locals.user });
})

module.exports = router;
