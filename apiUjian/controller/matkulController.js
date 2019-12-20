const Matkul = require('../models/matkul')
const Mahasiswa = require('../models/mahasiswas')

 exports.home = (req,res) =>{ 
     res.send("Welcome To API Shop")
}

    exports.tambahMahasiswa = async (req,res) =>{ 
        const mahasiswas = new Mahasiswa(req.body)
        const status = await mahasiswas.save()
        res.send(JSON.stringify({"status" :200, "error" :null}))
    }

exports.addToMatkul = async (req,res) => {
    const dosenMatkul = req.params.id
    const mahasiswaMatkul = req.body.mahasiswaMatkul
    const sks = Number.parseInt(req.body.sksMatkul)
    const namaMatkul = req.body.namaMatkul

    const dataMatkul = await Matkul.count({dosenMatkul : dosenMatkul, mahasiswaMatkul : mahasiswaMatkul})
    if(dataMatkul == 0){
        const data = {
            mahasiswaMatkul : mahasiswaMatkul,
            sksMatkul : sks,
            dosenMatkul : dosenMatkul,
            namaMatkul : namaMatkul
        }
        console.log(data)
        const matkuls = new Matkul(data)
        const saveMatkul = await matkuls.save()
        res.send(JSON.stringify({"status" : 200, "error" : null,"response" : "Success add to Matkul"}))
    }else{
        const dataMatkul = await Matkul.find({ dosenMatkul : dosenMatkul, mahasiswaMatkul : mahasiswaMatkul}).lean()
        dataMatkul.sksMatkul = Number.parseInt(dataMatkul.sksMatkul) + sks
        const updateMatkul = await Matkul.updateOne({_id : dataMatkul._id}, dataMatkul)
        res.send(JSON.stringify({"status" : 200, "error": null, "response" : "Success add to Matkul"}))
    }
    }

const showDataMatkul = async (idDosen) => {
    const data = await Matkul.find({ dosenMatkul : idDosen}).populate('mahasiswaMatkul').lean()
    data.forEach(row => {
        row.subTotal = Number.parseInt(row.mahasiswaMatkul.semester) * row.sksMatkul
    })
    return data
}

exports.showMatkul = async (req,res) =>{
    const idDosen = req.params.id
    const data = await showDataMatkul(idDosen)
    res.send(JSON.stringify({"status": 200, "error" : null, "response" : data}))
}

exports.editMatkul = async (req,res) => {
    const dosenMatkul = req.params.id
    const mahasiswaMatkul = req.body.mahasiswaMatkul
    const sks = Number.parseInt(req.body.sksMatkul)
    if(sks > 0){
        const dataMatkul = await Matkul.findOneAndUpdate({dosenMatkul : dosenMatkul, mahasiswaMatkul : mahasiswaMatkul},{sksMatkul : sks})
    }else if(sks <= 0){
        const deleteMatkul = await Matkul.findByIdAndDelete({ dosenMatkul : dosenMatkul, mahasiswaMatkul : mahasiswaMatkul
        })
    }
    const data = await showDataMatkul(dosenMatkul)
    res.send(JSON.stringify({"status" : 200, "error" : null, "response" : data}))
}

exports.deleteMatkul = async (req,res) =>{
    const dosenMatkul = req.params.id
    const mahasiswaMatkul = req.body.mahasiswaMatkul
    const deleteMatkul = await Matkul.findByIdAndDelete({dosenMatkul : dosenMatkul, mahasiswaMatkul: mahasiswaMatkul})
    const data = await showDataMatkul(dosenMatkul)
    res.send(JSON.stringify({"status": 200, "error" : null, "response" : data}))
}

exports.removeMatkul = async (req,res) => {
    const dosenMatkul = req.params.id
    const hapusMatkul = await Matkul.deleteMany({dosenMatkul : dosenMatkul})
    res.send(JSON.stringify({"status" : 200, "error" : null, "response" : "Matkul Deleted"}))
}

