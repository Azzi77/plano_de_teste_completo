import Factory from '../fixtures/factory'

const URL_USUARIOS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHOS = '/carrinhos'


export default class Serverest {
 // usuarios
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
          static cadastrarUsuarioComSucesso(){
                 let usuario = Factory.gerarUsuario()
                 return cy.request({
                 method: 'POST',
                 url: '/usuarios',                 
                 body:usuario,
                 failOnStatusCode: false,

   })

}
           static editarUsuarioComSucesso() {
                  let usuario = Factory.gerarUsuario()
                  return cy.request({
                  method:'PUT',
                  url:`${URL_USUARIOS}/${Cypress.env('idUsuarioCadastrado')}`,
                  body:usuario,
                  failOnStatusCode: false,

      })

    }
          static buscarUsuarioPorId() {
                 return cy.request({
                 method:'GET',
                 url:`${URL_USUARIOS}/${Cypress.env('idUsuarioCadastrado')}`
    })

}
 
          static logar(usuario) {
                 return cy.rest('POST', URL_LOGIN, usuario)

    }

          static salvarBearer(resposta) {
                 Cypress.env('bearer', resposta.body.authorization.slice(7))

    }
    //produtos

          static buscarProdutos() {
                 return cy.rest('GET', URL_PRODUTOS)

    }

          static buscarProdutosPorId() {
                 return cy.request({
                 method:'GET',
                 url:`${URL_PRODUTOS}/${Cypress.env('idProdutoCadastrado')}`
       })

 }

          static editarProdutosPorId() {
                 let produto = Factory.gerarProduto()
                 return cy.request({
                 method:'PUT',
                 url:`${URL_PRODUTOS}/${Cypress.env('idProdutoCadastrado')}`,
                 body:produto,
                 failOnStatusCode: false,
                 auth: {
                 bearer: Cypress.env("bearer")

            }
     })

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
    static cadastrarProdutoComNomeExistente() {   
        return cy.request({ 
        method: 'POST',
        url: URL_PRODUTOS,
        body: {
        "nome": "Logitech MX Vertical",
        "preco": 470,
        "descricao": "Mouse",
        "quantidade": 381
     },

        failOnStatusCode: false,
        auth: {
         bearer: Cypress.env("bearer")
     }
 })

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

 // carrinhos

          static buscarCarrinhos() {
                 return cy.rest('GET', URL_CARRINHOS, )


  }    
  static buscarProdutoParaCarrinhos() {
    cy.request(URL_PRODUTOS).then(res =>{
        let qtdprodutos = res.body.quantidade -1 
        let inteiro = Factory.gerarInteiroAleatorio(qtdprodutos)

        cy.wrap({
            idProduto: res.body.produtos[inteiro].id,
            quantidade: Factory.gerarInteiroAleatorio(5)

    }).as('produtosParaCarrinho')


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
                produtos: [produto]
               
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



       static cadastrarCarrinhoComProdutoDuplicado() {
              return cy.request({
              method: 'POST',
              url: URL_CARRINHOS,
              body: {
              produtos:[
                produto,                         
                produto
            ]  
  },
      
            failOnStatusCode: false,
            auth: {
            bearer: Cypress.env("bearer")
           }

       })
   }
}



