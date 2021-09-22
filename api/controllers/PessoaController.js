const database = require("../models");

class PessoaController {
    static async pegaTodasAsPessoas(request, response) {
        try {
            const todasAsPessoas = await database.Pessoas.findAll();
            return response.status(200).json(todasAsPessoas);
        } catch (error) {
            return response.status(500).json(error.message);
        }
    }
}

module.exports = PessoaController;