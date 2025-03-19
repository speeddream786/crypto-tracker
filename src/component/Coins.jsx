
import {GiNextButton,GiPreviousButton} from "react-icons/gi"
import axios from "axios";
import React, {useEffect, useState } from "react";
import { server } from "../index";
import ErrorComponent from "./ErrorComponent";
import Loader from "./Loader";
import { Link } from "react-router-dom";
function Coins() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("inr");
  const [currentPage, setCurrentPage] = useState(1);
  const [skipPage,setSkipPage]=useState(1);
  const symbol = {
    btc: <>&#8383;</>,
    eth: <>&#208;</>,

    usd: <>&#36;</>,

    eur: <>&#8364;</>,

    inr: <>&#8377;</>,
  };
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${currentPage}`
        );
        setLoading(false);
        setCoins(data);
        console.log(data);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, currentPage]);

  if (error) return <ErrorComponent />;
  return loading ? (
    <Loader />
  ) : (
    <div className="coins">
      <h1>Coins</h1>
      <select value={currency} className="currency" onChange={(e) =>{setCurrency(e.target.value);setLoading(true)}}>
        <option value="inr">INR</option>
        <option value="usd">USD</option>
        <option value="eur">EURO</option>
        <option value="btc">BITCOIN</option>
        <option value="eth">ETHEREUM</option>
      </select>
      <div className="container">
        {coins.map((coin,i) => (
          <div key={i}>
             <Link to={`/coins/${coin.id}`}>
              <img src={coin.image} alt="" />
              <span className="rank">Rank:{coin.market_cap_rank}</span>
              <span className="name">{coin.name}</span>
              <span className="name">
                {symbol[currency]}
                {coin.current_price}
              </span>
            </Link>
          </div>
        ))}
      </div>
      <div className="carousel">
      <button className="btn" onClick={()=>currentPage>1?setCurrentPage(currentPage-1):currentPage}>
          <GiPreviousButton size="30" color="gray" />
        </button>
        <span>{currentPage}</span>
        <button className="btn" onClick={()=>currentPage<124? setCurrentPage(currentPage+1):currentPage}>
          <GiNextButton size="30" color="gray" />
        </button>
        <input type="text" value={skipPage} onChange={(e)=>setSkipPage(e.target.value)} />/124
        <button className="btn1 btn" onClick={()=>skipPage>0?setCurrentPage(Number(skipPage)):setCurrentPage(1)} >Go</button>
      </div>
     
    </div>
  );
}

export default Coins;
