const express = require('express');
const bodyParser = require('body-parser');
const bfhlRoutes = require('./routes/bfhl');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '10mb' }));

app.use('/bfhl', bfhlRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});