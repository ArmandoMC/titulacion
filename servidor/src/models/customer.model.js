const { string } = require("joi");
const User =require('./user.model');
 class Customer{
    id=number;;
    name=string;
    last_name=string;
    dni=string;
    phone=string;
    user=User
}
module.exports=Customer;