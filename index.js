const express = require('express');
require('dotenv').config();
const app = express();
const v3 = require("./routes");
const port = process.env.PORT || 3000;

app.use("/v3",v3);



app.use(express.json());






app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
