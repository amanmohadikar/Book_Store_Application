const express = require('express');
const route = require("./route/route")
const mongoose  = require('mongoose');
const app = express();
const cors = require("cors")
app.use(cors())


app.use(express.json())


mongoose.connect("mongodb+srv://Aman_Mohadikar:V5FW1Y8X6b2pIiud@cluster0.gdww84s.mongodb.net/project-3")
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);

app.listen(5000, function () {
    console.log('Express app running on port ' + 5000)
});