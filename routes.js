const express = require("express");
const route = express.Router();
const mysql = require("mysql");
var connection = mysql.createConnection({
  host : '10.0.0.104',
  port : 3306,
  user : 'root',
  password : 'root',
  database : 'cadastrados'
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

route.get("/mensagem",(req,res)=>{
res.send("ola mundo");  
})

route.post('/users',(req,res)=>{
  json.push(req.body)
  res.status(201).send(json);
})

route.get('/users', (req, res) => {
    res.status(200).send(`
        <form method="get" action="/paginaMensagem/users">
            <input id="pesquisar" name="pesquisar" type="text">
            <input type="submit" value="Enviar">
        </form>
    `);
});


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

/*
CRUD COMEÇA AQUI

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
*/

module.exports = route;
