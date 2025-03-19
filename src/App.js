
import './style/header.scss'
import './style/home.scss'
import './style/app.scss'
import './style/exchanges.scss'
import './style/coins.scss'
import './style/coinDetails.scss'
import './style/loader.scss'
import './style/errorComponent.scss'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Header from './component/Header.jsx'
import Home from './component/Home';
import Coins from './component/Coins';
import Exchanges from './component/Exchanges';
import CoinDetails from './component/CoinDetails';



function App() {
  return (
   <Router>
    
    <Header/>
    <Routes>
     
      <Route path='/' element={<Home/>}/>
      <Route path='/coins' element={<Coins/>}/>
      <Route path='/Exchanges' element={<Exchanges/>}/>
      <Route path='/coins/:id' element={<CoinDetails/>}/>
      
    </Routes>
   </Router>
  );
}

export default App;
