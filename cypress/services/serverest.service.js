import Factory from '../fixtures/factory'

const URL_USUARIOS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHOS = '/carrinhos'


export default class Serverest {

    static buscarUsuarios() {
        return cy.rest('GET', URL_USUARIOS)

  }

    static buscarUsuarioParaLogin() {
        cy.request(URL_USUARIOS).then(res => {
            cy.wrap({
                email: res.body.usuarios[0].email,
                password: res.body.usuarios[0].password
            }).as('usuarioLogin')
        })

   }

    static logar(usuario) {
        return cy.rest('POST', URL_LOGIN, usuario)

    }

    static salvarBearer(resposta) {
        Cypress.env('bearer', resposta.body.authorization.slice(7))

    }

    static buscarProdutos() {
        return cy.rest('GET', URL_PRODUTOS)

    }

    static cadastrarProdutoComSucesso() {
        let produto = Factory.gerarProduto()
        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: produto,
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env("bearer")

            }
        })

    }

    static cadastrarProdutoSemSucesso() {   
        return cy.request({ 
                method: 'POST',
                url: URL_PRODUTOS,
                body: {
                "nome": "Negativo Logitech MX Vertical",
                "preco": -470,
                "descricao": "Mouse",
                "quantidade": 381
            },

            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })

    }

    static buscarCarrinhos() {
        return cy.rest('GET', URL_CARRINHOS, )

    }

    static deletarProdutoCadastrado() {
        return cy.request({
              method: 'DELETE',
              url: `${URL_PRODUTOS}/${Cypress.env('idProdutoCadastrado')}`,
              auth: {
                bearer: Cypress.env("bearer")
            }

        })

    }
    
   
      static concluirCompra() {
          return  cy.request({
               method: 'DELETE',
               url: `${URL_CARRINHOS}/concluir-compra`,
               auth: {
               bearer: Cypress.env("bearer")
          }

      })
    }
      static cadastrarCarrinhoComSucesso() {
              return cy.request({
              method: 'POST',
              url: URL_CARRINHOS,
              body: {
                "produtos": [
                                    {
                    "idProduto": "K6leHdftCeOJj8BJ",
                    "quantidade": 5
                  }
                ]
        },
              
            
           failOnStatusCode: false,
            auth: {
                bearer: Cypress.env("bearer")
         }

     })
    
      }
   
    
      static cancelarCompra() {
            return  cy.request({
            method: 'DELETE',
            url: `${URL_CARRINHOS}/cancelar-compra`,
            auth: {
          bearer: Cypress.env("bearer")
            }

       })
   }
}



