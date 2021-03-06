const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

router.get("/pessoas", PessoaController.pegaTodasAsPessoas);

router.get("/pessoas/ativas", PessoaController.pegaPessoasAtivas);

router.get("/pessoas/:id", PessoaController.pegarUmaPessoa);

router.get("/pessoas/:estudanteId/matricula", PessoaController.pegaMatriculas);

router.get("/pessoas/matricula/:turmaId/confirmadas", PessoaController.pegaMatriculasPorTurma);

router.get("/pessoas/matricula/lotada", PessoaController.pegaTurmasLotadas);

router.post("/pessoas/:estudanteId/cancela", PessoaController.cancelaPessoa);

router.post("/pessoas", PessoaController.criarPessoa);

router.put("/pessoas/:id", PessoaController.atualizaPessoa);

router.delete("/pessoas/:id", PessoaController.apagaPessoa);

router.get("/pessoas/:estudanteId/matricula/:matriculaId", PessoaController.pegarUmaMatricula);

router.post("/pessoas/:estudanteId/matricula", PessoaController.criarMatricula);

router.put("/pessoas/:estudanteId/matricula/:matriculaId", PessoaController.atualizaMatricula);

router.delete("/pessoas/:estudanteId/matricula/:matriculaId", PessoaController.apagaMatricula);

router.post("/pessoas/:id/restaura", PessoaController.restauraPessoa);

module.exports = router;