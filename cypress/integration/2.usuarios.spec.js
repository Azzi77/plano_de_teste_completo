///<reference types="cypress" />


import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from '../fixtures/factory'

//import cypress from 'cypress'


describe('Casos de teste sobre a rota /usuarios da API Serverest', () => {

       it('Deve buscar todos os usuários cadastrados na Serverest', () => {
        Serverest.buscarUsuarios().then(res => {
            cy.contractValidation(res, 'get-usuarios', 200)
            ValidaServerest.validarBuscaDeUsuarios(res) //ok

        })
    })
       it('Deve cadastrar um usuário com sucesso', () => { 
        Serverest.cadastrarUsuarioComSucesso().then(res => {
        cy.contractValidation(res, 'post-usuarios', 201)
        expect(res.body.message).to.be.equal('Cadastro realizado com sucesso')
        Cypress.env('idUsuarioCadastrado',res.body._id) //ok
   })

})
       it('Deve buscar um usuário por _id com sucesso', () => {
            Serverest.buscarUsuarioPorId().then(res => {
            cy.contractValidation(res, 'get-usuarios-by-id', 200) 
             ValidaServerest.validarBuscaDeUsuarioPorId(res)
            
       })
    })
    
      it('Deve editar um usuário com sucesso', () => {
           Serverest.editarUsuarioComSucesso().then(res => {
           cy.contractValidation(res, 'put-usuario-by-id', 200)
           expect(res.body.message).to.be.eq('Registro alterado com sucesso')
   })

})

     it('Não deve cadastrar um novo usuários, com e-mail já utilizado em outro cadastrado', () => {
          cy.cadastrarUsuarioSemSucesso().then(res => {
          cy.contractValidation(res, 'post-usuarios', 400)
          expect(res.body.message).to.be.eq('Este email já está sendo usado')

     })
 })

     it('Não deve editar um novo usuário, com e-mail já utilizado em outro cadastrado', () => {

        // falta desevolver código, não conseguir
    })
   
})

//  faltou desenvolver código recuperar senha, rota ainda não existe na serverest 

