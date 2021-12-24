const express = require('express');

const PORT = process.env.PORT || 3002;
const app = express();
const apiRoutes = require('./db/routes/apiRoutes');
const htmlRoutes = require('./db/routes/htmlRoutes');

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static())

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, ()=>{
    console.log(`Nifty-Notes server now on port ${PORT}`);
})