import React from 'react'
import { Link } from 'react-router-dom'

function header() {
  return (
    <div className='nav-bar'>
       
        <div>
            <Link to='/'>Home</Link>
            <Link to='/coins'>Coins</Link>
            <Link to='/exchanges'>Exchanges</Link>
        
        </div>
    </div>
  )
}

export default header