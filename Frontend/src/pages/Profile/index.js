import React, { useState, useEffect } from 'react';//importa o react para a aplicação junto com
import { Link, useHistory } from 'react-router-dom';//importa o uso de links sem precisar recarregar a pagina e a sessão com os dados do usuario
import { FiPower, FiTrash2 } from 'react-icons/fi'; //importa os icones

import api from '../../services/api';//importa a api da aplicação para a pagina

import './style.css';//importa o estilo css

import logoImg from '../../assets/logo.svg';//importa as imgs para o arquivo

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const ongId = localStorage.getItem('ongId');//guarda o id da ong salva no momento que ela faz o login
  const ongName = localStorage.getItem('ongName');//salva o nome da ong na sessão, no momento que ela faz o login

  const history = useHistory();//dados da sessão

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,//o id de autorização recebido pelo cabeçhalo http
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId])

  //função para deletar incidentes
  async function handleDeleteIncident(id){
     try{
       await api.delete(`incidents/${id}`,{
           headers:{
           Authorization: ongId,
           }
        })

        setIncidents(incidents.filter(incident => incident.id !== id));
     }catch(err){
         alert('Erro ao deletar o caso, tente novamente');
     }
  }

  //destroi a sessão
  function handleLogout(){
      localStorage.clear();

      history.push('/');//envia o usuario para a pagina inicial
  }
    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button  onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E03041" />
                </button>
            </header>

        
            <h1>Casos cadastrados</h1>
            
            <ul>
                {incidents.map(incident => (
                                    <li key={incident.id}>
                                    <strong>CASO:</strong>
                                    <p>{incident.title}</p>
                
                                    <strong>DESCRIÇÂO:</strong>
                                    <p>{incident.description}</p>
                
                                    <strong>VALOR:</strong>
                                    <p>{Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                
                                    <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                                       <FiTrash2 size={20} color="#a8a8b3" />
                                    </button>
                                </li>
                
                ))}
            </ul>
        </div>
    );
}