const Joi = require('joi');
const supplies = require('./routes/supplies');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/supplies', supplies);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
