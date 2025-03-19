import React from 'react'
import { Line } from 'react-chartjs-2';
import {Chart as ChartJs,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from 'chart.js'
ChartJs.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend)
const  Charts=( {arr=[],currency,days})=>{
    const prices=[]
    const date=[]
     for(let i=0;i<arr.length;i++){
      if(days==="1d")date.push(new Date(arr[i][0]).toLocaleTimeString())
      else date.push(new Date(arr[i][0]).toLocaleDateString('en-GB'))
      prices.push(arr[i][1])
     }
     console.log(date)
     console.log(prices)

  return (
    <Line options={{responsive:true}} data={{
        labels:date,
        datasets:[{label:`price in ${currency
        }`,
        data:prices,borderColor:"rgba(255,99,132)",backgroundColor:"rgba(255,99,132)" }]
    }} height={"250"}></Line>
  )
}

export default Charts