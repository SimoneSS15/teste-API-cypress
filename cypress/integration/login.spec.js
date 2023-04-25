/// <reference types="cypress"/>
describe('Login - Testes da API ServeRest', () => {
    it('Deve fazer login com sucesso', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/login',
            body: {
                "email": "fulano@qa.com",
                "password": "teste"
              }
        }).then((response) => {// primeiro e feita a requisição e se obtem a resposta, então se valida a mensagem de status code
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('Login realizado com sucesso')// vai validar a mensagem de login
            cy.log(response.body.authorization)// irá me retornar o token
        })

    });
    // Nos testes de API não precisamos capturar os elementos para fazer os testes
});