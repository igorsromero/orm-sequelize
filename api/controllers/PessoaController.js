const database = require("../models");

class PessoaController {
    static async pegaTodasAsPessoas(request, response) {
        try {
            const todasAsPessoas = await database.Pessoas.findAll();
            return response.status(200).json(todasAsPessoas);
        } catch (error) {
            return response.status(500).json(error.message);
        }
    };

    static async pegarUmaPessoa(request, response) {
        const { id } = request.params;
        try {
            const umaPessoa = await database.Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            });
            return response.status(200).json(umaPessoa);
        } catch (error) {
            return response.status(500).json(error.message);
        }
    };

    static async criarPessoa(request, response) {
        const novaPessoa = request.body;
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa);
            return response.status(201).json(novaPessoaCriada);
        } catch (error) {
            return response.status(500).json(error.message);
        }
    };

    static async atualizaPessoa(request, response) {
        const { id } = request.params;
        const novasInfos = request.body;
        try {
            await database.Pessoas.update(novasInfos,
                {
                    where: {
                        id: Number(id)
                    }
                });

            const pessoaAtualizada = await database.Pessoas.findOne(
                {
                    where: {
                        id: Number(id)
                    }
                });

            return response.status(200).json(pessoaAtualizada);
        } catch (error) {
            return response.status(500).json(error.message);
        }
    };

    static async apagaPessoa(request, response) {
        const { id } = request.params;
        try {
            await database.Pessoas.destroy({ where: { id: Number(id) } });
            return response.status(200).json({ mensagem: `id ${id} deletado` });
        } catch (error) {
            return response.status(500).json(error.message);
        }
    }

    static async pegarUmaMatricula(request, response) {
        const { estudanteId, matriculaId } = request.params;
        try {
            const umaMatricula = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });
            return response.status(200).json(umaMatricula);
        } catch (error) {
            return response.status(500).json(error.message);
        }
    };

    static async criarMatricula(request, response) {
        const { estudanteId } = request.params;
        const novaMatricula = { ...request.body, estudante_id: Number(estudanteId) };
        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula);
            return response.status(201).json(novaMatriculaCriada);
        } catch (error) {
            return response.status(500).json(error.message);
        }
    };

    static async atualizaMatricula(request, response) {
        const { estudanteId, matriculaId } = request.params;
        const novasInfos = request.body;
        try {
            await database.Matriculas.update(novasInfos,
                {
                    where: {
                        id: Number(matriculaId),
                        estudante_id: Number(estudanteId)
                    }
                });

            const MatriculaAtualizada = await database.Matriculas.findOne(
                {
                    where: {
                        id: Number(matriculaId)
                    }
                });
            return response.status(200).json(MatriculaAtualizada);
        } catch (error) {
            return response.status(500).json(error.message);
        }
    };

    static async apagaMatricula(request, response) {
        const { estudanteId, matriculaId } = request.params;
        try {
            await database.Matriculas.destroy({ where: { id: Number(matriculaId), estudante_id: Number(estudanteId) } });
            return response.status(200).json({ mensagem: `id ${matriculaId} deletado` });
        } catch (error) {
            console.log(error);
            return response.status(500).json(error.message);
        }
    }

}

module.exports = PessoaController;