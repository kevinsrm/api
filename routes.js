const express = require("express");
require('dotenv').config();
const route = express.Router();
const mysql = require("mysql");
var connection = mysql.createConnection({
  host : process.env.HOST,
  port : process.env.PORT,
  user : process.env.USERNAME,
  password : process.env.PASSWORD,
  database : process.env.DATABASE
});
connection.connect();



//get
route.get('/',(req,res)=>{
  connection.query("SELECT * FROM usuarios",(err,result)=>{
    if(err) throw err;
    res.status(200).send(result);
  })
  
})




//get
route.get('/users',(req,res)=>{
  connection.query("SELECT * FROM usuarios",(err,result)=>{
    if(err) throw err;
    res.status(200).send(result);
  })
  
})



//get no db
route.get('/users/:id', (req, res) => {
  
const params = req.params;
connection.query('SELECT * FROM usuarios WHERE id = ?',params.id,(err,result)=>{
if(err){
  res.status(404).send({message: `o parametro ${params.id} solicitado não foi encontrado`})
}
else{
  res.status(200).send(result[0]);
}
})
});



//post
route.post('/users',(req,res)=>{
  connection.query("INSERT INTO usuarios SET ?",req.body,(err,result)=>{
    if(err) throw err;
    res.status(201).send(result);
  })
})






//put
route.put("/users/:id",(req,res)=>{
 const paramId = Number(req.params.id);
 const body = req.body;
 
 connection.query('UPDATE usuarios SET ? WHERE id = ?',[body,paramId],(erro,result)=>{
   if(erro) res.status(500).send(erro);
     connection.query('SELECT * FROM usuarios WHERE id = ?',paramId,(erro,result)=>{
       if(erro) res.status(404).send(erro);
       const newUser = result;
       res.status(200).send(result);
     })
   
 })
})


module.exports = route;
