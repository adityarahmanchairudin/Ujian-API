var mongoose = require('mongoose')

var DosenSchema = mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    kode: {
        type: String,
        required: true
    },
    kampus: {
        type: String,
        required: true
    },
},
{
    timestamps: true
})

var Dosen = module.exports = mongoose.model('dosens', DosenSchema)