

export default class ValidaServerest {

        //Ações que podemos realizar na API
        //Buscar usuarios 
        // Cadastrar novo usuários
        // Realizar login

        static validarBuscaDeUsuarios(resposta) {
                expect(resposta.body.quantidade).to.be.greaterThan(3)

        }

        static validarLoginComSucesso(resposta) {   
                expect(resposta).to.be.a('object')                  // as validções está sendo feita pelo json schema
                expect(resposta.body.message).to.be.a('string')
                expect(resposta.body).to.haveOwnProperty('authorization')


        }

        static validarBuscaDeProdutos(resposta) {
                expect(resposta).to.be.a('object')
                expect(resposta.body.quantidade).to.be.a('number')
                expect(resposta.body.produtos[0]).to.be.haveOwnProperty('nome')
                expect(resposta.body.produtos[0]).to.be.haveOwnProperty('preco')
                expect(resposta.body.produtos[0]).to.be.haveOwnProperty('descricao')
        }

        static validarCadastroDeProdutosComSucesso(resposta) {
                expect(resposta).to.be.a('object')
                expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
                expect(resposta.body).to.haveOwnProperty('_id')
                Cypress.env('idProdutoCadastrado', resposta.body._id)
        }
        static validarCadastroDeProdutosSemSucesso(resposta) {
                expect(resposta.body.preco).to.be.eq('preco deve ser um número positivo')
               expect(resposta.body.message).to.be.eq('preco deve ser um número positivo')


        }
        static validarBuscaDeCarrinhos(resposta) {
                expect(resposta.body.quantidade).to.be.greaterThan(0)


        }
        static validarLoginComEmailsInvalido(resposta) {
                expect(resposta.body.message).to.be.eq('Email e/ou senha inválidos')
                expect(resposta.body.message).to.be.a('string')

        }
        static validarLoginSemEmail(resposta) {
                expect(resposta.body.email).to.be.eq('email não pode ficar em branco')

        }
        

        }
        
             
  


