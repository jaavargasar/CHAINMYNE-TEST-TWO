// I pick express js as the framework to build the RESTful API
const express = require('express');

// helmet middleware helps to prevent cross-site scripting XSS. It contains Content security policy features
const helmet = require('helmet');

// Cors middleware helps to manage CORS when calling this application externally with other clients ( mobile apps or web applications)
const cors = require('cors');

// I create this customize route to be able to create the coins controller
const coins = require('./routes/coins');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/api/coins', coins);

// Port can be set inside the environment variables. By default is 3000
const port = process.env.PORT | 3000;
app.listen(port, () => console.log(`App is running on port ${port}`));
