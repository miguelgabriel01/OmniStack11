import React, {useState} from 'react';//importa o react
import { Link, useHistory } from 'react-router-dom';//importa o uso de links sem precisar recarregar a pagina
import { FiArrowLeft} from 'react-icons/fi';//importa os icones

import './style.css'//importa o css desta pagina

import api from '../../services/api';//importa a api criada 


import LogoImg from '../../assets/logo.svg';//importa o logo da pagina

export default function Register(){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [whatsapp,setWhatsapp] = useState('');
  const [city,setCity] = useState('');
  const [uf,setUf] = useState('');

  const history = useHistory();
     
  async function handleRegister(e){
    e.preventDefault();//evita que ao enviar dados do form. a pagina recarrege
 
    const data ={
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    try{
      const response = await api.post('ongs', data);//responsavel por enviar para api os dados

      alert(`Seu ID ce acesso: ${response.data.id}`)
      history.push('/')
    } catch(err){
      alert(`Erro no cadastro, tente novamente`)
    }

    
  }


    return(
      <div className='register-container'>
        <div className='content'>
          <section>
             <img  src={LogoImg} alt="Be The Hero" />

             <h1>Cadastro</h1>
             <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG.</p>

             <Link className="back-link" to="/">
                     <FiArrowLeft size={16} color="E02041"/>
                     Não tenho cadastro
             </Link>
          </section>
          <form onSubmit={handleRegister}>

            <input
             placeholder="Nome da ONG"
            value={name}
            onChange={e=> setName(e.target.value)} 
            />

            
            <input 
            type="email" placeholder="E-mail"
             value={email}
             onChange={e=> setEmail(e.target.value)} 
              />


            <input
             placeholder="Whatsapp" 
             value={whatsapp}
             onChange={e=> setWhatsapp(e.target.value)}
            />


            <div className="input-group">
               
               <input 
               placeholder="Cidade" 
                value={city}
                onChange={e=> setCity(e.target.value)} 
                />


               <input 
               placeholder="UF" style={{ width:80 }}
                value={uf}
                onChange={e=> setUf(e.target.value)} 
                />

            </div>

            <button className="button" type="submit" >Cadastrar</button>

          </form>
        </div>
      </div>
    );
}