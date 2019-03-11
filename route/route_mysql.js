var router = require('express').Router()
var mysql = require('mysql')
var bodyParser = require('body-parser');
router.use(bodyParser.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'toko',
})

db.connect(()=>{
    console.log('Terhubung ke MySQL!')
})

//GET all data
router.get('/karyawan', (req, res)=>{
    var dbstat = 'select * from karyawan'
    db.query(dbstat, (error, result)=>{
        if(error) throw error
        console.log(result)
        res.send(result)
    })
})


//POST data
router.post('/karyawan', (req, res)=>{
    var x = new Date();

    var tgl = req.body.tglLahir
    var birthdate = tgl.split("-") //menjadi ['tgl', 'bln', 'thn']
    
    var year = x.getFullYear()
    var age = year - birthdate[2]

    function zodiac(day,month) {
        if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) {
            return 'Aries'
        }
        else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
            return 'Taurus'
        }
        else if ((month == 5 && day >= 21) || (month == 6 && day <= 21)) {
            return 'Gemini'
        }
        else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
            return 'Cancer'
        }
        else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
            return 'Leo'
        }
        else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
            return 'Virgo'
        }
        else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
            return 'Libra'
        }
        else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) {
            return 'Scorpio'
        }
        else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
            return 'Sagittarius'
        }
        else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) {
            return 'Capricorn'
        }
        else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
            return 'Aquarius'
        }
        else{
            return 'Pisces'     
        }
    }

    var dbstat = 'insert into karyawan set ?'
    var data = {
        nama: req.body.nama,
        hari: birthdate[0],
        bulan: birthdate[1],
        tahun: birthdate[2],
        zodiak: zodiac(birthdate[0], birthdate[1]),
        usia: age
    }
    db.query(dbstat, data, (error, result)=>{
        if(error) throw error
        console.log(result)
        res.send(result)
    })
})


module.exports = router