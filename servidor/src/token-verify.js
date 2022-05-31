const jwt=require('jsonwebtoken');

const secret='myDog';
// const payload={
//   sub:1,
//   role:'customer'
// }
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY0OTk1NjcxMn0.-yYWj0nof761KbBw15zAcMQrLSWWE8Ci7dcO-S_ctt4';


function verifyToken(token,secret){
  return jwt.verify(token,secret);
}

const payload=verifyToken(token,secret);

console.log(payload);
