const express = require('express');
const cookieParser = require('cookie-parser');
const { createServer } = require('http');

const app = express();

// socket
const http = createServer(app);

const router = require('./routes');
const ejsRouter = require('./routes/ejs.routes');

/* router */
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(ejsRouter);
app.use('/api', router);

/* views */
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views')); // 정적파일 적용 css,js,image

module.exports = http;
