const multer=require('multer');
const path=require('path');
// const boom=require('@hapi/boom');

module.exports=multer({
    storage:multer.diskStorage({
        destination:path.join(__dirname,'../public/uploads'),
        filename:(req,file,cb)=>{
            cb(null,file.originalname);
        }
    }),
    fileFilter:(req,file,cb)=>{
        let ext=path.extname(file.originalname);
        if(ext!==".jpg" && ext!==".jpeg" && ext!==".png"){
            cb(new Error("tipo de archivo no soportado"),false);
            return;
        }
        cb(null,true);
    },
    limits:{fileSize:1000000}
})