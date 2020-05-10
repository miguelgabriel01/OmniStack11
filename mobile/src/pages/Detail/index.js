import React from 'react';//faz a importação do react
import { View, Image,TouchableOpacity, Text, Linking } from 'react-native';//importa os componentes que se assemelham aos c=do html. o flatlist serve para fazer a rolagem entre itens
import { Feather } from '@expo/vector-icons';//importa os icones
import * as MailComposer from 'expo-mail-composer';//o pacote para o usuario poder abrir o email no app
import { useNavigation, useRoute } from '@react-navigation/native';//pega todas as importações e joga dentro de uma variavel

import styles  from './styles';//importa o css para a pagina

import logoImg from '../../assets/logo.png'//importa as logos que se adptam ao tamano de cada celular


export default function Details(){

  const navigation = useNavigation();
  const route = useRoute();//pega as informações da pagina atual

  const incident = route.params.incident;//recebe os dados da pagina anteiror


  const message = `Olá ${incident.name}, estou entrando em contato para saber mais e ajudar no caso "${incident.title}", com o valor de "${Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL' }).format(incident.value)}"`;

  //função para levar o usurio devolta a pagina inicial
  function navigateBack(){
     navigation.goBack();
  }

  function sendMail(){
   MailComposer.composeAsync({
     subject: `Heroi do caso: ${incident.title}`,
     recipients: [incident.email],
     body: message,
   });
  }

  function sendWhatsapp(){
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
  }

  //Linking.openURL(whatsapp://send?phone='5521000000000'&text=${message})

  return(
      <View style={styles.container}>

       <View style={styles.header}> 
          <Image source={logoImg} />
         
         <TouchableOpacity onPress={navigateBack}>

          <Feather name="arrow-left" size={28} color='#E82041'></Feather> 
         </TouchableOpacity>

        </View>

        <View style={styles.incident}>
           <Text style={[styles.incidentePropiety,{ marginTop: 0}]}>
             ONG:
           </Text>
           <Text style={styles.incidenteValue}>
             {incident.name} de {incident.city}/{incident.uf}
           </Text>

           <Text style={styles.incidentePropiety}>
             DESCRIÇÃO:
           </Text>
           <Text style={styles.incidenteValue}>
             {incident.description}
           </Text>

           <Text style={styles.incidentePropiety}>
             VALOR:
           </Text>
           <Text style={styles.incidenteValue}>
             {Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL' }).format(incident.value)}
           </Text>
       </View>
        
        <View style={styles.contactBox}>

          <Text style={styles.heroTitle}>Salve o dia!</Text>
          <Text style={styles.heroTitle}>Seja o heroi desse caso.</Text>

          <Text style={styles.heroDescription}>Entre em contato:</Text>

          <View style={styles.actions}>

            <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
              
                <Text style={styles.actionText}>Whatsapp</Text>
            
            
            </TouchableOpacity>

            <TouchableOpacity style={styles.action} onPress={sendMail}>
              
              <Text style={styles.actionText}>E-mail</Text>
          
          
          </TouchableOpacity>

          </View>


        </View>
       
      </View>
  );
}