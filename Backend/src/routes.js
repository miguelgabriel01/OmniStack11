const express = require('express')

const Ongcontroller = require('./controllers/Ongcontroller');//controller ongs
const Incidentcontroller = require('./controllers/Incidentcontroller');//controller icidentes
const Profilecontroller = require('./controllers/Profilecontoller');//controler incidentes unnicos de cada ong
const Sessioncontroller = require('./controllers/Sessioncontroller');//controler de login e sessão de usuarios

const { celebrate, Segments, Joi } = require('celebrate');//reponsavel por fazer a validação(npm install celebrate)

const routes = express.Router();

//rotas

routes.post('/sessions', Sessioncontroller.create)//Rota responsavel por fazer a autenticação do usuario

routes.get('/ongs', Ongcontroller.index);//Rota responsavel por listar as ongs
routes.post('/ongs', celebrate({

 [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),//o nome da ong deve ser em formato de texto e é obrigatoria
    email: Joi.string().required().email(),//o E-mail da ong deve ser em formato de texto, é obrigatorio e deve ser do tipo E-mail
    whatsapp: Joi.number().required(),//o whatsapp tem que ser do tipo numero, é obrigaqtorio e deve conter os 12/13 numeros(558192765185)
    city: Joi.string().required(),//o cidade da ong deve ser obrigatoria e do tipo texto
    uf: Joi.string().required().length(2),//o estado deve ser texto, é obrigatorio e o tamanho deve ser de 2 digitos
 })


}), Ongcontroller.create);//Rota de cadastro de ongs
//celebrate() abtes do Ongcontroller.create, faz a validação dos dados antes de salvar

routes.get('/profile', celebrate({
    [ Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),//informa que o id do usuario deve ser enviado no headres para mostrar que ele esta autentucado 
}), Profilecontroller.index)//Rota que lista apenas um incidente por vez

routes.post('/incidents', Incidentcontroller.create)//rota que cria os incidentes das ongs
routes.get('/incidents',celebrate({
    [ Segments.QUERY]:  Joi.object().keys({
        page: Joi.number(),//esta parte é da paginação, onde o numero da pagina inicial deve ser um tippo numero
    })
}), Incidentcontroller.index)//rota que lista os incidentes das ongs

routes.delete('/incidents/:id', celebrate({
    [ Segments.PARAMS ]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), Incidentcontroller.delete)//rota que apaga um incidente


module.exports = routes;


/**
 * o segundo ARGUMENTO APOS O  PONTO É O NOME DADO A FUNÇÃO DO CONTROLER.
 * ex:
 * Ongcontroller.create/create éo nome dado
 */
