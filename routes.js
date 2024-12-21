const express = require("express");
require('dotenv').config();
const route = express.Router();
const mysql = require("mysql");
var connection = mysql.createConnection({
  host : process.env.HOST,
  port : process.env.PORT,
  user : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE
});
connection.connect();

const json = [{
  id: 1,
  nome: "kevin",
  idade: 28
},
{id: 2,
nome: "jesus",
idade: 33
}]

//get
route.get('/users',(req,res)=>{
  json.push(req.body)
  res.status(200).send(json);
})
//post
route.post('/users',(req,res)=>{
  json.push(req.body)
  res.status(201).send(json);
})

//get no db
route.get('/users/:id', (req, res) => {
  
const params = req.params;
connection.query('SELECT * FROM usuarios WHERE id = ?',params.id,(err,rows)=>{
  

if(!rows){
  res.status(404).send({message: `o parametro ${params.id} solicitado não foi encontrado`})
}
else{
  res.status(200).send(rows[0]);
}
})
});


//put
route.put("/users/:id",(req,res)=>{
 const paramId = number(req.params.id);
 const body = req.body;
 
 connection.query('UPDATE usuarios SET ? WHERE id = ?',[body,paramId],(erro,result)=>{
   if(erro) res.status(500).send(erro)
     connection.query('SELECT * FROM usuarios WHERE id = ?',paramId,(erro,result)=>{
       if(erro) res.status(500).send(erro);
       const newUser = result;
       res.status(200).send(result);
     })
   
 })
})


module.exports = route;
