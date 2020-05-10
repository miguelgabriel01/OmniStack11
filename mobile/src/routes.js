import React from 'react';//importa o react para a pagina
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';//importa a opção de rotas para o app

const AppStack = createStackNavigator();

//faz a importação das paginas que o app vai ter 
import Incidents from './pages/Incidents';//importa os arquivos da pagina de incidentres do APP
import Detail from './pages/Detail'//importa os arquivos da pagina de Detallhes sobre os casos(inicidentes) do App


export default function Routes(){
    return(
      <NavigationContainer>
      
       <AppStack.Navigator screenOptions={{ headerShown: false}}>
           
          <AppStack.Screen name="Incidents" component={Incidents} />
          <AppStack.Screen name="Detail" component={Detail} />

       </AppStack.Navigator>
      
      </NavigationContainer>
    );
}

/**
 * O navigation container deve ficar entre todas as rotas
 * <navigationContainer>
 * 
 //rotas usadas no app
 
 </navigationContainer>
 */

 /**
  * PARA CADA rotas(paginas) criar um <AppStack.Screen component={nome da importação} >
  * screenOptions={{ headerShown: false}} este trecho impede que o nome dado a rota, apareca no cabeçalho do app
  */