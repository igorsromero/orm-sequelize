// const database = require("../models");
// const Sequelize = require("sequelize");

const { PessoasServices } = require("../services");
const pessoasServices = new PessoasServices()

class PessoaController {
    static async pegaPessoasAtivas(request, response) {
        try {
            const pessoasAtivas = await pessoasServices.pegaTodosOsRegistros();
            return response.status(200).json(pessoasAtivas);
        } catch (error) {
            return response.status(500).json(error.message);
        }
    };

    static async pegaTodasAsPessoas(request, response) {
        try {
            const todasAsPessoas = await database.Pessoas.scope('todos').findAll();
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

    static async restauraPessoa(request, response) {
        const { id } = request.params;
        try {
            await database.Pessoas.restore({ where: { id: Number(id) } });
            return response.status(200).json({ mensagem: `id ${id} restaurado` });
        } catch (error) {
            return response.status(500).json(error.message);
        }
    }

    static async pegaMatriculas(request, response) {
        const { estudanteId } = request.params;
        try {
            const pessoa = await database.Pessoas.findOne({ where: { id: Number(estudanteId) } });
            const matriculas = await pessoa.getAulasMatriculadas();
            return response.status(200).json(matriculas);
        } catch (error) {
            console.log(error);
            return response.status(500).json(error.message);
        }
    }

    static async pegaMatriculasPorTurma(request, response) {
        const { turmaId } = request.params;
        try {
            const todasAsMatriculas = await database.Matriculas.findAndCountAll({
                where: {
                    turma_id: Number(turmaId),
                    status: "confirmado"
                },
                limit: 20,
                order: [['estudante_id', 'ASC']]
            });
            return response.status(200).json(todasAsMatriculas);
        } catch (error) {
            console.log(error);
            return response.status(500).json(error.message);
        }
    }

    static async pegaTurmasLotadas(request, response) {
        const lotacaoTurma = 2;
        try {
            const turmasLotadas = await database.Matriculas.findAndCountAll({
                where: {
                    status: "confirmado"
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`COUNT(turma_id) >= ${lotacaoTurma}`)
            });
            return response.status(200).json(turmasLotadas.count);
        } catch (error) {
            console.log(error);
            return response.status(500).json(error.message);
        }
    }

    static async cancelaPessoa(request, response) {
        const { estudanteId } = request.params;
        try {
            database.sequelize.transaction(async transacao => {
                await database.Pessoas.update({ ativo: false },
                    { where: { id: Number(estudanteId) } }, { transaction: transacao });
                await database.Matriculas.update({ status: 'cancelado' },
                    { where: { estudante_id: Number(estudanteId) } }, { transaction: transacao });
                return response.status(200).json({ messaage: `matriculas ref. estudante ${estudanteId} canceladas` });
            })
        } catch (error) {
            console.log(error);
            return response.status(500).json(error.message);
        }
    }

}

module.exports = PessoaController;