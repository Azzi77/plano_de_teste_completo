///<reference types="cypress" />
//**************************************
const fs = require('fs-extra');
const path = require('path');

function buscarAquivoDeConfig(arquivo){
  const caminhoDoArquivo = path.resolve('.', 'cypress', 'config', `${arquivo}.json`)
  return fs.readJSON(caminhoDoArquivo)
}
    
module.exports = (on, config) => {
  const arquivo = config.env.configFile || 'dev'
      return buscarAquivoDeConfig(arquivo)
}