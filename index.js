const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors())

const port = 8080;

app.use(express.json())

app.use('/api', require('./routes/script'))

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})