import React, { useEffect, useState }from 'react';//faz a importação do react
import { View, Image, FlatList, Text, TouchableOpacity } from 'react-native';//importa os componentes que se assemelham aos c=do html. o flatlist serve para fazer a rolagem entre itens
import { Feather } from '@expo/vector-icons';//importa os icones
import { useNavigation } from '@react-navigation/native';//importa as opções de links entre as paginas


import api from '../../services/api';//importa a api


import logoImg from '../../assets/logo.png'//importa as logos que se adptam ao tamano de cada celular

import styles from './styles';//importo a estilização da pagina

export default function Incidents(){
  const [incidents, setIncidents] = useState([])
const [total,setTotal] = useState(0);//total de casos
const [page, setPage] = useState(1)//inicia na pagina 1
const [loading, setLoading] = useState(false);



  const navigation = useNavigation();

  function navegateToDetail(incident){
    navigation.navigate('Detail', { incident })
  }



   async function loadIncidents(){

    if(loading){
      return;
    }
    if(total > 0 && incidents.length == total){
      return;
    }

    setLoading(true)

    const response = await api.get('incidents', {
      params: { page }
    })


    setIncidents([ ...incidents, ...response.data]);
    setTotal(response.headers['x-total-count'])

    setPage(page + 1)
    setLoading(false)
   }

  useEffect(() => {

    loadIncidents()

  }, []);


  return(
      <View style={styles.container} >
        <View style={styles.header}> 
          <Image source={logoImg} />
          <Text style={styles.headertext}>
            Total de <Text style={styles.headertextBold}>{total} casos</Text>.
          </Text>
        </View>
        <Text style={styles.title}>Bem-Vindo!</Text>
        <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
        
        <FlatList 
         data={incidents}
        style={styles.incidentList}
        
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={ false }//desabilita a visualização da barra de rolagem(ela n aparece)
        onEndReached={loadIncidents}//recarrega mais 5 casos
        onEndReachedThreshold={0.2}//indica quantos % o usurio deve está do fim para a pagina carregar novos itens(0.2 sig 20%)
        renderItem={({ item: incident }) =>(
          <View style={styles.incident}>
           <Text style={styles.incidentePropiety}>
             ONG:
           </Text>
           <Text style={styles.incidenteValue}>
             {incident.name}
           </Text>

           <Text style={styles.incidentePropiety}>
             CASO:
           </Text>
           <Text style={styles.incidenteValue}>
             {incident.title}
           </Text>

           <Text style={styles.incidentePropiety}>
             VALOR:
           </Text>
           <Text style={styles.incidenteValue}>
             {Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL' }).format(incident.value)}
           </Text>

           <TouchableOpacity
            style={styles.detailsButton}
            onPress={() =>navegateToDetail(incident)}
            >
           <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
           <Feather name="arrow-right" size={16} color="#E02041" />
           </TouchableOpacity>

         </View> 
        )}
        
        />

       
      </View>
  );
}

/**
 * useEffect carrega uma informação sempre que o compenente é ixibido na tela
 */