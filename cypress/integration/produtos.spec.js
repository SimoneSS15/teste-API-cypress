/// <reference types="cypress"/>


describe('Testes da funcionalidade Produtos', () => {
    let token // variável
    beforeEach(() => {
        cy.token('fulano@qa.com', 'teste').then(tkn =>{token = tkn})
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

    it('Cadastrar produto', () => {
        let produto = `Produto EBAC ${Math.floor(Math.random() * 100000000)}`
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
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
    });
    
    it.only('Deve validar mensagem de erro ao cadastrar produto repetito', () => {
       cy.cadastroProduto(token, 'Produto EBAC novo 1', 250, 'Descrição do produto novo', 180)
        .then((response) =>{
            expect(response.status).to.equal(400)// status code
            expect(response.body.message).to.equal('Já existe produto com esse nome')
        })
        
    });
});