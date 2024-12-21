const express = require('express');
const app = express();
const paginaMensagem = require("./routes");
const port = 3000;

app.use("/paginaMensagem",paginaMensagem);



app.use(express.json());






app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
