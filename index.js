const express = require('express');
const bodyParser = require('body-parser');
const con = require('./database');


const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/api/feedbacks",(req,res)=>{
    con.query("SELECT * FROM feedback",(err,result,fields)=>{
        if(err) throw err;
        res.status(200).json(result);
    })
})

app.post("/api/feedback",(req,res)=>{
    const {adresa,email,subiect,nume_companie,mesaj} = req.body;
    con.query(`INSERT INTO feedback(adresa,email,subiect,nume_companie,mesaj) VALUES ('${adresa}','${email}','${subiect}','${nume_companie}','${mesaj}') `,
        (err,result)=>{
            if(err) throw err;
            res.status(201).send("success");
        }
    )
})


con.connect((err)=>{
    if(err) throw err;
    console.log("Baza de date conectata");
})

app.listen(5000,()=>{
    console.log("Pornit pe portul 5000");
})