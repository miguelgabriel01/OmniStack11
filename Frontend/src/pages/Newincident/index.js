import React, {useState} from 'react';//importa o rect para este arquivo
import { Link, useHistory } from 'react-router-dom';//importa o uso de links sem precisar recarregar a pagina
import { FiArrowLeft} from 'react-icons/fi';//importa os icones

import api from '../../services/api';//importa a api para a pagina

import './style.css';//importa o css para a pagina

import LogoImg from '../../assets/logo.svg';//importa o logo da pagina


export default function Newincident(){
  const [title, setTitle] = useState('');//armazena os dados vindos dos inputs
  const [description, setDescription] = useState('');//armazena os dados vindos dos inputs
  const [value, setValue] = useState('');//armazena os dados vindos dos inputs
  const ongId = localStorage.getItem('ongId');//recebo pelo cabeçalho, o id da ong

  const history = useHistory();

  async function handleNewIncident(e){
       e.preventDefault()

       const data = {
         
         title,
         description,
         value,

       }
       try{
         
        await api.post('incidents', data, {
          headers: {
              Authorization: ongId,
          }
        })

        history.push('/profile');//redireciona o usuario para a pagina que lista os dados cadastrados
       }catch(err){
         alert('Erro ao cadastrar caso, tente novamente')
       }
  }


  return(
        <div className='new-incident-container'>
          <div className='content'>
            <section>
               <img  src={LogoImg} alt="Be The Hero" />
  
               <h1>Cadastrar novo caso</h1>
               <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso</p>
  
               <Link className="back-link" to="/profile">
                       <FiArrowLeft size={16} color="E02041"/>
                       Voltar para Home
               </Link>
            </section>
            <form onSubmit={handleNewIncident}>
  
              <input 
              placeholder="Titulo do caso" 
              value={title}
              onChange={e=> setTitle(e.target.value)}
              />

              <textarea 
              placeholder="Descrição" 
              value={description}
              onChange={e=> setDescription(e.target.value)}
              />
  
              <input 
              placeholder="Valor em Reais"
              value={value}
              onChange={e=> setValue(e.target.value)} 
              />
  
  
              <button className="button" type="submit" >Cadastrar</button>
  
            </form>
          </div>
        </div>
      );
  }