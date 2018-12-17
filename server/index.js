const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('./io').init(server);
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const cors = require('cors');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(cors());
require('./routes')(app);

server.listen(3000, function(){
  console.log('listening on *:3000');
});
