const multer = require("multer");
const Datauri = require("datauri");
const path = require("path");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const multerUploads = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 10
    }
}).single("image");

const dUri = new Datauri();

const dataUri = req => {
    return dUri.format(
        path.extname(req.file.originalname).toString(),
        req.file.buffer
    );
};

module.exports = {
    multerUploads,
    dataUri
};

/////////
// const multer = require("multer");
// const Datauri = require("datauri");
// const path = require("path")
// const storage = multer.memoryStorage();
// const multerUploads = multer({ storage }).single('image');
// const dUri = new Datauri();

// const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
// module.exports = {
//     multerUploads,
//     dataUri
// };