const { string } = require("joi");

 class User{
    id=number;
    email=string;
    password=string;    
}
module.exports=User;