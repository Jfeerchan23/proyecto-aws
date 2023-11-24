const multer = require("multer");
const multerS3 = require("multer-s3");
const { BUCKETNAME, BUCKETACL} = require("../models/environment");
const { s3 } = require("../models/AWSConfig");

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKETNAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: BUCKETACL, // Establece permisos públicos de lectura
        key: function (req, file, cb) {
            let ext;
            if (file.originalname.includes(".png")) ext = ".png";
            if (file.originalname.includes(".jpg")) ext = ".jpg";
            if (file.originalname.includes(".jpeg")) ext = ".jpeg";
            if (file.originalname.includes(".gif")) ext = ".gif";
            cb(null, `alumno_${req.params.id}${ext}`);
        },
    }),
});

module.exports = { upload };