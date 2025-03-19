import axios from "axios";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import React, { Fragment, useEffect, useState } from "react";
import ErrorComponent from "./ErrorComponent";
import Loader from "./Loader";
import { server } from "../index";
import { useParams } from "react-router";
import Charts from './Charts'


function CoinDetails() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [coin, setCoin] = useState({});
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("1d");
  const [chartarr,setChartArr]=useState([])
  const { id } = useParams();
  const symbol = {
    btc:"₿",
    eth: "Ξ",

    usd: "$",

    eur: "€",

    inr: "₹",
  };
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${id}`);
        const { data:dataChart } = await axios.get(`${server}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`);
        setLoading(false);
        setCoin(data);
      
        setChartArr(dataChart.prices)
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [currency, id,days]);

  if (error) return <ErrorComponent />;
  return loading ? (
    <Loader />
  ) : (
    <div className="coinDetails">
      
      <select
        value={currency}
        className="currency"
        onChange={(e) => {
          setCurrency(e.target.value);
          setLoading(true);
        }}
      >
        <option value="inr">INR</option>
        <option value="usd">USD</option>
        <option value="eur">EURO</option>
        <option value="btc">BITCOIN</option>
        <option value="eth">ETHEREUM</option>
      </select>
      <div className="container">
      <select
        value={days}
        className="days"
        onChange={(e) => {
          setDays(e.target.value);
          setLoading(true);
        }}
      >
        <option value="1d">24 Hours</option>
        <option value="7d">7 days</option>
        <option value="30d">30 days</option>
        <option value="90d">3 months</option>
        <option value="180d">6 months</option>
        <option value="365d">1 year</option>
      
      </select>
      <Charts arr={chartarr} currency={symbol[currency]} days={days}></Charts>
        <p>Last update on {Date(coin.last_updated).split("G")[0]}</p>
        <div>
          <img src={coin.image.large} alt="" />
          <h3 className="name">{coin.name}</h3>
          <span className="value">
            {symbol[currency]}
            {coin.market_data.current_price[currency]}
          </span>
          <div className="change">
          <span >
            {coin.market_data.price_change_percentage_24h_in_currency[currency] < 0 ? (
              <MdArrowDropDown size="40" color="red" />
            ) : (
              <MdArrowDropUp size="40" color="green" />
            )}</span>
          <span>{coin.market_data.price_change_percentage_24h_in_currency[currency]}%</span>
          </div>
          <span className="rank">#{coin.market_cap_rank}</span>
          <div className="progress-bar">
           <span className="progress"></span>
          </div>
          <div className="range24">
            <span style={{color:"red"}}>{coin.market_data.low_24h[currency]}</span>
            <span>24H Range</span>
            <span style={{color:"green"}}>{coin.market_data.high_24h[currency]}</span>
          </div>
        </div>
         <div className="marketData">
          <div >
            <span>MAX SUPPLY</span>
            <span>{coin.market_data.max_supply}</span>
          </div>
          <div >
            <span>CIRCULATING SUPPLY</span>
            <span>{coin.market_data.circulating_supply}</span>
          </div>
         
          <div >
            <span>MARKET CAP</span>
            <span>{coin.market_data.market_cap[currency]}</span>
          </div>
          <div >
            <span>ALL TIME LOW</span>
            <span>{coin.market_data.atl[currency]}</span>
          </div>
          <div >
            <span>ALL TIME HIGH</span>
            <span>{coin.market_data.ath[currency]}</span>
          </div>
         </div>
         
      </div>
    </div>
  );
}

export default CoinDetails;
