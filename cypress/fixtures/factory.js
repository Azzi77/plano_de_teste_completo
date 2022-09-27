//const faker = require('faker');
const { faker } = require('@faker-js/faker');

export default class Factory {

    static gerarProduto() {
        return {
            "nome": faker.commerce.productName(),
            "preco": faker.commerce.price(), // no video usa o number
            "descricao": faker.commerce.productDescription(),
            "quantidade": faker.datatype.number()
        }
    }

    static gerarInteiroAleatorio(){
        return faker.datatype.number(5)

    }

    static gerarUsuario() {
        return {
            "nome": faker.name.fullName(),
            "email": faker.internet.email(),
            "password": faker.internet.password(),
            "administrador": "true"
}
    }

}
