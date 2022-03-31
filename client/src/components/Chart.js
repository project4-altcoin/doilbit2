import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import axios from "axios";
import { useState, useEffect } from "react";


export default function YDCChart() {
  var array = [];
  const [concludeprice, setConcludeprice] = useState([])
  
  useEffect(() => {
    const socket= new WebSocket('ws://127.0.0.1:8085');
        socket.onmessage=(e)=>{ 
          const array = JSON.parse(e.data)
          setConcludeprice(array)       
        }  
  },[]);
console.log(concludeprice[0])


  const data = [
    { ag: 1, value: concludeprice[0]},
    { ag: 2, value: concludeprice[1] },
    { ag: 3, value: concludeprice[2] },
    { ag: 4, value: concludeprice[3] },
    { ag: 5, value: concludeprice[4] },
    { ag: 6, value: concludeprice[5] },
    { ag: 7, value: concludeprice[6] },
    { ag: 8, value: concludeprice[7] },
    { ag: 9, value: concludeprice[8] },
    { ag: 10, value: concludeprice[9] },
  ];

  return (
    <Paper>
      <h1>요들코인</h1>
    <Chart
      data={data}
    >
      <ArgumentAxis />
      <ValueAxis />

      <LineSeries valueField="value" argumentField="ag" />
    </Chart>
  </Paper>
  );
}
