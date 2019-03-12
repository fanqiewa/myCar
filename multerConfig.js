var multer = require("multer");


var storage1= multer.diskStorage({
    //设置上传后文件路径
    destination: function (req, file, cb) {
        cb(null, './page/public/')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});


var storage2 = multer.diskStorage({
    //设置上传后文件路径
    destination: function (req, file, cb) {
        cb(null, './page/public/product_img')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});



var storage3 = multer.diskStorage({
    //设置上传后文件路径
    destination: function (req, file, cb) {
        cb(null, './page/public/product_facade')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});

var storage4 = multer.diskStorage({
    //设置上传后文件路径
    destination: function (req, file, cb) {
        cb(null, './page/public/product_decorate')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});


var storage5 = multer.diskStorage({
    //设置上传后文件路径
    destination: function (req, file, cb) {
        cb(null, './page/public/product_technology')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});

var storage6 = multer.diskStorage({
    //设置上传后文件路径
    destination: "./page/back/public",
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});

module.exports = {
    "storage1" : storage1,
    "storage2" : storage2,
    "storage3" : storage3,
    "storage4" : storage4,
    "storage5" : storage5,
    "storage6" : storage6

};
