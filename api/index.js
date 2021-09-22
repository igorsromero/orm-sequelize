const express = require("express");
const app = express();

app.use(express.json());

const port = 3000;

app.get("/teste", (request, response) => {
    response.status(200);
    response.send({ mensagem: "Boas Vindas" });
});

app.listen(3000, () => {
    console.log("API RODANDO")
});

module.exports = app;