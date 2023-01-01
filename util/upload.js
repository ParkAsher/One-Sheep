const AWS = require('aws-sdk');
const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';
const multer = require('multer');
const multerS3 = require('multer-s3');

const path = require('path');

const S3 = new AWS.S3({
    endpoint: endpoint,
    region: region,
    credentials: {
        accessKeyId: '9wRk1SNRS74964Y2d50T',
        secretAccessKey: 'ZMPzv9IKhXO1f4HFt8plBeLDDsOJVQ9RKmI46O8C',
    },
});

function setUpload(bucket) {
    let upload = multer({
        storage: multerS3({
            s3: S3,
            bucket: bucket,
            acl: 'public-read-write',
            key: function (req, file, cb) {
                let extension = path.extname(file.originalname);
                cb(null, Date.now().toString() + extension);
            },
        }),
    }).single('file');

    return upload;
}

module.exports = setUpload;
