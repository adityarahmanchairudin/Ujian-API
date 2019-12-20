const express = require('express')
//const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
//const uploadData = require('express-fileupload')
const app = express()

//connnection mongodb
mongoose.connect('mongodb://localhost/api_Ujian')
.then(db => console.log('db connected'))
.catch(err => console.log(err))

//app.use(express.static('upload'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
    })
)
//app.use(uploadData())

require('./router/router')(app)
const PORT = process.env.PORT || 8001

app.listen(PORT,() => {
    console.log('Berhasil Menjalankan Server pada Port 8001')
})