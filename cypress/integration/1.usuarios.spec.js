///<reference types="cypress" />


import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from '../fixtures/factory'
//import cypress from 'cypress'


describe('Casos de teste sobre a rota /usuarios da API Serverest', () => {

    it('Deve buscar todos os usuários cadastrados na Serverest', () => {
        Serverest.buscarUsuarios().then(res => {
            cy.contractValidation(res, 'get-usuarios', 200)
            ValidaServerest.validarBuscaDeUsuarios(res)

        })
    })
    it('Deve cadastrar um usuário com sucesso', () => {
        cy.cadastrarUsuarioComSucesso().then(res => {
        cy.contractValidation(res, 'post-usuarios', 201)
        expect(res.body.message).to.be.equal('Cadastro realizado com sucesso')

})

})

    it('Não deve cadastrar um novo usuários, com e-mail já utilizado em outro cadastrado', () => {
        cy.cadastrarUsuarioSemSucesso().then(res => {
            cy.contractValidation(res, 'post-usuarios', 400)
            expect(res.body.message).to.be.eq('Este email já está sendo usado')
        })
    })
    it('Deve editar um usuário alterando e-mail, com sucesso', () => {
       // desenvolver código alterando e-mail
       // desenvolver código editando um usuário sem informar id
})

})

