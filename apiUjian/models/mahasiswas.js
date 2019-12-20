var mongoose = require('mongoose')

var MahasiswaSchema = mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    nik: {
        type: String
    },
    jurusan: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
},
{
    timestamps: true
})

var Mahasiswa = module.exports = mongoose.model('mahasiswas', MahasiswaSchema)