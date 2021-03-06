const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/index.router');
// const { checkApiKey } = require('./middlewares/auth.handler');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const multer=require('./utils/multer');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:4200', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));
require('./utils/cloudinary');

app.use(multer.single("image"));
require('./utils/auth');
require('./libs/postgres.pool');
// app.get('/', (req, res) => {
//   res.send('Hola mi server en express');
// });

// app.get('/nueva-ruta', checkApiKey, (req, res) => {
//   res.send('Hola, soy una nueva ruta');
// });

routerApi(app);

app.use(logErrors);
// app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Mi port ${port}`);
});
