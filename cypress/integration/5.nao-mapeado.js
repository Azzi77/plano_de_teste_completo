///<reference types="cypress" />


import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'




describe('Casos de teste não mapeado na documentação da API Serverest', () => {

  it('Não deve realizar login sem email ', () => {  //eu  //sem documentaçao swagger
       cy.logarSemEmail().then(res => {
            ValidaServerest.validarLoginSemEmail(res)
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
  
  it.only('Deve tentar cadastrar um produto com valor negativo, sem sucesso,', () => { //não esta mapeado
    Serverest.cadastrarProdutoSemSucesso().then(res => {                     //retorna 401 undefined
            ValidaServerest.validarCadastroDeProdutosSemSucesso(res)     //as vezes retorna 403 entao da erro 
                                                                        //na validação da mensagem
         })

      })

  })
  
})

