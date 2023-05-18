
/// <reference types="cypress"/>

describe('Cadastrar Produto', () => {
    let token // variável
    beforeEach(() => {
        cy.token('fulano@qa.com', 'teste').then(tkn =>{token = tkn})
    });

    it('Deve cadastrar um produto usando a API', () => {
      cy.request({
        method: 'POST',
        url: 'produtos',
        body: {
          nome: 'Produto de Teste 4',
          preco: 200,
          descricao: 'Descrição do produto de teste',
          "quantidade": 381
        },
        headers:{authorization: token}
      }).then((response) => {
        expect(response.status).to.equal(201)// assert
        expect(response.body.message).to.equal('Cadastro realizado com sucesso')// assert
         // Você pode adicionar mais expectativas para verificar outros dados da resposta
      });
    });
  });