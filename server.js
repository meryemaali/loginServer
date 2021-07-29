require('./config/db');

const app = require('express')();
const port = process.env.PORT || 3000;

const UserRouter = require('./api/User');
const PlaceRouter = require('./api/Place');
const EntiteRouter = require('./api/Entite');
// For accepting post form data
const bodyParser = require('express').json;
app.use(bodyParser());

app.use('/user', UserRouter)
app.use('/place', PlaceRouter)
app.use('/entite', EntiteRouter)
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})