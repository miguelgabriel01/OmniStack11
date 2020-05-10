import { StyleSheet } from 'react-native';//importa a opção de estilização da pagina
import Constants from 'expo-constants';//expo install expo-constants


export default StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:24,
        paddingTop: Constants.statusBarHeight + 20,

    },

    header:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    headertext: {
        fontSize: 15,
        color: '#737380'
    },

    headertextBold: {
        fontWeight: 'bold'
    },

    title: {
        fontSize: 30,
        marginBottom: 16,
        marginTop: 48,
        color: '#13131a',
        fontWeight: 'bold'
    },

    description:{
        fontSize: 16,
        lineHeight:24,
        color: '#737380'
    },

    incidentList:{
        marginTop:20
    }, 

        incident: {
            padding: 24,
            borderRadius:8,
            backgroundColor: '#fff',
            marginBottom:16
        },

        incidentePropiety: {
            fontSize: 14,
            color:'#41414d',
            fontWeight: 'bold'
        },

        incidenteValue:{
            marginTop:8,
            fontSize:15,
            marginBottom:24,
            color:'#737380'
        },

    detailsButton:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    detailsButtonText:{
       color:'#e02041',
       fontSize: 15,
       fontWeight: 'bold'
    }
})

