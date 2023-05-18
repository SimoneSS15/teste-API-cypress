const Joi = require ('joi') // constante que chama o joi

const produtosSchema = Joi.object({ // constante que contem os parametros dos produtos (contrato)
 quantidade: Joi.number(),
 produtos: Joi.array().items({
    nome: Joi.string(),
    preco: Joi.number(),
    descricao: Joi.string(),
    _id: Joi.string()
 })
})

export default produtosSchema; // exportar