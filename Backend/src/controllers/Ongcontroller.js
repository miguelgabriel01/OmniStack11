const crypto = require('crypto');
const connection = require('../database/connection')

module.exports = {
    //responsavel por listar as ongs
    async index(request, response){
        const ongs = await connection('ongs').select('*');
    
        //retorna o resultado em formato de array
        return response.json( ongs );
    },

    //Responsavel por cadastrar as ongs
    async create(request,response) {
        const { name, email, whatsapp, city, uf} = request.body;
  
        const id = crypto.randomBytes(4).toString('HEX');  
    
        await connection('ongs').insert({
            id,
            name,
            email, 
            whatsapp,
            city,
            uf,
        })
        //retorna o ID que será usado pelo adm da ong para entrar
        //retorna um JSON com o ID
        return response.json({ id });
    }
}