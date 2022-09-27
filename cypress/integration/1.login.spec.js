///<reference types="cypress" />



import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'


describe('Casos de teste sobre a rota /login da API Serverest', () => {

    it('Deve realizar login com sucesso', () => { 
        Serverest.buscarUsuarioParaLogin()
        cy.get('@usuarioLogin').then(usuario => {
            Serverest.logar(usuario).then(res => {
                ValidaServerest.validarLoginComSucesso(res)
                cy.contractValidation(res, 'post-login', 200)
                Serverest.salvarBearer(res)
            })
        })
    })

    it('Não deve realizar login com email invalido ', () => {  
        cy.logarEmailInvalido().then(res => {
            cy.contractValidation(res, 'post-login', 400) // aqui tem bug na documentação esta 400, porem retorna um 401
            ValidaServerest.validarLoginComEmailsInvalido(res)
         })

     })
     
})

/* recuperar senha, rota ainda não existe na serverest */





