const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./db-connection')
require("./models/index")

const app = express();
const sequelize = require("./db-connection")
const router = require("./routes/router")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(router)

app.get('/', (req, res) => {
    res.send('Welcome to my Express server!');
});

sequelize.sync({alter:true}).then(()=>{
    console.log("Syncing Complete");
}).catch((err)=>{
   console.log(err);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
