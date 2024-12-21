const express = require('express');
require('dotenv').config();
const app = express();
const pagina = require("./routes");
const port = process.env.PORT || 3000;

app.use("/pagina",pagina);



app.use(express.json());






app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
