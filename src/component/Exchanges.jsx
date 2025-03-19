import axios from 'axios'
import React, {  useEffect, useState } from 'react'
import {server} from '../index'
import ErrorComponent from './ErrorComponent'
import Loader from './Loader'
function Exchanges() {
  const [loading, setLoading]=useState(true)
  const [error,setError]=useState(false)
  const [exchanges,setExchanges]=useState([])
  useEffect(()=>{
   
    const fetchEXchanges=async()=>{
      try{
      const {data} =await axios.get(`${server}/exchanges`)
      setLoading(false)
      setExchanges(data)
      console.log(data)
   }
   catch(err){
        setError(true)
        setLoading(false)
   } 
  }
    fetchEXchanges()
  },[])
  if(error) return <ErrorComponent/>
  return (
        
          loading?<Loader/>:
          <div className='exchanges'>
          <h1>Exchanges</h1>
          <div className='container'>
           {
            exchanges.map((ex,i)=>
                 <div key={i}>
                 <a href={ex.url} target="blank">
                  <img src={ex.image} alt =""/>
                  <span className='rank'>Rank:{ex.trust_score_rank}</span>
                   <span className='name'>{ex.name}</span>
                 </a>
                 </div>
            )
           }
          </div>
          </div>

  )
}

export default Exchanges