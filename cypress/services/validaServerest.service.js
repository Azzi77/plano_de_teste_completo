

export default class ValidaServerest {

        //usuarios

        static validarBuscaDeUsuarios(resposta) {
                expect(resposta.body.quantidade).to.be.greaterThan(3)
              
        }       
              
                static validarBuscaDeUsuarioPorId(resposta) {
                       expect(resposta.status).to.equals(200)
                             
      }
   

        //login
        static validarLoginComSucesso(resposta) {   
                expect(resposta).to.be.a('object')                  // as validções está sendo feita pelo json schema
                expect(resposta.body.message).to.be.a('string')
                expect(resposta.body).to.haveOwnProperty('authorization')


  }
        static validarLoginComEmailsInvalido(resposta) {
                expect(resposta.body.message).to.be.eq('Email e/ou senha inválidos')
                expect(resposta.body.message).to.be.a('string')
                expect(resposta.status).to.equals(400)

  }
        
//produtos
        static validarBuscaDeProdutos(resposta) {
                expect(resposta).to.be.a('object')
                expect(resposta.body.quantidade).to.be.a('number')
                expect(resposta.body.produtos[0]).to.be.haveOwnProperty('nome')
                expect(resposta.body.produtos[0]).to.be.haveOwnProperty('preco')
                expect(resposta.body.produtos[0]).to.be.haveOwnProperty('descricao')
}
        static validarBuscaDeProdutosPorId(resposta) {
                expect(resposta).to.be.a('object')
                expect(resposta.status).to.equals(200)
               

  }
        static validarCadastroDeProdutosComSucesso(resposta) {
                expect(resposta).to.be.a('object')
                expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
                expect(resposta.body).to.haveOwnProperty('_id')
                Cypress.env('idProdutoCadastrado', resposta.body._id)
  }
        static validarCadastroDeProdutosSemSucesso(resposta) {
               expect(resposta.body.message).to.be.eq('preco deve ser um número positivo')


  }
        static validarBuscaDeCarrinhos(resposta) {
                expect(resposta.body.quantidade).to.be.greaterThan(0)


        }
        
        
 }
        
             
  


