const http = require('./app.js');
require('./socket.js');

http.listen(1004, () => {
    console.log('Server On...');
});
