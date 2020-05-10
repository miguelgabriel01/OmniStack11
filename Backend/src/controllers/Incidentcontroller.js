const connection = require('../database/connection');

module.exports = {
    //lista os inicidentes
    async index(request,response){
        const { page = 1} = request.query

        const [count] = await connection('incidents').count();//.count server para neste caso, contar a quantidade de incidentes salvos no banco

        //console.log(count);

        const incidents = await connection('incidents')
        .join('ongs','ongs.id','=','incidents.ong_id')
        .limit(5)//informa o limite de inicidentes por paginação
        .offset((page -1)*5)//responsavel por exibir 5 incidentes por vez. fazendo assim uma paginação
        .select(['incidents.*',
         'ongs.name',//nome da ong
         'ongs.email',//email da ong
         'ongs.whatsapp',//whatsapp da ong
         'ongs.city',//cidade na qual a ong pertence 
         'ongs.uf'//estado de origem da ong
          ]);//seleciona os dados informados que estão na tabela ongs

        response.header('X-Total-Count', count['count(*)'])//aqui passamos para o cabeçalho, as informações sobre a quantidade de incidentes salvos no banco

        return response.json(incidents)//retorna um array com os incidentes criados pelas ongs
    },
    
    //cria os incidentes
    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection ('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        
       return response.json({ id })

    },
     
    //deleta um incidente
    async delete(request, response){
       const { id} = request.params;

       const ong_id = request.headers.authorization;

       const incident = await connection('incidents')
       .where('id', id)
       .select('ong_id')
       .first()

       if(incident.ong_id != ong_id){
           return response.status(401).json({ error: 'Operation not permitted'});
       }

       await connection('incidents').where('id',id).delete();

       return response.status(204).send()
    }
}
