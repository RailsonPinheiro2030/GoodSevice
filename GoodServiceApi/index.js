const express = require('express');
const bodyParser = require('body-parser');
const swaggerDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const apiRoutes = require('./src/routes/apiRoutes');
const scheduleRoutes = require('./src/routes/scheduleRoutes')




const app = express();
app.use(bodyParser.json());




const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'GoodSerice API',
        version: '1.0.0',
      },
    },
    apis: ['./src/routes/*.js'],
};


const swaggerSpec = swaggerDoc(swaggerOptions);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', apiRoutes);
app.use('/api/schedule', scheduleRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});