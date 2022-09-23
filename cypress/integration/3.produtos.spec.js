///<reference types="cypress" />



import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste sobre a rota /produtos da API Serverest', () => {

   it('Deve buscar todos os produtos cadastrados', () => {
      Serverest.buscarProdutos().then(res => {
         ValidaServerest.validarBuscaDeProdutos(res)
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


      it('Deve cadastrar um novo produto com sucesso', () => {
         Serverest.cadastrarProdutoComSucesso().then(res => {
            cy.contractValidation(res, 'post-produtos', 201)
            ValidaServerest.validarCadastroDeProdutosComSucesso(res)



         })
      })
      it('Deve tentar cadastrar um produto com valor negativo, sem sucesso,', () => { //não esta mapeado
         Serverest.cadastrarProdutoSemSucesso().then(res => {                     //retorna 401 undefined
                 ValidaServerest.validarCadastroDeProdutosSemSucesso(res)     //as vezes retorna 403 entao da erro 
                                                                             //na validação da mensagem
              })
     
           })
     
      
   })

})
