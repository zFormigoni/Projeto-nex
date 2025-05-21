const reader = require('xlsx');

const Excel = {
    retornarDados(endereco, pasta) {
        const file = reader.readFile(endereco);
        const nomeDaAba = file.SheetNames[pasta];
        const planilha = file.Sheets[nomeDaAba];
        const dados = reader.utils.sheet_to_json(planilha);
        return dados;
    },
};

module.exports = Excel;
