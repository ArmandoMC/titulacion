const cloudinary = require('cloudinary').v2;
const {config}=require('../config/config');

cloudinary.config({
    cloud_name:config.cloudName,
    api_key:config.cloudApiKey,
    api_secret:config.cloudApiSecret
})
module.exports=cloudinary;