const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

router.get("/pessoas", PessoaController.pegaTodasAsPessoas);

router.get("/pessoas/:id", PessoaController.pegarUmaPessoa);

router.post("/pessoas", PessoaController.criarPessoa);

router.put("/pessoas/:id", PessoaController.atualizaPessoa);

router.delete("/pessoas/:id", PessoaController.apagaPessoa);

router.get("/pessoas/:estudanteId/matricula/:matriculaId", PessoaController.pegarUmaMatricula);

router.post("/pessoas/:estudanteId/matricula", PessoaController.criarMatricula);

module.exports = router;