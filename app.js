const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 1004;

const router = require('./routes');
const authMiddlewares = require('./middlewares/auth-middlewares');
/* router */
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', router);

/* views */
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views')); // 정적파일 적용 css,js,image

/* views mapping */
/* 
    페이지 마다 authMiddleware를 넣어준 이유는,
    저 페이지 주소로 들어갈 때 header.ejs에 로그인 된 상태에 따라 좀 다르게 처리하기위해 (프론트용) 넣어줌과 동시에
    로그인이 꼭 필요한 페이지를 들어가면서 유저정보를 전달해주기 위해
*/
app.get('/', authMiddlewares, (req, res) => {
    // 로그인이 되어있다면?
    if (res.locals.user && res.locals.user.type === 'driver') {
        return res.redirect('/driver');
    }
    if (res.locals.user && res.locals.user.type === 'customer') {
        return res.redirect('/customer');
    }
    res.render('index.ejs', { components: 'login', isLogined: false });
});

app.get('/register', authMiddlewares, (req, res) => {
    // 로그인이 되어있다면?
    if (res.locals.user && res.locals.user.type === 'driver') {
        return res.redirect('/driver');
    }
    if (res.locals.user && res.locals.user.type === 'customer') {
        return res.redirect('/customer');
    }
    res.render('index.ejs', { components: 'register', isLogined: false });
});

app.get('/login', authMiddlewares, (req, res) => {
    // 로그인이 되어있다면?
    if (res.locals.user && res.locals.user.type === 'driver') {
        return res.redirect('/driver');
    }
    if (res.locals.user && res.locals.user.type === 'customer') {
        return res.redirect('/customer');
    }
    res.render('index.ejs', { components: 'login', isLogined: false });
});

app.get('/driver', authMiddlewares, (req, res) => {
    // 로그인이 되어있지 않다면?
    if (!res.locals.user) {
        return res.render('index.ejs', { components: 'driver', isLogined: false });
    }
    // 로그인이 되어있는데 유저의 타입이 customer이면?
    if (res.locals.user.type === 'customer') {
        return res.redirect('/customer');
    }
    console.log(res.locals.user);
    res.render('index.ejs', { components: 'driver', user: res.locals.user, isLogined: true });
});

app.get('/customer', authMiddlewares, (req, res) => {
    // 로그인이 되어있지 않다면?
    if (!res.locals.user) {
        return res.render('index.ejs', { components: 'customer', isLogined: false });
    }
    // 로그인이 되어있는데 유저의 타입이 customer이면?
    if (res.locals.user.type === 'driver') {
        return res.redirect('/driver');
    }
    res.render('index.ejs', { components: 'customer', user: res.locals.user, isLogined: true });
});
app.get('/mypage', (req, res) => {
    res.render('index.ejs', { components : 'mypage', isLogined: false  })
})

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});

module.exports = app;
