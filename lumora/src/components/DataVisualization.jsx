import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import dataFile from "../assets/data/GraphData.json";

import styles from '../styles/DataVisualization.module.css';

const DataVisualization = () => {
  const data = dataFile.graphData;

  const maxVal = 4000; // axis max
  const ticks = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000];

  return (
    <div className={styles.main}>
      <h2>Budget Tracker</h2>

      {/* Top Chart – Actual Savings + Target Savings line */}
      <div style={{ width: "100%", height: "50%", margin: 0, padding: 0 }}>
        <ResponsiveContainer>
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 0 }}
          >
            <CartesianGrid stroke="#000000" vertical={false} horizontal={true}/>
            {/* Hide X-axis labels here */}
            <XAxis dataKey="month" hide />
            <YAxis domain={[0, maxVal]} 
            ticks={ticks} 
            tick={{fill:"#000000"}} 
            width={50} 
            axisLine={{ stroke: "#000000", strokeWidth: 2 }}
            />
            {/* <YAxis yAxisId="right"
            orientation="right"    
            axisLine={{ stroke: "#ffffff", strokeWidth: 2 }} 
            tick={false}          
            tickLine={false}  /> */}
            <Tooltip />
            <Bar
              dataKey="actualSavings"
              barSize={40}
              fill="#0EC7CD"
              name="Actual Savings"
            />
            <Line
              type="monotone"
              dataKey="targetSavings"
              stroke="#ff7300"
              strokeWidth={2}
              name="Target Savings"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Chart – Spending going downward */}
      <div style={{ width: "100%", height: "50%", margin: 0, padding: 0, borderRight:"2px black solid" }}>
        <ResponsiveContainer>
          <ComposedChart
            data={data}
            margin={{ top: 0, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid stroke="#000000" vertical={false} horizontal={true}/>
            {/* Show X-axis labels only here */}
            <XAxis dataKey="month" tick={{fill:"#000000"}}/>
            <YAxis
              domain={[0, maxVal]}
              ticks={ticks}
              tick={{fill:"#000000"}}
              width={50}
              axisLine={{ stroke: "#000000", strokeWidth: 2 }}
              reversed // flips axis so bars go downward
            />
            {/* <YAxis yAxisId="right"
            orientation="right"    
            axisLine={{ stroke: "#ffffff", strokeWidth: 2 }} 
            tick={false}          
            tickLine={false}  /> */}
            <Tooltip />
            <Bar
              dataKey="spending"
              barSize={40}
              fill="#1F5368"
              name="Spending"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DataVisualization;
