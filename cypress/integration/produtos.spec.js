/// <reference types="cypress"/>
//import contrato from '../contracts/produtos.contract' // importa o que tem no arquivo produtos.contract.js

describe('Testes da funcionalidade Produtos', () => {
    let token // variável
    beforeEach(() => {
        cy.token('fulano@qa.com', 'teste').then(tkn =>{token = tkn})
    });
    
    it('Deve validar contrato de produtos', () => {
        cy.request ('produtos').then(response =>{ // método GET
            return contrato.validateAsync(response.body)
        })
    });

    it('Listar produtos', () => {
        cy.request({
            method: 'GET',
            url: 'produtos'

        }).then((response)=> { // fazendo a validação do teste
            expect(response.body.produtos[8].nome).to.equal('Notebook HP')// Assert
            expect(response.status).to.equal(200)// assert com o status code
            expect(response.body).to.have.property('produtos')// outro assert que lista os produtos
            expect(response.duration).to.be.lessThan(20)// assert que valida o tempo de execução em milisegundos
        })
    });

    it.only('Cadastrar produto', () => {
        let produto = `Produto EBAC ${Math.floor(Math.random() * 100000000)}` // função matemática que gera produtos
        cy.request({
            method: 'POST',
            url:'produtos',
            body: {
                "nome": produto,
                "preco": 500,
                "descricao": "Mouse",
                "quantidade": 381
              },
              headers:{authorization: token}
            }).then((response) =>{
            expect(response.status).to.equal(201)// assert
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')// assert
        })
    });
    
    it('Deve validar mensagem de erro ao cadastrar produto repetito', () => {
       cy.cadastroProduto(token, 'Produto EBAC novo 1', 250, 'Descrição do produto novo', 180)
        .then((response) =>{
            expect(response.status).to.equal(400)// assert com status code
            expect(response.body.message).to.equal('Já existe produto com esse nome')// assert
        })
        
    });

    it('Deve editar um produto já cadastrado', () => {
        // um jeito mais facil de usar o GET para listar produtos
        cy.request('Produtos').then(response =>{
           
            let id= response.body.produtos[0]._id // variável id recebe o id do produto
            cy.request({
                method: 'PUT',
                url: `produtos/${id}`, // url produtos com o id do produto que está na variável id
                headers: {authorization: token}, // o token

                body: {
                    "nome": "Produto Ebac novo 9",
                    "preco": 500,
                    "descricao": "Produto editado",
                    "quantidade": 100
                  }
            }).then(response =>{
                expect(response.body.message).equal('Registro alterado com sucesso')// assert
            })
        })
        
        
    });

    it('Deve editar um produto cadastrado previamente', () => {// usando a função cadastroProduto
        let produto = `Produto EBAC ${Math.floor(Math.random() * 100000000)}` // função matemática que gera produtos
        cy.cadastroProduto(token, produto, 250, 'Descrição do produto novo', 180)
        .then(response =>{
            let id = response.body._id // pega o id e joga na variável de mesmo nome
            cy.request({
                method: 'PUT',
                url: `produtos/${id}`, // url produtos com o id do produto que está na variável id
                headers: {authorization: token}, // o token

                body: {
                    "nome": "Produto Ebac novo 14",
                    "preco": 600,
                    "descricao": "Produto editado 2",
                    "quantidade": 200
                  }
            }).then(response =>{
                expect(response.body.message).equal('Registro alterado com sucesso')// assert
            })
        })
    });

    it('Deve deletar um produto previamente cadastrado', () => { // método Delete
        let produto = `Produto EBAC ${Math.floor(Math.random() * 100000000)}` // função matemática que cadastra produtos
        cy.cadastroProduto(token, produto, 250, 'Descrição do produto novo', 180)
        .then(response =>{
            let id= response.body._id // variável id recebe o id do produto cadastrado
            cy.request({
                method: 'DELETE', // método de excluir
                url: `produtos/${id}`, // url produtos com o id do produto que está na variável id
                headers: {authorization: token} // o token
            }).then(response =>{
                expect(response.body.message).to.equal('Registro excluído com sucesso')// assert
                expect(response.status).to.equal(200)// assert
            })
        })
    });
});