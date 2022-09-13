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

    it('Não deve postar um novo usuários administrador existente', () => {
        cy.postarUsuarioSemSucesso().then(res => {
            cy.contractValidation(res, 'post-usuarios', 400)
            expect(res.body.message).to.be.eq('Este email já está sendo usado')
        })
    })


    it('Deve buscar o usuário de um arquivo json', () => {
        cy.fixture('usuario.json').then(json => {
            let usuario = {
                email: json.email,
                password: json.password
            }

            Serverest.logar(usuario).then(res => {
                ValidaServerest.validarLoginComSucesso(res)
                Serverest.salvarBearer(res)
            })

        })
    })

    it('Deve buscar e salva um usuário em um arquivo json', () => {
              let inteiro = Factory.gerarInteiroAleatorio()
              Serverest.buscarUsuarios().then(res => {
              cy.writeFile('./cypress/fixtures/usuario.json', res.body.usuarios[inteiro])
              ValidaServerest.validarBuscaDeUsuarios(res)

        })


    })



   it('Deve cadastrar um usuário com sucesso', () => {
            cy.cadastrarUsuarioComSucesso().then(res => {
            cy.contractValidation(res, 'post-usuarios', 201)
            expect(res.body.message).to.be.equal('Cadastro realizado com sucesso')

   })

})

})


