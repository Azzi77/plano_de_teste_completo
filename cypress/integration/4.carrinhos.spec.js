///<reference types="cypress" />


import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from '../fixtures/factory'

describe('Casos de teste sobre a rota /carrinhos da API Serverest', () => {

    it('Deve listar todos os carrinhos cadastrados', () => { 
        Serverest.buscarCarrinhos().then(res => {
            cy.contractValidation(res, 'get-carrinhos', 200)
            ValidaServerest.validarBuscaDeCarrinhos(res)
        })
    })

})
context('Logar com sucesso', () => {
    beforeEach('Logar', () => {
       Serverest.buscarUsuarioParaLogin()
       cy.get('@usuarioLogin').then(usuario => {
          Serverest.logar(usuario).then(res => {
             ValidaServerest.validarLoginComSucesso(res)
             Serverest.salvarBearer(res)
          })
       })
    })
    it('Deve cadastrar um carrinho com sucesso ', () => {
           Serverest.cadastrarCarrinhoComSucesso().then(res => {
            cy.contractValidation(res, 'post-carrinhos', 201)
           expect(res.body.message).to.be.equal('Cadastro realizado com sucesso')

         })
    })
   it ('Deve excluir um carrinho com sucesso e concluir compra ', () => { //Codigo desenvolvido com a ajuda do João/Vinicius
           Serverest.concluirCompra().then(res => {
           cy.contractValidation(res, 'delete-carrinhos-concluir-compra', 200)   
           expect(res.body.message).to.be.equal('Registro excluído com sucesso') //validação da mensagem coloquei direto aqui

      })

})
    it ('Deve excluir um carrinho com sucesso e retornar produto para estoque ', () => { //Codigo desenvolvido com a ajuda do João/Vinicius
            Serverest.cancelarCompra().then(res => {
            cy.contractValidation(res, 'delete-carrinhos-cancelar-compra', 200)   
            expect(res.body.message).to.be.equal('Não foi encontrado carrinho para esse usuário')

       })

   }) 

   

   
})

   

   


